/**
 * The gate. It is four lines of decision, and that is the point.
 *
 * Everything specific to a provider lives in `tags.ts`; everything about what the
 * visitor agreed to lives in `consent.ts`. This file joins them and holds no knowledge
 * of its own. Adding a sixth tag must not require reading this file, let alone editing
 * it — if it ever does, the new entry is wrong rather than the gate.
 *
 * CONSENT MODE IS SYNCHRONISED HERE, NOT IN THE TAGS, because its four signals are
 * properties of a CATEGORY rather than of a tag. `analytics_storage` describes what the
 * visitor allowed, not what Google Analytics happens to be doing, and both Google tags
 * read the same signals. Setting them per-tag would mean two entries writing the same
 * four values and a live question about which one wrote last.
 */
import {
  CONSENT_BASELINE,
  withLocked,
  type ConsentCategory,
  type ConsentState,
} from "./consent";
import { TAGS } from "./tags";

/**
 * What is in force right now, for this page view.
 *
 * It starts at the baseline — locked categories on, everything else off — not at
 * "unknown". There is no third state anywhere in this system: a visitor who has not
 * answered gets exactly what a visitor who turned everything off gets. Collapsing the
 * two is what makes it impossible to write a branch that treats "not asked yet" as
 * permission for anything beyond the baseline.
 */
let current: ConsentState = { ...CONSENT_BASELINE };

/** The state in force. For callers deciding whether an event may be sent. */
export function consentState(): ConsentState {
  return { ...current };
}

/** Whether one category is granted right now. */
export function hasConsent(category: ConsentCategory): boolean {
  return current[category] === true;
}

/**
 * Push the four Consent Mode v2 signals to match the state.
 *
 * `ad_storage`, `ad_user_data` and `ad_personalization` all follow the single
 * advertising toggle. Splitting them into separate switches would mean asking a visitor
 * to distinguish between storing an advertising identifier and using it for
 * personalisation, which is a distinction the panel cannot explain honestly in a
 * sentence — and a toggle nobody can explain is a toggle nobody can meaningfully answer.
 */
function syncConsentMode(state: ConsentState): void {
  const advertising = state.advertising ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    analytics_storage: state.analytics ? "granted" : "denied",
    ad_storage: advertising,
    ad_user_data: advertising,
    ad_personalization: advertising,
  });
}

/**
 * Apply a consent state: signals first, then every enabled tag.
 *
 * Safe to call as often as you like, which is why it can be this short. Both `load()`
 * and `clear()` are required to be idempotent — see the note at the top of `tags.ts` —
 * so the gate keeps no record of what it has already done and cannot disagree with
 * itself about it.
 *
 * SIGNALS GO FIRST, AND THAT ORDER MATTERS. A tag loaded before the update would read
 * the denied defaults set in the head and behave as though consent had not been given.
 */
export function applyConsent(state: ConsentState): void {
  /* Every state entering the gate passes through withLocked, so a locked category is on
   * no matter what the caller believed. See the note on CONSENT_CATEGORIES: this is the
   * one place that rule is enforced, and the panel, the Accept button, storage and the
   * baseline all arrive here rather than each applying it themselves. */
  current = withLocked(state);
  syncConsentMode(current);

  for (const tag of TAGS) {
    /* A disabled tag is never loaded and never cleared. It has nothing on the page to
     * clear, and calling into it would be the one thing that could make it not inert. */
    if (!tag.enabled) continue;

    if (current[tag.category]) {
      tag.load();
    } else {
      tag.clear();
    }
  }
}
