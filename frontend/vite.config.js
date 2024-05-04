import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://shopit-v1-c66ae.web.app", // Firebase Hosting 的 URL
        secure: true, // Firebase Hosting 是 https，因此設為 true
      },
    },
  },
  extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
  resolve: {
    mainFields: [],
  },
});
