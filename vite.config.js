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
<<<<<<< HEAD
        target: "http://192.168.100.5:6680", 
=======
        target: "http://10.2.128.20:6680", 
>>>>>>> ec54ee6e75919017d29a576472982e2596179de0
        changeOrigin: true,
        ws: true, 
      },
    },
  },
  base:"/dashboard/"
})
