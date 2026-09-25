// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { preserveImageSrc } from "@lib/preserve-image-src-processor";
import { ASSET_CDN_HOST } from "@lib/constants";

// https://astro.build/config
export default defineConfig({
  site: "https://nycrat.dev/",
  trailingSlash: "always",
  integrations: [mdx({ processor: preserveImageSrc() })],
  prefetch: {
    prefetchAll: true,
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: ASSET_CDN_HOST,
      },
    ],
  },
});
