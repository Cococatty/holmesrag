import { defineConfig } from 'astro/config';

// For local/dev and server-capable deployments.
// Add your deployment adapter when publishing, e.g. @astrojs/vercel,
// @astrojs/netlify, or @astrojs/cloudflare.
export default defineConfig({
  output: 'server'
});
