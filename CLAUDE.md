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
- **Privacy, Data Handling and Terms** — **all three built Aug 26 2026 and HELD ON A
  BRANCH, not merged.**
  See the section below. They exist as routes now, but nothing is live: the three copy files
  Fredrick supplied all head themselves "Do not publish as written", and the standing rule
  that a Canadian privacy practitioner has to see them first is unchanged. Every fact inside
  the page copy is now confirmed; the review is the only thing outstanding.
- **All three are linked from the live footer and 404 today**, and that is still true —
  merging the branch is the single change that closes the last three 404s on the site. CASL
  needs a privacy basis, and the AI Opportunity
  Fit Form has had an open privacy-notice placeholder since July; closing that placeholder
  is Fredrick's action on the day `/privacy` goes live, not a repo change.

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
left.** That is what `base.css` does for `.section__head .section__lede`. It was built
here first and **all four heroes now match it** — see the section below.

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

## Fixed Aug 26 2026 — hero alignment in portrait, all four heroes

Every hero now obeys one rule at `(max-width: 900px), (orientation: portrait)`: **the
block centres, the text inside it does not.** Built on `/about` first, then applied to
the two shipped pages it had been flagged against. Measured after the fix, every hero
element on all three pages centres on the viewport centre line — offset 0 at 768, and at
1024 portrait.

What was actually wrong, and they were two different faults:

- **`/` had a left-flush headline.** `.hero__title` got `text-align: center` and no
  `margin-inline: auto`, so a box carrying a 15ch measure sat hard left and centred its
  lines inside its own left-hand third. Measured at 768: headline 18–384 against a
  subhead at 215–553 — two centred blocks on two different centre lines, and the headline
  is the biggest thing on the screen. The subhead was already right.
- **`/accounting` had left-flush body.** The mirror image: the headline centred at
  212–556 with both subhead paragraphs and the CTA note flush left at 18 beneath it, and
  the trust line centred again below those. Centred, left, centred, down one column.

