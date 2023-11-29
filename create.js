#!/usr/bin/env node
import * as child from "child_process";
import fs from "fs";
import fse from "fs-extra";
import path from "path";
import * as url from "url";

import { input, select } from "@inquirer/prompts";

// Alternative for ES module
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const DESTINATION_FOLDER = process.cwd(); // Folder from which the script is called - first create destination folder

// Helpers
const getAllFiles = async function (dirPath, arrayOfFiles = []) {
  let files = await fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = await getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  }

  return arrayOfFiles;
};

async function executeShell(cmd) {
  const exec = child.exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

// Run
const main = async () => {
  // Ask user for params
  let projectName = null;
  let template = null;
  try {
    projectName = await input({ message: "Enter project name" });
    template = await select({
      message: "Select an app template",
      choices: [
        {
          name: "SPA - Vite + Zustand",
          value: "spa",
          description: "Single Page Application template - Vite + Zustand",
          disabled: true,
        },
        {
          name: "SSR - Vite + Express + Zustand",
          value: "ssr-default",
          description:
            "Serverside Application template - Vite + Express + Zustand",
          disabled: true,
        },
        {
          name: "SSR - Vite + Express + Zustand + MUI",
          value: "ssr-mui",
          description:
            "Serverside Application template - Vite + Express + Zustand + MUI",
        },
        {
          name: "SSR - Vite + Express + Zustand + Ant Design UI",
          value: "ssr-antd",
          description:
            "Serverside Application template - Vite + Express + Zustand + Ant Design UI",
        },
      ],
    });
  } catch (error) {
    console.log(
      "There has been an error getting parameters, please try again."
    );
    console.log(error);
    return;
  }

  console.log("Creating app");

  // Copy template files to new folder
  var sourceDir = path.join(__dirname, `./templates/${template}`);
  var destinationDir = `${DESTINATION_FOLDER}/${projectName}`;
  // // Check and create folder
  // // If folder already exists abort script not to overwrite files
  if (fs.existsSync(destinationDir)) {
    throw "Error - Project already exists!";
  }
  // If all good proceed with creating folder
  await fse.copy(sourceDir, destinationDir);

  // Rename files
  const allFiles = await getAllFiles(destinationDir);
  allFiles.forEach((file) => {
    const renamedFile = file.replace("PLACEHOLDER_PROJECT_FOLDER", projectName);

    fs.renameSync(file, renamedFile, function (err) {
      if (err) console.log("ERROR: " + err);
    });
  });

  // Go over files and replace placeholders
  const renamedFiles = await getAllFiles(destinationDir);
  renamedFiles.forEach((file, index) => {
    //if (index > 0) return
    fs.readFile(file, "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }

      // Replace placeholders
      let result = data;

      const toReplace = [
        { slug: "PLACEHOLDER_PROJECT_FOLDER", value: projectName },
      ];

      toReplace.forEach((el) => {
        result = result.split("PLACEHOLDER_PROJECT_FOLDER").join(el.value);
      });

      fs.writeFile(file, result, "utf8", function (err) {
        if (err) return console.log(err);
      });
    });
  });

  console.log("Done");

  console.log("Installing dependencies");

  await executeShell(`cd ./${projectName} && npm i`);

  console.log("Done");
  console.log("");

  console.log("Your project has been created!");
  console.log("");
  console.log(
    `Go to folder '${projectName}' and run it with 'npm start' or 'yarn start'`
  );
};

main().catch((e) => console.log(e));
