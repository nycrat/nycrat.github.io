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
