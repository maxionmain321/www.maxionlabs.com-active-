# HARNESS.md — landing-page variant loop (Maxionlabs)

Task-specific harness for the goal: generate 3 fully-redesigned, self-contained landing-page
variants, each on its own route, each a DIFFERENT structure, scored to >=4.0/5.0.

## PLANNER_BRIEF
Read first, in order:
1. `.harness/skill-routing.md` (variant isolation rule + routing) and `.harness/landing-rubric.md` (the 6 scored dimensions — this IS the checker rubric, copy it into PLAN.md).
2. `CONTENT.md` (where current copy/testimonials/stats live — source of any REAL number).
3. `app/page.tsx` + `components/sections/*.tsx` (reference ONLY — for offer facts, brand tokens, Cal embed wiring; NOT a template to preserve. Variants are full redesigns.)
4. `.harness/reference/offer-stack.md` (public message only) + `.harness/reference/voice.md` (voice floor). Both are local copies, no cross-repo access needed.
6. `.harness/reference/mentors-landing.md` (Iles/Haynes/Gordon landing principles, distilled by section: hook, offer, guarantee, VSL 10-block order, proof, objections, CTA, desirability). EVERY variant draws from this; the v3 minimalist/Iles variant leans hardest on it.
5. `tailwind.config.js` + `styles/` (design tokens — reuse, do not invent a new system).

PLAN.md phases (one variant per phase, fully self-contained):
- Phase 1: Variant v1 — structure = DREAM-OUTCOME-LED. Route `app/v1/page.tsx` + `components/sections/v1/*`.
- Phase 2: Variant v2 — structure = LONG-FORM DIRECT-RESPONSE. Route `app/v2/page.tsx` + `components/sections/v2/*`.
- Phase 3: Variant v3 — structure = MINIMALIST / DANIEL ILES. Route `app/v3/page.tsx` + `components/sections/v3/*`.
Each variant is fully self-contained: its own Hero/body/CTA/footer in its `v{N}/` dir. Do NOT import root `components/sections/*`. Reuse only shadcn primitives in `components/ui/*` and Tailwind tokens.
Ordering: sequential (shared dev-server port + clean git boundary per variant). Turn split: ~22 turns/variant, leave ~6 for prover+checker per cycle.

Before drafting copy for any variant, the Maker MUST read `.harness/reference/mentors-landing.md` and note in PROGRESS.md which mentor principles it applied per variant (cite the section). Do not web-research or assume from memory; that file is the curated source.

## MAKER_ROUTING
- Phase 1 copy: `/write-x-post` voice engine + `/stop-slop` for every load-bearing line — artifact: `app/v1/` route + sections
- Phase 1 layout/design: direct (TSX + Tailwind + framer-motion) — artifact: same route
- Phase 2: same skills, structure = long-form DR — artifact: `app/v2/`
- Phase 3: same skills, structure = minimalist/Iles — artifact: `app/v3/`
- Final copy QA each phase: spawn `copy-reviewer` agent before the checker — hard gate: zero banned patterns, zero em dashes.
Commit at each phase boundary on branch `harness/landing-variants` (create it; NEVER push).

## PROVER_BRIEF
Feature intent: each variant route renders as a complete, persuasive landing page with a working CTA into the Cal embed, no console errors, responsive desktop + mobile.
How to exercise: start the dev server once in the background — `npm run dev` (Next on port 3000). For each variant, screenshot via Playwright: navigate `http://localhost:3000/v{N}` at 1440px wide (desktop) and 390px wide (mobile); capture console messages. Kill the dev server when all three are shot.
Auth: none.
Accept criteria: page renders (hero headline + at least one CTA visible), zero console errors, CTA element present and pointing at the Cal embed. Paste the screenshot paths + console output. If the dev server fails to boot in 2 attempts, return `broken` with the error and do NOT hang waiting.

## CHECKER_BRIEF
Artifacts to evaluate per variant: `app/v{N}/page.tsx` + everything under `components/sections/v{N}/`.
Rubric: the 6 dimensions in `.harness/landing-rubric.md`, scored 1-5 with `file:line` evidence.
Voice Floor and Honesty are DISQUALIFYING — a single banned pattern, em dash, or fabricated number caps that variant's mean at 2.5.
The Voice Floor score MUST cite a grep result: `grep -nE "—|–|\bdelve\b|\bleverage\b|\brobust\b|\bseamless\b|\bunlock\b|\belevate\b|\bsupercharge\b" app/v{N}/ components/sections/v{N}/` returning empty.
PASS threshold: mean >= 4.0/5.0 per variant, no disqualifying 1. Score each variant independently; one variant passing does not pass the others.

## LOOP_TRACKER
> Update this file as you complete each step. Check off items in order.

### Planner
- [x] HARNESS.md read
- [x] skill-routing.md + landing-rubric.md read
- [x] PLAN.md written: `gtm-landing-page/PLAN.md`

### Cycle 1
- [x] Maker: v1 dream-led — artifact: `app/v1/` — commit: `225314b`
- [x] Maker: v2 long-form DR — artifact: `app/v2/` — commit: `206d495`
- [x] Maker: v3 minimalist/Iles — artifact: `app/v3/` — commit: `6d0f613`
- [x] Mechanical gate: build + lint + test:run passed (commit: `bd80d2a`)
- [x] Prover: PROOF VERDICT received per variant — all 3 WORKS (screenshots in `.harness/screenshots/`)
- [x] Checker: CYCLE_LOG.md written: `gtm-landing-page/CYCLE_LOG.md`
- [x] Reward signal: v1 4.0/5.0  v2 3.5/5.0  v3 4.67/5.0 (threshold 4.0)
- [x] Verdict: ITERATE (v2 failed — D1 Voice Floor 2/5, D6 Honesty 2/5)

### Cycle 2 (if ITERATE)
- [x] Fix target: v2 V2Objections.tsx — fabricated metrics + banned aphorism + invalid token
- [x] Maker: changes applied — commit: `dd328ba`
- [x] Mechanical gate: passed (build:0, lint:0 errors, test:0 — 24/24 pass)
- [x] Prover: N/A (static fix only; render confirmed in Cycle 1 prover)
- [x] Checker: CYCLE_LOG.md updated (Cycle 2 section appended)
- [x] Reward signal: v1 4.0  v2 4.17  v3 4.67
- [x] Verdict: PASS — all variants cleared (mean of means: 4.28/5.0)

### Cycle 3 (if ITERATE again)
- [x] N/A — PASS achieved in Cycle 2

### Final
- [x] HANDOFF.md written: `gtm-landing-page/HANDOFF.md`
- [ ] HANDOFF.html written: `<path>`
- [ ] HANDOFF.excalidraw written: `<path>`
