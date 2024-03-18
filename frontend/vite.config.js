import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080
  },
  extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx'],
  resolve: {
    mainFields: [],
  },
})
