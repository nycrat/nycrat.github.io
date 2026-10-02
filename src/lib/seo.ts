import { getImage } from "astro:assets";

export const SITE_TITLE = "nycrat.dev";

export const DEFAULT_DESCRIPTION =
  "Avah Xiao is a computer science student at the University of British Columbia, software lead at UBC Thunderbots, passionate about software development and photography.";

export const DEFAULT_OG_IMAGE = "/open-graph.jpg";
export const OG_IMAGE_WIDTH = 3840 / 2;
export const OG_IMAGE_HEIGHT = 2158 / 2;

/** Trims to a length that search engines will actually display. */
export function clampDescription(text: string, max = 200): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

export interface OgImage {
  src: string;
  width: number;
  height: number;
}

export const OG_IMAGE_WIDTH_PX = 1200;

/**
 * Resolves an asset CDN URL into a locally hosted Open Graph image.
 *
 * Astro fetches and processes the file at build time and emits it under
 * `/_astro/`, so the private CDN host never reaches the rendered page.
 */
export async function ogImageFromCdn(src: string): Promise<OgImage> {
  try {
    const { srcSet } = await getImage({
      src,
      widths: [OG_IMAGE_WIDTH_PX],
      inferSize: true,
    });

    const [variant] = srcSet.values;

    if (!variant) {
      throw new Error("image pipeline produced no variants");
    }

    const { url, transform } = variant;

    if (!transform.width || !transform.height) {
      throw new Error(
        `could not determine dimensions (width=${transform.width}, height=${transform.height})`,
      );
    }

    return { src: url, width: transform.width, height: transform.height };
  } catch (cause) {
    throw new Error(
      `Failed to build Open Graph image for ${src}. Check that the asset exists on the CDN and that its host is allowed by "image.remotePatterns" in astro.config.mjs.`,
      { cause },
    );
  }
}
