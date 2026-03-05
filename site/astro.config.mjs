// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  site: 'https://mcp-tool-shop-org.github.io',
  base: '/a11y-demo-site',
  integrations: [
    starlight({
      title: 'A11y Demo Site',
      description: 'A11y Demo Site handbook',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/mcp-tool-shop-org/a11y-demo-site' }],
      sidebar: [{ label: 'Handbook', autogenerate: { directory: 'handbook' } }],
      customCss: ['./src/styles/starlight-custom.css'],
      disable404Route: true,
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
