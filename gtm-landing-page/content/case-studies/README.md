# Case studies: one data file per case, one template

Every page under `/results/<slug>` is rendered from a `CaseStudy` object in this folder by `components/results/CaseStudyPage.tsx`. The `/results` hub, the sitemap, the footer link and the tests read the same list (`index.ts`). There is no per-case page component to write.

The page order is the one the case studies ChatGPT cites for owner proof questions share (OPS `knowledge_base/maxionlabs-acquisition/content/cited-case-study-patterns-2026-11-19.md`): the fact table and takeaways, the client's words, the story, the results with what counted under every number, the receipts, the insurance takeaway, the other cases, then the FAQ and sources.

## Add a case

1. Copy the closest existing file (named client: `slipstream-engineering.ts`; anonymized: `construction-software.ts`) to `<slug>.ts`. The slug is the URL segment.
2. Fill every field. The shape and what each field is for are documented in `types.ts`. In short: `answer` opens with the result, for whom, in what time, and carries `results[0].value`; `glance` is the fact table (Client, Industry, Who we reached, What we sent, The unit we counted, Engagement, Deal structure, Who counted, in that order where the row applies, the template adds the dates); `takeaways` is three or four bullets, the first carrying the headline result; `situation` and `whatWeDid` are plain paragraphs; `sampleEmail` is one email from the campaign as sent (below); `results` is the headline number first, each with its rendered `how` and its internal `caveat`; `evidence` is the captioned masked receipts under neutral paths (below); `insuranceTakeaway` is one paragraph (the template adds the sentence linking appointment setting and pricing); `faq` is the case's own questions (the template appends the cost question, and the naming question on anonymized pages that do not answer it); `sources` is read by the sources list; `published` is the day the page goes live, `updated` moves on every content change.
3. Add the import and the list entry in `index.ts`, in hub order (biggest, most recent proof first). Every other case page lists the new one under "The other cases" automatically.
4. Run `npx vitest run --testTimeout=30000`. `test/seo-audit.test.tsx` blocks 7 and 8 iterate over `CASE_STUDIES`, so the new case is checked for metadata, JSON-LD, structure, the glance and takeaways, the per-number definitions, the sample email, every image on disk with alt and a dated caption, links, copy guards and its own `forbidden` list without any test change.
5. Build with `npx next build --webpack` and read the page at `/results/<slug>` before anyone else does.

## The sample email (`sampleEmail`)

Every case shows one email from the campaign, rendered after "What we did" as "The email" (Max, 2026-11-19: "not the best performing one but a good one that worked"). How to pick and write it:

1. Find a campaign that produced real positive replies for this client. Postgres `replies` has `outbound_subject` and `outbound_body_rendered` per reply with `tier` (`positive_hot`) per `client` and `campaign_id`, so rank campaigns by hot replies and read a few bodies. Pick a solid one, not necessarily the top; a step-1 email with the offer in it beats a follow-up. For a client whose replies are not in Postgres, the campaign's `copy.md` under the client folder is the source.
2. Quote it as sent. Restore merge fields as `{{first_name}}`-style placeholders (first name, company, trade, city, sender name), resolve spintax to one variant, and keep every other word, including the client's own punctuation. Never a prospect's name, review, phone number or company. On an anonymized page replace the client's name, product and domain with `[the client]`; a named page keeps the signature as it went out. A step-2 email that quotes the step-1 thread is shown as step 1 only.
3. `why` is one rendered plain line on why it worked, from the campaign record or the reply data, with no new number in it. `source` is not rendered: the table and ids (or the file path) it was read from, so the next editor can check it.
4. An email with an em or en dash cannot ship as a faithful quote; pick another email. Spaced hyphens are fine. The anonymized tests block the client names on the rendered card too, and the card renders in a div so a quoted "PS:" opener does not trip the label-opener guard.

## Receipts (`evidence`)

Prefer one positive-reply screenshot and one dashboard or funnel screenshot per case, where a cleared asset exists. Cleared means a registry row marked showable (with the vault note), or an image already public on the homepage (`public/images/proof/*`, `public/images/client-*`), or a `proof/wins/*-masked*` file the registry references. Nothing else goes on a page without Max.

