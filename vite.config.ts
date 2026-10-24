import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Served from https://<user>.github.io/otm-unit-no/ on GitHub Pages.
// Override with BASE_PATH=/ for Docker or other root-hosted deployments.
const base = process.env.BASE_PATH ?? '/otm-unit-no/';

export default defineConfig({
  base,
  plugins: [react()],
});
