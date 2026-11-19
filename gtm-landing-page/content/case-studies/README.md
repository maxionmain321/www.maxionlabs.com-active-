# Case studies: one data file per case, one template

Every page under `/results/<slug>` is rendered from a `CaseStudy` object in this folder by `components/results/CaseStudyPage.tsx`. The `/results` hub, the sitemap, the footer link and the tests read the same list (`index.ts`). There is no per-case page component to write.

The page order is the one the case studies ChatGPT cites for owner proof questions share (OPS `knowledge_base/maxionlabs-acquisition/content/cited-case-study-patterns-2026-11-19.md`): the fact table and takeaways, the client's words, the story, the results with what counted under every number, the receipts, the insurance takeaway, the other cases, then the FAQ and sources.

## Add a case

1. Copy the closest existing file (named client: `slipstream-engineering.ts`; anonymized: `construction-software.ts`) to `<slug>.ts`. The slug is the URL segment.
2. Fill every field. The shape and what each field is for are documented in `types.ts`. In short: `answer` opens with the result, for whom, in what time, and carries `results[0].value`; `glance` is the fact table (Client, Industry, Who we reached, What we sent, The unit we counted, Engagement, Deal structure, Who counted, in that order where the row applies, the template adds the dates); `takeaways` is three or four bullets, the first carrying the headline result; `situation` and `whatWeDid` are plain paragraphs; `results` is the headline number first, each with its rendered `how` and its internal `caveat`; `evidence` is the captioned masked receipts where the registry has one under a neutral path; `insuranceTakeaway` is one paragraph (the template adds the sentence linking appointment setting and pricing); `faq` is the case's own questions (the template appends the cost question, and the naming question on anonymized pages that do not answer it); `sources` is read by the sources list; `published` is the day the page goes live, `updated` moves on every content change.
3. Add the import and the list entry in `index.ts`, in hub order (biggest, most recent proof first). Every other case page lists the new one under "The other cases" automatically.
4. Run `npx vitest run --testTimeout=30000`. `test/seo-audit.test.tsx` blocks 7 and 8 iterate over `CASE_STUDIES`, so the new case is checked for metadata, JSON-LD, structure, the glance and takeaways, the per-number definitions, links, copy guards and its own `forbidden` list without any test change.
5. Build with `npx next build --webpack` and read the page at `/results/<slug>` before anyone else does.

## Proof rules, binding

- Quote only a row marked `QUOTABLE` in the OPS proof registry, `knowledge_base/maxionlabs-acquisition/proof/funnel-tracker.md`, inside that row's caveats. A row older than 7 days for an active client is refreshed from its named source first. Put the row name in `trackerRow` and the row's verified date in `verified`.
- Every number on the page is a `results[].value` with a rendered `how` (one plain sentence from the row's Definition column, what counted and who counted it) and an internal `caveat` that names the row, the evidence tier, the verified date and how it may be quoted. A result without either fails the tests. No number lives only in prose.
- `glance` and `takeaways` restate facts already on the page. They never introduce a number or a date the registry row or the client's attribution file does not state.
- Naming follows the row. `named` only when the row says named or public (the testimonials manifest has the cleared people). `anonymized` means a business type and nothing that identifies the company, and the tests also block the known client names on anonymized pages, image paths included.
- Put the row's "never say" caveats in `forbidden` as regex strings. They are matched case-insensitively against the whole rendered page, alt text and JSON-LD included. Examples already in use: `cold email` on the career-services row, `removed` on the reputation row, `trial` on the AI-product row, the dashboard tile `94` on the tender row.
- Testimonials are verbatim from the source named in `said` (the manifest, a case-study file, a public video). Never from memory.
- `evidence` images are registry rows marked showable, already under `public/images/proof/`, with a caption that says what system they come from and what they are not (a status record is not a count). An image whose file name carries an anonymized client's name stays off that page until it is re-hosted under a neutral path.
- A meeting is not a customer, a demo is not a contract, a signup is not a paid account. Say which one each number is, in the row's words, and use `resultsNote` when the reader needs the caveat too.
- The story (situation, what we did, timeline) states only what the client's `attribution.md`, `account.md` or case-study file supports. No invented quotes, details or dates. Two sources disagreeing on a date means the page gives no date.

## Copy rules, binding

Max's voice (`brand/voice.md` in OPS). Short plain lines, contractions on, the reasoning written out. No em or en dashes anywhere, no semicolons, no "Label: explanation" openers. Never "closer", "first meeting(s)", "sales appointment(s)", or "booked" as our unit (use "set" and "held"; `test/helpers/copy-guards.ts` enforces it). Never "$500". Position Maxionlabs as an outsourced outbound agency. The aggregate pipeline figure always travels with its method line (meetings times deal size) and is never called revenue.

## To collect, per the cited-page patterns we could not fill from the registry

- Receipts for the anonymized pages. The construction and reputation Slack receipts exist on the homepage under file names that carry the client name. Re-host under `/images/proof/<business-type>-<what>.jpg` and add them as `evidence`.
- A sample email per case ("The email" section on the cited Open Outbound page). Needs Max's clearance per client.
- A before number per case (what the client was getting a month before us). Not recorded; ask on the next client call.
- Send counts for the four cases without one (the registry rows do not carry them). Pull from the sending platform per client first.
- Third-party review profiles (Clutch, G2, Trustpilot) with the date read. None exist yet; Max's call whether to open one.

## Hub

`/results` (`app/results/page.tsx`, `components/results/ResultsHub.tsx`) shows the two aggregate rows from `AGGREGATE` in `index.ts` and one card per case from `CASE_STUDIES`. Update `AGGREGATE` only from the two "All clients" registry rows.
