// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://nycrat.dev/",
  trailingSlash: "always",
  prefetch: {
    prefetchAll: true,
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: import.meta.env.ASSET_CDN_HOST,
      },
    ],
  },
});
