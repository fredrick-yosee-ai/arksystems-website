# ArkSystems website — build brief

You are building the ArkSystems homepage rebuild. Everything in this file was decided
and approved before you started. Do not re-open settled decisions; if something here
looks wrong, say so rather than quietly changing it.

## What this is

A complete rebuild of arksystems.ca. Astro, deployed on Netlify. Static content site —
no client framework is needed, and adding one is not an improvement.

ArkSystems finds where AI is worth using in a small business, then builds that one
thing. Metro Vancouver. Target businesses run roughly CAD $500k–$5M revenue.
The page has exactly one job: get the visitor onto a 20-minute call.

## Where the truth lives, in order

1. Fredrick's current instruction
2. `docs/page-spec.md` — the approved page spec, v3.3. Section-by-section copy and structure
3. **The built homepage in `src/`** — for the ten homepage sections this is now the record
   of what was actually shipped, and its component comments carry the reasoning
4. `src/styles/brand-tokens.css` — every colour and type decision

Two sources that used to be listed here are gone, removed once the homepage was built:

- `spec/copy-blocks.md` — the approved copy, now living in the components themselves
- `reference/homepage-desktop.html` and `reference/homepage-mobile.html` — the approved
  mockups. They were the visual target for the build and it matched them; they are
  recoverable from git history if a future page needs them

`brand-tokens.css` moved from `spec/` into `src/styles/` because it is not a document.
`src/styles/tokens.css` imports it, and the site renders unstyled without it.

## The one constant

```js
export const BOOKING_URL = "https://cal.com/fredrick-arksystems/ark-discovery-call";
```

Every CTA on every page points here. Hold it in one place so it changes in one place —
it lives in `src/consts.ts`. The event is configured for 20 minutes, which is why the
page is allowed to say "20 minutes".

The homepage carries five: nav, hero, demo, what-happens, closing. (An earlier note here
said nine; that was five on the desktop mockup plus four on the mobile one, not nine per
page.)

Cal.com's embed (`embed.js`) can open the booker in a popup instead of navigating away.
Prefer that, but keep a plain `<a href>` fallback that works if the script fails. Any
third-party script has to be named on the Privacy page.

## Rules that are not style preferences

These come from the brand guide and the claims standard. Breaking one is a factual or
legal problem, not a taste disagreement.

- **No invented proof.** No client names, testimonials, results, metrics, "trusted by",
  or anything implying a completed client engagement. There are none yet.
- **Make no claim that requires a disclaimer.** If a line needs a caveat to be true,
  delete the line rather than adding the caveat.
- **Blame the work, never the owner.** The reader is busy and doing well. Their admin
  load is what success creates, not evidence of bad management. Never imply their
  business is weak, behind, disorganised, or failing.
- **Value before cost.** No price, payment terms or commercial language on the homepage.
  The workshop page carries its own price; the payment schedule is never published.
- **Write for a reader whose first language may not be English.** The risk is idiom, not
  vocabulary. "Get your ducks in a row" is harder than "reconciliation".
- **Banned constructions**, permanently: "AI transformation", "revolutionary AI",
  "replace your staff", "fully autonomous agents", "one-click automation", "guaranteed
  ROI", "case study", "our clients", "Recent work has included…" followed by a list.

## Build notes that will save you time

**Inline the hero SVGs. Do not use `<img src="hero-desktop.svg">`.**
An SVG loaded through `<img>` is isolated — it cannot reach the page's webfonts, so
every label silently falls back to Georgia and a system sans. Inline the SVG into the
markup so it inherits Lora and Source Sans 3. The files in `assets/` already have the
Ark logo embedded as base64, so inlining them needs no extra asset wiring.

**Two hero illustrations, swapped at a breakpoint.**
- `assets/hero-desktop.svg` — 720×700, sits right of the headline
- `assets/hero-mobile.svg` — 354×442, compact emblem
The phone version is deliberately small. An earlier version was 1418px tall, which put
two full screens of illustration above the first sentence. Do not "improve" it by
restoring detail.
`assets/hero-desktop-full.svg` (1520×1070) used to sit alongside these as an unused
source asset. It was deleted in the cleanup — its labels were unreadable below about
1100px and it was never for use in a page. It is in git history if ever needed.

