import { fileURLToPath, URL } from "url";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
const root = process.cwd();
// https://vitejs.dev/config/

export default ({ command, mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, root);
  return {
    plugins: [vue(), WindiCSS()],
    // 打包相对路径
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
};
