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

/**
 * Measurement identifiers.
 *
 * They live here, next to BOOKING_URL, for the same reason it does: one place to change,
 * and a change is a commit rather than an edit in somebody's hosting dashboard. They are
 * not secrets — every one of them is readable in the page source of any site that uses
 * them, which is how the providers are designed to work — so an environment variable
 * would buy nothing and would move the value somewhere the repository cannot see it.
 *
 * NOTHING HERE LOADS ON ITS OWN. An identifier being present is not a tag being live:
 * the registry in `src/lib/tags.ts` decides what may load, and the consent gate decides
 * when. Adding a value below has no effect until an entry there is enabled.
 */
export const MEASUREMENT = {
  /** Google Analytics 4 web stream. Enabled. */
  ga4: "G-5EWZJJKM71",

  /** Microsoft Clarity project. Enabled. */
  clarity: "y9521c6e00",

  /** Meta Pixel. Enabled. */
  metaPixel: "3519939178174832",

  /* The two deferred slots. They are EMPTY ON PURPOSE and the site builds without them
   * — that is the test of whether a disabled tag is genuinely inert. Their loaders are
   * written out in full in the registry and guard on an empty value, so switching either
   * one on is a string here and a boolean there, with no change to the consent gate and
   * no re-verification of it. That is the whole reason the slots exist. */

  /** LinkedIn Insight Tag partner ID. Deferred — see the registry. */
  linkedInPartnerId: "",
  /** Google Ads conversion ID, the AW- prefixed one. Deferred — see the registry. */
  googleAds: "",
} as const;

export const SITE = {
  name: "ArkSystems",
  tagline: "Think AI, Think Ark.",
  url: "https://arksystems.ca",
  positioning:
    "We assess where AI produces a measurable return in your business, quantify it, and build it.",
} as const;

/**
 * Analytics labels for CTA clicks. Naming them is what makes it possible to learn which
 * block does the conversion work.
 *
 * LIVE SINCE THE ANALYTICS RELEASE OF AUG 27 2026. `BookingButton.astro` renders each of
 * these as `data-cta`, and `lib/analytics.ts` sends the one that was clicked to GA4 as
 * the `cta_location` parameter of a `cta_click` event. Nothing else about the click is
 * sent, and nothing derived from the visitor ever will be.
 *
 * THEY ARE PARAMETER VALUES, NOT GA4 EVENT NAMES, and the hyphens are why: a GA4 event
 * name may not contain one. Fifteen event names would have meant inventing fifteen new
 * spellings that do not match the ones below, which would make this list stop being the
 * record of what the site's own buttons are called. See the note in `lib/analytics.ts`.
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
  | "acc-closing"
  /* /workshop. Four, matching where the approved copy puts a button: the hero, the end
   * of "what happens on the day", the price section, and the close. Sections 2, 4 and 6
   * carry none — 2 and 4 do recognition and delivery work, and 6 exists to remove
   * objections rather than to ask.
   *
   * Every one of these still books the same free 20-minute call. The page sells the
   * workshop; the button books the call that decides whether a workshop is the right
   * first step at all. Do not point any of them at a different URL. */
  | "ws-hero"
  | "ws-day"
  | "ws-cost"
  | "ws-closing"
  /* /about. Exactly one, in the close. The hero carries no button by instruction — a
   * reader who opens About is verifying, not deciding, and a CTA at the top interrupts
   * the thing they came to do. If a second ever appears on that page, something has gone
   * wrong with it. */
  | "about-closing"
  /* The 404 page. One button, so someone who arrived on a dead link — most likely from
   * the previous version of this site, which Google still has indexed — has the same
   * route forward as any other page offers. */
  | "notfound";

/* /contact HAS NO CTA LABELS, and that is not an omission. `contact-hero` and
 * `contact-closing` existed while the page carried two booking buttons; the design of Aug
 * 28 2026 removed both in favour of a single contact form, so nothing renders them. They
 * were deleted rather than left in place because this list is the record of what the
 * site's own buttons are called, and a label pointing at no button makes it a worse
 * record. The form's submit is not a CTA in this sense — it posts to Netlify rather than
 * opening the booker, and it is deliberately not counted. */

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
  /* Added when /workshop shipped. The copy file's audience is a reader who has finished
   * another page and still cannot name one problem to start with — which is a reader
   * already in the nav, looking for somewhere to go. The footer alone would not have
   * reached them. */
  { label: "The workshop", href: "/workshop" },
  { label: "About", href: "/about" },
  /* Added Aug 28 2026 with /contact. The brief asks for it and it closes the last gap in
   * the bar: every other way of reaching us was a booking button, so a reader who wanted
   * to write rather than book had nowhere in the nav to go. It sits last because it is a
   * destination rather than part of the argument — the first three are the argument, in
   * order, and Industries and the workshop are the offers. */
  { label: "Contact", href: "/contact" },
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
