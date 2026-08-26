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
4. `docs/accounting-page.md` — the approved `/accounting` copy. **Replaced in full on
   Aug 25 2026.** The page it describes is a different page from the eleven-section one
   that shipped before it, and it carries three page rules of its own — no compliance
   content, document collection as one example rather than the offer, and the word
   "agent" nowhere. The old file is in git history
5. `docs/workshop-page.md` — the approved `/workshop` copy. **Replaced in full on Aug 26
   2026, hours after the first version was built**, and the page reworked against it the
   same day. The first copy described the workshop; this one argues for it. It carries its
   own `[CONFIRM]` list of five things Fredrick has to answer before the page is final,
   and two of them are real exposure rather than tidying. The old file is in git history
6. `docs/about-page.md` — the approved `/about` copy, supplied and built Aug 26 2026.
   It carries its own `[CONFIRM]` list; two of the four are already closed
7. **The built pages in `src/`** — for the nine homepage sections, the eight on
   `/accounting`, the seven on `/workshop` and the seven on `/about`, this is the record
   of what was actually shipped, and the component comments carry the reasoning
8. `src/styles/brand-tokens.css` — every colour and type decision

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

- ~~`/workshop`~~ — **built Aug 26 2026. See the section below.**
- ~~`/about`~~ — **built Aug 26 2026. See the section below.**
- **Privacy, Terms, Data Handling** — launch blockers, not polish. CASL needs a privacy
  basis, and the AI Opportunity Fit Form has had an open privacy-notice placeholder since
  July. **All three are linked from the live footer and 404 today**, and the live FAQ
  answer to "What happens to my data?" ends by pointing at the data handling page.
  Unreviewed drafts are in `docs/legal/`. They are drafts, not pages: they must not be
  turned into routes until Fredrick has done a factual review and a Canadian privacy
  practitioner has seen them.

`/accounting` is built and rebuilt — see below. All cold outbound points there, never at
the homepage.

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

## Decided Aug 25 2026 — the /accounting rebuild

`docs/accounting-page.md` was replaced in full on the same day the homepage was rebuilt,
and `/accounting` was rebuilt against it. Eleven sections became eight. Where anything
here contradicts an older line in this file, this wins.

**Three page rules, and they are not style preferences:**

- **No governance, compliance or regulatory content anywhere.** No professional conduct
  rules, no legislation, no privacy law, no compliance framing. The previous build cited
  CPABC's Code, Rule 218 and PIPEDA across a whole section with sourced captions. All of
  it is gone. It made the page read as a compliance vendor rather than a builder, and it
  answered a concern before the reader had it. Data handling is answered once, plainly,
  in the FAQ.
- **Document collection is one example, not the offer.** Earlier drafts described one
  problem in every section, which made ArkSystems look like a document-collection tool.
  Section 3 carries six areas; section 5 shows one and says plainly it is one of several.
- **The word "agent" appears nowhere.** "AI" for the capability, "the system" for the
  built thing. An agent is one delivery format, and naming one makes it the whole
  business.

**Eight sections, in `src/pages/accounting.astro`:**

| # | Section | Component |
|---|---------|-----------|
| 1 | Hero | `sections/accounting/HeroSection.astro` + `hero/PracticeBoardPanel.astro` |
| 2 | The problem | `sections/accounting/ProblemSection.astro` |
| 3 | Where AI earns its cost | `sections/accounting/WhereAiEarnsSection.astro` |
| 4 | Where it stops | `sections/accounting/WhereWeStopSection.astro` |
| 5 | From our build lab | `sections/accounting/BuildLabSection.astro` + `build-lab/DocumentIntakePanel.astro` |
| 6 | Discovery, and what it costs | `sections/accounting/DiscoverySection.astro` |
| 7 | Before you book | `sections/accounting/FaqSection.astro` |
| 8 | Close | `sections/accounting/CloseSection.astro` |

**Seven components were deleted** and are recoverable from git history:
`ActualProblemSection`, `WhatWeBuildSection`, `InPracticeSection`, `HowItRunsSection`,
`FitsWhatYouUseSection`, `DataGoesSection` and `ForYourClientsSection`. The last three
had no equivalent in the new copy; what survives of two of them lives in FAQ answers.
`common/Caption.astro` still exists but is now referenced by nothing — it was built for
the sourced figures the compliance rule removed.

