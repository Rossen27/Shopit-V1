import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://rossen-hua.onrender.com", // 這裡是後端的 port
        secure: true, // 若後端是 https 則設為 true
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
