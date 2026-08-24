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
    "We find where your hours are going, fix what matters most, and use AI only where it is worth it.",
} as const;

/**
 * Analytics event names for CTA clicks. The spec names these five so it is possible to
 * learn which block does the conversion work. The provider is still unchosen — see
 * CLAUDE.md — so nothing is wired up yet; these are the agreed names for when it is.
 */
export type CtaLocation =
  | "hero"
  | "demo"
  | "what-happens"
  | "closing"
  | "nav";

/**
 * Primary navigation. Below 800px these collapse into a menu but the Book button stays
 * visible in the bar — most warm traffic arrives on a phone after meeting Fredrick in
 * person, and the previous site hid the CTA from exactly that visitor.
 */
export const NAV_LINKS = [
  { label: "The problem", href: "/#the-problem" },
  { label: "See it work", href: "/#see-it-work" },
  { label: "What happens when you book", href: "/#what-happens" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_EXPLORE = [
  { label: "See it work", href: "/#see-it-work" },
  { label: "What happens when you book", href: "/#what-happens" },
  { label: "The workshop", href: "/workshop" },
  { label: "About", href: "/about" },
] as const;

export const FOOTER_LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Data handling", href: "/data-handling" },
] as const;
