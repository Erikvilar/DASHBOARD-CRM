import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  define: {
    global: "window", 
  },
  plugins: [react()],

  server: {
    proxy: {
      "/ws": {
        target: "http://10.2.129.243:6680", 
        changeOrigin: true,
        ws: true, 
      },
    },
  },
  base:"/dashboard/"
})
