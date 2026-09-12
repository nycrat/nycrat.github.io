// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { preserveImageSrc } from "./src/lib/preserve-image-src-processor";

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
        hostname: import.meta.env.ASSET_CDN_HOST,
      },
    ],
  },
});
