# /data-handling — How We Handle Your Data

**Page:** `/data-handling`
**Status:** **Draft for review. Do not publish as written.** Less lawyer-dependent than Privacy or Terms, but it makes factual commitments about your working practice, so every line has to be one you actually keep.
**Updated:** 26 August 2026. Operating entity **FoodyGuru Inc.**; retention section rewritten against Fredrick's instruction that no client operational data is retained after implementation.

**What this page is for.** Privacy covers personal information collected through the website. This page covers the thing a prospective client actually worries about: what happens when ArkSystems is given access to their systems and, in some engagements, to records belonging to their own clients.

**Why it earns its place commercially.** For an accounting practice, this is the objection that ends the conversation if it isn't answered — and it is usually not asked out loud. The `/accounting` FAQ answers it in three sentences and links here for the rest. That division holds: the industry page stays a builder's page with no compliance framing, and the detail lives on a page the cautious reader chooses to open.

**Build note — the rule for this page.** Every measure stated here must be one that is in place today. This page is more exposed than the others, because a client who was told something here and finds otherwise during an engagement has a specific, quotable sentence. Where a practice isn't yet real, cut the line rather than softening it.

---

## Page copy — draft

**H1**
> How we handle your data

**Standfirst**
> Before an engagement starts, you should know exactly what we get access to, what we do with it, which tools it passes through, and what happens when the work ends. This page sets that out. If your firm has requirements of its own, tell us before we begin — it changes how we build, and that is a normal thing to specify.

---

### The principles

> Four commitments that hold across every engagement.

> **It stays in your systems.** What we build operates on accounts you own. ArkSystems does not run a platform that holds your records, and there is nothing of yours to retrieve or migrate if you stop working with us.

> **We take the least access that does the job.** Read-only where reading is enough. Scoped to the workflow, not the organization. If a step needs broader access, we ask for it specifically and say why.

> **Every tool in the path is named before it is connected.** You see the list — hosting, models, storage, anything the information passes through — in writing, before anything is switched on. Nothing gets added mid-engagement without telling you.

> **You set the boundary between automatic and reviewed.** Which steps run without a person, and which stop for one, is your decision. We build to it and we record what the system did at each step, so the record exists whether or not anyone asks for it.

---

### What we access, stage by stage

> **The 20-minute call.** Nothing. You describe the problem, we ask questions. No access, no documents, no credentials.

> **Discovery and the workshop.** Conversations, process walkthroughs, and figures about how the work runs — volumes, timings, who does what. Where we need to see a real example, we ask for a redacted one, and we work from screen-shares in preference to copies. We do not need your client records to establish where the cost sits.

> **Implementation.** Access to the systems the work touches, granted through your own administration and using accounts issued to us — never shared passwords, and never credentials sent by email. Access is scoped to what the build requires and no more.

> **Testing.** Synthetic or redacted data wherever the test can be run with it. Where a test genuinely requires live records, we agree that specifically, in advance, and limit it to what the test needs.

> **Once it's running.** The system touches whatever the workflow touches — and that is defined in writing before it's built, not discovered afterwards.

---

### Access, and how it ends

> Access is issued by you, through your own systems, so you can see it and remove it without asking us.
>
> Multi-factor authentication is used on every account that reaches client information. Credentials are held in a password manager, never in documents, email or chat.
>
> **When an engagement ends, access ends.** We ask you to remove our accounts and we confirm removal on our side within [CONFIRM: e.g. five business days]. If you want that earlier, or immediately, say so — it is your access to withdraw at any point and you do not need a reason.

---

### AI models specifically

> This is the part clients ask about most, so it is stated plainly.

> **Which providers.** There is no fixed list, because the answer is partly yours. Which models a build uses depends on what the work needs and on what your firm will accept — some practices have already approved a provider, some rule one out, some require processing to stay in a particular region. We propose what fits, you decide, and the providers and tiers are named in your engagement documents before anything is connected.

> **What each provider does with your inputs.** Providers differ, and their terms change. Before anything is connected, we tell you which providers your build uses, which tier, and what their terms say about how inputs are handled — including whether they are used for model training. You decide with that in front of you rather than afterwards.

> **Retention at the provider.** Providers may retain inputs briefly for abuse monitoring under their own terms. Those terms are named to you rather than summarized by us, so you can read them yourself.

> **What we keep out of models.** We design so that information a model does not need to do the job does not reach it. Where a step can run on a reference rather than the underlying record, it runs on the reference.

> **Where the processing happens.** Most major model providers process in the United States. If your firm requires processing to stay in Canada, tell us before the design is fixed — it constrains which providers can be used and it is far cheaper to know at the start than to rebuild.

---

### Where information is processed

> ArkSystems' own operations run on:

| Provider | Purpose | Region |
| --- | --- | --- |
| Google Workspace | Email, documents, forms, and our client and prospect records (Google Sheets) | United States |
| Netlify | Website hosting | United States |
| Cal.com | Call booking | United States |
| [CONFIRM: password manager] | Credential storage | [CONFIRM] |
| [CONFIRM: payment provider] | Invoicing | [CONFIRM] |

