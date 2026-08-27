# /privacy — Privacy Policy

**Page:** `/privacy`
**Status:** **Draft for legal review. Do not publish as written.** Your facts are in and retention is closed. Five identity and provider items remain bracketed, and a practitioner still has to read the result.
**Updated:** 26 August 2026, with the facts confirmed by Fredrick.

**Why this page is a launch blocker:** CASL requires a privacy basis for commercial electronic messages, PIPEDA requires that collection purposes be identified and that cross-border processing be disclosed, and the AI Opportunity Fit Form has carried an open `[Insert privacy-notice link]` placeholder since July. This page closes all three.

---

## Confirmed facts

| Item | Confirmed |
| --- | --- |
| Operating entity | ArkSystems, operated by **FoodyGuru Inc.** |
| Effective date | **26 August 2026** |
| Privacy Officer | **Fredrick** |
| Mailing address | **Not published.** Email only |
| Business number | **Not published** |
| Analytics | **Google Analytics 4** |
| Advertising | **Meta Pixel, LinkedIn Insight Tag, Google Ads conversion tag** |
| Prospect tracker | **Google Sheets** — covered by the Google Workspace row, no separate entry |
| Consent | Analytics and advertising both gated. See the section below |

| Retention | **24 months** enquiries · **90 days** operational data · **six years** engagement records |

**Still bracketed:** jurisdiction of incorporation for FoodyGuru Inc., Fredrick's surname, payment provider, password manager, and the model providers used in delivery. Retention is closed.

---

## The consent pattern — decided: accept-only

**Decided by Fredrick, 26 August 2026: a single Accept button, no decline option at the banner.** I recommended otherwise once and he has made the call. It's his risk to take and the rest of this file is built for it.

One item stays on the reviewer's list — not to reopen the decision, but because it is the sort of thing a lawyer should see rather than discover later: *the site uses Meta, LinkedIn and Google Ads pixels behind an accept-only banner, with withdrawal available afterwards. Is that position acceptable under PIPEDA and Quebec's Law 25?* If the answer comes back no, the change is one button.

**Two things make accept-only considerably more defensible, and both are cheap.** Build them.

1. **Withdrawal has to work.** A permanent **Cookie settings** link in the footer of every page, which turns the tags off and clears the cookies. Consent that cannot be withdrawn is the weakest version of this pattern; consent that can be withdrawn at any time from any page is a materially better position, and it costs an afternoon.
2. **Nothing fires until the button is clicked.** A visitor who reads the page and leaves without clicking is never tracked. That is what separates a banner from decoration.

**One wording note.** "I understand" and "Accept" are the same click, but they are not the same record. "I understand" says the visitor read a notice. "Accept" says they agreed to something. Since the click is being relied on as agreement, **label the button "Accept"** — it costs nothing and it is the more honest description of what is happening.

**One trigger to watch.** If you later run paid ads into Quebec, revisit this. Law 25 requires opt-in for tracking technologies, and buying traffic into that province is a different exposure from happening to receive a visitor from it.

---

## Build specification

**1. The banner.** Appears on first visit, on every page. Nothing loads behind it.

> **We use cookies.**
> We use cookies for analytics and advertising — Google Analytics, Meta, LinkedIn and Google Ads — to understand how the site is used and to measure our advertising. See our [Privacy Policy](/privacy). You can turn them off at any time in Cookie settings.
>
> **[ Accept ]**

**2. Google Consent Mode v2.** Set `analytics_storage`, `ad_storage`, `ad_user_data` and `ad_personalization` to denied by default; grant all four on Accept; set all four back to denied if the visitor later turns cookies off. This is the mechanism that makes GA4 and the Google Ads tag behave correctly before and after the click.

**3. No tag fires before Accept.** Not GA4, not Meta, not LinkedIn, not Google Ads. **Verify this in the browser's network tab rather than trusting the implementation** — a banner that sets cookies and loads the tags anyway is worse than no banner, because it documents an intention you didn't honour.

**4. Cookie settings, in the footer, on every page.** It opens a small panel with two toggles — Analytics, Advertising — and a save. This is the withdrawal mechanism, it is what section 4 of the copy points at, and it is the single most valuable thing in this specification given the accept-only choice.

**5. Record what was accepted and when.** Store the consent state and a timestamp in the visitor's own browser. If the banner text changes materially, treat stored consent as stale and ask again.

**6. GA4 configuration.**

