import { fileURLToPath, URL } from "url";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  // 打包相对路径
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