> **AI providers are not on this list, deliberately.** They are chosen per engagement rather than fixed in advance, for the reasons above, and every provider inside a delivered system is named — with its tier and its region — in that engagement's documents before anything is connected.

---

### What we keep after the work ends

> **We do not keep your operational data. Not during the engagement beyond what the work requires, and not after it.**
>
> Anything you give us to examine, test with or build against is working material, not a record. It is deleted within 90 days of the engagement closing, and nothing of yours remains on our systems once the work is done. The system we built runs on your accounts, holding your data, where it always was.
>
> What we do keep is the paperwork of the engagement:
>
> - **Contracts, proposals, statements of work, requirements documents, the workshop document and invoices** — kept for the length of the relationship and for six years after the end of the tax year they relate to, because Canadian tax law requires business records to be retained for that period
> - **Credentials and access** — removed at close, as above
> - **Backups** — copies in routine backups age out on the backup schedule rather than being deleted individually, which is [CONFIRM: 90 days]
>
> You can ask us to delete your business data earlier than the schedule above, and we will confirm in writing when it is done.

**Build note — this is the strongest section on the page, and it came from you.** "Nothing actual client data that's implemented or after implementation" is a commitment most firms in this space cannot make, because their product holds the data. Yours doesn't. It is stated first, in the shortest sentence available, because a practice deciding whether to let an outside firm near their client files is asking precisely this question.

**Build note — the six years is not a choice.** You said client records stay while they are a client. Contracts and invoices can't: the CRA requires business records for six years from the end of the tax year they relate to, and that obligation outlives the relationship. Stating the real rule is also a better answer than an indefinite one, because it has an end.

---

### If something goes wrong

> If a security incident affects your information, we tell you — promptly, with what we know at the time, rather than after an internal investigation concludes. We work with you to establish what was affected, and we support whatever notification your own obligations require.
>
> We do not claim that no incident can occur. What we commit to is that you hear about it from us, early.

---

### What stays your responsibility

> You remain responsible for your clients' information and for your own professional and regulatory obligations. We build to the boundaries you set; we do not determine what those boundaries should be, and nothing on this page is advice about your obligations.
>
> If your professional body, your insurer or a client contract imposes requirements on how information is handled or where it is processed, tell us at the start. Requirements are a design input. Discovered late, they are a rebuild.

---

### Questions

> If your firm has a security questionnaire, a vendor assessment or a data-processing agreement, send it before we start rather than after. We would rather answer it properly than discover halfway through that we cannot.
>
> hello@arksystems.ca
>
> ArkSystems is operated by FoodyGuru Inc., Metro Vancouver, British Columbia, Canada.

---

## What this page must never claim

**No certifications.** No SOC 2, ISO 27001, or any compliance standard ArkSystems does not hold. This is the single highest-risk claim available on a page like this, it is trivially checkable, and claiming it would destroy exactly the trust the page is built to earn.

**No guarantee of security.** "We do not claim that no incident can occur" is deliberate and stays.

**No insurance claim** unless the policy exists. If professional liability or cyber cover is in place, saying so is a genuine advantage on this page — but only once it is bound. [CONFIRM: both are listed as unevaluated in the operating plan.]

**No blanket no-training promise.** Removed 26 August 2026. Whether a provider trains on inputs depends on that provider's terms and tier, both of which change without notice, and a commitment ArkSystems cannot enforce is the worst kind to publish on this page. What the page commits to instead is disclosure: which providers, which tier, what their terms say, before connection. If a specific build genuinely runs on a no-training tier, say so **in that engagement's documents**, where it is a checkable statement about a named provider — never as a site-wide rule.

**No client names or examples**, here as everywhere.

---

## [CONFIRM] — the full list

1. **How the provider conversation runs on a call.** No longer a page item — providers are chosen per engagement and the page says so. What's worth settling internally is your default proposal and which providers you would decline to use, so the answer on a call is immediate rather than improvised.
2. **Password manager.** Which product.
3. **Payment provider.**
4. **The backup window** — 90 days for copies in routine backups to age out. Working material is settled at 90 days from the close of the engagement, and engagement records at six years per the CRA rule. Worth knowing that the two 90-day windows run in sequence rather than together: a file deleted on day 90 can persist in a backup taken before that, so the honest outside figure is 180 days. The page states the deletion commitment and names the backup schedule separately, which is accurate; do not merge them into one number.
5. **Access-removal window** after an engagement closes.
6. **Insurance.** Whether professional liability and cyber cover exist yet.
7. **Whether a data-processing agreement template exists** to offer clients who ask. Larger practices will ask, and having one ready is a differentiator against a firm that has to improvise.

---

## Where this page is referenced

| From | Treatment |
| --- | --- |
| `/accounting` FAQ, "Where does our client data go?" | Answered in three sentences, linking here for the detail |
| `/privacy` sections 1 and 7 | Links here for client-engagement data |
| Footer | Listed alongside Privacy and Terms |
| Proposals and engagement documents | Referenced, with the build-specific provider list attached |
