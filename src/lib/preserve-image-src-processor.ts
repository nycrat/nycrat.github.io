import { satteri } from "@astrojs/markdown-satteri";

/**
 * MDX processor that intercepts markdown images before Astro's
 * image-to-component pass, keeping `src` as a plain string instead of a static
 * import (so referenced files need not exist locally and components receive
 * the authored path).
 */
export function preserveImageSrc() {
  return satteri({
    hastPlugins: [
      {
        name: "preserve-image-src",
        element: {
          filter: ["img"],
          visit(node) {
            const props = node.properties ?? {};
            const src = typeof props.src === "string" ? props.src : undefined;
            if (!src) return;
            return {
              type: "mdxJsxFlowElement" as const,
              name: "img",
              children: [],
              attributes: [
                { type: "mdxJsxAttribute" as const, name: "src", value: src },
                ...Object.entries(props)
                  .filter(([k, v]) => k !== "src" && v != null && v !== false)
                  .map(([k, v]) => ({
                    type: "mdxJsxAttribute" as const,
                    name: k,
                    value: String(v),
                  })),
              ],
            };
          },
        },
      },
    ],
  });
}
