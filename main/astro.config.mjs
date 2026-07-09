// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import vue from "@astrojs/vue";
import svgLoader from "vite-svg-loader";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import node from "@astrojs/node";
import { locales } from "./src/paraglide/runtime.js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),

  server: {
    host: "0.0.0.0",
    port: 4321,
  },

  vite: {
    css: {
      transformer: "lightningcss",
    },
    plugins: [
      svgLoader(),
      paraglideVitePlugin({
        project: "./project.inlang",
        outdir: "./src/paraglide",
        strategy: ["url", "cookie", "baseLocale"],
        cookieName: "PARAGLIDE_LOCALE",
        urlPatterns: [
          {
            pattern: "/",
            localized: locales.map((locale) => [locale, `/${locale}`]),
          },
          {
            pattern: "/:path(.*)?",
            localized: locales.map((locale) => [locale, `/${locale}/:path(.*)?`]),
          },
        ],
      }),
    ],
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Fixel",
      cssVariable: "--fixel",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/Fixel.ttf"],
          },
          {
            weight: "100 900",
            style: "italic",
            src: ["./src/assets/Fixel-Italic.ttf"],
          },
        ],
      },
    },
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
