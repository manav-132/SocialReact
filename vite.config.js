import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    replace({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  resolve: {
    alias: {
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, 'node_modules/@emotion/styled'),
      '@mui/material': path.resolve(__dirname, 'node_modules/@mui/material'),
      '@mui/system': path.resolve(__dirname, 'node_modules/@mui/system'),
      '@mui/styled-engine': path.resolve(__dirname, 'node_modules/@mui/styled-engine'),
    },
  },
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