**Both hero SVGs define the same five ids** — `ar`, `arg`, `daynight`, `discg`, `halo`.
The responsive swap needs both inlined in the document at once, and ids are
document-global, so without namespacing the mobile artwork paints itself with gradients
built for a 720×700 viewBox. `src/lib/svg.ts` rewrites the ids per variant and adds the
`<title>`/`<desc>` text alternative. Use it for any future inlined SVG.

**Self-host the fonts.** Lora and Source Sans 3, subset, woff2. Faster than Google
Fonts, and it keeps a third-party request off the page, which keeps the Privacy page
shorter and more honest.

**The mobile nav keeps the Book button visible** when the menu collapses. Most warm
traffic arrives on a phone after meeting Fredrick in person. Hiding the CTA from exactly
that person was a defect in the old site.

**Section 3 is the emotional centre** and gets the most vertical space. The receipt in it
must stay large enough to actually read — it was 122px wide with 6px type in an earlier
build, which defeated the entire point of showing a real receipt.

## Redirects — done, in `netlify.toml`

- `/how-we-help` → `/` as a **301**. That page has no equivalent; its content is now
  homepage sections 2, 3 and 8.
- `/accounting-firms` → `/` as a **302**, deliberately temporary. The real destination is
  `/accounting`, which does not exist yet, and a 301 to a 404 is cached hard by browsers
  and search engines. **When `/accounting` ships, change the target and make it a 301.**
- `/workshop` keeps its path, so it needs no redirect — but the page does not exist yet
  and currently 404s.

The old site's broken navigation is gone: every nav link now resolves, and no `mailto:`
remains anywhere. Do not reintroduce either.

## Where the homepage lives

Built and live. `src/pages/index.astro` composes **nine** sections in a fixed order:

| # | Section | Component |
|---|---|---|
| 1 | Hero | `sections/home/HeroSection.astro` |
| 2 | The problem | `sections/home/ProblemSection.astro` |
| 3 | See it work | `sections/home/SeeItWorkSection.astro` + `see-it-work/{Receipt,Chat,Sheet}Panel.astro`, `see-it-work/MonthEndStrip.astro` |
| 4 | Is this you? | `sections/home/IsThisYouSection.astro` |
| 5 | What happens when you book | `sections/home/WhatHappensSection.astro` |
| 6 | Who you're working with | `sections/home/WhoYouWorkWithSection.astro` |
| 7 | How we work | `sections/home/HowWeWorkSection.astro` |
| 8 | FAQ | `sections/home/FaqSection.astro` |
| 9 | Closing | `sections/home/ClosingSection.astro` |

**The spec's section 6, "Start with one. Not with everything.", was removed** at
Fredrick's request. "Start with one" survives as the How we work heading. What went with
it is the expansion beat — that the foundation is built once, so later jobs land faster
than the first. Nothing else on the page makes that point. If it is wanted back it needs
a home; do not silently re-add it here.

Shared: `layouts/BaseLayout.astro` (head, Cal.com embed, skip link), `layout/SiteHeader`
and `SiteFooter`, `common/BookingButton.astro` (every CTA), `consts.ts` (BOOKING_URL,
nav and footer link data), `lib/svg.ts` (inlining hero SVGs), `styles/brand-tokens.css`
then `styles/tokens.css` then `styles/base.css`.

**Section order is load-bearing.** See it work must stay below The problem — showing the
fix before the problem is felt turns a resolution into a product demo. The problem and
Is this you? both do symptom recognition, so nothing else may.

**Layout rules learned the hard way, worth keeping:**

- Set a `ch` measure on the element that carries the font-size, never on a wrapper —
  `ch` resolves against the element's own font-size, so on a wrapper it counts 16px
  characters and cramps a display heading to a third of its width.
