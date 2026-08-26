# /accounting — page copy

**Approved Aug 25 2026. This file REPLACED the previous `/accounting` copy in full.**
The page it describes is a different page from the one that shipped before it — eight
sections rather than eleven, a new H1, and three page rules that cut across roughly a
third of what was live. The old file is in git history if it is ever needed.

**Page:** `/accounting`
**Audience:** Canadian accounting, bookkeeping and CAS firms. The destination for all cold outbound. Outbound never points at the homepage.
**Voice:** ArkSystems brand voice — the standing rules live in `CLAUDE.md`.
**Design:** the Applied Intelligence system, in `src/styles/brand-tokens.css`.

**Where the built page departs from this file, and why.** Five places, all recorded in
the component that carries them. Nothing else deviates.

0. **Two FAQ questions are deleted**, leaving four of the six below — the Dext/Karbon one
   and the British Columbia one. See section 7.
1. **Every location line is deleted** — Fredrick's instruction of Aug 25 2026. Section 1's
   trust line loses "Metro Vancouver", section 8 loses its line under the CTA entirely,
   and section 7 loses "Do you work outside British Columbia?" *with its answer*, because
   the answer was the location line and a question with nothing behind it is worse than
   no question. The meta description below loses its closing "Across Canada." The title
   tag keeps "Vancouver" and is now the only place on the site naming the location —
   flagged for Fredrick, kept for now because it is a search-targeting token rather than
   a sentence on the page.
2. **Eyebrows appear on sections 1 and 5 only**, which is where this file specifies them.
3. **Section 5 carries one line not in this file** — "This is one of six areas, not the
   offer. We built another for expense capture." — which is where the internal link to
   the homepage demonstration, required by the SEO section below, is attached.
4. **`LocalBusiness` schema is not emitted.** This file says it comes from the shared
   layout. It does not; there is no JSON-LD in the layout. It needs a real street address
   and real hours, and inventing either would be a false claim on this page in particular.

**How to read this file**

- **Blockquoted text is page copy.** Use it verbatim.
- **Bold labels** name the element and are not page content.
- **Build note:** lines are instructions and never appear on the page.

---

## Two rules specific to this page

**No governance, compliance or regulatory content.** No professional conduct rules, no legislation, no privacy law, no compliance framing anywhere. That material made the page read as a compliance vendor rather than a builder, and it addressed a concern before the reader had it. Data security is answered once, plainly, in the FAQ.

**Document collection is one example, not the offer.** Earlier versions described a single problem across every section, which made ArkSystems look like a document-collection tool. Section 3 now carries six areas. Section 5 shows one in detail and says plainly that it is one of several.

**Never describe ArkSystems as an agent builder.** An agent is one form of what gets built. Sometimes the answer is a workflow change, or better use of software the firm already licenses, or nothing at all. The page says "AI" for the capability and "the system" for the built thing. The word "agent" appears nowhere, because naming one delivery format makes it the whole business.

---

## SEO

**URL:** `/accounting`, with a 301 from the live `/accounting-firms`. The homepage footer link labelled "For accounting firms" points here.

**Title tag** (54 chars)
> AI for Accounting Firms | ArkSystems Vancouver

**Meta description** (133 chars as shipped; 148 as approved)
> We build AI into the administrative work inside your practice, never the accounting itself. Fixed fee, from CAD $4,000.

The approved string ended "Across Canada." That sentence is removed under the Aug 25
instruction — see departure 1 at the top of this file.

**Target queries**

- `AI consultant for accounting firms`
- `AI for accounting firm operations`
- `automate client document collection accounting firm`
- `reduce admin time accounting practice`
- `build vs buy accounting firm automation`

**Do not target:** `bookkeeping automation`, `accounting workflow software`, `AI bookkeeping tools`. Wrong intent, owned by funded vendors, and that traffic arrives comparing a $4,000 build against a $20-a-month application.

**Schema:** `Service` (areaServed Canada, audience accounting firms), `FAQPage` on section 7, `LocalBusiness` from the shared layout.

**Internal links:** the homepage demonstration from section 5.

---

## Section 1 — Hero

**Eyebrow**
> For accounting and bookkeeping practices

**H1**
> AI that works inside the practice you already have.

**Subhead**
> ArkSystems builds AI into the administrative work that surrounds professional work — onboarding, document collection, routine client questions, file status, deadline exposure. Your process doesn't change. The steps that never needed a qualified person stop waiting for one.

**CTA**
> Book 20 minutes — see where AI fits your practice

**Line under CTA**
> Twenty minutes. Bring the task consuming the most qualified time in your firm.

