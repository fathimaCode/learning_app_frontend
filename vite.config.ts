import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  server: {
    // Ensure the 'public' directory is served properly
    open: true
  },
  // Ensure correct base path for the project
  base: '/',
});
