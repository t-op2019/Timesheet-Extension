import { defineConfig } from "vite";
const { resolve } = require("path");
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
// import manifest from "./src/manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
  build: {
    rollupOptions: {
      external: [
        /jss-plugin-rule-value-function/,
        /jss-plugin-global/,
        /jss-plugin-nested/,
        /jss-plugin-camel-case/,
        /jss-plugin-default-unit/,
        /jss-plugin-vendor-prefixer/,
        /jss-plugin-props-sort/,
        /jss-plugin-{}/,
      ],
    },
  },
});
