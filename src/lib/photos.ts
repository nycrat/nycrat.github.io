import photos from "./photos.json";
import { ASSET_CDN_URL } from "./constants";

export interface PhotoCollection {
  name: string;
  slug: string;
  images: string[];
}

export const photoCollections: PhotoCollection[] = photos;

/**
 * Returns the first image in a collection, throwing if it has none. Used for
 * preview and Open Graph images, where a missing file should fail the build.
 */
export function firstPhoto(collection: PhotoCollection): string {
  const [image] = collection.images;

  if (!image) {
    throw new Error(`photo collection "${collection.slug}" has no images`);
  }

  return image;
}

/**
 * Expands a path from `photos.json` into a fully-qualified asset CDN URL.
 */
export function photoUrl(slug: string, filename: string): string {
  return `${ASSET_CDN_URL}/portfolio/${slug}/${filename}`;
}

/**
 * Derives alt text from a photo's slugified filename:
 * "black-and-white-bird-stones.jpeg" becomes "Black and white bird stones".
 */
export function photoAlt(filename: string): string {
  const description = filename.replace(/\.[^.]+$/, "").replace(/-/g, " ");

  return description.charAt(0).toUpperCase() + description.slice(1);
}