- Data retention: **14 months** — not the 2-month default, not "do not expire"
- **Google signals: off.** It enables advertising features and cross-device identification you have no use for, and each one adds a disclosure obligation
- **No personal information in any event parameter, ever.** Email addresses, names and company names must never be passed into GA4 — it breaches Google's terms and turns an analytics record into a personal-information holding
- IP addresses are not stored in GA4 by default. Do not re-enable anything that changes that

**7. Pixel hygiene.** The Meta and LinkedIn tags support advanced matching, which sends hashed email addresses. **Leave it off.** It converts a page-view counter into a personal-information transfer, and it would change what this page has to say.

**8. Per-CTA events carry no personal data.** The specified events — hero / demo / what-happens / closing / nav — are click counts. Keep them that way.

---

## Page copy — draft

**H1**
> Privacy Policy

**Effective date line**
> Effective 26 August 2026. Last updated 26 August 2026.

**Opening**
> This policy explains what personal information we collect through arksystems.ca and in the course of our work, why we collect it, who processes it on our behalf, and how you can access or correct it. It applies to this website and to our dealings with clients and prospective clients.
>
> ArkSystems is operated by FoodyGuru Inc., a company incorporated in [CONFIRM: British Columbia], based in Metro Vancouver, British Columbia, Canada. In this policy, "we" and "us" mean FoodyGuru Inc. operating as ArkSystems.

---

### 1. Information you give us

> **When you email us.** Your email address, your name if you give it, and whatever you write. We use it to answer you.
>
> **When you book a call.** Your name, email address, the time you select, and anything you enter in the booking notes. This is collected through Cal.com, our booking provider, and is used to hold the appointment and prepare for the conversation.
>
> **When you complete one of our forms.** Our qualification and workshop preparation forms ask about your business, your processes, the software you use and the people involved. We use that information to determine whether we can help you, and to prepare properly if we can. These forms are hosted on Google Workspace.
>
> **When you become a client.** In the course of an engagement we may be given access to business information, systems and documents, and — depending on the work — to records that contain personal information about your own clients, customers or staff. What we do with that access, and what we keep afterwards, is set out on our [Data Handling page](/data-handling) and governed by our engagement agreement.

---

### 2. Information collected automatically

> **Server logs.** Our website is hosted by Netlify. Their servers record standard technical information about requests, including IP address, browser type and the pages requested. This is a normal function of web hosting and is used for delivery, security and troubleshooting. It happens regardless of your cookie choice, because without it the site cannot be served to you.
>
> **Analytics.** We use Google Analytics 4 to understand how the site is used: which pages are read, how visitors arrive, and which links are clicked. We use it to improve the site. We do not use it to identify you, and we never send your name, email address or company name to Google Analytics.
>
> **Advertising.** We use the Meta Pixel, the LinkedIn Insight Tag and Google Ads conversion tracking. These record that a browser visited particular pages on this site and report it to those platforms, which lets us measure whether our advertising works and show ads to people who have visited the site. The platforms may match that activity to an account you hold with them, under their own privacy terms.
>
> **Neither loads until you accept the cookie notice**, and you can turn both off at any time using the **Cookie settings** link in the footer of every page. Turning them off stops any further collection and clears the cookies from your browser.

---

### 3. Why we collect it

> We collect personal information for these purposes and no others:
>
> - To answer enquiries and correspond with you
> - To schedule and prepare for calls and meetings
> - To assess whether our services suit your business, and to scope, price and deliver work
> - To perform our contract with you, including invoicing and record-keeping
> - To understand how our website is used, so we can improve it
> - To measure and target our advertising, where you have accepted advertising cookies
> - To meet legal, tax and accounting obligations
>
> We do not sell personal information. We do not rent, trade or otherwise disclose it for anyone else's marketing purposes.

---

### 4. Consent

> **You give consent by providing your information.** When you email us, book a call or complete a form, you consent to us using that information for the purpose it was given.
>
> **Cookies.** Analytics and advertising cookies are not set until you accept the notice shown when you arrive. You can turn them off at any time — separately or together — using the **Cookie settings** link in the footer of every page. Turning them off takes effect immediately and clears the cookies already set.
>
> **Commercial email.** We may send you commercial electronic messages where Canada's Anti-Spam Legislation permits it — for example, where you have asked to hear from us, or where an existing business relationship applies. Every such message identifies us, gives our contact information, and includes a way to unsubscribe that works. If you unsubscribe, we keep a record of that request so we do not contact you again.
>
> **You can withdraw consent at any time**, subject to legal and contractual restrictions and reasonable notice. Write to us at the address in section 11. Withdrawing consent may mean we can no longer provide a service.

