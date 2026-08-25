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
2. `docs/homepage-copy.md` — the approved homepage copy, Aug 25 2026. **This supersedes
   `docs/page-spec.md` for the homepage.** The page it describes is a different page from
   the one the spec describes: a repositioning from "we give you your hours back" to an AI
   consulting firm that assesses where AI produces a return, quantifies it, and builds it
3. `docs/page-spec.md` — the older page spec, v3.3. Still the record for anything the new
   copy file does not cover, but where the two disagree about the homepage, the copy wins
4. **The built homepage in `src/`** — for the nine homepage sections this is the record of
   what was actually shipped, and its component comments carry the reasoning
5. `src/styles/brand-tokens.css` — every colour and type decision

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

The homepage carries five: nav, hero, section 3, section 5, closing. Their analytics
labels are `hero`, `where`, `proof`, `closing` and `nav` — the `cta_hero` / `cta_where` /
`cta_proof` / `cta_close` of the copy file. Section 2 deliberately has none: it does
recognition work, and a button in the middle of it asks for a decision before the reader
has finished agreeing with the diagnosis.

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

**Sections 3 and 4 carry the argument** and get the most vertical space. Section 5, the
demonstration, deliberately does not — it is evidence for a case that has already been
made, and a demonstration given before the argument is a product demo.

**Anything inside a demonstration panel must stay large enough to actually read.** An
earlier build set a receipt at 122px wide with 6px type, which defeated the entire point
of showing one. The same rule governs the two panels that replaced it: if the process map
or the expense report cannot be read at the width it renders, it is not illustrating
anything.

## Redirects — done, in `netlify.toml`

- `/how-we-help` → `/` as a **301**. That page has no equivalent; its content is now
  spread across the homepage.
- `/accounting-firms` → `/accounting` as a **301**. This was a temporary 302 to the
  homepage while `/accounting` did not exist, because a 301 to a 404 is cached hard by
  browsers and search engines. `/accounting` has shipped, so it is now the permanent
  destination it was always meant to have. **Done — nothing outstanding here.**
- `/workshop` keeps its path, so it needs no redirect — but the page does not exist yet
  and currently 404s.

The old site's broken navigation is gone: every nav link now resolves, and no `mailto:`
remains anywhere. Do not reintroduce either.

## Where the homepage lives

Built and live. **Rebuilt Aug 25 2026 against `docs/homepage-copy.md`.**
`src/pages/index.astro` composes **nine** sections in a fixed order:

| # | Section | Component |
|---|---------|-----------|
| 1 | Hero | `sections/home/HeroSection.astro` |
| 2 | The problem | `sections/home/ProblemSection.astro` |
| 3 | Where AI actually pays | `sections/home/WhereAiPaysSection.astro` |
| 4 | How we find it | `sections/home/HowWeFindItSection.astro` + `how-we-find-it/ProcessMapPanel.astro` |
| 5 | One we built | `sections/home/OneWeBuiltSection.astro` + `one-we-built/ExpenseCapturePanel.astro` |
| 6 | Start with one | `sections/home/StartWithOneSection.astro` |
| — | Founder strip | `sections/home/FounderStripSection.astro` |
| 7 | Before you book | `sections/home/FaqSection.astro` |
| 8 | Close | `sections/home/ClosingSection.astro` |

**Five components were deleted in the rebuild** and are recoverable from git history:
`SeeItWorkSection` with its four `see-it-work/` panels, `IsThisYouSection`,
`WhatHappensSection`, `HowWeWorkSection`, and `WhoYouWorkWithSection`. The first four had
no equivalent in the new copy. The fifth survives, condensed, as the founder strip.

**"Start with one" is back.** It was cut from the previous build at Fredrick's request;
the approved copy restores it as section 6. It is the page's only pause — no cards, no
illustration, no CTA — and that is deliberate. Four sections in a row that all ask the
reader to take something in read as a pitch.

**The founder strip is not in the approved copy file.** It is kept at Fredrick's
instruction of Aug 25 2026, because this page's audience is warm traffic who have met him
and a page with no face on it asks that reader to re-establish who they are dealing with.
Cold traffic goes to `/accounting` and never sees it. It is a strip, not a section — short
padding, one paragraph, condensed from the deleted longer version rather than rewritten.

Shared: `layouts/BaseLayout.astro` (head, Cal.com embed, skip link), `layout/SiteHeader`
and `SiteFooter`, `common/BookingButton.astro` (every CTA), `common/Icon.astro` (the
hand-drawn icon set), `consts.ts` (BOOKING_URL, nav and footer link data), `lib/svg.ts`
(inlining hero SVGs), `styles/brand-tokens.css` then `styles/tokens.css` then
`styles/base.css`.