**Section 5's foot runs the full width of the container, under both columns.** It was
two columns inside the copy column, which put a 21px display line, a paragraph and a
button into about 290px each: the closing line took three lines, the paragraph took six,
and the button — a stretched grid item — spread to fill its column and broke its own
label in half. Across the container each half is roughly 600px and nothing wraps to fit.
**`justify-self: start` on that button is not optional**; without it a grid item stretches
to its column and the squashing comes straight back. The row costs no height, because the
panel beside the steps was already taller than the copy column.

**Section 5's demonstration panel is not sticky, and must not be made sticky again.** It
shipped as `position: sticky; top: 104px`, which on a section this short only did damage:
measured at 1280px wide the panel drifted 308px down its column as the reader scrolled,
and its bottom edge finished past the steps it is meant to sit beside, hanging over the
full-width foot. Arriving at the four steps, you found the illustration that explains them
had floated off below, with the top of the right column empty. Sticky is for a short
reference beside a long scroll; here the copy column is 924px against a 694px panel and
the two are on screen together throughout, so there is nothing to follow. `align-self:
center` stays — that part was right. Removing it changed no heights, because sticky never
affected layout.

**Section 5 must not be the tallest section on the page.** The copy file says so, and it
is a real measurement, not a feeling: 3 and 4 carry the argument, and a demonstration
given before the argument is a product demo. It ships at 1178px against section 3's 1192,
held there by the full-width foot above and a 72px band rather than the site's 88.
**Re-measure if a block is ever added to it** — the margin is 14px and the failure is
silent, because a section that outgrows its neighbour just scrolls and looks normal.

**The demonstration panel's badge is the most load-bearing element on the page.** The
copy file calls its build note "the most important instruction in this file": "Working
system · Sample data" sits on the panel itself at every breakpoint, never as a caption
underneath. It is what licenses the sample figures inside the panel. The hero
illustration carries no badge and therefore carries **no figures at all** — a number in
an unlabelled graphic is a claim, and there are no results to claim yet.

**`/accounting` publishes a price and the homepage still does not.** "From CAD $4,000"
sits in section 6 and in the meta description. The value-before-cost rule is scoped to
the homepage; the copy file argues the case for this page and the word "from" is
load-bearing — it sets a floor without promising a ceiling, which is what allows a figure
to be published while the payment schedule never is. Do not tidy "from" out of it, and do
not move the price up the page.

**The workshop is no longer sold or linked from `/accounting`.** The old build ran a
three-step priced ladder there including the workshop at CAD $1,000. Section 6 is now one
paragraph and one button, by instruction. What gets recommended after the call is a
decision made on the call.

**Three claims in the Stitch design export were not built**, and each breaks a standing
rule: "SOC2 compliant infrastructure" (a compliance assurance), "built and running within
4 to 6 weeks" (a delivery timeline), and a "Case Studies" nav item (permanently banned).
None appears in the approved copy — the design tool wrote them. It also rewrote all four
problem blocks as solutions, trimmed section 4's most important line, and rendered one of
the copy file's own build notes as visible body copy. **The design was used for layout
only. The copy file is the copy.**

**Eyebrows appear on sections 1 and 5 only**, which is where the copy file specifies
them. Stitch added four more, each restating the heading beneath it.

**Section 2's head is one column, and its closing callout is what fills the band.** This
is an amendment to the layout rule further up this file — the one that says a
left-aligned head in a wide container leaves a third of the band empty and that section
2's head should therefore be two columns. That was built here and Fredrick rejected it on
sight: the heading sat too high and the single sentence bottom-aligned on the right read
as an orphan rather than as a caption. **It was the wrong fix for the right problem.**
What ships instead:

- the heading is allowed 38ch, so it breaks at the sentence boundary and sets on **two**
  lines rather than three stacked in a corner
- the lede sits underneath it at 52ch, reading as a subheading
- the **closing callout runs the full width of the cards, in two columns** — the
  diagnosis left, the question it raises right. That is the block that fills the band, so
  the heading no longer has to

The homepage's section 2 still uses the two-column head and is unchanged. The rule is not
wrong; it just is not the only way to answer it, and on this page it lost.

