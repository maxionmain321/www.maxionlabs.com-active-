# PROGRESS.md — Landing-page variant loop

## Planner phase
COMPLETE
Artifact: PLAN.md
Proof: file written, branch harness/landing-variants created
Commit: (pre-commit, see first maker commit SHA below)

---

## Phase 1: v1 — Dream-Outcome-Led
COMPLETE
Artifact: app/v1/page.tsx + components/sections/v1/
Mechanical gate: `npm run build` → exit 0
PROOF:
  Build: ✓ Compiled successfully in 4.0s
  Routes generated: /v1 (static)
  Voice: grep → returned empty (0 banned patterns)
  Files: 9 components (Nav, Hero, DreamPain, Mechanism, Stats, Guarantee, CTA, Footer) + page.tsx
  Mentor principles: 1.5 (stack desires), 2.3 (reframe metric), 8.1 (desirability first), 4.2 (hook/reframe/push/mechanism), 3.2 (guarantee floor), X.1 (one claim/section), 1.6 (verifiable facts), 3.4 (guarantee marketing asset)
  Copy voice: "Your reps close deals instead of prospecting" (dream outcome) + "We validate before scale" (mechanism)
Commit: 225314b — feat(v1): dream-outcome-led landing variant

## Phase 2: v2 — Long-Form Direct-Response
COMPLETE
Artifact: app/v2/page.tsx + components/sections/v2/
Mechanical gate: `npm run build` → exit 0
PROOF:
  Build: ✓ Compiled successfully in 3.6s
  Routes generated: /v1, /v2 (static)
  Voice: grep → returned empty (0 banned patterns, fixed em dash in comment)
  Files: 11 components (Nav, Hero, Problem, Mechanism, ProofStack, Offer, Objections, Guarantee, CTA, Footer) + page.tsx
  Mentor principles: 1.3 (mechanism headline), 2.1 (3S formula), 2.2 (mechanism explains failure), 4.2 (full block order), 5.6 (10-15 one-liners), 6.1 (pre-empt cold email objection), 6.3 (cost of inaction), 3.1 (two guarantees), 8.4 (guarantee PS)
  Copy voice: "We test four offer frames before single email scales" (mechanism) + "Three common failure modes" (problem names) + "$25K/month opportunity cost" (cost calc)
Commit: 206d495 — feat(v2): long-form direct-response landing variant

## Phase 3: v3 — Minimalist (Iles)
COMPLETE
Artifact: app/v3/page.tsx + components/sections/v3/
Mechanical gate: `npm run build` → exit 0
PROOF:
  Build: ✓ Compiled successfully in 2.2s
  Routes generated: /v1, /v2, /v3 (all static)
  Voice: grep → returned empty (0 banned patterns)
  Files: 7 components (Nav, Hero, Proof, Claim, PushAway, CTABlock, Footer) + page.tsx
  Mentor principles: 1.1 (guarantee as headline), 4.1 (text-first), 7.3 (see if qualify), 6.4 (push-away), X.1 (one claim/stop), X.2 (no second price), 8.4 (headline repeat PS), 1.2 (open loop)
  Copy voice: "8 qualified meetings in 90 days or full money back" (headline as guarantee) + "Meetings don't pay bills. Close rate does." (open loop) + "3 items max" disqualification
  Design: massive whitespace, 7xl type on hero, single accent color, zero cards/borders, simple fade-in only
Commit: 6d0f613 — feat(v3): minimalist (Iles) landing variant

---

## All variants mechanical gate verification
Ran: `npm run build` post-v3
Output:
  Routes ○ /v1, ○ /v2, ○ /v3 (all prerendered as static content)
  ✓ Compiled successfully
  No console errors
  TypeScript check passed
  Voice compliance: v1=pass, v2=pass, v3=pass

All three variants built successfully. Ready for checker eval loop.

<!-- Maker appends here after each variant -->
