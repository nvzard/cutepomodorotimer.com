// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://cutepomodorotimer.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'de', 'fr', 'hi', 'ja', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  devToolbar: { enabled: false },
  fonts: [
    {
      name: 'Baloo 2',
      cssVariable: '--font-baloo',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
