import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

dotenv.config();
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT),
  },
  preview: {
    port: parseInt(process.env.PORT),
  }
});