**Trust line** — two items as shipped, three as approved
> Built for Canadian practices · Rules you set, recorded as it goes

Approved: "Metro Vancouver · Built for Canadian practices · Rules you set, recorded as it
goes". The first item is removed under the Aug 25 instruction.

**Build note:** the subhead is split into two paragraphs at the sentence boundary before
"Your process doesn't change" — same words, same order. Unsplit it is nine lines of lede
at 390px and the CTA falls under the fold, which is the single measurement this hero has
to hold.

---

## Section 2 — The problem

**No call to action here.**

**H2**
> The problems are familiar. What's new is that AI can now solve them.

**Body**
> These are the four we hear most often from practices.

**Build note:** heading, then the body underneath it, and the heading gets the room to
set on two lines rather than three. This was briefly built as two columns — heading left,
body bottom-aligned on the right — and rejected: the heading sat too high and the single
sentence on the right read as an orphan. The band is filled by the closing callout
instead, which runs the full width of the cards in two columns.

**Four blocks**

> **Client records arrive late and incomplete.** Work sits blocked until they come in, someone chases repeatedly, and the worst senders are the biggest clients.

> **Qualified staff spend hours on work that needs no qualification.** Sorting, re-keying, renaming, forwarding. Time billable at professional rates goes into tasks any system should be doing.

> **The same questions arrive every week.** Deadlines, missing slips, what to send and how. Each one interrupts someone mid-file to answer something answered fifty times before.

> **File status is not visible.** Which files are waiting on the client, which are ready for review, which are at risk of missing a deadline — the information exists, but nowhere it can be seen without asking.

**Closing line**
> Every one of these is now solvable with AI, inside the systems you already run. The question is which one is costing your practice most — and that's what we establish first.

---

## Section 3 — Where AI earns its cost

**This is the breadth section.** Any firm should find themselves in at least two of these.

**H2**
> Six places AI earns its cost in a practice.

**Body**
> Each of the problems above maps to work AI can run today — and there are more. These are the six places it earns its cost fastest in a practice.

**Six blocks**

> **Client onboarding.** AI collects what a new client is required to provide, opens the file, and reports what remains outstanding, so onboarding takes days rather than weeks.

> **Document collection.** AI gathers records as they arrive, extracts the figures, codes them against your rules, and pursues what hasn't come in.

> **Routine client questions.** AI answers the questions your team fields every week, in your firm's own words, and passes anything unusual to a person.

> **File status.** AI reports where every file sits and what's blocking it, so partners stop asking and staff stop interrupting work to answer.

> **Deadline exposure.** AI identifies which files are at risk weeks before the deadline rather than during it, when there's still time to act.

> **Internal reporting.** AI assembles work-in-progress, realization and capacity figures continuously, so the numbers are available rather than requested.

**Closing line**
> One of these costs your practice more than the rest. It's rarely the one people expect, and it's usually never been measured.

**CTA**
> Book 20 minutes — find out which one is yours

---

## Section 4 — Where it stops

**H2**
> We don't do accounting. That's the point.

**Body**
> ArkSystems doesn't file, take tax positions, provide professional advice, perform assurance work or sign anything. Nobody here holds a designation and we don't imply otherwise. We build the system. Your practice keeps its process, and every judgment inside it.

**Column 1 — What the system performs**
> - Collects, extracts and routes information
> - Codes and categorizes against rules you set
> - Stops on anything outside those rules
> - Pursues what hasn't arrived
> - Answers routine questions in your firm's words
> - Reports status, exposure and capacity

**Column 2 — What remains with the firm**
> - Every accounting decision
> - Every tax position
> - Every judgment call, including where the line sits between what runs automatically and what stops for a person
> - What gets filed, and when
> - Anything a client is advised
> - Sign-off on all of it

**Closing line**
> Nothing we build decides anything you haven't already decided. It applies rules you set, records what it did and why, and stops where your rules stop.

---

## Section 5 — From our build lab

**Eyebrow**
> From our build lab

**H2**
> Tax season, document collection — built and working.

**Body**
> A working system we built for the heaviest document period in the calendar. It manages client records from first contact to a filing-ready folder, and it runs without a person driving it. Shown here with sample data.

**Persistent label on the demo**
> Working system · Sample data

**Step 1 — Each client receives a personal upload link**
> The system opens the season with a greeting to every client and a link of their own. No portal to learn, no account to create.

**Step 2 — Every upload is checked on arrival**
> The system verifies that each document is valid and legible, and identifies what that client is still missing against what their filing requires.