**`.section--warm` was added to `base.css`.** An eight-section page runs out of landmarks
across four bands and ends up with two adjacent sections sharing a colour. The value was
already in `brand-tokens.css`.

**`CtaLocation` gained `acc-where`, `acc-proof` and `acc-discovery` and lost
`acc-how-it-runs`**, which named a section that no longer exists.

## Decided Aug 25 2026 — section padding, and one thing that was tried and reverted

**`--ark-section` is 88px, down from 112.** Fredrick's instruction. It is 48px less at
every section boundary and about 400px off the length of an eight-section page. The
sections with their own band padding came down with it: both heroes to 60/76, both closes
to 92, the founder strip to 60, `/accounting`'s section 5 to 76 — it keeps its deliberate
gap below the standard band, for the reason above. **`--ark-section-phone` is unchanged at
64.** It was already at the tight end, and a phone has no spare width to make a band feel
open.

**REVERTED — one section, one screen, and the Bootstrap container.** Both were built, on
instruction, and both came out on the page as a squeeze: giving every section
`min-height: 100vh` forced the tall ones to be compressed to fit, and that compression is
what did the damage — four cards jammed into one row, icons moved inline to save 100px, a
stepper stripped of its labels, a demonstration panel with a row taken out of it. It was
reverted whole on Fredrick's instruction the same day. **Do not rebuild it without a
different approach**: the honest version of "one section, one screen" is less copy per
section, not the same copy in less space. The commit is recoverable from the reflog.

What survived from that attempt, because it was right on its own terms and not a squeeze:
the FAQ removal, section 2's rebuilt head, and the section padding above.

## Built Aug 26 2026 — /workshop

`docs/workshop-page.md` was supplied and the page built against it the same day. It had
been a footer link to a 404 since the site shipped.

**Then the copy file was replaced in full, hours later, and the page reworked against it.**
The first version described the workshop; this one argues for it. Section 2 was rewritten
end to end, its third block changed subject, and it gained a closing line and a concession
it did not have. The hero H1 and subhead, the close heading, the meta description and the
FAQ (six questions became seven) changed with it. Sections 3, 4 and 5 were untouched, as
were both illustrations. What follows describes the reworked page.

**Who arrives here:** someone who has read another ArkSystems page, agrees with it, and
cannot name a single problem to start with. Several candidates, no way to rank them. The
page has to make choosing the workshop feel like the sensible move rather than an
admission that they don't know their own business — which is the standing rule in a
different setting: blame the work, never the owner.

**The job it exists for** is answering the question the free call creates: why pay for a
workshop when the call costs nothing? Because they do different jobs. Discovery examines
one problem already identified; the workshop is for when nothing has been identified, or
when there are six candidates and no way to rank them.

**Seven sections, in `src/pages/workshop.astro`:**

| # | Section | Component |
|---|---------|-----------|
| 1 | Hero | `sections/workshop/HeroSection.astro` + `hero/CandidateBoardPanel.astro` |
| 2 | The problem statement | `sections/workshop/ProblemStatementSection.astro` |
| 3 | What happens on the day | `sections/workshop/OnTheDaySection.astro` |
| 4 | What you leave with | `sections/workshop/LeaveWithSection.astro` + `leave-with/ShortlistPanel.astro` |
| 5 | What it costs | `sections/workshop/WhatItCostsSection.astro` |
| 6 | Before you book | `sections/workshop/FaqSection.astro` — **seven** questions |
| 7 | Close | `sections/workshop/CloseSection.astro` |

**Section 2 is the argument, and the copy file makes its position a build note: the why
comes before the what.** Section 2 argues the value of the decision; section 3 describes
the day. Reversing them turns the page into an agenda — a schedule offered to someone who
has not yet accepted that the day is worth buying. The section has one thing to establish
before anything else on the page can work: **that identifying the right problem is itself
the valuable work.** Until that lands, a workshop reads as a fee charged before the real
work starts. Once it lands, the workshop *is* the work. That is why the section closes on
"what you're buying is the decision, made on evidence" rather than on a summary, and why
the copy file forbids shortening it into a list of features.

**"AI budgets go to the wrong place" in section 2 is a position, not a claim, and the copy
file names it in the claims section.** It carries no figure and no attribution, which is
exactly what keeps it inside the claims rules. **Do not add a statistic to it** — no
percentage, no survey, no "studies show". The moment it acquires a number it becomes a
claim needing a source, and there isn't one.

