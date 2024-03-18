import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

dotenv.config();
const PORT = parseInt(process.env.PORT)
console.log(PORT)
export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT || 5371,
  },
  preview: {
    port: PORT,
  }
});