**Step 3 — It follows up until the file is complete**
> Wrong document, unreadable scan, missing slip — the system communicates with the client directly, back and forth, until a valid version arrives.

**Step 4 — Complete files move to a workable folder**
> When everything required is in and verified, the set moves, organized and named, to where your team works from. What reaches your staff is ready.

**Closing line, stronger weight**
> Your team opens a filing-ready folder instead of an inbox.

**What this means for a practice**
> No chasing during the busiest weeks of the year. No qualified time spent sorting and checking uploads. Every client's file either complete or visibly waiting — and the follow-up already happening.

**CTA**
> Book 20 minutes — see it working

**Build note — the most important instruction in this file.** The "Working system · Sample data" label sits on the demo panel itself at every breakpoint. Sample data is stated visibly; the page never claims or implies this was built for a client.

**Build note:** this section is not the tallest on the page. Sections 3 and 4 carry the argument.

---

## Section 6 — How it runs, and what it costs

**H2**
> We run a discovery. You decide what happens after.

**Body**
> We start with a discovery: we sit with your team, understand how the work actually moves, and draw up an implementation plan with a fixed price — from CAD $4,000, depending on what your workflow involves. If the plan makes sense to you, we build it. If it doesn't, you keep the plan and owe nothing.

**CTA**
> Book your free 20-minute call

**Build note:** no numbered steps, no process diagram. One paragraph, one button. The word "from" in the price is load-bearing — it sets a floor without promising a ceiling, which is what allows the page to publish a figure while ArkSystems never publishes a payment schedule.

---

## Section 7 — Before you book

**Build note:** mark up with `FAQPage` schema.

**Do you perform any accounting work?**
> No. We don't file, take tax positions, provide professional advice, perform assurance work or sign anything. We build the system that runs the administrative steps around your work. Your firm performs the accounting, exactly as it does now.

**Where does our client data go?**
> Into systems you already own. We don't operate a platform that holds your records, so there's nothing to migrate away from if you stop working with us. Every provider in the path is named in writing before anything is connected, and you decide what runs automatically and what stops for a person.

**We tried an AI tool and it wasn't impressive.**
> Common, and not a reflection on your firm. General tools perform well on work with a determinate answer and poorly on work requiring judgment. We build only the first kind, and only for work that never required your judgment.

**~~We already use Dext and Karbon. Why would we need this?~~** — REMOVED, Fredrick's
instruction of Aug 25 2026.

Worth recording what it cost, so this stays a decision and not a drift: the answer opened
"Often you wouldn't, and we'll say so", which was the only place on the page that argued
against the sale, and the only place naming a product a reader may already be paying for.
If the objection comes up on calls, this is where it used to be answered.

**Who owns it when you're finished?**
> You do. It operates on your accounts and the work remains your property. There's no ArkSystems subscription attached to it.

**~~Do you work outside British Columbia?~~** — REMOVED, question and answer both.
The answer was the location line, and it goes with it under the Aug 25 instruction. Five
questions ship, not six.

---

## Section 8 — Close

**H2**
> Pick the problem. We'll tell you if AI solves it.

**Body**
> Twenty minutes. Bring whichever of these problems costs your practice most. We'll tell you whether AI solves it, what that would be worth, and whether it's worth building at all.

**CTA**
> Book 20 minutes

**~~Line under CTA~~** — REMOVED under the Aug 25 instruction. The CTA is followed
directly by the tagline.

**Tagline**
> Think AI, Think Ark.

---

## Claims

Nothing on this page describes a result achieved for a client, because there are none yet. Section 5 presents a working system ArkSystems built itself, shown with sample data and never presented as client work. Section 3 describes what AI does in these situations, not what has been delivered for anyone named.

**Never claimed:** hours saved, ROI figures, client outcomes, completed engagements, delivery timelines, guarantees, compliance assurances, or partnership with any named software vendor.

**Three claims in the Stitch design export were NOT built**, and each one breaks a line
above: "enterprise-grade, SOC2 compliant infrastructure" (a compliance assurance), "built
and running within 4 to 6 weeks of the discovery session" (a delivery timeline), and a
"Case Studies" nav item (a permanently banned construction). None appears anywhere in
this file — the design tool wrote them. The export also rewrote all four blocks in
section 2 as solutions rather than problems, trimmed the third item in section 4's second
column, and rendered one of this file's own build notes as visible body copy. The design
was used for layout only; this file is the copy.

**No figures appear in the hero illustration.** Section 5's demonstration panel carries
the "Working system · Sample data" badge, and that badge is what licenses the sample
figures inside it. The hero carries no badge and therefore gets no numbers — a figure in
an unlabelled graphic is a claim.
