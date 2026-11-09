// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // The only place the public origin is set: canonical, OGP, JSON-LD, sitemap and robots.txt derive from it.
  site: "https://liftalk.pages.dev",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // Search results and Saved depend on the visitor's input/storage — nothing to index.
      filter: (page) => !/\/(search|saved)\/$/.test(page),
    }),
  ],
  // Self-host Archivo at build time: no third-party request, metric-matched fallback (less CLS).
  // Zen Kaku is not here: its ~360 @font-face rules would be inlined into every page.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Archivo",
      cssVariable: "--font-archivo",
      weights: ["500", "600", "700", "800", "900"],
      styles: ["normal"],
      subsets: ["latin"],
      // Japanese glyphs fall through to Zen Kaku (loaded via @fontsource in global.css).
      fallbacks: ["Zen Kaku Gothic New", "sans-serif"],
    },
  ],
  vite: {
    build: {
      // Never base64-inline font chunks into the CSS; unicode-range only works if they stay separate files.
      assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined),
    },
  },
});
