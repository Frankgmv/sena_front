import dotenv from 'dotenv';
import {
  defineConfig
} from 'vite';
import react from '@vitejs/plugin-react-swc';

dotenv.config();
const dato = parseInt(process.env.PORT) || 5372
const PORT = 5372

export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT || 5371,
  },
  preview: {
    port: PORT
  }
});