- Nothing may be wider than the viewport, even inside an `overflow-x: auto` box. A wide
  child still widens `documentElement.scrollWidth`, and iOS Safari answers that by
  widening the layout viewport — the whole page then scrolls sideways into blank space.
  Check `documentElement.scrollWidth`, not `body.scrollWidth`; body shows nothing.
- Headings, eyebrows and short closing lines centre under
  `(max-width: 900px), (orientation: portrait)`. Body paragraphs deliberately do not —
  centred prose is harder to read, which matters more here than usual given the
  plain-language rule.

No Tailwind. Plain CSS, tokens imported once, scoped `<style>` per component. Node 24,
pinned in `.nvmrc`.

## Still to build for release one

- `/workshop` — minimal reference page, reachable from nav and footer. **Footer links to
  it now and it 404s.**
- `/about` — **linked from nav and footer, 404s.**
- **Privacy, Terms, Data Handling** — launch blockers, not polish. CASL needs a privacy
  basis, and the AI Opportunity Fit Form has had an open privacy-notice placeholder since
  July. **All three are linked from the live footer and 404 today**, and the live FAQ
  answer to "What happens to my data?" ends by pointing at the data handling page.
  Unreviewed drafts are in `docs/legal/`. They are drafts, not pages: they must not be
  turned into routes until Fredrick has done a factual review and a Canadian privacy
  practitioner has seen them.

`/accounting` follows immediately after release one. All cold outbound points there,
never at the homepage.

## Decided Aug 24 2026 — these were open, they are not any more

Fredrick's instruction outranks this file. Where these contradict an earlier line here
or in `docs/page-spec.md`, these win.

- **The receipt system is hybrid.** It posts automatically when the category is clear,
  and asks when it is not. It does *not* route everything past a person.

  Two consequences on the page:

  1. Section 3's H2 is **"A receipt goes in. A clean line item comes out. You see every
     one."** — the mockup's wording. The spec's *"You approve everything in between"*
     described a review-everything model that does not exist, and is superseded.
  2. **The FAQ answer to "What happens to my data?" is currently inaccurate.** The line
     *"Anything that matters still goes past a person before it happens — that's
     deliberate, not a setting"* is not true under a hybrid model. It must be rewritten
     before launch. Tracked below as open.

  Section 3 as drawn shows a clean run with no exception in it. The "asks when it is
  unsure" beat is missing from panel 2 and should be added — it is the trust anchor, in
  the version that is actually true. The hero SVG already gets this right: *"Two things
  need you. Nothing else does."*

- **The hero SVGs are correct; `docs/page-spec.md` §Section 1's "Visual" paragraph is
  stale.** That paragraph describes an expense-capture pipeline with a "you review"
  step, an *"Example: expense capture"* header and a *"Sample data"* tag. No such
  artwork exists. Build the hero from `assets/hero-desktop.svg` and
  `assets/hero-mobile.svg` as drawn. Do not reconstruct the pipeline the spec describes.

- **Tool logos ship as drawn.** Fredrick's decision, made after the trademark and
  implied-relationship concern was put to him twice. The ten marks in the hero
  illustration stay as they are. Do not re-open this and do not remove them.

## Still open — do not guess these

- **The "What happens to my data?" FAQ answer** needs rewriting to match the hybrid
  model. See above. This is a claims-accuracy fix, not a style edit.
- **Agent naming.** Whether the assistant mark carries a name. Works either way.
- **Analytics provider.** Per-CTA event names are specified (hero / demo / what-happens /
  closing / nav). The provider is not chosen, and the choice changes the Privacy page.

## Quality gates before anything goes live

- Contrast checked on olive-on-cream and white-on-olive; visible focus states on every
  interactive element
- The hero illustration needs a real text alternative. It carries the argument, so
  `alt=""` is wrong — describe what it shows.
- Correct heading order, one `h1`
- Renders at 390 / 768 / 1440
- Every link resolves. No 404s in the footer.
- The brand guide's ten-point pre-publication check
