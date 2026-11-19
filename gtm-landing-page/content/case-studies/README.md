# Case studies: one data file per case, one template

Every page under `/results/<slug>` is rendered from a `CaseStudy` object in this folder by `components/results/CaseStudyPage.tsx`. The `/results` hub, the sitemap, the footer link and the tests read the same list (`index.ts`). There is no per-case page component to write.

## Add a case

1. Copy the closest existing file (named client: `slipstream-engineering.ts`; anonymized: `construction-software.ts`) to `<slug>.ts`. The slug is the URL segment.
2. Fill every field. The shape and what each field is for are documented in `types.ts`. In short: `answer` opens with the result, for whom, in what time, and carries `results[0].value`; `situation` and `whatWeDid` are plain paragraphs; `results` is the headline number first, each with its `caveat`; `insuranceTakeaway` is one paragraph (the template adds the sentence linking appointment setting and pricing); `faq` and `sources` are read by the FAQ block and the sources list; `published` is the day the page goes live, `updated` moves on every content change.
3. Add the import and the list entry in `index.ts`, in hub order (biggest, most recent proof first).
4. Run `npx vitest run --testTimeout=30000`. `test/seo-audit.test.tsx` blocks 7 and 8 iterate over `CASE_STUDIES`, so the new case is checked for metadata, JSON-LD, structure, links, copy guards and its own `forbidden` list without any test change.
5. Build with `npx next build --webpack` and read the page at `/results/<slug>` before anyone else does.

## Proof rules, binding

- Quote only a row marked `QUOTABLE` in the OPS proof registry, `knowledge_base/maxionlabs-acquisition/proof/funnel-tracker.md`, inside that row's caveats. A row older than 7 days for an active client is refreshed from its named source first. Put the row name in `trackerRow` and the row's verified date in `verified`.
- Every number on the page is a `results[].value` with a `caveat` that names the row, the evidence tier, the verified date and how it may be quoted. A result without a caveat fails the tests. No number lives only in prose.
- Naming follows the row. `named` only when the row says named or public (the testimonials manifest has the cleared people). `anonymized` means a business type and nothing that identifies the company, and the tests also block the known client names on anonymized pages.
- Put the row's "never say" caveats in `forbidden` as regex strings. They are matched case-insensitively against the whole rendered page, alt text and JSON-LD included. Examples already in use: `cold email` on the career-services row, `removed` on the reputation row, `trial` on the AI-product row, the dashboard tile `94` on the tender row.
- Testimonials are verbatim from the source named in `said` (the manifest, a case-study file, a public video). Never from memory.
- A meeting is not a customer, a demo is not a contract, a signup is not a paid account. Say which one each number is, in the row's words, and use `resultsNote` when the reader needs the caveat too.
- The story (situation, what we did, timeline) states only what the client's `attribution.md`, `account.md` or case-study file supports. No invented quotes, details or dates. Two sources disagreeing on a date means the page gives no date.

## Copy rules, binding

Max's voice (`brand/voice.md` in OPS). Short plain lines, contractions on, the reasoning written out. No em or en dashes anywhere, no semicolons, no "Label: explanation" openers. Never "closer", "first meeting(s)", "sales appointment(s)", or "booked" as our unit (use "set" and "held"; `test/helpers/copy-guards.ts` enforces it). Never "$500". Position Maxionlabs as an outsourced outbound agency. The aggregate pipeline figure always travels with its method line (meetings times deal size) and is never called revenue.

## Hub

`/results` (`app/results/page.tsx`, `components/results/ResultsHub.tsx`) shows the two aggregate rows from `AGGREGATE` in `index.ts` and one card per case from `CASE_STUDIES`. Update `AGGREGATE` only from the two "All clients" registry rows.
