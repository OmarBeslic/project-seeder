import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { matchPath } from "react-router";

import { getStyle, getUser } from "./src/api.js";
import { getRouteParams, prepareStyleCSS } from "./src/helpers.js";

import { prefetchRoutes } from "./src/prefetchRoutes.js";
import { COOKIE_NAME_JWT } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.VITEST;
const appPort = process.env.APP_PORT || 3000;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  hmrPort
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
    : "";

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: "custom",
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(resolve("dist/client"), {
        index: false,
      })
    );
  }

  app.use(cookieParser()).use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      // Prepare initial state to be used in store
      const prefetched = {};

      // Get cookies and store them in global scope and in store
      globalThis.___COOKIES___ = req?.cookies;
      prefetched.cookies = req?.cookies;

      // Match route
      const match = prefetchRoutes.find((route) =>
        matchPath({ path: route.path, exact: true, strict: false }, url)
      );

      // Get required params to pass to prefetch functions
      const prefetchParams = getRouteParams({ url, path: match?.path });

      // Prefetch global data and specific data for matched route
      const prefetchData = [
        { style: getStyle },
        { user: getUser },
        ...[match?.prefetch],
      ];

      const prefetchPromises = [];
      prefetchData.forEach((routeFetch) => {
        for (const key in routeFetch) {
          prefetchPromises.push(
            new Promise(async (resolve) => {
              try {
                prefetched[key] = await routeFetch[key](prefetchParams);
              } catch (error) {
                console.log(error);
                console.log(`Error fetching ${key}`);
              }

              resolve("done");
            })
          );
        }
      });
      await Promise.allSettled(prefetchPromises);

      globalThis.___PREFETCHED___ = prefetched;

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
      } else {
        template = indexProd;
        // @ts-ignore
        render = (await import("./dist/server/entry-server.js.js.js")).render;
      }

      const context = {};
      const appHtml = render(url, context);

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url);
      }

      // Prepare app html
      let html = template.replace(`<!--app-html-->`, appHtml);

      /* Global style */
      const globalStyleTag = `
      <style type="text/css">
          html {
            ${prepareStyleCSS(prefetched?.style)}
          }
      </style>`;

      /* Fonts */
      const globalFontsTag = `
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=${prefetched?.style?.fontFamily}:100,200,300,400,500,600,700,800,900"
      ></link>`;

      /* Custom style*/
      const globalCustomStyleTag = `<style type="text/css">${prefetched?.style?.customStyle}</style>`;

      // Replace necessary tags
      html = html.replace(
        `/* PREFETCHED */`,
        `globalThis.___PREFETCHED___ = ${JSON.stringify(prefetched)}`
      );

      html = html.replace("<!-- GLOBAL_STYLE_TAG -->", globalStyleTag);
      html = html.replace("<!-- GLOBAL_FONTS_TAG -->", globalFontsTag);
      html = html.replace(
        "<!-- GLOBAL_CUSTOM_STYLE_TAG -->",
        globalCustomStyleTag
      );

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(appPort, () => {
      console.log(`http://localhost:${appPort}`);
    })
  );
}
