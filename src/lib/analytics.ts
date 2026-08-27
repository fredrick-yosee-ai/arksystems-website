/**
 * The two things this site actually measures: which block gets someone to click, and
 * whether a booking completed.
 *
 * THE RULE THAT GOVERNS EVERY LINE HERE: no personal information ever enters an event
 * parameter. No email address, no name, no company name, no booking title. Not hashed,
 * not truncated, not "just the first name". There is no legitimate reason for any of it
 * to be in an analytics event, and putting it there would breach Google's terms as well
 * as this project's own standing rule.
 *
 * Everything below sends either no parameters at all or one value chosen from a fixed
 * list written in `consts.ts`. Nothing is read from a page, a form, a URL or a payload.
 */
import { hasConsent } from "./consent-gate";

/**
 * GA4 event name for a CTA click. ONE event name, with the position as a parameter.
 *
 * The alternative — fifteen event names — was considered and is worse for the question
 * being asked. The repo's CTA labels contain hyphens (`acc-hero`, `ws-cost`) and GA4
 * event names cannot, so fifteen event names would mean fifteen NEW names invented here
 * that do not match the ones in `consts.ts`; two vocabularies for one thing, and the
 * page would stop being the record of what its own buttons are called. As a parameter
 * the labels travel exactly as written.
 *
 * IT COSTS ONE PIECE OF ACCOUNT SETUP: `cta_location` must be registered as a custom
 * dimension in GA4 (Admin → Custom definitions) before it appears in reports. It shows
 * in DebugView and the realtime view immediately, without that step. Nothing in the
 * repository can do it.
 */
const CTA_EVENT = "cta_click";

/**
 * GA4 event name for a completed booking. Mark this as a key event in GA4 so it is
 * available to funnel reports — that is account configuration, not code.
 */
const BOOKING_EVENT = "booking_completed";

/**
 * Meta's standard event for an appointment booked. A standard event rather than a custom
 * one because Meta's optimisation understands it; it is sent with NO parameters.
 */
const META_BOOKING_EVENT = "Schedule";

/**
 * Count a CTA click.
 *
 * Analytics consent only. Advertising is not consulted, because this event goes to GA4
 * and nowhere else — a CTA click is not sent to Meta, and a visitor who allowed
 * advertising but not analytics has not agreed to be counted here.
 */
function trackCta(location: string): void {
  if (!hasConsent("analytics")) return;

  window.gtag?.("event", CTA_EVENT, { cta_location: location });
}

/**
 * Bind CTA counting to every booking button on the page.
 *
 * Delegated on the document rather than bound per element, because the markup already
 * carries the label: `BookingButton.astro` renders `data-cta` on every instance, typed
 * as `CtaLocation`. That means a new CTA is counted the moment it is added, with no
 * corresponding edit here — and, more usefully, that a CTA CANNOT be added without a
 * label, because the component requires the prop.
 *
 * The value is read from our own markup and from nowhere else. It is one of a fixed set
 * of fifteen strings written in `consts.ts`; nothing derived from the visitor, the page
 * they came from, or anything they typed can reach it.
 *
 * Bubble phase on purpose. The Cal.com handler in BaseLayout runs in the capture phase
 * and calls preventDefault to keep the booker on the page — it does not stop
 * propagation, so this still runs, and it runs for the fallback navigation too.
 */
export function initCtaTracking(): void {
  document.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    const trigger = target?.closest?.("[data-cta]");
    if (!trigger) return;

    const location = trigger.getAttribute("data-cta");
    if (location) trackCta(location);
  });
}

/**
 * Forward a completed booking to GA4 and Meta.
 *
 * THE CALLBACK TAKES NO ARGUMENT, AND THAT IS THE POINT — not an oversight and not
 * something to "improve" by capturing the event for later use.
 *
 * Cal.com's `bookingSuccessfulV2` payload carries the booking UID, the title, the start
 * and end times, the event type and the video call URL. THE TITLE NORMALLY CONTAINS THE
 * ATTENDEE'S NAME. Passing any of it through would put a real person's name into a GA4
 * event parameter. So this function does not receive the payload, cannot read it by
 * accident, and forwards the FACT of a booking and nothing else. Both events are sent
 * with no parameters at all.
 *
 * FOUR KNOWN LIMITS, all accepted, none of them bugs:
 *
 *   - It does not fire for the plain <a href> fallback. That booking happens entirely on
 *     cal.com, where our page is not present to hear anything
 *   - It does not fire for a visitor who never accepted cookies. Deliberate: the embed
 *     always loads and always works, but the conversion is gated
 *   - It does not fire on a reschedule. A known Cal.com issue, not ours
 *   - The event name is versioned and has already changed once. If it stops firing, check
 *     Cal.com's current event name before concluding this listener is broken
 *
 * The first two undercount, which is the safe direction. CAL.COM'S OWN DASHBOARD REMAINS
 * THE SOURCE OF TRUTH for how many calls were booked; GA4 and Meta answer which traffic
 * produced them. The two numbers will not match and are not supposed to.
 */
export function initBookingConversion(): void {
  const cal = (window as unknown as { Cal?: (...args: unknown[]) => void }).Cal;
  if (typeof cal !== "function") return;

  cal("on", {
    action: "bookingSuccessfulV2",
    callback: () => {
      if (hasConsent("analytics")) {
        window.gtag?.("event", BOOKING_EVENT);
      }
      if (hasConsent("advertising")) {
        window.fbq?.("track", META_BOOKING_EVENT);
      }
    },
  });
}
