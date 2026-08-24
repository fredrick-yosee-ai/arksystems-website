import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Tailwind was removed deliberately. `spec/brand-tokens.css` is the single source of
// truth for colour and type, and the brand guide forbids introducing values that are
// not in it. Two token systems would drift. Styling is plain CSS: the tokens file
// imported once, plus scoped `<style>` blocks per component.

export default defineConfig({
  site: "https://arksystems.ca",
  integrations: [mdx(), sitemap()],
});
