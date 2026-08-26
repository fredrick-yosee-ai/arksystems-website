<!--
  ARKSYSTEMS — /about, approved copy.
  Supplied by Fredrick Aug 26 2026 and built the same day. Below the rule, this file is
  the copy exactly as it was supplied; nothing in it has been edited.

  THE ONE RULE FOR THIS PAGE, from the file's own build note: it speaks as "we"
  throughout, and Fredrick is named once, in the third person, written ABOUT rather than
  BY. That single choice is what makes the page read as a company with a founder rather
  than a person with a website. It is the thing most likely to drift during an edit —
  section 3's second paragraph attracts an "I" more than anything else on the site. It
  has none.

  WHERE THE BUILD DEPARTS FROM THIS FILE. Five departures. The first is the significant
  one and it was Fredrick's decision, taken before the build:

  1. "METRO VANCOUVER" IS REMOVED FROM ALL THREE VISIBLE PLACES this file puts it — the
     hero subhead ("an AI consulting firm in Metro Vancouver"), section 3's fourth chip,
     and section 6's location paragraph. His standing instruction of Aug 25 2026 takes
     the location line and everything like it off the visible site; it was removed from
     five places that day, with "do not restore one alone" attached, and he confirmed it
     again on Aug 26 when this page was planned and he was shown that this copy restored
     it. The TITLE AND META DESCRIPTION KEEP IT, which is the same call made for the
     other two pages: those are search-targeting strings rather than sentences on a page,
     and two of this page's four target queries name the location.

     SECTION 6'S LOCATION PARAGRAPH WENT WHOLE rather than half-kept. Trimming it to "we
     work remotely across Canada, and on site where the work benefits from it" would
     leave a sentence whose subject had been deleted — on site relative to what? Same
     call made on /accounting's FAQ, where a question was removed with its answer because
     the answer WAS the location line.

     ONE CONSEQUENCE WORTH KNOWING: the on-site-in-the-Lower-Mainland offer existed only
     in that paragraph and is now published nowhere on the site.

  2. THE PULL QUOTE TAKES ITS OWN COLUMN in section 4, beside the prose rather than under
     it. With no illustration anywhere on this page it is the only element that can fill
     the right half of a 1240px band. The first build flowed the three paragraphs across
     two CSS columns instead; three paragraphs do not divide by two, so the left column
     ended a full paragraph short and the quote sat under a visible hole.

  3. SECTIONS 1, 2 AND 6 RUN TWO-COLUMN HEADS — heading left, prose right. Same reason: a
     left-aligned head in a 1240px container leaves a third of the band empty, and on a
     full-width band that reads as something failing to load rather than as space. This
     page has no artwork to fill it with.

  4. SECTIONS CARRY ids FOR ANCHORING — why-we-exist, who-youre-working-with,
     how-we-decide, what-we-dont-do, who-we-work-with. Not in the file; needed so any
     future link can reach a section rather than the top of the page.

  5. SECTION 5'S FOUR BLOCKS CARRY NO ICONS, unlike every other card set on the site. An
     icon against "We don't sell a platform" has to illustrate a negative, and a drawn
     negative reads as a shrug or as the thing being denied. They are rules, and they get
     a rule: terracotta on the left edge, text only.

  SECTION 3 IS THE LONG VERSION OF THE HOMEPAGE FOUNDER STRIP and the two share their
  heading, body paragraph and chips word for word. THEY HAVE TO STAY IN SYNC — a change
  to the years, the products or the chips here is wrong on the homepage the same day, and
  there is no shared constant because it is prose, not data.

  "A GUESS WITH AN INVOICE ATTACHED" in section 2 is a phrase Fredrick cut from the
  homepage on Aug 25 2026, where it closed section 2's lede and landed as a diagnosis of
  the reader's own spending. It is deliberate here and was flagged to him before this page
  was built: the section is titled "why ArkSystems exists", the subject is AI investment in
  general rather than this reader's, and nobody is being told their spending failed. Do
  not delete it as a duplicate of the homepage fix — it is not one.

  THE [CONFIRM] SECTION AT THE FOOT: two of the four are closed. The founder portrait
  exists at assets/fred.jpg and was already live on the homepage. The on-site radius is
  moot, since the paragraph carrying it was removed. The other two — team language, and
  whether FoodyGuru and YoseeAI are still safe to name — are Fredrick's, and both are
  already true of the live homepage, so this page adds no new exposure on either.
