import { execFileSync } from "node:child_process";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Tailwind was removed deliberately. `spec/brand-tokens.css` is the single source of
// truth for colour and type, and the brand guide forbids introducing values that are
// not in it. Two token systems would drift. Styling is plain CSS: the tokens file
// imported once, plus scoped `<style>` blocks per component.

/**
 * The last time each page's own source actually changed, from git.
 *
 * WHY THIS IS DERIVED AND NOT A BUILD TIMESTAMP. Stamping every URL with the build date
 * is the common shortcut and it is a lie: a rebuild is not a change, and Google states it
 * ignores `lastmod` entirely once it finds the value untrustworthy. A sitemap that cries
 * wolf on every deploy is worse than one with no lastmod at all, because it burns the one
 * signal we actually need right now — the previous version of this site is still the one
 * in Google's index, and lastmod is how a sitemap says "this is not what you have".
 *
 * Each route maps to its own page file and its own section components. Shared files —
 * BaseLayout, the header, the footer, the token files — are deliberately NOT counted: a
 * change to the consent banner or a nav link does not change what the page is about, and
 * folding them in would move every date on every deploy, which is the build-timestamp
 * problem wearing a different hat.
 */
const PAGE_SOURCES = {
  "/": ["src/pages/index.astro", "src/components/sections/home"],
  "/about/": ["src/pages/about.astro", "src/components/sections/about"],
  "/accounting/": ["src/pages/accounting.astro", "src/components/sections/accounting"],
  "/workshop/": ["src/pages/workshop.astro", "src/components/sections/workshop"],
  "/contact/": ["src/pages/contact.astro", "src/components/sections/contact"],
};

function lastCommitDate(paths) {
  try {
    const iso = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", ...paths],
      { encoding: "utf8" },
    ).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    /* No git history available — a shallow clone, or a build from a tarball. Returning
     * undefined omits lastmod for that URL, which is the honest outcome: no claim is
     * better than a guessed one. */
    return undefined;
  }
}

export default defineConfig({
  site: "https://arksystems.ca",
  integrations: [
    mdx(),
    sitemap({
      /*
       * Keep all three legal drafts out of the sitemap.
       *
       * They already set `noindex` in the page head, but a sitemap entry and a noindex
       * tag are contradictory signals about the same URL — one asks a crawler to index
       * the page, the other tells it not to. Sending both is how a page nobody meant to
       * publish ends up in a search result anyway.
       *
       * Neither page is linked from anywhere that ships, and both are held on a branch
       * until a Canadian privacy practitioner has read them. WHEN THAT REVIEW CLEARS,
       * this filter and the `noindex` on both pages come off in the same change — one
       * without the other leaves the site telling crawlers two different things.
       */
      filter: (page) =>
        !page.endsWith("/privacy/") &&
        !page.endsWith("/data-handling/") &&
        !page.endsWith("/terms/"),

      /* Attach the real last-changed date per URL. See PAGE_SOURCES above for why this
       * is read from git rather than set to the build time. */
      serialize(item) {
        const path = new URL(item.url).pathname;
        const sources = PAGE_SOURCES[path];
        if (sources) {
          const date = lastCommitDate(sources);
          if (date) item.lastmod = date.toISOString();
        }
        return item;
      },
    }),
  ],
});
