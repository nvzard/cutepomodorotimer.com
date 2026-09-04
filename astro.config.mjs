// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

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

  build: {
    inlineStylesheets: 'always',
  },

  devToolbar: { enabled: false },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
          de: 'de',
          fr: 'fr',
          hi: 'hi',
          ja: 'ja',
          pt: 'pt',
        },
      },
    }),
  ],

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

  adapter: cloudflare(),
});