import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        // target: "http://localhost:10000", // 這裡是後端的 port
        // secure: false, // 若後端是 https 則設為 true
        target: "https://shopit-v1-c66ae.web.app/", // 這裡是後端的 port
        secure: true, // 若後端是 https 則設為 true

      },
    },
  },

  extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
  resolve: {
    mainFields: [],
  },
});
