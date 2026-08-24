/**
 * Prepare a raw SVG file for inlining into the page.
 *
 * The hero illustrations are inlined rather than loaded through `<img src>` because an
 * SVG in an `<img>` is an isolated document — it cannot reach the page's webfonts, so
 * every label in it would silently fall back to Georgia and a system sans.
 *
 * Inlining creates one problem the brief does not mention: `hero-desktop.svg` and
 * `hero-mobile.svg` define the same five ids (`ar`, `arg`, `daynight`, `discg`, `halo`).
 * The responsive swap needs both in the document at once, and ids are document-global,
 * so the second set would be ignored and the mobile artwork would paint itself with
 * gradients whose coordinates were built for a 720x700 viewBox. Namespacing the ids per
 * variant is what stops that.
 */

interface InlineOptions {
  /** Unique per inlined instance. Becomes the id namespace. */
  prefix: string;
  /** Short accessible name for the illustration. */
  title: string;
  /**
   * The real text alternative. The hero carries the page's argument, so this describes
   * what the illustration actually shows rather than being left empty.
   */
  desc: string;
  /** Class applied to the root <svg>. */
  className?: string;
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export function inlineSvg(raw: string, options: InlineOptions): string {
  const { prefix, title, desc, className } = options;

  let svg = raw.trim();

  // Namespace every id, and every url(#...) that points at one.
  svg = svg.replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}-${id}"`);
  svg = svg.replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}-${id})`);

  const titleId = `${prefix}-title`;
  const descId = `${prefix}-desc`;

  // Drop the intrinsic width/height so CSS controls the size. The viewBox stays, which
  // is what preserves the aspect ratio.
  svg = svg.replace(
    /^<svg\b([^>]*)>/,
    (_, attrs: string) => {
      const cleaned = attrs
        .replace(/\s(width|height)="[^"]*"/g, "")
        .replace(/\sstyle="[^"]*"/g, "");
      // role="img" makes assistive technology treat the illustration as a single image
      // and use the accessible name below, rather than reading its ~40 loose text nodes
      // in drawing order.
      return `<svg${cleaned} role="img" aria-labelledby="${titleId} ${descId}"${
        className ? ` class="${className}"` : ""
      }>`;
    },
  );

  // <title> and <desc> must be the first children of <svg> to be picked up.
  svg = svg.replace(
    /^(<svg\b[^>]*>)/,
    `$1<title id="${titleId}">${escapeXml(title)}</title><desc id="${descId}">${escapeXml(desc)}</desc>`,
  );

  return svg;
}