---

### 5. Service providers, and where your information is processed

> We use a small number of third-party providers to operate. Each processes information only for the purpose we engage it for.

| Provider | What it does | Where it processes data |
| --- | --- | --- |
| Netlify | Website hosting and delivery | United States |
| Google Workspace (Google LLC) | Email, documents, forms, and our prospect records | United States |
| Google Analytics 4 (Google LLC) | Website analytics, if you accept | United States |
| Google Ads (Google LLC) | Advertising measurement, if you accept | United States |
| Meta Platforms | Advertising measurement and audiences, if you accept | United States |
| LinkedIn (Microsoft) | Advertising measurement and audiences, if you accept | United States |
| Cal.com | Call booking | United States |
| [CONFIRM: payment provider] | Invoicing and payment | [CONFIRM] |

> **These providers store and process information outside Canada, principally in the United States.** While personal information is held in another country, it is subject to that country's laws and may be accessible to that country's courts, law enforcement and national security authorities under those laws. We use providers we consider reputable and require them to protect information to a comparable standard, but we cannot exclude that access.
>
> If your business cannot accept processing outside Canada, tell us before an engagement begins. It affects which tools we can use to deliver the work, and it is a normal thing to require.

---

### 6. What we do not do

> We do not sell, rent or trade personal information.
>
> We do not add you to a marketing list because you emailed us, booked a call, or downloaded something.
>
> We do not use your business information, your documents, or anything we see during an engagement to train AI models.
>
> Where a build uses third-party AI providers, we name them — and the tier — in writing before anything is connected, together with what their terms say about how inputs are handled. Their terms are theirs, and they change; what we commit to is that you see them before you decide, not afterwards.

**Build note — what changed here, and why.** An earlier draft promised that no provider would use your data for training. That promise isn't ArkSystems' to make: it depends on each provider's terms, which differ and which change without notice. A commitment you cannot enforce is the wrong kind of sentence to have on a privacy page, so it was cut on 26 August 2026.

What remains is what you do control: ArkSystems trains nothing, and the client sees each provider's terms before connection rather than after. That is weaker as a slogan and much stronger under examination — and it is still the paragraph a cautious prospect reads first, so keep it accurate.

---

### 7. How long we keep it

> **Enquiries that don't become work.** Emails, booking records and prospect notes are kept while there is a live conversation, and for 24 months after the last contact. Then they are deleted.
>
> **Client records.** Contracts, statements of work, proposals, requirements documents, workshop documents and invoices are kept for the length of the relationship and for six years after the end of the tax year they relate to, because Canadian tax law requires business records to be retained for that period.
>
> **Your operational data — we don't keep it.** Anything given to us to examine, test with or build against is working material, not a record. It is deleted within 90 days of the engagement closing. **We do not retain client operational data after an implementation.** Nothing of yours sits on our systems once the work is done.
>
> **Unsubscribe records** are kept indefinitely, because that is what makes an unsubscribe permanent.
>
> **Analytics data** is retained by Google Analytics for 14 months, then deleted.
>
> **Advertising data** is held by Meta, LinkedIn and Google under their own retention terms, which are theirs to publish rather than ours to summarize.

**Build note — where this differs from what you told me, and why.**

You said client basic records stay "until the business is alive", and that implementation records — requirements, contracts, agreements — stay as long as they are a client. Two adjustments were necessary, and one of your instructions was made stronger rather than weaker.

**Contracts and invoices cannot end when the relationship ends.** The CRA requires business records to be kept for six years from the end of the tax year they relate to. A client who leaves in year one still has an invoice you are obliged to retain. "As long as they are a client" is shorter than the law allows, so the copy states the six-year rule, which is both accurate and a better answer than an indefinite one.

**"Until the business is alive" is not a retention period.** PIPEDA's limiting principle says information is kept only as long as it is needed for the purpose it was collected for. Indefinite retention of contact records has no stated endpoint, which is the specific thing the principle is aimed at. The six-year tax rule supplies a defensible endpoint, and a prospect who never became a client has no tax basis at all — hence the 24-month proposal for enquiries.

