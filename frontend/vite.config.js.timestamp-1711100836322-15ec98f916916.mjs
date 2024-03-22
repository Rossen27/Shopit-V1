// vite.config.js
import { defineConfig } from "file:///C:/Users/rossen/Documents/Temp/Shopit-V1/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/rossen/Documents/Temp/Shopit-V1/frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        // 這裡是後端的 port
        secure: false
        // 若後端是 https 則設為 true
      }
    }
  },
  // 其他配置项...
  build: {
    // 生成环境时将环境变量注入到代码中
    sourcemap: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  },
  extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
  resolve: {
    mainFields: []
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxyb3NzZW5cXFxcRG9jdW1lbnRzXFxcXFRlbXBcXFxcU2hvcGl0LVYxXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxyb3NzZW5cXFxcRG9jdW1lbnRzXFxcXFRlbXBcXFxcU2hvcGl0LVYxXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9yb3NzZW4vRG9jdW1lbnRzL1RlbXAvU2hvcGl0LVYxL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDgwODAsXG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjQwMDBcIiwgLy8gXHU5MDE5XHU4OEUxXHU2NjJGXHU1RjhDXHU3QUVGXHU3Njg0IHBvcnRcbiAgICAgICAgc2VjdXJlOiBmYWxzZSwgLy8gXHU4MkU1XHU1RjhDXHU3QUVGXHU2NjJGIGh0dHBzIFx1NTI0N1x1OEEyRFx1NzBCQSB0cnVlXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIC8vIFx1NTE3Nlx1NEVENlx1OTE0RFx1N0Y2RVx1OTg3OS4uLlxuICBidWlsZDoge1xuICAgIC8vIFx1NzUxRlx1NjIxMFx1NzNBRlx1NTg4M1x1NjVGNlx1NUMwNlx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NkNFOFx1NTE2NVx1NTIzMFx1NEVFM1x1NzgwMVx1NEUyRFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgaW5saW5lRHluYW1pY0ltcG9ydHM6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGV4dGVuc2lvbnM6IFtcIi5tanNcIiwgXCIuanNcIiwgXCIudHNcIiwgXCIuanN4XCIsIFwiLnRzeFwiXSxcbiAgcmVzb2x2ZToge1xuICAgIG1haW5GaWVsZHM6IFtdLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1WLFNBQVMsb0JBQW9CO0FBQ2hYLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBO0FBQUEsUUFDUixRQUFRO0FBQUE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsT0FBTztBQUFBO0FBQUEsSUFFTCxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixzQkFBc0I7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFZLENBQUMsUUFBUSxPQUFPLE9BQU8sUUFBUSxNQUFNO0FBQUEsRUFDakQsU0FBUztBQUFBLElBQ1AsWUFBWSxDQUFDO0FBQUEsRUFDZjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
