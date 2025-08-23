import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }: { command: string }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' ? '/curriculo/' : '/',
}));
