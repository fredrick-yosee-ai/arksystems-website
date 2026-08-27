import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Tailwind was removed deliberately. `spec/brand-tokens.css` is the single source of
// truth for colour and type, and the brand guide forbids introducing values that are
// not in it. Two token systems would drift. Styling is plain CSS: the tokens file
// imported once, plus scoped `<style>` blocks per component.

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
    }),
  ],
});
