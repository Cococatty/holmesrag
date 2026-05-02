import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server', // needed for API routes
  integrations: [], // <-- REQUIRED (fixes your error)
});