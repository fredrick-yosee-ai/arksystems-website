/**
 * Site-wide constants.
 *
 * BOOKING_URL is the one that matters. Every CTA on every page points here, so it
 * changes in exactly one place. The Cal.com event is configured for 20 minutes, which
 * is the only reason the page is allowed to say "20 minutes" — if that event length
 * ever changes, the copy is making a false claim and has to change with it.
 */
export const BOOKING_URL =
  "https://cal.com/fredrick-arksystems/ark-discovery-call";

/** Cal.com link identifier, for the embed's popup mode. */
export const BOOKING_CAL_LINK = "fredrick-arksystems/ark-discovery-call";

export const SITE = {
  name: "ArkSystems",
  tagline: "Think AI, Think Ark.",
  url: "https://arksystems.ca",
  positioning:
    "We assess where AI produces a measurable return in your business, quantify it, and build it.",
} as const;

/**
 * Analytics event names for CTA clicks. Naming them is what makes it possible to learn
 * which block does the conversion work. The provider is still unchosen — see CLAUDE.md
 * — so nothing is wired up yet; these are the agreed names for when it is.
 *
 * The homepage names come from the approved copy, which specifies `cta_hero`,
 * `cta_where`, `cta_proof` and `cta_close`. They replace the previous set — "demo" and
 * "what-happens" named sections that the rebuilt page no longer has.
 */
export type CtaLocation =
  | "hero"
  | "where"
  | "proof"
  | "closing"
  | "nav"
  /* /accounting. Prefixed so the two pages' CTAs never merge into one number — the
   * whole reason for naming them is to learn which block converts, and "hero" meaning
   * two different heroes would destroy that.
   *
   * Five, matching the rebuilt page. `acc-how-it-runs` is gone with the section it
   * named: the old three-step "how it runs" block is now a single discovery paragraph,
   * so the label would have pointed at something that no longer exists. */
  | "acc-hero"
  | "acc-where"
  | "acc-proof"
  | "acc-discovery"
  | "acc-closing";

export interface NavItem {
  label: string;
  /** Omitted on an item that exists only to open a submenu. */
  href?: string;
  /** Present on a parent. One level only — see the note on INDUSTRY_LINKS. */
  children?: readonly NavItem[];
}

/**
 * Industry pages: one page per kind of business, written for that reader rather than
 * for business owners in general.
 *
 * This is a list of one today. It is a list, and it is grouped under a parent in both
 * menus, because /accounting is the first of several and not a one-off — adding the
 * next industry should be a line here and nothing else. Naming the group "Industries"
 * rather than putting "Accounting firms" straight in the bar is what makes that true;
 * a top-level "Accounting" would have to be demoted later, and a nav item that moves is
 * a nav item people stop finding.
 *
 * Keep this one level deep. A submenu inside a submenu is a different interaction
 * problem — on a phone especially — and nothing here needs one.
 */
export const INDUSTRY_LINKS: readonly NavItem[] = [
  { label: "Accounting firms", href: "/accounting" },
] as const;

/**
 * Primary navigation. Below 800px these collapse into a menu but the Book button stays
 * visible in the bar — most warm traffic arrives on a phone after meeting Fredrick in
 * person, and the previous site hid the CTA from exactly that visitor.
 *
 * The first three are homepage anchors written absolute, so they work from any page:
 * from /accounting they go home and land on the section rather than doing nothing.
 */
export const NAV_LINKS: readonly NavItem[] = [
  { label: "The problem", href: "/#the-problem" },
  { label: "Where AI pays", href: "/#where-ai-pays" },
  { label: "How we find it", href: "/#how-we-find-it" },
  { label: "Industries", children: INDUSTRY_LINKS },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_EXPLORE: readonly NavItem[] = [
  { label: "Where AI pays", href: "/#where-ai-pays" },
  { label: "One we built", href: "/#one-we-built" },
  { label: "The workshop", href: "/workshop" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_LEGAL: readonly NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Data handling", href: "/data-handling" },
] as const;
