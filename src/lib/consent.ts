/**
 * Consent state: the categories, the stored record, and the rules for reading it back.
 *
 * This module is the single definition of what consent means on this site. The tag
 * registry (`src/lib/tags.ts`) decides what loads; this decides whether it may.
 *
 * THREE CATEGORIES, AND SESSION RECORDING IS ITS OWN. It is never folded into analytics.
 * A visitor who agreed to being counted has not agreed to being recorded, and those are
 * different enough that merging them would make the panel dishonest.
 *
 * THE VERSION STAMP IS NOT DECORATION. Stored consent is consent to a specific sentence.
 * If the banner copy changes materially — a provider added, a category added, a purpose
 * broadened — the sentence the visitor agreed to no longer exists, and the record is
 * stale. Bump CONSENT_COPY_VERSION in the same commit as the copy change and every
 * stored record is treated as absent, which re-prompts. Leaving it alone after a copy
 * change means the site is claiming agreement to words nobody was shown.
 *
 * NO SERVER-SIDE LOG. The record lives in the visitor's own browser and nowhere else.
 * That is deliberate: a consent log on our side would be a new store of personal
 * information created by the mechanism that exists to reduce it.
 */

/** localStorage key. Also the only cookie-adjacent thing we set before consent. */
export const CONSENT_STORAGE_KEY = "ark-consent";

/**
 * A stamp of the banner copy in `ConsentBanner.astro`. Change that copy, change this.
 *
 * Dated rather than numbered so a reader can tell at a glance whether a stored record
 * predates a copy change they remember making.
 */
export const CONSENT_COPY_VERSION = "2026-08-27.2";

export type ConsentCategory = "analytics" | "advertising" | "session_recording";

export type ConsentState = Record<ConsentCategory, boolean>;

/**
 * The three categories, in the order the panel shows them — which is the order the
 * banner copy names them, so the two never read as different lists.
 *
 * ANALYTICS IS LOCKED. Fredrick's instruction of 27 August 2026, given twice and
 * confirmed against the consequence: analytics is treated as necessary, it loads on the
 * first page view before any interaction, and it cannot be switched off. The row still
 * appears in the panel, marked "Always on", because a category the visitor cannot
 * control is the one they most need to be told about — hiding it would mean setting a
 * persistent identifier that is disclosed nowhere.
 *
 * WHAT THAT DECISION COST, recorded here rather than argued again: the banner copy had
 * to be edited, which the build brief's section 5.3 otherwise forbids, and the Privacy
 * page's "withdraw at any time" promise had to be narrowed to the two categories where
 * it is still true. Both were done in the same change, and CONSENT_COPY_VERSION was
 * bumped so every stored record from the earlier wording is treated as stale.
 *
 * The descriptions are visible copy. They follow the brand rules: precise, no idiom,
 * Canadian spelling, and no claim that would need a caveat to be true.
 */
export const CONSENT_CATEGORIES: readonly {
  id: ConsentCategory;
  label: string;
  description: string;
  /**
   * A locked category is always granted, is loaded without waiting for consent, and is
   * rendered as a disabled control. The gate reads this flag rather than the visitor's
   * stored state, so a stored `false` — from an older record, or from a hand-edited
   * localStorage entry — cannot switch it off.
   */
  locked: boolean;
}[] = [
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Counts visits and shows us which pages are read and which buttons are used. It tells us how the site performs, not who you are. This one is always on.",
    locked: true,
  },
  {
    id: "advertising",
    label: "Advertising",
    description:
      "Lets us measure whether our advertising reaches people who find the site useful, and reach similar people.",
    locked: false,
  },
  {
    id: "session_recording",
    label: "Session recording",
    description:
      "Records how pages are scrolled and clicked so we can see where the site is confusing. Text you type is masked and is never recorded.",
    locked: false,
  },
] as const;

/** Whether a category is always on and cannot be withdrawn. */
export function isLocked(category: ConsentCategory): boolean {
  return CONSENT_CATEGORIES.some((c) => c.id === category && c.locked);
}

/**
 * The state before anyone has chosen, and the floor every other state sits on: locked
 * categories on, everything else off.
 *
 * DERIVED, NOT WRITTEN OUT. If it were a literal, adding a fourth category or locking an
 * existing one would need this object edited to match, and the day someone forgets is
 * the day the baseline and the panel disagree about what is always on.
 */
export const CONSENT_BASELINE: ConsentState = CONSENT_CATEGORIES.reduce(
  (state, category) => {
    state[category.id] = category.locked;
    return state;
  },
  {} as ConsentState,
);

/** Everything on. What the Accept button stores — accept-only, so there is no middle. */
export const CONSENT_GRANTED: ConsentState = {
  analytics: true,
  advertising: true,
  session_recording: true,
};

/**
 * Force every locked category on, whatever the caller passed.
 *
 * Every state that reaches the gate goes through here. That is the single point where
 * "analytics is always on" is enforced, rather than a condition repeated at each of the
 * four places a state can come from — the panel, the Accept button, storage, and the
 * baseline. Four copies of a rule is three chances to write it differently.
 */
export function withLocked(state: ConsentState): ConsentState {
  const next = { ...state };
  for (const category of CONSENT_CATEGORIES) {
    if (category.locked) next[category.id] = true;
  }
  return next;
}

/**
 * What is written to localStorage. Short keys because this is machine-read only, and a
 * record a visitor inspects should be small enough to read in one line.
 */
export interface ConsentRecord {
  /** CONSENT_COPY_VERSION at the time of the choice. */
  v: string;
  /** ISO 8601, UTC. When the choice was made. */
  t: string;
  /** The three categories. */
  c: ConsentState;
}

/**
 * Read the stored record, or null.
 *
 * Returns null for a stale version as well as for absent or unparseable data, so every
 * caller treats "we do not have current consent" as one condition. A stale record is not
 * repaired or partially honoured: consent to an older sentence is not consent to this
 * one, and honouring half of it would be worse than asking again.
 *
 * localStorage throws rather than returning null in some privacy modes, so every access
 * in this file is guarded. A browser that will not let us remember the choice is a
 * browser where the banner shows every visit, which is the safe failure.
 */
export function readConsent(): ConsentRecord | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (!parsed || parsed.v !== CONSENT_COPY_VERSION || !parsed.c) return null;

    /* Take only the three keys we know. An unknown key in stored data is either a
     * category that was removed or something that was never ours, and neither should
     * reach the gate. */
    return {
      v: parsed.v,
      t: typeof parsed.t === "string" ? parsed.t : new Date().toISOString(),
      /* Passed through withLocked, so a stored `false` on a locked category — from a
       * record written before it was locked, or from a hand-edited storage entry —
       * cannot turn it off. */
      c: withLocked({
        analytics: parsed.c.analytics === true,
        advertising: parsed.c.advertising === true,
        session_recording: parsed.c.session_recording === true,
      }),
    };
  } catch {
    return null;
  }
}

/** Write a choice. Returns the record written so the caller does not rebuild it. */
export function writeConsent(state: ConsentState): ConsentRecord {
  const record: ConsentRecord = {
    v: CONSENT_COPY_VERSION,
    t: new Date().toISOString(),
    c: withLocked(state),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* Storage refused. The choice still applies to this page view — the gate acts on
     * the state it was handed, not on what came back from storage — it simply will not
     * survive the next navigation. Failing silently is right here: an error message
     * about storage would be noise to a visitor who has just answered a cookie banner. */
  }
  return record;
}
