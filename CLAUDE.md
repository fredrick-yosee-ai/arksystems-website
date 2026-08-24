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
2. `spec/page-spec.md` — the approved page spec, v3.3. Section-by-section copy and structure
3. `spec/copy-blocks.md` — the same copy, extracted and ready to paste
4. `reference/homepage-desktop.html` and `reference/homepage-mobile.html` — the approved
   mockups. Open them in a browser. They are the visual target, not a suggestion
5. `spec/brand-tokens.css` — every colour and type decision

## The one constant

```js
export const BOOKING_URL = "https://cal.com/fredrick-arksystems/ark-discovery-call";
```

Every CTA on every page points here. Nine of them in the approved mockup. Hold it in one
place so it changes in one place. The event is configured for 20 minutes, which is why
the page is allowed to say "20 minutes".

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
- `assets/hero-desktop-full.svg` — 1520×1070, kept as a source asset only. Its labels
  are unreadable below about 1100px wide. Not for use in the page.

**Self-host the fonts.** Lora and Source Sans 3, subset, woff2. Faster than Google
Fonts, and it keeps a third-party request off the page, which keeps the Privacy page
shorter and more honest.

**The mobile nav keeps the Book button visible** when the menu collapses. Most warm
traffic arrives on a phone after meeting Fredrick in person. Hiding the CTA from exactly
that person was a defect in the old site.

**Section 3 is the emotional centre** and gets the most vertical space. The receipt in it
must stay large enough to actually read — it was 122px wide with 6px type in an earlier
build, which defeated the entire point of showing a real receipt.

## Redirects — do not skip this

The live site currently serves these paths:

- `/how-we-help`
- `/workshop`
- `/accounting-firms`

The spec calls the accounting page `/accounting`. Whatever the final structure, every
changed path needs a 301 in `netlify.toml` or the existing links and search equity die.

Also note: the current live navigation is broken. "How We Help", "The Workshop", "For
Accounting Firms", "About", "Privacy" and "Terms" all point at `/`, and "Book a Call" is
still a `mailto:`. Do not carry any of that forward.

## What ships in release one

- Homepage (10 sections, per the spec)
- `/workshop` — minimal reference page, reachable from nav and footer
- About
- **Privacy, Terms, Data Handling** — these are launch blockers, not polish. CASL needs
  a privacy basis, and the AI Opportunity Fit Form has had an open privacy-notice
  placeholder since July. Drafts are in `legal/`, marked for review. They must not go
  live unreviewed.

`/accounting` follows immediately after release one. All cold outbound points there,
never at the homepage.

## Decided Aug 24 2026 — these were open, they are not any more

Fredrick's instruction outranks this file. Where these contradict an earlier line here
or in `spec/page-spec.md`, these win.

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

- **The hero SVGs are correct; `spec/page-spec.md` §Section 1's "Visual" paragraph is
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
