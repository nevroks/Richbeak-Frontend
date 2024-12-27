import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import {APP_CONSTS} from "./src/utils/consts/appConsts";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr({
    svgrOptions: {
      plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      svgoConfig: {
        floatPrecision: 2,
      },
    },
    // ...
  })]
})