**Your third instruction became the strongest line on the page.** "Nothing actual client data that's implemented or after implementation" is a genuine commercial advantage, and it is now stated plainly. A practice deciding whether to let an outside firm near their client files is asking exactly this. Verify it holds literally before launch, because it is quotable.

---

### 8. Safeguards

> We protect personal information with measures appropriate to how sensitive it is: access limited to those who need it, multi-factor authentication on accounts that hold client information, encryption in transit, and removal of access when an engagement ends.
>
> No system is perfectly secure, and we do not claim otherwise. If a breach occurs that creates a real risk of significant harm, we will notify affected individuals and the Office of the Privacy Commissioner of Canada as the law requires.

**Build note:** every measure listed must be one that is actually in place. Delete any line that isn't rather than treating it as an aspiration — an unmet security claim in a privacy policy is a worse exposure than a shorter list.

---

### 9. Your rights

> You can ask us what personal information we hold about you, ask for a copy, and ask us to correct anything inaccurate. Write to the address in section 11.
>
> We will respond within 30 days. If we need longer, we will tell you why and when to expect a response. If we cannot give you access, we will explain the reason.
>
> If you are not satisfied with how we have handled your information, you may complain to the Office of the Privacy Commissioner of Canada at priv.gc.ca, or to the Office of the Information and Privacy Commissioner for British Columbia at oipc.bc.ca.

---

### 10. Children

> This website is intended for businesses. We do not knowingly collect personal information from anyone under the age of majority.

---

### 11. Contact

> Questions about this policy, or requests for access or correction:
>
> **Fredrick [CONFIRM: surname], Privacy Officer**
> ArkSystems, operated by FoodyGuru Inc.
> hello@arksystems.ca
> Metro Vancouver, British Columbia, Canada

**Build note:** no mailing address, per your decision. PIPEDA requires an accessible contact route and a monitored email satisfies it. The one consequence worth knowing: a larger practice running a vendor assessment sometimes asks for a registered address, and you supply it on request rather than on the page.

---

### 12. Changes to this policy

> We update this policy when what we do changes. The effective date at the top shows when it last changed. Material changes affecting existing clients will be communicated directly rather than by quietly editing this page.

---

## [CONFIRM] — what remains

1. **Jurisdiction of incorporation** for FoodyGuru Inc. Almost certainly British Columbia; the page states it either way.
2. **Fredrick's surname.** The Privacy Officer has to be a named individual, and a first name alone reads as unfinished on the one page where it matters.
3. **Payment provider.**
4. **Nothing on retention.** All three windows are settled: 24 months for enquiries that never became clients, 90 days for operational data after an engagement closes, six years for engagement records under the CRA rule.

---

## After the blanks are filled

**A practitioner reviews this.** I am not a lawyer and this draft is not legal advice. It is organized so the review is short — facts assembled, decisions flagged, and one specific question put to them: whether an accept-only banner is defensible with three advertising pixels.

**The Fit Form placeholder gets closed.** Replace `[Insert privacy-notice link]` in the AI Opportunity Fit Form with `https://arksystems.ca/privacy` on the day this page goes live. That is the specific open item recorded in the handoff document since July.

**The banner and the Cookie settings panel are built and verified in the network tab.** Nothing may load before Accept, and turning cookies off afterwards must actually stop GA4, Meta, LinkedIn and Google Ads.

**The provider table is checked at every release.** Adding a tool without adding a row is how a privacy policy becomes inaccurate — quietly, and in the direction that matters.

---

## Sources consulted

- [Bill C-36: A Third Attempt at Federal Private-Sector Privacy Reform — Fasken](https://www.fasken.com/en/knowledge/2026/06/bill-c-36) — tabled 15 June 2026, first reading, replaces PIPEDA Part 1 with the PPCDA, penalties to the greater of $10M or 3% of gross global revenue
- [Canada tables Bill C-36: The Protecting Privacy and Consumer Data Act — DLA Piper](https://www.dlapiper.com/en-us/insights/publications/2026/06/canada-tables-bill-c36-the-protecting-privacy-and-consumer-data-act)
- [Canada: Private Sector Privacy Reform Returns — Baker McKenzie](https://www.bakermckenzie.com/en/insight/publications/2026/06/canada-private-sector-privacy-reform-returns)

**Note:** C-36 is at first reading and is not law. Nothing in this page depends on it. It is recorded here because it sets the direction, and because a consent pattern built to the weaker standard would need rebuilding if it passes substantially as tabled.
