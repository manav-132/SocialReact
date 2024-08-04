import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';

export default defineConfig({
  plugins: [
    react(),
    replace({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  build: {
    rollupOptions: {
      external: [
        '@material-ui/icons',
        '@emotion/react',
        '@emotion/styled',
        '@mui/material',
        '@mui/system',
        '@mui/styled-engine'
      ],
    },
  },
});
