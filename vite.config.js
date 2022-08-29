/*
  Project Name: solid-trois
  License: MIT
  Created by: Lightnet
*/
// https://vitejs.dev/config/server-options.html#server-proxy
// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import gunPlugin from "./vite-plugin-gun.js"

export default defineConfig({
  server: {
    port:3000,
    proxy: {
      //'/gun': {
        //target: 'ws://127.0.0.1:8000/gun',
        //target: 'ws://localhost:8000/',
        //ws: true,
        //secure: false,
        //changeOrigin: true,
      //}
    }
  },
  plugins: [solidPlugin(),gunPlugin()],
});