# ArkSystems website — handoff package

Everything your local Claude Code session needs to build the approved homepage, so it
doesn't have to re-derive a single decision.

## Getting set up

If Claude Code isn't installed yet:

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

Check it worked with `claude --version`. Then:

```bash
cd /path/to/your/arksystems-repo
claude
```

You'll be prompted to log in on first run — use the same Claude account you're using now.

## Installing this package

Copy the contents of this folder into the root of your repository:

```
your-repo/
  CLAUDE.md          <- Claude Code reads this automatically, every session
  spec/
  assets/
  reference/
  legal/
```

`CLAUDE.md` at the repo root is the important one. Claude Code picks it up on its own —
you don't have to point at it or paste it in. It carries the brand rules, the honesty
standard, the booking URL, the build traps, and what is still open.

## A first prompt that works

```
Read CLAUDE.md and spec/page-spec.md, then open reference/homepage-desktop.html
in a browser and look at it. Tell me what you'd do first and what you think is
wrong or missing. Don't write any code yet.
```

Letting it look before it builds is worth the extra minute. If it disagrees with
something in the brief, you want to hear that before it's written into components rather
than after.

## What's in here

| Folder | What it is |
| --- | --- |
| `CLAUDE.md` | The build brief. Rules, constants, traps, what's still open |
| `spec/page-spec.md` | The full approved spec, v3.3 — every section, every decision and why |
| `spec/copy-blocks.md` | The same copy, extracted from the mockup, ready to paste |
| `spec/brand-tokens.css` | Every colour and type value as CSS variables |
| `assets/hero-desktop.svg` | 720×700 hero illustration, Ark logo embedded, self-contained |
| `assets/hero-mobile.svg` | 354×442 compact emblem for phone |
| `assets/hero-desktop-full.svg` | 1520×1070 source version — **not for the page**, labels are unreadable below ~1100px |
| `reference/*.html` | The approved mockups. Open in a browser. This is the visual target |
| `legal/*.md` | Privacy, Terms and Data Handling drafts — **not for publication**, see below |

## Two things to be careful about

**Inline the hero SVG. Don't use `<img src="...">`.** An SVG loaded through `<img>` is
sandboxed and can't reach the page's webfonts, so every label silently falls back to
Georgia and a system sans. It looks almost right, which is why it's easy to miss. Inline
it into the markup instead.

**The legal drafts are drafts.** I wrote them from what the site actually does, and every
`[CONFIRM]` marks something I couldn't verify — analytics provider, data regions,
retention periods, and most importantly which AI model providers process client documents
and whether their no-training setting is switched on. I'm not a lawyer. These need your
factual pass, then a Canadian privacy practitioner's, before they go anywhere near
production. The Data Handling page in particular makes operational promises you have to
be able to keep.

## What's still blocking launch, not the build

- **Tool logos.** The QuickBooks, Square, Shopify, Interac and other marks in the
  illustration are hand-drawn approximations. A logo implies a relationship. Tell me
  which tools ArkSystems genuinely works with and I'll rebuild it with official assets
  and drop the rest.
- **Legal review** on the three pages above.
- **Analytics provider** — the choice changes what the Privacy page has to say.

## One thing worth fixing regardless

Your live site's navigation is broken right now. "How We Help", "The Workshop", "For
Accounting Firms", "About", "Privacy" and "Terms" all link to `/`, and "Book a Call" is
still a `mailto:`. Nobody can navigate arksystems.ca today. If the rebuild takes a few
weeks, it's worth a five-minute fix in the meantime.