**Section order is load-bearing.** 2 must precede 3 — "where AI pays" only means
something to a reader who has just accepted they cannot tell where it pays in their own
business. 3 and 4 carry the argument and get the most space; 5 deliberately does not,
because a demonstration given before the argument is a product demo. 6 sits between the
demonstration and the questions because it is the only section that asks nothing. The
founder strip sits after 6 and before 7: credibility immediately before objections.

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
  plain-language rule. The two exceptions are section 6 and the close, both of which are
  short centred blocks with no list to lose your place in.
- **Icons are inline SVG in the Material Symbols idiom, never the Material Symbols
  font.** The font is a third-party request, which the self-hosting rule rules out and
  which would have to be named on the Privacy page. The set lives in
  `common/Icon.astro`; keep stroke weight around 1.9–2.6 to match.
- Where a section splits into two columns, split it by *content type* — all the prose in
  one column, all the cards in the other.
- **A left-aligned section head in a 1240px container leaves a third of the band empty**,
  and on a full-width band that reads as something failing to load rather than as space.
  Section 2's head is two columns above 900px for that reason — heading left, paragraph
  right, the paragraph running to the same right edge as the cards below it. The media
  query is the exact complement of the centring rule in `base.css`
  (`(min-width: 901px) and (orientation: landscape)`): a portrait tablet centres its
  heading and must not also be holding two columns.
- **Do not animate `<details>` open with `::details-content`.** It was built, measured,
  and it does not merely fail to animate — it stops the FAQ opening at all. Listing
  `content-visibility` in the transition takes the property out of the browser's hands so
  it stays `hidden`; hidden content has no size, `block-size: auto` resolves to 0, and
  every answer stays invisible while `details.open` reports true. Measured on the built
  page: the list stayed exactly 241px tall whether open or shut. The disclosure is left to
  the browser and the chevron rotation is the feedback. See the note in `FaqSection.astro`.

## Mobile is designed, not inherited

The phone layout is not the desktop layout stacked, and the differences are deliberate:

- **The hero CTA must stay above the fold.** Measured at 390×844 it sits at 503–556px.
  The approved subhead is split into two paragraphs at a sentence boundary — same words,
  same order — because nine unbroken lines of lede is what pushed it under.
- **Section 3 is rows on a phone, not cards.** Six full cards is roughly 1,400px of
  scroll; by the fourth the reader has stopped comparing and started skipping, and the
  CTA underneath never gets reached. The terracotta rule moves from the card's top edge
  to its left edge so six items read as one set. Nothing is hidden behind a tap.
- **Section 5 puts the demonstration before the four steps**, which is why its DOM order
  is head, panel, steps, foot with the panel grid-placed into column two on desktop.
- Sections alternate background bands so the scroll has landmarks. On a phone a section
  boundary is otherwise invisible.

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
  and asks when it is not. It does *not* route everything past a person. Any copy that
  says otherwise is inaccurate, on any page. The FAQ answer that broke this rule was
  fixed in the Aug 25 rebuild — see below.

- **The hero SVGs are correct; `docs/page-spec.md` §Section 1's "Visual" paragraph is
  stale.** That paragraph describes an expense-capture pipeline with a "you review"
  step, an *"Example: expense capture"* header and a *"Sample data"* tag. No such
  artwork exists. Build the hero from `assets/hero-desktop.svg` and
  `assets/hero-mobile.svg` as drawn. Do not reconstruct the pipeline the spec describes.

- **Tool logos ship as drawn.** Fredrick's decision, made after the trademark and
  implied-relationship concern was put to him twice. The ten marks in the hero
  illustration stay as they are. Do not re-open this and do not remove them.

## Decided Aug 25 2026 — the rebuild

- **The Applied Intelligence surface system is adopted site-wide.** The page background
  moves from cream `#FEF5E7` to near-white `#FAF9F4`, and cream becomes the alternating
  band colour. This is a change of role, not of value: every section that already painted
  itself `var(--ark-cream)` kept doing so and needed no edit, `/accounting` included.

- **Terracotta is now a UI accent**, amending the brand guide's "illustration only, never
  UI". It carries eyebrows, stepper rails and card rules. It is still never a CTA colour.
  **It ships as two shades and this is not cosmetic:** the issued brand hex `#A8623E`
  fails AA for small text on all four backgrounds the site uses (4.45 / 4.69 / 4.00 /
  4.34) and the design sets eyebrows at 12px. `--ark-terracotta` is scoped to non-text
  marks, where the 3:1 UI threshold applies; `--ark-terracotta-ink #945637` carries text
  at 4.92 worst case. Never set text in the raw hex.

