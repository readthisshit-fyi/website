// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import vue from "@astrojs/vue";
import svgLoader from "vite-svg-loader";

// https://astro.build/config
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 4321,
  },

  vite: {
    css: {
      transformer: "lightningcss",
    },
    plugins: [svgLoader()],
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Work Sans",
      cssVariable: "--work-sans",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/WorkSans.ttf"],
          },
          {
            weight: "100 900",
            style: "italic",
            src: ["./src/assets/WorkSans-Italic.ttf"],
          },
        ],
      },
    },
  ],

  integrations: [vue()],
});
