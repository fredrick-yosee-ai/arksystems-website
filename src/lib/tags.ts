/**
 * The tag registry. ONE definition per tag, ONE gate that iterates them.
 *
 * The rule this file exists to enforce: adding a tag later is one entry plus an
 * identifier, with no change to the gate and no re-verification of it. Bespoke snippets
 * per tag is how a site ends up with four different ideas about what consent means, and
 * the fourth one is always the one that leaks.
 *
 * Every entry carries four things and there are no optional ones:
 *
 *   id/label   a stable key, and a human name for a console or a diff
 *   category   which consent toggle governs it
 *   load()     put the tag on the page, or resume it if it was turned off
 *   clear()    withdraw at the provider, and delete the cookies it set
 *
 * BOTH load() AND clear() MUST BE SAFE TO CALL REPEATEDLY. That is what lets the gate be
 * four lines with no bookkeeping of its own: it simply calls load() for every granted
 * category and clear() for every denied one, every time consent is applied. Each tag
 * owns the question of whether it is already running, because only the tag knows what
 * "already running" means for its own provider — and a gate that tracked it centrally
 * would be a second, competing source of truth about the same thing.
 *
 * That is why each definition below is built inside a closure holding an `injected`
 * flag. The flag is what makes a second load() a resume rather than a duplicate
 * page view, which is the difference between a visitor toggling a category twice and a
 * property with double-counted traffic.
 *
 * `clear()` IS NOT A FORMALITY. Turning a category off has to take something away, or
 * the panel is decoration. It does the most a page can do: tell the provider through its
 * own API, set whatever disable flag it offers, and delete its cookies.
 *
 * WHAT clear() CANNOT DO, stated plainly because it is a real limit and not a bug: a
 * script already fetched and executed stays in the page's memory until the next
 * navigation. Nothing a page can run removes it. What is achievable — no further
 * collection, no cookies, consent signals back to denied — happens immediately, and the
 * script is absent on the next page load because the gate never loads it again.
 * Third-party cookies on the provider's OWN domain (clarity.ms, linkedin.com) are
 * likewise not ours to delete; only the provider can.
 */
import { MEASUREMENT } from "../consts";
import type { ConsentCategory } from "./consent";

/** Meta's queue stub, which its own snippet builds by hand. Typed so the loader can
 * build the same thing without a cast on every line. */
type MetaPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    /* Google's own opt-out flag. Setting it stops an already-loaded gtag.js from
     * sending anything further for that measurement ID. */
    [key: `ga-disable-${string}`]: boolean | undefined;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    fbq?: MetaPixel;
    _fbq?: MetaPixel;
    _linkedin_partner_id?: string;
    _linkedin_data_partner_ids?: string[];
  }
}

export interface TagDefinition {
  /** Stable internal key. */
  id: string;
  /** For anyone reading a console or a diff. Not shown to visitors. */
  label: string;
  /** The toggle that governs this tag. */
  category: ConsentCategory;
  /**
   * Whether this tag participates at all.
   *
   * A disabled entry must be GENUINELY INERT: never loaded, no network request, and no
   * identifier required to build the site. It exists so the shape is proven — so that
   * enabling it later is a boolean and an identifier, and nothing else.
   */
  enabled: boolean;
  /** Load, or resume. Idempotent — see the note at the top of this file. */
  load: () => void;
  /** Withdraw at the provider and delete its cookies. Idempotent. */
  clear: () => void;
}

/* --- Helpers ------------------------------------------------------------- */

/**
 * Delete a cookie by name, across the domain and path variants a third-party script may
 * have set it on.
 *
 * A cookie is identified by name AND domain AND path, so `document.cookie = "name=; …"`
 * with no domain only removes the one set on the exact current host. Analytics tags
 * routinely set theirs on the registrable domain with a leading dot so they work across
 * subdomains, and that one survives the naive version — which is how a "cleared" cookie
 * reappears in the inspector and the panel is quietly lying.
 *
 * So: try the host as-is, then each parent domain up the chain. Expiring a cookie that
 * does not exist is harmless, so trying more than necessary costs nothing.
 */
export function deleteCookie(name: string): void {
  const parts = window.location.hostname.split(".");
  const domains: (string | null)[] = [null];

  for (let i = 0; i < parts.length - 1; i++) {
    domains.push("." + parts.slice(i).join("."));
  }

  const expired = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

  for (const domain of domains) {
    document.cookie = name + expired + (domain ? "; domain=" + domain : "");
  }
}

/** Delete every cookie whose name starts with `prefix`. For `_ga_<ID>`, `_gcl_*`. */
export function deleteCookiesByPrefix(prefix: string): void {
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0]?.trim();
    if (name && name.startsWith(prefix)) deleteCookie(name);
  }
}

/**
 * Append a script tag. Every loader goes through this, so "what did we put on the page"
 * has exactly one answer.
 */
