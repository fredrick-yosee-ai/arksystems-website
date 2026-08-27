/**
 * The facts the legal pages are still waiting on.
 *
 * Every value here appears inside published page copy on /privacy or /data-handling.
 * They are `null` because they are not known, and **nothing here may be guessed**. A
 * made-up incorporation jurisdiction, surname or payment provider is a false statement
 * on the two pages that exist precisely to be accurate — worse than an obvious blank,
 * because a blank is visible and a plausible invention is not.
 *
 * While a value is null the page renders a marked placeholder (see `Pending.astro`)
 * rather than a silent gap, so an unfilled fact cannot slip past a read-through. Fill
 * one in and it renders as ordinary text with no other change needed.
 *
 * Both pages are held on a branch until a Canadian privacy practitioner has read them —
 * see the header comment on each page — so these blanks are not live anywhere.
 */
export interface PendingFacts {
  /** FoodyGuru Inc.'s jurisdiction of incorporation. /privacy opening. */
  incorporatedIn: string | null;
  /** Fredrick's surname. /privacy section 11 — the Privacy Officer must be a named individual. */
  privacyOfficerSurname: string | null;
  /** Invoicing and payment provider. Provider tables on BOTH pages. */
  paymentProvider: string | null;
  /** Where the payment provider processes data. Same tables. */
  paymentProviderRegion: string | null;
  /** Credential store. /data-handling provider table. */
  passwordManager: string | null;
  /** Where the password manager processes data. Same table. */
  passwordManagerRegion: string | null;
  /** How long after an engagement closes we confirm access removal. /data-handling. */
  accessRemovalWindow: string | null;
  /** How long copies persist in routine backups before ageing out. /data-handling. */
  backupWindow: string | null;
}

export const PENDING: PendingFacts = {
  incorporatedIn: null,
  privacyOfficerSurname: null,
  paymentProvider: null,
  paymentProviderRegion: null,
  passwordManager: null,
  passwordManagerRegion: null,
  accessRemovalWindow: null,
  backupWindow: null,
};

/** True while any fact is still missing. Both pages use it to show the review banner. */
export const HAS_PENDING = Object.values(PENDING).some((v) => v === null);

/**
 * The effective date, written once. It appears in the dateline on both pages and in
 * /privacy section 12, which points back at it — if the two ever disagree the page is
 * telling the reader to check something that is wrong.
 */
export const LEGAL_EFFECTIVE_DATE = "26 August 2026";

/** The operating entity, as it must appear wherever the pages name themselves. */
export const LEGAL_ENTITY = "FoodyGuru Inc.";

/** The contact route. No mailing address is published — see /privacy section 11. */
export const LEGAL_EMAIL = "hello@arksystems.ca";
