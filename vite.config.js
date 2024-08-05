import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@material-ui/icons"]
  },
  resolve: {
    alias: {
      '@material-ui/icons': '@material-ui/icons/esm'
    }
  }
})