- **`--ark-olive-2` was darkened to `#61702E`.** It failed AA as eyebrow text at 3.44:1
  and was logged as an open item awaiting a decision. The eyebrow role moved to
  terracotta, and the value was corrected for its remaining uses. The old recommendation
  of `#64732F` was *not* used: it still fails at 4.44 against the new stage-green.

- **Section 5 is titled "AI Assisted Expense Manager".** The approved h2, "This one *was*
  expense management.", described a delivered client engagement, which the standing claims
  rule prohibits, and the same problem sat in the body: "For one business, the opportunity
  was expense capture" → "We built this one for expense capture". The heading is a name,
  not a sentence — set as given, capitals included, and the only heading on the page with
  no full stop. The eyebrow above it, "One we built", now carries the sentence the heading
  used to be. The panel is the evidence. Reasoning is in the component header.

- **The page speaks in the first person, and the reader in the second.** Fredrick's
  instruction of Aug 25 2026. Generic third-person references — "most businesses", "the
  client", "the owner", "the bookkeeper", "a business" — are now "we" and "you" wherever
  they described us or the reader. Four sections changed: the hero subhead, the problem
  lede, section 5 throughout, and section 6, whose claim about what other businesses did
  became a statement of how we work (which is also the safer claim).

  **Section 5's four steps deliberately keep AI as the actor.** That is not third person
  left behind. "We read your invoices" and "AI reads your invoices" are different claims
  to a reader deciding who gets access to their email, and the FAQ two sections down
  answers that question directly. First person there would make the page less accurate,
  not more personal.

- **Section 2 no longer opens on failure.** Fredrick's instruction of Aug 25 2026. The
  approved h2 — "AI spending fails when it starts with the technology instead of the
  business case." — told the reader in the first line of the second section that spending
  like theirs fails, which puts them on the defensive exactly where the page needs
  agreement; the lede closed on the same note with "a guess with an invoice attached".
  Both were replaced. The heading is now "AI pays when it starts with your business case,
  not with the technology.", and the lede states the same diagnosis from the other side:
  the hard part is *seeing* three things, and nobody has time to work that out while the
  business is running — which is the standing rule that the reader's admin load is what
  success creates, not evidence of bad management. Nothing is softened. The three cards
  below are unchanged, and the section still carries no CTA.

  **The three things are set in bold inside the paragraph**, and they are the only bold
  run in body copy anywhere on the site. That is the point — they are what the section is
  about, and a reader who reads nothing else in the paragraph still leaves with them.
  They take the display ink as well as the weight, because bold alone does not separate
  enough from body ink at 20px. Do not add a fourth.

  **The lede was rewritten twice.** The first replacement opened "The tools aren't the
  constraint. Three figures are, and they're rarely to hand:" — an ellipsis the reader
  has to reassemble before the sentence means anything, wrapped in two idioms ("to hand",
  and "on faith" at the close). Fredrick's read: it took a few seconds to comprehend.
  That is the plain-language rule doing its job — the risk to a reader whose first
  language is not English is idiom and construction, not vocabulary. Worth applying the
  same test to any new copy: read it once, at speed, and see whether anything has to be
  re-read.

- **The "What happens to my data?" FAQ answer is fixed.** The old line — *"Anything that
  matters still goes past a person before it happens"* — was untrue under the hybrid
  model and was an open launch blocker. The approved replacement is accurate: *"You
  determine what runs automatically and what stops for review, and every step is recorded
  either way."* **This item is closed.**

## Still open — do not guess these

- **Agent naming.** Whether the assistant mark carries a name. Works either way.
- **Analytics provider.** Per-CTA event names are agreed (`hero` / `where` / `proof` /
  `closing` / `nav`, plus the `acc-` prefixed set on /accounting) and typed in
  `consts.ts`. Nothing is wired up. The provider is not chosen, and the choice changes
  the Privacy page.
- **LinkedIn URL.** The copy file specifies `Organization` schema with `sameAs` pointing
  at LinkedIn. The URL is not in the repo and is not guessed — a made-up profile URL is a
  claim about identity. The `sameAs` key is absent until it is supplied.
- **`LocalBusiness` schema.** Named in the copy file, deliberately not emitted. It needs a
  real street address and real hours, and inventing either would be a false claim on a
  page whose whole argument is that we do not do that.

## Quality gates before anything goes live

- Contrast checked on olive-on-cream and white-on-olive; visible focus states on every
  interactive element
- The hero illustration needs a real text alternative. It carries the argument, so
  `alt=""` is wrong — describe what it shows.
- Correct heading order, one `h1`
- Renders at 390 / 768 / 1440
- Every link resolves. No 404s in the footer.
- The brand guide's ten-point pre-publication check
