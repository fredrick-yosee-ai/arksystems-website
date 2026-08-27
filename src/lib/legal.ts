/**
 * The facts the legal pages are still waiting on.
 *
 * Every value here appears inside published page copy on /privacy, /data-handling or
 * /terms. A `null` means the fact is not known, and **nothing here may be guessed**. A
 * made-up incorporation jurisdiction or surname is a false statement on the three pages
 * that exist precisely to be accurate — and worse than an obvious blank, because a blank
 * is visible and a plausible invention is not.
 *
 * While a value is null the page renders a marked placeholder (see `Pending.astro`)
 * rather than a silent gap, so an unfilled fact cannot slip past a read-through. Fill one
 * in and it renders as ordinary text with no other change needed.
 *
 * EVERY FACT WAS FILLED AS OF AUG 26 2026. One was ADDED on Aug 27 2026 with the analytics
 * release — `clarityRegion` — and it is unfilled, so /privacy section 5 renders one marked
 * blank today. That blank is the reason the analytics branch is not ready to push. The
 * mechanism stays because these values are still worth holding in one place — each is
 * documented with where it appears, so a change is one edit rather than a search — and
 * because nulling one puts its marked blank straight back on the page.
 *
 * All three pages are still held on a branch until a Canadian privacy practitioner has
 * read them. THE BRANCH IS THE HOLD. There is no longer an on-page draft notice; it was
 * removed on Fredrick's instruction once the last fact landed, and it was never the
 * safeguard.
 *
 * TWO PROVIDER ENTRIES WERE REMOVED RATHER THAN FILLED, on Fredrick's answers of Aug 26
 * 2026, and both are recorded here because a later reader will otherwise wonder where they
 * went:
 *
 * - **Payment provider.** There is no third-party payment processor. Invoicing runs
 *   without one, so the row came out of the tables on both /privacy and /data-handling
 *   instead of being filled. That is a genuinely stronger position, not a gap — one fewer
 *   provider holding client information, and one fewer name on the cross-border paragraph.
 *   Invoicing itself is still described in /privacy section 3, and the records it produces
 *   are covered by the Google Workspace row and the six-year retention rule.
 * - **Password manager.** Not named for now, by instruction, so its row came out of
 *   /data-handling's table — and then the sentence claiming credentials are held in one
 *   came out with it, on a second instruction. A claim about a practice cannot outlive the
 *   naming of the tool, and half of it is worse than neither: the page would have been
 *   describing tooling it could not name. See that page's header for the consequence.
 *
 * If either is introduced later, it needs a row back AND the surrounding prose re-read.
 *
 * A THIRD FACT WAS REMOVED THE SAME WAY: the backup window. There are no separate backups
 * beyond what Google Workspace holds natively, so the bullet came out of /data-handling
 * rather than taking a number. The 90-day deletion commitment now stands on its own — the
 * copy file paired the two deliberately, because they run in sequence and merging them
 * would understate the outside figure. WITH NO BACKUP BULLET THERE IS NOTHING TO PAIR,
 * which is a stronger claim and worth the practitioner confirming against Google
 * Workspace's own trash and admin-recovery behaviour.
 */
export interface PendingFacts {
  /** FoodyGuru Inc.'s jurisdiction of incorporation. Opening of /privacy and /terms. */
  incorporatedIn: string | null;
  /** Fredrick's surname. /privacy section 11 — the Privacy Officer must be a named individual. */
  privacyOfficerSurname: string | null;
  /** How long after an engagement closes we confirm access removal. /data-handling. */
  accessRemovalWindow: string | null;
  /**
   * Where Microsoft Clarity processes session recordings. /privacy section 5.
   *
   * THE ONLY BLANK ON ANY OF THE THREE PAGES, and it is deliberately not filled by
   * inference. The build brief's instruction is explicit: confirm Clarity's processing
   * region from its own terms at signup, and DO NOT ASSUME IT MATCHES THE OTHERS. Every
   * other provider on that table is United States; writing the same here because it
   * looks likely would be exactly the plausible invention this file exists to prevent —
   * and unlike a wrong retention period, a wrong processing region is a cross-border
   * disclosure that is simply false.
   */
  clarityRegion: string | null;
}

export const PENDING: PendingFacts = {
  /* Confirmed by Fredrick, Aug 26 2026. */
  incorporatedIn: "British Columbia",
  /* Confirmed by Fredrick, Aug 26 2026. PIPEDA wants the Privacy Officer to be a named
   * individual, and this was the last unknown fact on any of the three pages. */
  privacyOfficerSurname: "Cyril",
  /* Confirmed by Fredrick, Aug 26 2026. Stated as a commitment a client can hold us to,
   * so it is the window we would always meet rather than a best case. */
  accessRemovalWindow: "five business days",
  /* NOT YET CONFIRMED. Fredrick to read Clarity's terms and supply the region. Until he
   * does, /privacy section 5 shows a marked blank rather than a guess — see above. */
  clarityRegion: null,
};

/**
 * The effective date, written once. It appears in the dateline on /privacy and /terms and
 * in /privacy section 12 and /terms section 13, both of which point back at it — if the
 * two ever disagree the page is telling the reader to check something that is wrong.
 */
export const LEGAL_EFFECTIVE_DATE = "26 August 2026";

/** The operating entity, as it must appear wherever the pages name themselves. */
export const LEGAL_ENTITY = "FoodyGuru Inc.";

/** The contact route. No mailing address is published — see /privacy section 11. */
export const LEGAL_EMAIL = "hello@arksystems.ca";