1. Open the image yourself before using it and read every visible string. An unmasked prospect name, email, phone number, or a client name or logo in a sidebar means the image stays off the page (the reputation client's platform dashboard shows the workspace name, so it is not used).
2. On an anonymized page the file is copied to `public/images/results/<business-type>-<what-it-shows>.<ext>` and referenced from there. The original stays where it was so the homepage keeps working. The tests require every image on an anonymized page to live under `/images/results/` with none of the anonymized client names in the path.
3. `alt` says what is in the picture in words. `caption` says exactly what the image shows, where it comes from, its date, and what it is not, inside the registry row's caveat ("one client-reported held demo, not a sale"; "a status note, not a count"). The caption may not carry a figure the row forbids (the tender dashboard's interested tile is in the pixels and in nowhere else).
4. The testimonial can carry its own `screenshot` (alt only, no caption), used when the image is the quote itself. A receipt that needs a caveat goes in `evidence` so the caveat is rendered.

## Proof rules, binding

- Quote only a row marked `QUOTABLE` in the OPS proof registry, `knowledge_base/maxionlabs-acquisition/proof/funnel-tracker.md`, inside that row's caveats. A row older than 7 days for an active client is refreshed from its named source first. Put the row name in `trackerRow` and the row's verified date in `verified`.
- Every number on the page is a `results[].value` with a rendered `how` (one plain sentence from the row's Definition column, what counted and who counted it) and an internal `caveat` that names the row, the evidence tier, the verified date and how it may be quoted. A result without either fails the tests. No number lives only in prose.
- `glance` and `takeaways` restate facts already on the page. They never introduce a number or a date the registry row or the client's attribution file does not state.
- Naming follows the row. `named` only when the row says named or public (the testimonials manifest has the cleared people). `anonymized` means a business type and nothing that identifies the company, and the tests also block the known client names on anonymized pages, image paths included.
- Put the row's "never say" caveats in `forbidden` as regex strings. They are matched case-insensitively against the whole rendered page, alt text and JSON-LD included. Examples already in use: `cold email` on the career-services row, `removed` on the reputation row, `trial` on the AI-product row, the dashboard tile `94` on the tender row.
- Testimonials are verbatim from the source named in `said` (the manifest, a case-study file, a public video). Never from memory.
- `evidence` images are cleared assets (see Receipts above) with a caption that says what system they come from, their date, and what they are not (a status record is not a count). On an anonymized page the file is re-hosted under `public/images/results/` with a neutral name; a path that carries the client's name fails the tests.
- Send counts come from the sending platform for the engagement window, measured on a date: `bison --workspace <name> workspaces-v1.1 stats --start-date --end-date` (the workspace dashboard figure), cross-checked against the Postgres stats tables. The `caveat` names the command, the window and the date, and says the figure is not yet on the registry row until it is added there. A window the platform cannot measure (an earlier platform whose backup is gone, lifetime snapshots with no window) is said out loud in `how`, or the count is left out.
- A meeting is not a customer, a demo is not a contract, a signup is not a paid account. Say which one each number is, in the row's words, and use `resultsNote` when the reader needs the caveat too.
- The story (situation, what we did, timeline) states only what the client's `attribution.md`, `account.md` or case-study file supports. No invented quotes, details or dates. Two sources disagreeing on a date means the page gives no date.

## Copy rules, binding

Max's voice (`brand/voice.md` in OPS). Short plain lines, contractions on, the reasoning written out. No em or en dashes anywhere, no semicolons, no "Label: explanation" openers. Never "closer", "first meeting(s)", "sales appointment(s)", or "booked" as our unit (use "set" and "held"; `test/helpers/copy-guards.ts` enforces it). Never "$500". Position Maxionlabs as an outsourced outbound agency. The aggregate pipeline figure always travels with its method line (meetings times deal size) and is never called revenue.

## To collect, per the cited-page patterns we could not fill from the registry

- A before number per case (what the client was getting a month before us). Not recorded; ask on the next client call.
- A send count for the email-infrastructure case. The platform snapshots are lifetime totals with no window, so none is quoted.
- A receipt for the AI-product case: no `wins/slipstream_*` file was ever filed, so the page has the email and the written testimonial only.
- A second receipt (a dashboard) for the reputation case: the only dashboard shows the client's name in the sidebar.
- Third-party review profiles (Clutch, G2, Trustpilot). Max, 2026-11-19: not for now.
- The three measured send counts (construction, reputation, career services) are on the pages with their caveats and still need adding to their registry rows.

## Hub

`/results` (`app/results/page.tsx`, `components/results/ResultsHub.tsx`) shows the two aggregate rows from `AGGREGATE` in `index.ts` and one card per case from `CASE_STUDIES`. Update `AGGREGATE` only from the two "All clients" registry rows.