**Section 2's closing block is two parts at deliberately different weights.** The claim
("finding the right problem… what you're buying is the decision, made on evidence") sets
in the display face; the concession beside it ("if you can already name the one thing
you'd fix, you don't need a workshop") is lighter body, by instruction. At equal weight
the second reads as a retraction of the first. Lighter, it reads as what it is — an aside
from someone confident enough to make it.

**The page argues against its own sale in four places, and this is the thing most likely
to be tidied away by a future edit.** Section 2's closing concession, the first FAQ answer
("if you can name your one problem, skip the workshop"), the second FAQ answer ("some
businesses can, and should… where that combination exists in-house, use it"), and the
close. That concession is the evidence for the claim the page is actually making — that
the ranking it sells is honest. Remove it and the page is a brochure. The second FAQ
answer is the only one naming a genuine alternative rather than a smaller version of the
same purchase; do not qualify it into a reason to buy anyway.

**Four CTAs — `ws-hero`, `ws-day`, `ws-cost`, `ws-closing`. Sections 2, 4 and 6 carry
none**, deliberately: 2 and 4 do recognition and delivery work, and 6 exists to remove
objections rather than to ask. **Every button books the free 20-minute call, not the
workshop.** The Cal.com event behind `BOOKING_URL` is the discovery call, so a button
labelled "Book the workshop" would be false as well as off-message.

**Two illustrations, and they are a pair.** The hero draws the reader's position — five
candidate areas, five identical rows, five identical grey markers, nothing to choose
between them. Section 4 draws the same five after the day: ranked, weighted against each
other, one of them struck through and marked "advise against". The five names and their
order in the source arrays are shared between the two files on purpose, so the reader
recognises their own list. **Change one file and change the other.**

**Neither panel carries a single figure, and neither carries the gold badge.** There are
no delivered workshops to draw numbers from, and a number in an illustration is a claim
whatever the copy around it says — so the hero's bars are all the same length and section
4's carry relative weight only. Section 4's copy promises "an indicative figure" per
candidate in the written document, which is exactly why none appears in the picture: the
panel names the field ("Indicative figure", "Scope", "Reasoning") and never fills it.
Both label pills are quiet and neutral rather than gold, because gold means a system that
genuinely runs shown with sample data, and keeping that badge meaning one thing is what
keeps it worth anything.

**Section 3's scope paragraph is a callout, not body copy.** The copy file marks it "do
not cut", and a paragraph a skimmer skips is cut in every way that matters. It is the
boundary that protects the fee — a day covers one area, agreed before booking — and the
reader who later disputes what the day covered is precisely the one who was skimming. It
runs full width on a terracotta rule. Its FAQ half is "We're a larger business. Is one day
enough?", and the two have to keep saying the same thing.

**Section 5 publishes a price, and "from" is load-bearing on both figures.** "From CAD
$1,000" for the workshop and "from CAD $4,000" for implementation. The value-before-cost
rule is scoped to the homepage; this page has always been the exception that carries its
own. What is still never published is the payment schedule. **The $4,000 figure also sits
in `/accounting`'s section 6** — there is no shared constant for it because it is a
sentence, not a token, so if one changes the other is wrong the same day.

**Section 5's container is the standard width.** It was narrowed to 940px first, which
read calmly alone and wrongly in sequence: every other section starts at the same left
edge, and an inset one breaks the vertical line the eye follows down the page. The real
problem — a left-aligned head leaving a third of a wide band empty — is answered by the
two-column note row underneath, which runs full width and fills it. Same fix
`/accounting`'s section 2 landed on.

**Section 4's closing line takes no `ch` measure.** The border above it is what makes it
read as a full-width closing statement rather than a fifth block, and the border is drawn
on that element — so a measure stops the rule two-thirds across the container, ending
under nothing. It was built at 62ch, seen, and removed.

**Bands run white → cream → surface → white → warm → stage-green → olive.** That is the
only order across seven sections where no two neighbours share a colour, and section 4's
band is white so its stage-green panel reads against it.

**Seven icons were added to `Icon.astro`** — `candidates`, `workflowMap`, `separate`,
`rank`, `effort`, `recommend`, `adviseAgainst`. Two are reused from the older sets rather
than redrawn, and both reuses carry the argument: `benchmark` sits on "nothing has been
measured" and `cost` sits, one section later, on "we put figures against each candidate".
Two more repeat inside the page across a section break — `separate` on "not every
candidate is an AI problem" and again on "we test what AI actually does", the question and
the work that answers it; `rank` on "we rank them" and again on "a ranked shortlist", the
promise and the deliverable. An eighth, `deferred`, was drawn and then removed with the
block it belonged to when the copy was replaced. It is in git history.

**The panel tags use `--ark-muted`, not `--ark-muted-2`.** At 10px they are small text
and need 4.5:1; `--ark-muted-2` measures 3.67 on white and fails. Found by measuring
every text node on the page, not by eye.

**Nav gained "The workshop"**, between Industries and About. The footer already linked it.

**Not linked from the homepage or `/accounting`, by Fredrick's instruction of Aug 26
2026.** The copy file asks for links from the homepage's method section and from every
industry page's offer block. Neither is built — that is a later decision. `/accounting` in
particular stopped selling the workshop on Aug 25, and its section 6 is one paragraph and
one button.

**Five things the copy file flags for confirmation, and they are Fredrick's to answer.**
They are in its own `[CONFIRM]` section and the page ships as written because the copy is
approved. Two are real exposure rather than tidying:

1. **The deliverable.** Section 4 states the document carries an indicative figure per
   candidate. That is the strongest reason to pay for a workshop rather than wait for
   free discovery, and it is only true if that is genuinely what gets produced.
2. **The credit window.** Section 5 states the credit with no expiry. An open-ended credit
   is a liability that never closes. If a window applies it belongs in the proposal, not
   on the page — and this section must not grow a caveat instead.
3. **Delivery timing.** FAQ six says "shortly after the day". Honest as written because it
   promises nothing specific. Do not invent a number: a stated turnaround is a delivery
   timeline, which the claims standard treats the way it treats a result.
4. **Whether the price varies by scope.** Section 5 says the fee follows scope. If it is
   really a flat CAD $1,000 with "from" as cover, that section is inaccurate.
5. **What counts as one area.** Without an internal definition, a client can reasonably
   expect the day to cover everything they mention.

## Built Aug 26 2026 — /about

`docs/about-page.md` supplied and built the same day. It had been a 404 behind the nav
and footer "About" links since the site shipped.

**About is not a biography.** It is the page a reader opens when they are close to booking
and want to know whether the firm behind the argument is credible. The copy file gives it
three questions and tells it to stop: what is this firm, who am I actually dealing with,
and how do they decide what to build. Anything not serving one of those three does not
belong on it.

**The one rule for this page: it speaks as "we" throughout, and Fredrick is named once, in
the third person, written *about* rather than *by*.** That single choice is what makes the
page read as a company with a founder rather than a person with a website. It is also the
thing most likely to drift in an edit — section 3's second paragraph attracts an "I" more
than anything else on the site. It has none.

**Seven sections, in `src/pages/about.astro`:**

| # | Section | Component |
|---|---------|-----------|
| 1 | Hero | `sections/about/HeroSection.astro` — **no CTA** |
| 2 | Why we exist | `sections/about/WhyWeExistSection.astro` |
| 3 | Who you're working with | `sections/about/FounderSection.astro` |
| 4 | How we decide | `sections/about/HowWeDecideSection.astro` |
| 5 | What we don't do | `sections/about/BoundariesSection.astro` |
| 6 | Who we work with | `sections/about/WhoWeWorkWithSection.astro` |
| 7 | Close | `sections/about/CloseSection.astro` |

**One CTA on the whole page, in the close, labelled `about-closing`.** The hero carries
none by instruction: a reader who opens About is verifying, not deciding, and a button at
the top interrupts exactly what they came to do. **If a second CTA ever appears on this
page, something has gone wrong with it.**

**"Metro Vancouver" was removed from all three visible places the approved copy puts it**
— the hero subhead, section 3's fourth chip, and section 6's location paragraph. Fredrick's
decision of Aug 26 2026, taken when the page was planned and he was shown that this copy
restored what the Aug 25 instruction had removed. The **title and meta description keep
it**, same call as the other two pages. Section 6's paragraph **went whole rather than
half-kept**, because trimming it would leave a sentence whose subject had been deleted —
on site relative to what? **One consequence: the on-site-in-the-Lower-Mainland offer
existed only in that paragraph and is now published nowhere on the site.**

**Section 3 is the long version of the homepage founder strip.** The two share their
heading, body paragraph and chips word for word — `sections/home/FounderStripSection.astro`
is the condensed one. **They have to stay in sync**: a change to the years, the products
or the chips is wrong on the other page the same day, and there is no shared constant
because it is prose, not data.

**"A guess with an invoice attached" in section 2 is a phrase that was cut from the
homepage on Aug 25**, where it closed section 2's lede and landed as a diagnosis of the
reader's own spending. It is deliberate here and was flagged before the build: the section
is titled "why ArkSystems exists", the subject is AI investment in general, and nobody is
being told their spending failed. **Do not delete it as a duplicate of the homepage fix.**

**No illustrations, no stepper, no process diagram anywhere on this page** — the copy file
makes it a build note, and it is right twice over: a staged treatment makes the engagement
feel long, and `/accounting` and `/workshop` both already carry one. The founder portrait
is the only image. That means every section has to fill its band without artwork, which is
why 1, 2 and 6 run two-column heads, 4 gives the pull quote its own column, and 5 runs a
2×2.

**The hero's two columns end on the same line, and getting there took two attempts.**
The first build put the subhead in `grid-row: 1 / span 2`, which anchored it to the
EYEBROW rather than the headline: measured at 1440, the subhead started at 147 against the
headline's 185, so the supporting text began 38px above the thing it supports — and the
columns finished 107px apart, leaving a hole under the right one that read as content
failing to load. What ships puts the subhead in row 2 only, beside the headline and never
beside the eyebrow, with `align-self: end` landing its last line on the headline's last
line (measured delta: 0). **The remaining space is at the TOP of the right column, and
that is the point** — a headline that dominates with a paragraph anchored under it reads
as a deliberate stagger; the reverse reads as a shortfall. **The terracotta rule above the
subhead is not decoration**: without it the right column starts in mid-air. It also lands
flush with the eyebrow's baseline, which is what ties the two columns together.

**The hero runs 96/108 padding, deeper than the other three heroes' 60/76.** They each
carry an illustration that gives them height; this one is a headline and a paragraph, and
at the shared padding it measured 405px — the shortest section on the site, which is the
wrong thing for a hero to be. The space is the presence.

**A centred headline wants its subhead block centred too, with the text inside still
left.** That is what `base.css` does for `.section__head .section__lede`, and this hero
now matches it at tablet-portrait widths. **The heroes on `/` and `/accounting` use their
own subhead class and do not** — both sit left-flush under a centred headline at 768.
Pre-existing and flagged rather than changed, since each is a shipped page.

**Section 4's pull quote takes a column, it does not sit under the prose.** The first build
flowed three paragraphs across two CSS columns; three does not divide by two, so the left
column ended a paragraph short and the quote sat under a visible hole. Split by content
type instead — all the prose one side, the quote the other — which is the site's standing
rule for a two-column section.

**Section 2 carries the page's one panel, and it must stay empty.** It shipped first as a
heading and two paragraphs, and Fredrick read the built page and said it looked like
something that could be removed. He was right about the symptom: section 2 makes the
page's only abstract claim — that three figures are missing — and an abstract claim in
prose is the easiest thing on a page to skip. `why-we-exist/ThreeFiguresPanel.astro` draws
those three questions with nothing in the answer slots. **Filling them would not merely be
an invented claim, it would destroy the point** — the picture only means something while
it is blank, which makes it the one panel on the site that can never acquire sample data
behind a badge. It is **not** the process diagram or numbered steps the copy file forbids:
three questions in a list have no order, no arrow and no stage. If a future edit numbers
them 1-2-3 or draws a flow between them, it has broken the rule. The founder portrait is
still the only *image* on the page; this is text and CSS. **The restraint everywhere else
on this page is deliberate — do not read this panel as licence to decorate the rest.**

**`object-position: 50% 15%` on the portrait is doing real work.** `assets/fred.jpg` is a
half-body shot with the face in the upper half — eyes at roughly y=210 of 650. `cover` in
a square box trims 130 source pixels of height, and at the default 50% it takes 65 from
each end, landing the eyes 28% down the circle with the entire lower half suit and tie.
The face sits high and the crop reads as a mistake. At 15% the eyes land near 37%. **The
number is tied to this photograph** — a replacement needs it re-measured, or better, needs
cropping square before it is committed.

**Section 5's four blocks carry no icons**, and that is deliberate. An icon against "We
don't sell a platform" has to illustrate a negative, and a drawn negative reads as a shrug
or as the thing being denied. They are rules and they get a rule: terracotta on the left
edge, text only.

**`assets/fred.jpg` is 520×650, not square.** `object-fit: cover` trims equal strips off
the top and bottom; see the `object-position` note above for why centring them was wrong. `FounderStripSection.astro` on the homepage carries an older comment claiming the
source is square and must be 1:1 — **that comment is wrong and always was**. A replacement
portrait with the subject off-centre vertically will crop badly and no CSS will fix it.

**A section that puts body copy inside a `.section__head` under any class other than
`.section__lede` must set `text-align: left` for itself on phone.** `base.css` centres
everything in a `.section__head` under `(max-width: 900px), (orientation: portrait)` and
un-centres exactly one thing: `.section__head .section__lede`. Section 2 has two
paragraphs, so they live in a wrapper under their own class — and they shipped centred
until it was caught on the built page. Centred prose is harder to read, which matters more
than usual given the plain-language rule.

**Schema: `AboutPage` and `Organization`, with a `founder` node.** The copy file asks for
the Organization block to live here specifically, because this is the page search engines
should read as the entity definition. The homepage's own Organization node stays — they
are per-page nodes describing one entity, not a conflict. **`sameAs` is still absent** on
both; the LinkedIn URL is not in the repo and a guessed profile URL is a claim about
identity. **`LocalBusiness` is not emitted here least of all** — emitting a postal address
in the markup on the one page that just had its location line removed would be incoherent
as well as invented.

**Links out to `/workshop`** (section 4, on "a workshop that ranks them first") **and to
`/accounting`** (section 6, on "there's a page for that"), both as the copy file's SEO
section asks. This does not conflict with the Aug 26 instruction against linking the
workshop from the homepage and industry pages — `/about` is neither.

**Two `[CONFIRM]` items are closed, two are Fredrick's.** Closed: the founder portrait
exists and was already live; the on-site radius is moot by removal. Open: the team
language — "we" and "the people who build your system" while naming one founder, which is
defensible as written either way — and whether FoodyGuru and YoseeAI are still safe to
name. Both are already true of the live homepage, so this page adds no new exposure on
either. **"Founded and shipped" is deliberately unarguable and must not be inflated** —
anything stronger invites a question the page cannot answer.

## Standing instruction, Aug 25 2026 — no location lines

Fredrick's instruction: the line "Based in Metro Vancouver, working remotely across
Canada." and everything like it comes off the site. Removed from five places, and they
travel together — do not restore one alone:

- the homepage close, under the CTA
- the homepage founder strip, where it was one of four chips (three now)
- `/accounting`'s hero trust line, where it was the first of three items (two now)
- `/accounting`'s close, under the CTA
- `/accounting`'s FAQ question "Do you work outside British Columbia?", **removed with its
  answer** — the answer *was* the line, and a question with nothing behind it is worse
  than no question

A second FAQ question went at the same time, for a different reason: **"We already use
Dext and Karbon. Why would we need this?"**, removed on instruction. Worth knowing what it
cost — its answer opened "Often you wouldn't, and we'll say so", which was the only place
on the page arguing against the sale, and the only place naming a product a reader may
already be paying for. **Four questions ship, not six.**

The homepage meta description lost the same sentence. **Three survivors, and Fredrick
confirmed them on Aug 26 2026:** the title tags read "…| Vancouver BC", "…| ArkSystems
Vancouver" and "AI Opportunity Workshop | ArkSystems Vancouver". His instruction was to
remove Vancouver everywhere except the metas, and a `<title>` counts as one — it is a
search-targeting string rather than a sentence on a page, and the local queries are real.
**No sentence on any page names a location. This is settled; do not re-open it.**

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
