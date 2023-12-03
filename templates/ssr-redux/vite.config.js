import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import builtinModules from "builtin-modules";

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    target: "esnext",
  },
  ssr: {
    external: builtinModules,
  },
});
