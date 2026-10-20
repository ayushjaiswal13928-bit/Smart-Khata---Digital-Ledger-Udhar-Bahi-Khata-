import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const BASE_PATH = '/Smart-Khata---Digital-Ledger-Udhar-Bahi-Khata/';

export default defineConfig({
  base: BASE_PATH,

  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'icon-192.png',
        'icon-512.png',
        'maskable.png',
        'apple-touch-icon.png',
      ],

      manifest: {
        id: BASE_PATH,
        name: 'स्मार्ट खाता - डिजिटल कृषि व बटाई बहीखाता',
        short_name: 'स्मार्ट खाता',
        description: 'डिजिटल कृषि, बटाईदार साझेदारी व किराया बहीखाता',
        theme_color: '#0c1a13',
        background_color: '#060e0a',
        display: 'standalone',
        display_override: ['standalone', 'window-controls-overlay'],
        prefer_related_applications: false,
        orientation: 'portrait-primary',
        start_url: BASE_PATH,
        scope: BASE_PATH,

        icons: [
          {
            src: `${BASE_PATH}icon-192.png`,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: `${BASE_PATH}icon-512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: `${BASE_PATH}maskable.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },

  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