**The auto margin belongs in the same media query that centres the headline**, so the two
can never disagree. `/about` shipped with its subhead's auto margin in the `(max-width:
900px)` block instead, one query narrower than the rule that centres its title — which
left a 1024-wide portrait tablet centring the headline and setting the 62ch subhead flush
left underneath, the exact fault the rule exists to prevent. Moved, and that is the only
change `/about` needed.

Unaffected, and checked rather than assumed: 390 (the homepage hero CTA still measures
503–556, which is the above-the-fold number this file records), 1440 landscape on all
three, `/about`'s two-column hero (bottomDelta still 0, hero still 445px), and
`documentElement.scrollWidth` at every width. At 390 the blocks are already wider than
the column, so the auto margin changes nothing there.

**The homepage hero now stacks at 1100, not 900**, matching `/accounting`. Between those
two widths the copy column is about 410px — narrow enough that the portrait rule centres
its text inside a column standing beside an illustration, which reads as neither a centred
hero nor a two-column one.

Three things that fell out of it, and each is a trap worth knowing:

- **`width: 100%` is load-bearing next to `margin-inline: auto` on a grid item.** An auto
  inline margin beats `justify-self: stretch`, so the box drops to shrink-to-fit — and an
  inlined hero SVG has had its intrinsic width stripped, so there is nothing sensible to
  shrink to. Measured without it: a 356px stage holding a 300px illustration, centred in
  an 848px column. The same fix was needed on `/accounting`'s `.hero__visual`, which had
  been sitting 520px hard left in that column since it shipped — its base
  `justify-content: center` only ever centred the panel *inside* the box, never the box.
- **The stage cap is 620px and it is a measurement, not a taste.** At 1440 the stage
  renders at 618 with the desktop SVG at 562 inside it, so stacked the artwork comes out
  the size it already ships at and the label-readability rule further up this file is
  untouched. The cap sits on the FIGURE, not the stage: the caption is right-aligned to
  the artwork, so on the stage alone it would run the full container and end nowhere near
  the picture it labels. The desktop variant stays on screen down to 900 — the mobile
  emblem is drawn for a phone and looks sparse across a tablet.
- **Both hero CTAs centre by flex, in the PORTRAIT query, not with the 1100 stack.** A
  button is not a block of text, so an auto margin does nothing for it. The query matters:
  between 901 and 1100 in landscape the hero stacks but nothing centres, and a centred
  button under left-aligned copy is the same fault pointing the other way. On
  `/accounting` it has to be `flex-direction: column`, because that wrapper holds the
  button *and* the note, unlike the homepage's where the note is a sibling — a row put
  them side by side, note 196px right of centre beside a button still hard left.

Re-measured after all of it: 1440 byte-for-byte unchanged (inner 688, copy and figure 618,
art 562×546, hero 824), 1000 landscape stacked and left-aligned throughout with only the
illustration centred, 768 unchanged, 390 with the hero CTA at 502–555 and the stage still
edge to edge. `documentElement.scrollWidth` equals the viewport at every width on both
pages.

## Built Aug 26 2026 — /privacy, /data-handling and /terms, HELD ON A BRANCH

`docs/legal/privacy.md`, `docs/legal/data-handling.md` and `docs/legal/terms.md` were all
supplied by Fredrick on Aug 26 2026, replacing the unreviewed Aug 24 drafts of the same
names. All three pages were built against them the same day, on `feat/legal-pages`.

**Nothing is merged and nothing is live.** All three copy files head themselves *"Draft for
review. Do not publish as written"*, and Fredrick's decision when they were planned was to
build and hold. The footer links all three and all three still 404 in production.
**Merging the branch is the single change that closes the last three footer 404s.**

**There is no draft notice on these pages.** One was built — a gold callout shown while any
fact was still unknown — and it came out on Fredrick's instruction once the last fact
landed. Worth being explicit about what that did and did not change: **it was never the
safeguard.** What it did was make the state visible to anyone who opened a page early, and
with it gone **there is no on-page indication that these have not been reviewed.** If they
are ever merged before the practitioner sees them, nothing on the page will say so.

**Two defences, and neither is the hold either.** All three pages set `noindex`, and
`astro.config.mjs` filters all three out of the sitemap — a sitemap entry and a `noindex`
tag are contradictory signals about the same URL, and sending both is how a page nobody
meant to publish turns up in a search result anyway. **When the review clears, the filter
and all three `noindex` flags come off in the same change.** A page reachable from the
footer is public whether or not a crawler indexes it; the branch is the hold.

**Facts live in `src/lib/legal.ts`** and render through `legal/Pending.astro`, which shows
a `null` as a visible marked blank rather than a silent gap. **A plausible invention is
worse than an obvious blank on these three pages**, because a blank is visible and an
invented incorporation jurisdiction is not. **Every fact is now filled**, so nothing renders
as a placeholder; the mechanism stays because the values are worth holding in one
documented place, and because nulling one puts its blank straight back on the page.

**All six were answered by Fredrick on Aug 26 2026, and three of them by deleting rather
than filling.** That is these pages' own rule applied to themselves — where a practice is
not settled, the line comes out rather than being softened:

| Fact | Answer |
|---|---|
| Jurisdiction of incorporation | **British Columbia.** Renders on `/privacy` and `/terms` |
| Access-removal window | **Five business days.** A commitment a client can hold us to, so it is the window we would always meet rather than a best case |
| Payment provider | **None.** No third-party processor is in the path, so the row came out of both provider tables. A stronger position, not a gap — one fewer provider holding client information |
| Password manager | **Not named**, so its row came out — **and the sentence claiming credentials are held in one came out with it.** Half a claim is worse than neither: the page would have been describing tooling it could not name |
| Backup window | **No separate backups** beyond what Google Workspace holds natively, so the bullet came out |
| Privacy Officer | **Fredrick Cyril.** PIPEDA wants a named individual; `/privacy` section 11 |

**Two consequences worth knowing, both flagged at the time:**

- **The page no longer says where credentials are held, only where they are not.** A
  practice running a vendor assessment asks that directly, and it now gets answered on the
  call. If a password manager is adopted, **the sentence and its table row come back
  together** — one without the other is what was wrong in the first place.
- **The 90-day deletion commitment now stands alone.** The copy file paired it with a
  backup window deliberately, because the two run in sequence and merging them understates
  the outside figure. With no backup bullet there is nothing to pair, which is a stronger
  claim — **worth the practitioner confirming against Google Workspace's own trash and
  admin-recovery behaviour**, which is not the same as nothing.

**Four departures from the approved copy on `/privacy`, two on `/data-handling`**, each
recorded in full in the page's own header comment. The two that matter:

- **No location lines.** Both drafts print "Metro Vancouver, British Columbia, Canada" in
  their entity and contact blocks. Fredrick was shown that a privacy policy is arguably the
  one legitimate exception — PIPEDA wants an identifiable contact, and a policy naming no
  jurisdiction is weaker as a legal document — and chose to apply the Aug 25 rule literally.
  Email only. **One consequence: the entity's jurisdiction is now published nowhere on the
  site**, and a larger prospect running a vendor assessment may ask for it directly.
- **`/privacy` sections 2 to 5 describe the site as it actually is.** The draft was written
  against a build spec — cookie banner, Google Consent Mode v2, GA4, Meta Pixel, LinkedIn
  Insight Tag, Google Ads — none of which exists. Publishing "we use Google Analytics, Meta,
  LinkedIn" while none is installed is a false statement on a privacy page. **Measured in
  the browser rather than assumed:** `document.cookie` empty, localStorage and
  sessionStorage empty, exactly two resource hosts (ours and `app.cal.com`), one third-party
  script, fonts served from our own domain. **Re-measure before every release** — the moment
  a tag is added that section is inaccurate, and it is the kind of inaccuracy nobody
  notices. The cookie-banner spec in the copy file remains the plan and is a separate job;
  it also settles the open analytics-provider question when it lands.

**Cal.com is named in `/privacy` section 2, not only section 1.** `BaseLayout`'s own comment
requires it: `embed.js` loads from `app.cal.com` on every page view, before anyone clicks
anything. Section 1 says what booking sends them; section 2 says what merely opening a page
sends them. Only the first was in the draft.

**Section numbering on `/privacy` is load-bearing.** The document cross-references itself by
number — "the address in section 11", "the table in section 5". Sections 2 and 3 lost
content to the departure above and **kept their numbers for that reason.** Renumbering means
re-reading every cross-reference.

**No `mailto:` on either page.** The standing rule is that none remains anywhere on the
site. A displayed, monitored address is still an accessible contact route, which is what
PIPEDA asks for — the requirement is that someone can reach you, not that a click opens a
mail client.

**Two things Fredrick has to verify beyond the six blanks**, both flagged in the page
headers. The safeguards list in `/privacy` section 8 — the copy file's own note says every
measure listed must actually be in place and that an unmet security claim is a worse
exposure than a shorter list. And `/data-handling`'s retention commitment, *"we do not
retain client operational data after an implementation"*, which is the strongest and most
quotable line on the site and has to hold literally.

**`/data-handling` carries a never-claim list** that is not style guidance: no
certifications (no SOC 2, no ISO 27001 — the same invented claim a design tool tried to put
on `/accounting`), no guarantee of security, no insurance claim until a policy is bound, no
blanket no-training promise, no client names. All five are in the page header.

### /terms specifically

**Section 10 is why this page can ship before the engagement agreement exists.** It says a
signed engagement agreement takes precedence over these terms wherever the two differ, so
publishing now creates no conflict with whatever that document eventually says. **If
section 10 is ever trimmed as boilerplate, that stops being true.**

**Section 3 is the commercially important one and must not be trimmed either.** The site
publishes two figures — from CAD $1,000 on `/workshop`, from CAD $4,000 on `/workshop` and
`/accounting`. Section 3 is what keeps a published figure from being treated as an offer
capable of acceptance. Most small-firm website terms do not need it; this one does.
**Section 3 and the pricing copy have to stay in step** — if a page ever drops the word
"from", publishes a payment schedule, or names a figure for a specific deliverable, this
section stops covering it. "From" is load-bearing on the pricing pages for a commercial
reason and load-bearing here for a legal one.

**Section 12's governing-law clause is NOT a location line and must not be stripped as
one.** "Governed by the laws of the Province of British Columbia" names the law that
applies; it is not a sentence about where the business sits. Removing it would not tidy a
location line, it would delete the governing law and leave the document without one. The
no-location rule is about how the site describes itself to a reader. Verified on the built
page: the governing-law clause is present and "Metro Vancouver" appears nowhere in any of
the three.

**Everything else `/terms` raises is a question for counsel, not a hole in the copy** —
whether a liability cap belongs in section 9 or only in the engagement agreement, whether
disputes should match the engagement agreement's mechanism rather than section 12's BC
courts, and whether BC's *Business Practices and Consumer Protection Act* is confirmed not
to apply to business-to-business work. None changes what is on the page today.

### The design — rebuilt the same day, and this is the version that stands

**The first build dressed these pages like sections of the marketing site** — a cream
header band, an eyebrow, terracotta rules above every heading, callout cards, a left-flush
column. Fredrick rejected it and pointed at `meshroad.com/privacy-policy` as the pattern he
wanted: **a regular legal page, with our colours and our two typefaces and nothing else
borrowed.** He was right, and the reason is worth keeping. A policy page is not a section of
the argument, and dressing it like one makes it look like it is selling something — the
exact opposite of what these three exist to do.

What the reference actually does, **measured at 1440 rather than eyeballed**: a centred
816px column, a 32px centred title, 18px body, section headings set at body size in bold.
No bands, no rules, no cards, no eyebrow. `components/legal/LegalDocument.astro` follows
that shape.

**The column is centred at every width, not only in portrait.** That is the deliberate
difference between these pages and every other page on the site. The marketing pages start
at a shared left edge because the eye follows a vertical line down a scroll and an inset
section breaks it — the reason `/workshop`'s section 5 was widened back to the standard
container. A document has no such line to hold: it is one column read top to bottom, and
the convention every reader already knows is that it sits in the middle of the page.

**The measure is 83ch and the number alone tells you nothing.** `ch` is the width of a
zero, which in Source Sans 3 at 17px is 8.45px against an average lowercase character of
7.93px — so a `ch` measure always yields more characters per line than its number suggests.
Measured on the built page: 83ch gives a 665px text column setting **84 actual characters
per line**, against the reference's roughly 96. Wider than the classic 60–75 deliberately,
because a policy page is scanned for one clause as often as it is read through; narrower
than the reference deliberately, because 96 is past where the eye loses the line return.

**One column, and no sidebar table of contents.** A legal document cross-references itself
by section number, which a two-column layout breaks, and a fourteen-item sidebar is more
furniture than the reference carries.

**Tables scroll inside their own `overflow-x: auto` box with `max-width: 100%` on the
scroller.** Measured at 390: a 473px table inside a 354px box, with
`documentElement.scrollWidth` still exactly 390 on all three pages. The table's own children
report as past the viewport edge and that is correct — the scroller clips them.

**Verified on all three pages after the rebuild:** one `h1` each, correct heading order
(12 sections on `/privacy`, 9 on `/data-handling`, 14 on `/terms`), no contrast failures at
either size threshold, no `mailto:` anywhere in `dist`, `noindex` on all three, the column
and title sharing a centre line at 390 / 768 / 1440, and no horizontal overflow at any of
them.

## Built Aug 27 2026 — analytics, consent and conversion

Built from `claude-code-brief-analytics-consent.md` v2.0. **On a branch, not pushed.**

**The rule the whole release exists for:** tags and banner ship in the same deploy, or
neither ships. There is no partial push. The Privacy page describes what loads; the
moment a tag ships without a working banner, the page describes a mechanism that does
not exist.

**Architecture, settled in the brief and not reopened:** direct gtag, no Tag Manager;
hand-rolled consent in the repo, no third-party consent product; GA4, Microsoft Clarity,
Meta Pixel; LinkedIn and Google Ads as inert slots; accept-only banner; three categories.

**Six files, and the split between them is the design:**

| File | Job |
|---|---|
| `lib/consent.ts` | Categories, the stored record, staleness. What consent *means* |
| `lib/tags.ts` | The registry. One entry per tag, four members each |
| `lib/consent-gate.ts` | Joins them. Four lines of decision and no knowledge of its own |
| `lib/analytics.ts` | CTA events and the booking conversion |
| `consent/ConsentBootstrap.astro` | Consent Mode defaults, inline, first in `<head>` |
| `consent/ConsentManager.astro` | Banner + panel + the wiring |

**Adding a sixth tag must be one registry entry plus an identifier in `consts.ts`, with
no change to the gate.** If adding one requires editing `consent-gate.ts`, the entry is
wrong, not the gate. That is the whole point of the registry and it is the thing most
likely to be eroded by a hurried addition.

**`load()` and `clear()` must both be idempotent, and each tag owns its own `injected`
flag in a closure.** That is what lets the gate carry no bookkeeping: it calls `load()`
for every granted category and `clear()` for every denied one, every time, and cannot
disagree with itself about what it already did. The flag is also what makes a re-grant a
*resume* rather than a duplicate page view — GA4 clears Google's `ga-disable` flag, Meta
calls `consent grant`, neither re-initialises.

**`clear()` is not a formality and its limit is real.** It revokes at the provider, sets
whatever disable flag exists, and deletes first-party cookies across every domain variant
— a cookie is name AND domain AND path, and analytics tags set theirs on the registrable
domain with a leading dot, which the naive one-line deletion misses. What no page can do
is unload a script already executed; it is gone on the next navigation because the gate
never loads it again. Third-party cookies on `clarity.ms` and `linkedin.com` are not ours
to delete. All of this is stated in the file rather than left for someone to discover.

**The `<noscript>` Meta pixel is deliberately not built.** Meta's standard snippet ships
an `<img>` that fires the moment the document parses. There is no way to gate an image in
markup — it would put a request to Meta on the page of someone who has consented to
nothing, which is the one thing this release exists to prevent. Its only purpose is
counting visitors with JavaScript disabled, who cannot be shown a banner either.

**Advanced matching is off in code as well as in Events Manager**: `fbq('init', id)` with
the ID alone. A second argument is how it is turned on, and it sends hashed email
addresses. Do not add one.

**Clarity is gated by absence, not by a signal.** It takes no part in Consent Mode. Before
consent its script is not on the page, and a script never fetched cannot record.

### The booking conversion

`Cal("on", { action: "bookingSuccessfulV2" })`, attached in `ConsentManager` rather than
beside the embed, because it needs consent state and must run after the embed's inline
script has made `window.Cal`. The module is deferred and that script is inline, so the
order is guaranteed rather than hoped for.

**THE CALLBACK TAKES NO ARGUMENT AND THAT IS THE POINT.** Cal.com's payload carries the
booking UID, title, times, event type and video URL, and **the title normally contains the
attendee's name**. The callback cannot read the payload by accident. Both events —
`booking_completed` to GA4 and `Schedule` to Meta — are sent with no parameters at all.

**Four known limits, all accepted, none of them bugs:** no fire on the `<a href>` fallback
(that booking happens on cal.com), none for a visitor who never accepted, none on
reschedule (a Cal.com issue), and the event name is versioned and has changed once — check
the current name before concluding the listener is broken. The first two undercount, which
is the safe direction. **Cal.com's dashboard stays the source of truth for how many calls
were booked**; GA4 and Meta answer which traffic produced them. The numbers will not match.

### CTA events — one event name, fifteen parameter values

`cta_click` with `cta_location`. **The fifteen labels are parameter values, not GA4 event
names, and the hyphens are why** — a GA4 event name cannot contain one, so fifteen event
names would have meant inventing fifteen spellings that do not match `CtaLocation` in
`consts.ts`, and that list would stop being the record of what the site's own buttons are
called. Binding is delegated on `[data-cta]`, which `BookingButton.astro` already rendered
on every instance — so a new CTA is counted the moment it is added, and a CTA cannot be
added *without* a label because the component requires the prop.

**It costs one piece of GA4 account setup:** `cta_location` must be registered as a custom
dimension before it appears in reports. It shows in DebugView immediately without that.

### Analytics is locked on — Fredrick's instruction, Aug 27 2026

Given twice and confirmed against the consequence: **analytics is treated as necessary, it
loads on the first page view before any interaction, and it cannot be switched off.**
`analytics_storage` therefore defaults to `granted`; the three advertising signals still
default to denied.

**What that cost, recorded so it is not re-litigated or quietly undone:**

- **The approved banner copy had to be edited**, which the brief's section 5.3 otherwise
  forbids. The close now names the two categories that can actually be turned off and adds
  "Analytics is always on." Everything else — opening, purposes, all five provider names,
  the Privacy Policy reference — is untouched. **This copy has not been re-approved.**
- **`CONSENT_COPY_VERSION` was bumped to `2026-08-27.2`** in the same change, so every
  record stored against the earlier wording is stale and those visitors are asked again.
  That is the mechanism working as designed.
- **`/privacy` sections 2, 4, 5 and 7 were rewritten.** The Aug 26 version said there was
  no analytics service and no cookies of our own — measured and true that day, and false
  in one deploy. See the page header.
- **The panel still shows the Analytics row**, locked, disabled, marked "Always on". **Do
  not remove it to tidy the panel down to two working toggles** — a category that loads
  without asking and is disclosed nowhere is the failure this release exists to prevent.

**`withLocked()` in `consent.ts` is the single enforcement point.** Every state reaching
the gate passes through it — panel, Accept button, storage, baseline — so a stored `false`
from an older record or a hand-edited localStorage entry cannot switch analytics off.
Verified by tampering with storage and reloading.

**`disabled`, not `readonly`, on the locked control.** `readonly` does nothing to a
checkbox — it is the one input type the attribute does not apply to, which is a quiet way
to ship a control that looks fixed and is not.

**One consequence, flagged at the time and still open:** GA4 sets a persistent identifier
on visitors who have agreed to nothing. That is the item a Canadian privacy practitioner
is most likely to raise, and those three pages are still awaiting that review.

### Verified locally, and what was not

Run against `astro preview` on the built output, not the dev server — **Vite served stale
component CSS after an edit and the "Always on" pill appeared unstyled in the browser while
being correct in `dist`.** Verify visual work against the build.

Passing: nothing but Cal.com and GA4 before Accept, with Meta and Clarity absent from the
DOM and `ad_*` denied; all four signals flip on Accept and the consent key is written with
state, timestamp and version; the two inert slots make no request; CTA events carry exactly
one parameter, confirmed on the wire as `en=cta_click&ep.cta_location=proof`; each toggle
isolates correctly and deletes only its own cookies; consent persists across navigation with
one `config` and one `page_view`, no re-prompt, no double firing; every domain observed has
a row in the `/privacy` table; 390 / 768 / 1440 with `documentElement.scrollWidth` equal to
the viewport at each; **the hero CTA still measures 502–555 at 390×844 and the banner sits
below it at 584**, so the above-the-fold rule survives; visible 2px olive focus ring on
keyboard focus.

**Not verified, and not marked passed:** Escape-to-close and Enter-to-activate. Trusted key
events reach the right target — confirmed, `isTrusted: true` — but the browser's native
default actions do not run under this automation, so a native `<dialog>` opened with
`showModal()` stayed open on Escape and a focused `<button>` did not activate on Enter.
Both behaviours are the browser's, not code in this repo, and `:modal` was confirmed true.
**They need one pass in a real browser.** Also outstanding: Meta Pixel Helper, the Clarity
dashboard and its masking check, and a real test booking.

**Microsoft Clarity's row was checked on Aug 28 2026, and the check is worth keeping.**
The brief said confirm the processing region from Clarity's terms and do not assume it
matches the others. It was right to. **Microsoft publishes no region for Clarity** — its
FAQ asks "Where is my data stored?" and answers "Your data is stored in the Microsoft
Azure cloud service", with no country and no data-centre commitment. The only jurisdiction
the document names is Microsoft Corporation "(in the United States)", as the US affiliate
EU customers' data reaches under SCCs; we contract with that entity directly. The row
therefore reads United States as **the contracting entity's jurisdiction, not a
data-residency guarantee** — Microsoft could serve Clarity from another Azure region
without contradicting anything it has published. Know that difference before repeating the
row to a client. The cross-border paragraph under the table is what actually carries this,
and it holds whichever region it turns out to be.

**The Clarity retention sentence was wrong on first write and was corrected from the same
source.** It said only favourites are kept past 30 days. Microsoft's own wording: "Favorite
recordings **and randomly selected sample of recordings** are retained for up to 9 months."
The nine-month tail is not something we choose, and copy implying it was understated it on
the one page that must not. Heat maps, also nine months, were added at the same time. **The
brief's own summary of Clarity retention was the source of the error** — worth remembering
that a build brief is a summary, and the provider's documentation is the record.

## Built Aug 28 2026 — /contact

Built from the approved build brief. **On a branch, not pushed.** The route did not
exist and the footer's "Contact" link pointed at `BOOKING_URL`, so two footer entries
resolved to the same calendar — a reader looking for a way to *write* was sent to a
booking page. That is the bug this page exists to fix, and the footer was repointed in
the same change.

**Five sections, in `src/pages/contact.astro`:**

| # | Section | Component |
|---|---------|-----------|
| 1 | Hero | `sections/contact/HeroSection.astro` — **no CTA** |
| 2 | The two routes | `sections/contact/RoutesSection.astro` + `routes/ContactFormPanel.astro` |
| 3 | What to expect | `sections/contact/WhatToExpectSection.astro` |
| 4 | Where we are | `sections/contact/WhereWeAreSection.astro` |
| 5 | Close | `sections/contact/CloseSection.astro` |

Bands run white → cream → surface → warm → olive. The hero runs 96/108 like `/about`'s,
not the illustrated heroes' 60/76 — it is a headline and a paragraph with no artwork, and
at the shared padding it would be the shortest section on the page.

**TWO STANDING RULES ARE BENT HERE, both on Fredrick's decision of Aug 28 2026, taken
after the conflicts were put to him with the repo evidence. Both are SCOPED TO THIS PAGE
and neither is a general reversal:**

- **The `mailto:`.** No other page has one; `/privacy`, `/terms` and `/data-handling` all
  print the same address as plain text, and that rule came from the old site whose
  mailto: links were broken. **Those three pages are unchanged.** The address is its own
  link text, which is what satisfies the brief's "visible text as well as a link" — a
  mailto: fails silently on webmail or a phone with no mail app, and because the visible
  text *is* the address, that visitor can still read and copy it. **Never replace the link
  text with "Email us"** — that is the exact failure the brief guards against.
- **The location paragraph in section 4.** It restores, almost word for word, the sentence
  deleted from `/about`'s section 6 on Aug 25 ("…on site within the Lower Mainland where
  the work benefits from it"). The reasoning: a contact page is the one page where "where
  are you?" is the reader's actual question, and the on-site Lower Mainland offer had been
  published nowhere since Aug 25. **The homepage close, the founder strip, `/accounting`'s
  hero trust line and close, and `/about`'s sections 1, 3 and 6 all stay as they are — do
  not restore any of them on the strength of this one.** `/about` no longer says where the
  business is and this page does: a known asymmetry, not an oversight.

**Still forbidden, and the brief makes all three page rules:** no contact form, no phone
number, no street or mailing address. The form is the one most likely to be helpfully
added — it would be more build, more spam, and a new personal-information collection point
`/privacy` would then have to describe. Its absence is also what keeps session recording
cheap to justify under the analytics brief's standing note. **No `LocalBusiness` schema
either**, for the same reason as everywhere else: it needs a real postal address and real
hours.

**Two CTAs, `contact-hero` and `contact-closing`.** Both fire the same `cta_click` event
with the position as a parameter — no new event name, which the brief asks for explicitly.
**`contact-hero` is the button in SECTION 2, not section 1**: the hero carries none because
section 2 begins immediately below it, and two identical buttons 200px apart read as
insistence rather than as an offer. **The email address carries no CTA label at all** — it
is a link rather than a button so it does not read as a second competing action, and
counting it would undo that distinction in the reporting as well as on the page.

**The two panels are the same width and the same card, and the difference is only the
control.** The h1 promises *two* ways; demoting the email panel visually would contradict
the headline. `margin-top: auto` on the button wrapper is what keeps the two bottom edges
level whatever the copy does.

**`overflow-wrap: anywhere` on the email address is load-bearing.** An address is one
unbroken token; at 390 it would otherwise push its card wider than the viewport, and a wide
child widens `documentElement.scrollWidth`, which iOS Safari answers by widening the layout
viewport and scrolling the whole page sideways.

**Section 3's third block is CASL work, not decoration** — the visible statement that
emailing us does not become implied consent to be marketed at. **Do not cut it for length**,
and its `/privacy` link must resolve. **"Usually within one business day" is the resolved
wording**, not a hedge left in by accident: a hard commitment is a promise broken by one bad
week, and the standing rule is to make no claim needing a disclaimer. Do not tighten it.

**Section 3's blocks carry no icons.** Two of the three are promises about what we will
*not* do, and an icon against "no sales follow-up" has to illustrate a negative — which
reads as a shrug or as the thing being denied. Same call as `/about`'s section 5.

**No sitemap change was needed.** `@astrojs/sitemap` includes every page by default and the
filter only excludes the three legal drafts, so `/contact` appeared automatically. Verified
in the built sitemap rather than assumed.

**Verified on the built output:** one `h1`, correct heading order, hero `bottomDelta` 0 at
1280, panels equal height, email renders as `mailto:hello@arksystems.ca` with the address as
its own visible text, `/privacy` link resolves, no contrast failures at either threshold,
visible 2px olive focus ring on both new links via a real Tab press, and 390 / 768 / 1440
with `documentElement.scrollWidth` equal to the viewport at each — at 390 the widest element
on the page is `<html>` itself. **Every footer link resolves**; the brief's flagged "What
happens when you book" link does not exist in this build.

### Rebuilt the same day to the supplied design — this is the version that stands

**The page is now two sections: a hero, and one fused card.** Fredrick's instruction of Aug
28 2026 was "design the page only with these contents", against a full design. The brief's
five-section page became the design's two.

| # | Section | Component |
|---|---------|-----------|
| 1 | Hero | `sections/contact/HeroSection.astro` |
| 2 | Form + Direct Lines | `sections/contact/ContactSection.astro` + `routes/ContactFormPanel.astro` |

**Four components were deleted** and are recoverable from git history: `RoutesSection` (built
twice — two cards, then a fused card with a booking pitch), `WhatToExpectSection`,
`WhereWeAreSection` and `CloseSection`. **What went with them matters more than the count:**

- **"What happens after you write" carried the CASL block.** The short version survives as
  one line under the submit button — **which the design does not show and which was built
  anyway.** It is now the page's only link to `/privacy` at the point of collection, and
  dropping it would have been a compliance regression rather than a simplification.
- **The close carried the second booking CTA and the tagline.** The tagline moved into the
  Direct Lines panel, so it still appears twice on the page — panel and footer, its
  established count.
- **"Where we are" carried the location paragraph.** Direct Lines now carries it, so the
  scoped exception to the no-location rule still stands.

**THE PAGE HAS NO BOOKING BUTTON, and that is the largest consequence of the design.** The
site's stated job is getting a visitor onto a 20-minute call; on every other page a button
does that. Here the only route to the calendar is the header's "Book 20 minutes", which is on
every page and stays visible on a phone. **`contact-hero` and `contact-closing` were deleted
from `CtaLocation`** — nothing renders them, and that list is meant to be the record of what
the site's own buttons are called.

**Three brief rules were overridden on instruction, and each had a reason attached:**

1. **Four fields, not three.** The brief says three and "do not add company"; "Practice Name"
   is that field. **It is the one field not marked required**, which is the cheapest way to
   keep the submission cost down.
2. **The message label names a firm** — "…in your firm right now?". `/contact` is the general
   contact page and the site's audience is businesses at roughly $500k–$5M, most of which are
   not firms. A reader who is not a firm has to translate the question before answering.
   Flagged, built as drawn.
3. **The submit button is primary fill.** The brief made secondary "a design-system rule", but
   that rule existed to stop it competing with the booking button beside it. **The booking
   button is gone, so this is the page's only action and filling it is correct.** The rule was
   not broken; the thing it protected stopped existing.

**The hero is the one single-column hero on the site**, with the right half left empty. Every
other one fills the band because a left-aligned head in a 1240px container otherwise reads as
content failing to load. It survives here **only because the full-width card immediately below
catches the band.** If that card ever moves, this hero needs the two-column treatment back.

**`overflow: hidden` on the card is load-bearing** — without it the green half's square
corners run past the radius and the two halves stop reading as one object, which is the whole
point of the fused treatment. **The transparent 1px border on the inputs is too**: it holds
the box size so the focus ring can colour it without every field growing 2px and shifting the
column.

**Placeholders take `--ark-muted`, not `--ark-muted-2`.** Placeholder text is small text and
needs 4.5:1; measured 4.64 on the warm fill, where `--ark-muted-2` would have been about 3.67
and failed. Found by measuring, not by eye.

**Netlify Forms, honeypot only, NO reCAPTCHA** — it would load a Google script needing a
Privacy row and a place behind the consent gate, at which point **the form breaks for anyone
who has not accepted cookies.** Submission goes through `fetch` so the panel is replaced in
place; without JavaScript it is still a real form and Netlify still receives it.

**`/privacy` changed in three places and one is a weakened commitment.** Section 1 gained the
enquiry paragraph, section 5's Netlify row names form submissions, and **section 7's retention
line was rewritten** — it said enquiries were deleted 24 months after last contact and now
says they are kept as business records with no deletion schedule. That is a published promise
made weaker, decided after the contradiction was put to Fredrick. **What keeps it defensible
is the sentence beside it**: "You can ask us to delete yours at any time, and we will." If
that is trimmed, the position has to change back. **The practitioner review is still
outstanding and this is the likeliest thing to come back from it.**

**Two bugs were found on the built page and fixed, both worth knowing:**

- **`.form-panel__field + .form-panel__field` matched INSIDE the paired row.** The two fields
  sitting side by side are adjacent siblings too, so Practice Name took a 20px top margin and
  sat 20px below Name with its label out of line. **The `>` in
  `.form-panel__form > .form-panel__field + .form-panel__field` is the whole fix and must
  stay** — it restricts the rule to the stacked fields it was written for. Measured after:
  label offset 0, input offset 0, bottoms level.
- **The submitted state drew a focus ring around itself.** It is focused programmatically so a
  keyboard user is not stranded on a button that no longer exists, but it is not an
  interactive control, and the outline read as a stray box cutting across the heading above
  it. `role="status"` is what announces the change; the outline was never doing that job.

**The submitted state replaces the heading AND the form**, not the form alone — leaving "Start
the conversation" above a confirmation reads as an instruction to do the thing just done. It
centres in the panel behind a check mark, and `min-height: 380px` stops the card collapsing to
three lines of text the instant someone sends, which would read as something breaking rather
than something succeeding.

**Verified on the built page:** one `h1`, heading order h1 → "Start the conversation" →
"Direct Lines", no contrast failures at either threshold, placeholders at 4.64, honeypot out
of the tab order and not hittable, error state on a forced 404 with the form and values kept
and the button label restored, success state replacing the form in place on the same URL with
focus moved to it, and 390 / 768 / 1440 with `documentElement.scrollWidth` equal to the
viewport at each — at 390 the widest element is `<html>` itself.

**`astro preview` returns 200 to a POST**, so it reports success against a server that
received nothing: **a real submission cannot be tested locally.** That check, the Clarity
masking check on the four fields, the honeypot rejection, and whether spam submissions count
against the 100/month allowance all need the deployed site.

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