-->

---

# /about — page copy

**Page:** `/about`
**Audience:** warm traffic and referral lookups. Somebody has heard the name, or read a page, and is checking whether ArkSystems is real before booking. Also the destination of the nav and footer "About" links, which currently resolve to `/`.
**Voice:** `brand-voice.md`. **Offer model:** `offer-model.md`. **Design:** `design.md`.

**How to read this file**

- **Blockquoted text is page copy.** Use it verbatim.
- **Bold labels** name the element and are not page content.
- **Build note:** lines are instructions and never appear on the page.

---

## What this page has to do

About is not a biography. It is the page a reader opens when they are close to booking and want to know whether the firm behind the argument is credible. It has to answer three questions and stop.

1. **What is this firm?** An AI consulting firm — assess, quantify, build.
2. **Who am I actually dealing with?** The founder, directly, with a verifiable engineering record.
3. **How do they decide what to build?** Assessment first, and a stated willingness to recommend nothing.

**Build note — the one rule for this page.** It speaks as "we" throughout. Fredrick is named once, in the third person, written about rather than by. That single choice is what makes the page read as a company with a founder rather than a person with a website, and it must not drift into first person during the build.

---

## SEO

**Title tag** (49 chars)
> About ArkSystems | AI Consulting, Vancouver

**Meta description** (147 chars)
> ArkSystems is an AI consulting firm in Metro Vancouver. We establish where AI produces a return in your operation, what it's worth, and then build it.

**Target queries**

- `ArkSystems`
- `ArkSystems Vancouver`
- `AI consultant Metro Vancouver`
- `AI consulting firm Canada`

**Schema:** `AboutPage` plus `Organization` (name ArkSystems, founder Fredrick, areaServed Canada, url arksystems.ca). This is the page search engines should read as the entity definition, so the `Organization` block belongs here rather than only in the shared layout.

**Internal links:** to `/workshop` from section 4, and to `/accounting` from section 6.

---

## Section 1 — Hero

**Eyebrow**
> About ArkSystems

**H1**
> We establish where AI produces a return. Then we build it.

**Subhead**
> ArkSystems is an AI consulting firm in Metro Vancouver. We work with businesses and professional practices that accept AI matters and need someone to establish where it belongs in their own operation, what capturing it is worth, and whether the build is justified at all.

**No call to action here.**

**Build note:** the hero on this page carries no button. A reader who opens About is verifying, not deciding, and a CTA at the top interrupts the thing they came to do. The page closes with one.

---

## Section 2 — Why ArkSystems exists

**H2**
> The tools aren't the constraint.

**Body**
> AI capability is now available to any business that wants it, at a price that no longer decides anything. The constraint is that most businesses can't identify where AI produces a return in their own operation, what that return is worth, or what capturing it would cost. Without those three figures, an AI investment is a guess with an invoice attached.

**Second paragraph**
> ArkSystems exists to establish those three figures and to build what follows from them. The order is deliberate: assessment first, business case second, build only if the case holds.

---

## Section 3 — Who you're working with

**H2**
> You work directly with the people who build your system.

**Body**
> ArkSystems is led by its founder, Fredrick, who spent more than fifteen years in software engineering, solution architecture, systems integration and cloud infrastructure, and who founded and shipped two technology products, FoodyGuru and YoseeAI.

**Second paragraph**
> That matters to you in two ways. You deal with the people building the thing — there is no account manager, and no junior consultant taking over once the work is sold. And the parts that usually get skipped are the parts we've had to care about: what a system costs to run, whether it stays up, and whether anyone actually uses it a month later.

