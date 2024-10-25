import dotenv from 'dotenv';
import {
  defineConfig
} from 'vite';
import react from '@vitejs/plugin-react-swc';

dotenv.config();
const PORT = parseInt(process.env.PORT) || 3222

export default defineConfig({
  plugins: [react()],
  preview: {
    port: PORT
  }
});