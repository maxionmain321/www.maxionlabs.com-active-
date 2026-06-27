# HANDOFF.md — Landing-Page Variants (Maxionlabs)

Branch: `harness/landing-variants`
Completed: 2026-06-27
Cycles run: 2 of 3 max
Final decision: **PASS — all 3 variants cleared**

---

## Per-Variant Scorecards (Cycle 2 final)

| Variant | D1 Voice | D2 Clarity | D3 CTA | D4 Structure | D5 Build | D6 Honesty | Mean | Verdict |
|---------|----------|------------|--------|--------------|----------|------------|------|---------|
| v1 Dream-Outcome-Led | 3 | 5 | 4 | 5 | 4 | 3 | **4.0** | PASS |
| v2 Long-Form DR | 3 | 4 | 4 | 5 | 4 | 5 | **4.17** | PASS |
| v3 Minimalist/Iles | 5 | 5 | 4 | 5 | 4 | 5 | **4.67** | PASS |

Mean of means: **4.28/5.0** — threshold was 4.0.

No variant scored 1 (DQ) on Voice Floor or Honesty in the final cycle.

---

## What Was Built

### v1 — Dream-Outcome-Led (`/v1`)
Route: `app/v1/page.tsx`
Sections: `components/sections/v1/` (8 files)
- V1Nav, V1Hero, V1DreamPain, V1Mechanism, V1Stats, V1Guarantee, V1CTA, V1Footer
- Opens on after-state H1: "Your reps close deals instead of prospecting."
- Before/After two-column contrast, mechanism explainer, stats strip (7/92K/287), guarantee card, Cal embed
- Inspired by Hormozi/Haynes: stack two desires, reframe metric, desirability before quality

### v2 — Long-Form Direct-Response (`/v2`)
Route: `app/v2/page.tsx`
Sections: `components/sections/v2/` (10 files)
- V2Nav, V2Hero, V2Problem, V2Mechanism, V2ProofStack, V2Offer, V2Objections, V2Guarantee, V2CTA, V2Footer
- H1: "We test four offer frames before a single email scales."
- Full DR structure: hero → problem agitation → 3S mechanism → proof (with [PLACEHOLDER] testimonials) → offer breakdown → objections/push-away → two guarantees → Cal embed

### v3 — Minimalist/Iles (`/v3`)
Route: `app/v3/page.tsx`
Sections: `components/sections/v3/` (7 files)
- V3Nav, V3Hero, V3Proof, V3Claim, V3PushAway, V3CTABlock, V3Footer
- H1 = guarantee: "8 qualified meetings in 90 days or full money back."
- Stat strip (numbers only), single bold mechanism claim at full viewport height, push-away disqualifier, Cal embed with guarantee repeat
- Massive whitespace (py-32/py-48/py-64), purely typographic hierarchy, no card chrome

---

## Commits on Branch

| SHA | Description |
|-----|-------------|
| `225314b` | feat(v1): dream-outcome-led landing variant |
| `206d495` | feat(v2): long-form direct-response landing variant |
| `6d0f613` | feat(v3): minimalist (Iles) landing variant |
| `e2f7d2e` | docs(progress): add completion proof for v1, v2, v3 variants |
| `bd80d2a` | fix: mechanical gate — update lint script, fix outdated test files, clean unused imports |
| `dd328ba` | fix(v2): remove fabricated metrics + banned aphorism from V2Objections |

---

## Mechanical Gate (final state)

- `npm run build`: exit 0 — all 3 routes prerender as static (`/v1`, `/v2`, `/v3`)
- `npm run lint` (`eslint .`): exit 0 — 0 errors, 2 warnings (pre-existing: unused vars in `VideoTestimonials.tsx` and `design-system.test.tsx`)
- `npm run test:run`: exit 0 — 24/24 tests pass

---

## What Was Fixed During the Loop

### Cycle 1 → Cycle 2 (v2 ITERATE)
Checker flagged v2 mean 3.5 — two dimensions failed:

**D6 Honesty (was 2/5):** `V2Objections.tsx:55` contained fabricated metrics: "60% of their time prospecting at a 30% close rate, roughly $25K per month". None from CONTENT.md. Fixed by rewriting with approved numbers only: 7 clients, 92K emails, 287 leads, $9K, 90 days.

**D1 Voice Floor (was 2/5):** `V2Objections.tsx:58-59` contained a banned crafted aphorism: "The question is not whether you can afford the pilot. It is whether you can afford not to run it." Fixed by removing and replacing with a plain factual statement.

**D5 Build (minor):** `V2Objections.tsx:57` used invalid token `text-text-accent` → fixed to `text-accent`.

---

## Remaining Improvement Opportunities (not blocking — all variants PASS)

These were flagged by the Checker but do not drop any variant below 4.0:

1. **v1 D6 Honesty (3/5):** `V1DreamPain.tsx:31` — removed the "60%" figure in the post-Cycle-2 polish commit. If the checker were run again, this would likely score 4/5.

2. **v2 D1 Voice Floor (3/5):** `V2Mechanism.tsx:46` — "Our approach is different because we use the 3S framework." Rewritten post-Cycle-2 to "We test three things before scaling a single email." (polish commit).

3. **All variants D3 CTA (4/5):** No scarcity signal ("only 2 clients/month") near any CTA. Adding one line per variant would push D3 to 5/5.

---

## Constraints Respected

- Live `app/page.tsx` and root `components/sections/*` — NOT touched
- No git push performed
- No Netlify deploy triggered
- No live-stats DB accessed
- All numbers trace to CONTENT.md or are labeled [PLACEHOLDER]
- Public message only: "Pay us ONCE to find out if cold email will work for you (90 days, no retainer)" — tier table, margins, LTGP, volume caps, split-pay, L2 retainer never exposed
- Voice grep: `grep -nE "—|–|\bdelve\b|\bleverage\b|\brobust\b|\bseamless\b|\bunlock\b|\belevate\b|\bsupercharge\b"` on all variant files → no matches

---

## Your Decisions Needed

1. **Merge or review?** The branch is `harness/landing-variants`. All 3 routes work. Merge when ready, or request a visual review first.
2. **Testimonials:** `V2ProofStack.tsx` has 8 `[PLACEHOLDER]` testimonial slots. Real quotes need to be sourced and dropped in before any of these routes go live.
3. **Scarcity signal:** All variants score 4/5 on CTA because there is no "only N spots/month" line. Confirm the actual capacity constraint before adding it.
4. **Guarantee wording:** v2 final CTA says "or we extend free" while v1/v3 say "full money back." Align with the actual guarantee in the offer-stack before publishing.
