import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    // port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:10000", // 這裡是後端的 port
        secure: false, // 若後端是 https 則設為 true
      },
    },
  },
  // 建構配置
  build: {
    // 生成環境時將環境變數注入到代碼中
    sourcemap: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
  resolve: {
    mainFields: [],
  },
});
