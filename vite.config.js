import dotenv from 'dotenv';
import {
  defineConfig
} from 'vite';
import react from '@vitejs/plugin-react-swc';

dotenv.config();
const PORT = parseInt(process.env.PORT) || 5372

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3222',
    }
  },
  preview: {
    port: PORT
  }
});