import { defineConfig } from "vite";
const { resolve } = require("path");
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
  build: {
    rollupOptions: {
      external: [/^jss-plugin-.*/],
    },
  },
  // resolve: {
  //   alias: [
  //     {
  //       find: /^@material-ui\/pickers$/,
  //       replacement: resolve(
  //         __dirname,
  //         "./node_modules/@material-ui/pickers/esm"
  //       ),
  //     },
  //   ],
  // },
});