export function injectScript(src: string): void {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/* --- Google Analytics 4 — analytics. Enabled. ---------------------------- */

const googleAnalytics: TagDefinition = (() => {
  let injected = false;

  return {
    id: "ga4",
    label: "Google Analytics 4",
    category: "analytics",
    enabled: true,

    load() {
      /* Cleared first, and on every call. This is what makes a re-grant resume
       * collection: the script is still in the page from the first load, and Google's
       * own opt-out flag is the thing that was stopping it. */
      window["ga-disable-" + MEASUREMENT.ga4] = undefined;
      if (injected) return;
      injected = true;

      injectScript(
        "https://www.googletagmanager.com/gtag/js?id=" +
          encodeURIComponent(MEASUREMENT.ga4),
      );
      window.gtag("js", new Date());
      window.gtag("config", MEASUREMENT.ga4);
    },

    clear() {
      window["ga-disable-" + MEASUREMENT.ga4] = true;

      /* `_ga` is the client ID and `_ga_<STREAM>` the session state; `_gid`, `_gat*` and
       * `_gac_*` are older or campaign-linked and are cleared whether or not this
       * property sets them. Deleting a cookie that was never there costs nothing;
       * missing one that was is the failure that makes the panel untrue. */
      deleteCookie("_ga");
      deleteCookie("_gid");
      deleteCookiesByPrefix("_ga_");
      deleteCookiesByPrefix("_gat");
      deleteCookiesByPrefix("_gac_");
    },
  };
})();

/* --- Meta Pixel — advertising. Enabled. ----------------------------------
 *
 * THE <noscript> FALLBACK PIXEL IS DELIBERATELY NOT BUILT. Meta's standard snippet ships
 * an <img> inside <noscript> that requests connect.facebook.net the moment the document
 * parses. There is no way to gate an image in the markup: it fires before any script
 * could ask about consent, for every visitor, on every page. Including it would put a
 * request to Meta on the page of someone who has consented to nothing, which is the one
 * thing this release exists to prevent. Its only purpose is to count visitors with
 * JavaScript disabled — who by definition cannot be shown a consent banner either, so
 * there is nothing there we would be entitled to count.
 *
 * ADVANCED MATCHING IS OFF, enforced here as well as in Events Manager: `fbq('init', id)`
 * is called with the ID alone and no second argument. A second argument is how advanced
 * matching is turned on in code, and it sends hashed email addresses — which would turn
 * a page-view counter into a transfer of personal information and change what the
 * Privacy page has to say. Do not add one.
 * ------------------------------------------------------------------------- */

const metaPixel: TagDefinition = (() => {
  let injected = false;

  return {
    id: "meta",
    label: "Meta Pixel",
    category: "advertising",
    enabled: true,

    load() {
      if (injected) {
        /* Already on the page and previously revoked. Grant again rather than
         * re-initialising, which would send a second PageView for one visit. */
        try {
          window.fbq?.("consent", "grant");
        } catch {
          /* Nothing to resume. */
        }
        return;
      }
      injected = true;

      const queued: MetaPixel = function (...args: unknown[]) {
        queued.callMethod
          ? queued.callMethod.apply(queued, args)
          : queued.queue.push(args);
      } as MetaPixel;

      queued.push = queued;
      queued.loaded = true;
      queued.version = "2.0";
      queued.queue = [];

      window.fbq = queued;
      window._fbq = window._fbq || queued;

      injectScript("https://connect.facebook.net/en_US/fbevents.js");

      /* ID alone. See the note above on advanced matching. */
      window.fbq("init", MEASUREMENT.metaPixel);
      window.fbq("track", "PageView");
    },

    clear() {
      try {
        window.fbq?.("consent", "revoke");
      } catch {
        /* Not loaded, or a version without the call. The cookies still go. */
      }

      /* `_fbp` is the browser ID Meta sets on our domain; `_fbc` records the click ID
       * from an ad landing. Both are first-party and both are ours to delete. */
      deleteCookie("_fbp");
      deleteCookie("_fbc");
    },
  };
})();

/* --- Microsoft Clarity — session recording. Enabled. ---------------------
 *
 * CLARITY IS GATED BY ABSENCE, NOT BY A SIGNAL. It takes no part in Consent Mode and is
 * not asked to behave itself: before consent its script is simply not on the page, and a
 * script that was never fetched cannot record. Simpler than a signal, and strictly
 * stronger, because it does not depend on the provider honouring anything.
 *
 * The queue stub is Clarity's own initialiser, written out rather than pasted as an IIFE
 * so that what it does is legible: it makes `window.clarity` a function that pushes its
 * arguments onto a queue, which the real script drains when it arrives.
 *
 * ONE HONEST LIMIT. Turning session recording off calls Clarity's own stop and consent
 * withdrawal and deletes both first-party cookies, immediately. Turning it back ON in
 * the same page view attempts a resume through the same API, and whether that restarts a
 * stopped recorder mid-page depends on the Clarity version in the field — which we do not
 * pin and cannot see. What is certain either way: recording resumes on the next page
 * load, and while it is off no cookies exist and stop has been called. The uncertainty is
 * on the side of recording less than the visitor allowed, never more.
 * ------------------------------------------------------------------------- */

const clarity: TagDefinition = (() => {
  let injected = false;

  return {
    id: "clarity",
    label: "Microsoft Clarity",
    category: "session_recording",
    enabled: true,

    load() {
      if (injected) {
        try {
          window.clarity?.("start");
        } catch {
          /* See the note above. */
        }
        try {
          window.clarity?.("consent");
        } catch {
          /* Same. */
        }
        return;
      }
      injected = true;

      if (!window.clarity) {
        const queued: ((...args: unknown[]) => void) & { q?: unknown[] } = function (
          ...args: unknown[]
        ) {
          (queued.q = queued.q || []).push(args);
        };
        window.clarity = queued;
      }

      injectScript(
        "https://www.clarity.ms/tag/" + encodeURIComponent(MEASUREMENT.clarity),
      );
    },

    clear() {
      /* Both calls are guarded because Clarity's control API has changed across versions,
       * and a call this page cannot make must not stop the cookie deletion below it —
       * which is the part the visitor can see in their own browser. */
      try {
        window.clarity?.("stop");
      } catch {
        /* Not available in this version. The cookies still go. */
      }
      try {
        window.clarity?.("consent", false);
      } catch {
        /* Same. */
      }

      /* The first-party pair: `_clck` is the persistent user ID, `_clsk` the session.
       * `CLID` and `MUID` are set on clarity.ms and Microsoft's own domains and are not
       * ours to delete — said rather than left out, so nobody reads this list as complete
       * when it is only complete for the part a page can reach. */
      deleteCookie("_clck");
      deleteCookie("_clsk");
    },
  };
})();

/* --- LinkedIn Insight Tag — advertising. DISABLED, deferred. -------------
 *
 * Present with its real loader and its real cleanup so the registry's shape is proven
 * rather than asserted. It is genuinely inert: `enabled` is false so the gate never calls
 * it, and the loader would refuse anyway while the partner ID is empty. No network
 * request is made, and the site builds with no identifier supplied.
 *
 * To switch it on: fill `linkedInPartnerId` in consts.ts and set `enabled` to true.
 * Nothing in the gate changes, and nothing about consent needs re-verifying.
 * ------------------------------------------------------------------------- */

const linkedInInsight: TagDefinition = (() => {
  let injected = false;

  return {
    id: "linkedin",
    label: "LinkedIn Insight Tag",
    category: "advertising",
    enabled: false,

    load() {
      if (injected || !MEASUREMENT.linkedInPartnerId) return;
      injected = true;

      window._linkedin_partner_id = MEASUREMENT.linkedInPartnerId;
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(MEASUREMENT.linkedInPartnerId);
      injectScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
    },

    clear() {
      /* Only the first-party ones are ours to remove. `bcookie` and `lidc` are set on
       * linkedin.com and can be deleted by LinkedIn alone — worth saying rather than
       * quietly omitting, because a reader will otherwise assume the list is complete. */
      deleteCookie("li_sugr");
      deleteCookie("li_gc");
      deleteCookie("UserMatchHistory");
      deleteCookie("AnalyticsSyncHistory");
    },
  };
})();

/* --- Google Ads — advertising. DISABLED, deferred. Same terms as above. --- */

const googleAds: TagDefinition = (() => {
  let injected = false;

  return {
    id: "google-ads",
    label: "Google Ads",
    category: "advertising",
    enabled: false,

    load() {
      if (injected || !MEASUREMENT.googleAds) return;
      injected = true;

      injectScript(
        "https://www.googletagmanager.com/gtag/js?id=" +
          encodeURIComponent(MEASUREMENT.googleAds),
      );
      window.gtag("js", new Date());
      window.gtag("config", MEASUREMENT.googleAds);
    },

    clear() {
      /* The Google Ads click identifiers. `_gcl_au` is the first-party one that does the
       * work; the others appear depending on which click types have been seen. */
      deleteCookiesByPrefix("_gcl_");
    },
  };
})();

/**
 * The registry. THE GATE ITERATES THIS AND KNOWS NOTHING ELSE.
 *
 * Order is load order for a visitor who accepts everything at once, and it is not
 * significant — no entry depends on another. Adding a sixth tag is an entry here and an
 * identifier in consts.ts. If adding one requires editing the gate, the entry is wrong,
 * not the gate.
 */
export const TAGS: readonly TagDefinition[] = [
  googleAnalytics,
  metaPixel,
  clarity,
  linkedInInsight,
  googleAds,
] as const;