**Four chips**
> 15+ years engineering · Two products founded and shipped · Metro Vancouver · Founder-led delivery

**Build note:** this section needs the founder portrait. It is the only image on the page and the section does not work without it — an unverifiable claim about a named person, with no face attached, reads worse than no section at all.

---

## Section 4 — How we decide what to build

**H2**
> Assessment first. Business case second. Build only if the case holds.

**Body**
> We start by examining how the work actually moves — with the people who perform it, not only the people who describe it. We establish where time and money go, put figures against each candidate using your numbers, and state every assumption openly so you can challenge it.

**Second paragraph**
> Then we test each candidate against what AI genuinely does today. Some are AI problems. Some need a change to the order the work happens in. Some need better use of software you already license. Some aren't worth fixing at this size of business, and saying so is part of the work rather than a failure of it.

**Third paragraph**
> If the case holds, we build it, on accounts you own, and hand it back operating. If you can't yet name the one process to examine, we run a workshop that ranks them first — a day on one agreed area of your operation.

**Pull quote**
> We would rather tell you not to build something than sell you something that isn't worth the money.

**Build note:** no numbered steps and no process diagram anywhere on this page. The staged treatment makes the engagement feel long, and it duplicates what the industry pages already do.

---

## Section 5 — What we don't do

**H2**
> The boundaries are as useful as the capability.

**Four blocks**

> **We don't sell a platform.** There is no ArkSystems subscription and no system that holds your records. What we build operates on accounts you already own, which means there is nothing to migrate away from if you stop working with us.

> **We don't replace your process.** Your workflow stays as it is. AI runs the steps inside it that never required a qualified person, and stops at the ones that do.

> **We don't make your decisions.** Nothing we build decides anything you haven't already decided. It applies rules you set, records what it did and why, and stops where your rules stop.

> **We don't publish client names or results without permission.** No logos, no figures, no attributed quotes taken from a project that hasn't been agreed for publication.

---

## Section 6 — Who we work with

**H2**
> Small and mid-sized businesses, and professional practices.

**Body**
> Businesses large enough that administrative work has become a real cost, and small enough that nobody has a department to hand it to. Accounting and bookkeeping practices are the sector we've built for most deliberately, and there's a page for that. The work generalizes further than one sector, because the pattern does.

**Body, location**
> Based in Metro Vancouver. We work remotely across Canada, and on site within the Lower Mainland where the work benefits from it.

---

## Section 7 — Close

**H2**
> Twenty minutes is enough to find out whether we're useful to you.

**Body**
> Bring the process costing you the most. We'll tell you whether AI solves it, roughly what solving it would be worth, and whether it's worth building at this point in your business.

**CTA**
> Book your free 20-minute call

**Tagline**
> Think AI, Think Ark.

---

## Claims

Everything on this page is verifiable or is stated as a position.

**Verifiable:** the fifteen years, the two products founded and shipped, the Metro Vancouver location, founder-led delivery.

**Positions, not claims:** "the tools aren't the constraint", and the pull quote. Both are opinions, which the brand guide permits and which are what give the page a point of view.

**Never claimed:** hours saved, ROI figures, client outcomes, completed engagements, client names, certifications, awards, team size, or any partnership with a named software vendor.

**Build note:** the phrase "founded and shipped" is deliberate and should not be inflated during the build. It is unarguable. Anything stronger invites a question the page cannot answer.

---

## [CONFIRM] before this page ships

**Founder portrait.** Section 3 does not ship without it.

**Team language.** The page says "the people who build your system" and "we" throughout, while naming one founder. If anyone else — contractor or otherwise — works on delivery, that is defensible as written. If it is only Fredrick today, the wording still holds, but confirm you're comfortable with the plural before it goes live.

**FoodyGuru and YoseeAI.** Confirm both are still safe to name publicly, and that neither has a live state that contradicts "founded and shipped".

**On-site radius.** Section 6 says on site within the Lower Mainland. Confirm that's the boundary you want published, since it becomes an expectation.
