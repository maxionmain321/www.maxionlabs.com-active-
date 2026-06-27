# PLAN.md — Landing-page variant loop (Maxionlabs)

**Branch:** harness/landing-variants  
**Date:** 2026-06-27  
**Variants:** 3 (v1 dream-outcome-led, v2 long-form DR, v3 minimalist/Iles)

---

## Eval Loop Design

- **Reward:** mean of 6 rubric dimensions per variant (1-5 scale)
- **Gate:** `npm run build` + `npm run lint` + `npm run test:run` all exit 0
- **Max cycles:** 3
- **Done:** every variant mean >= 4.0/5.0, no disqualifying 1 on Voice Floor or Honesty
- **Per-cycle fix:** fix only the lowest-scoring dimension in the failing variant; plateau = commit best
- **Order:** v1 → v2 → v3 (sequential builds, one dev-server port)

---

## Rubric (copied from .harness/landing-rubric.md)

### Dimension 1 — Voice Floor (DISQUALIFYING if 1)
- 5: Reads like Max said it to a peer. Zero banned patterns. Survives talk-test on every load-bearing line.
- 1 (DQ): Any em/en dash; any of: delve, leverage(verb), robust, seamless, unlock, elevate, supercharge; "not just X, it's Y"; perfect tricolons; adjective stacking; summary-closer; recites prospect's info back.
- Evidence MUST be a grep: `grep -nE "—|–|\bdelve\b|\bleverage\b|\brobust\b|\bseamless\b|\bunlock\b|\belevate\b|\bsupercharge\b" app/v{N}/ components/sections/v{N}/` → must return empty.

### Dimension 2 — Message Match + Clarity
- 5: Cold visitor knows WHO it's for, WHAT the offer is, NEXT step within 5 seconds. Headline states dream outcome or locked public hook. One idea per section. Grade-5 reading level.
- 1: Clever-but-vague hero; visitor must scroll to understand offer; competing messages in one block.
- Public message ONLY (no tier table, no margins).

### Dimension 3 — One Clear CTA + Friction
- 5: One primary action repeated (hero + final CTA), both wired to Cal embed (`@calcom/embed-react`). No competing CTAs. Scarcity/proof near button. Mobile tap targets fine.
- 1: Multiple competing CTAs, dead button, or CTA buried below fold with no repeat.

### Dimension 4 — Structure Integrity (experiment variable)
- 5: Named structure fully and recognizably implemented; section order matches pattern; genuinely DIFFERENT take from live page.
- 1: Structure named but page is just live layout with swapped words.

### Dimension 5 — Build + Design Quality
- 5: `npm run build` + `lint` + `test:run` exit 0. Renders clean desktop (1440) + mobile (390), no console errors. Uses existing Tailwind tokens + framer-motion consistently.
- 1: Build breaks, console errors, or invents new color/spacing system.

### Dimension 6 — Honesty (DISQUALIFYING if 1)
- 5: Every number, testimonial, logo, claim traces to CONTENT.md or labeled [PLACEHOLDER].
- 1 (DQ): Any fabricated metric, fake testimonial, invented client result.

---

## Facts Available (from CONTENT.md + offer-stack.md)

Real numbers allowed in copy:
- 7 active B2B clients (as of May 2026)
- 92K emails sent
- 287 interested engaged leads
- 8 qualified meetings guaranteed in 90 days
- 90-day pilot
- $9K flat fee (public, one-time)
- "Pay us ONCE to find out if cold email will work for you (90 days, no retainer)" — locked public hook

NOT public / NEVER expose:
- Internal daily volume cap (5,000 emails/day)
- Tier table, margins, COGS, L2 pricing
- Split-pay options
- LTGP computation methodology

Any number not in CONTENT.md → label [PLACEHOLDER]

---

## Voice Constraints (from voice.md)

Hard kills (binary — any one = rewrite):
- No em dashes (— or –)
- No: delve, leverage (verb), navigate, unlock, synergize, robust, ecosystem, paradigm, spearhead, holistic, seamless, solution, dive deep, deep dive, game-changer, supercharge, elevate
- No throat-clearing openers: "here's the thing", "the truth is", "let me be clear"
- No emphasis crutches: "let that sink in", "make no mistake", "full stop."
- No crafted aphorism closers
- No "thoughts?" / "ready to get started?" CTAs
- Talk test every load-bearing line — can Max say it to a peer on a Zoom?

---

## Phase 1: v1 — Dream-Outcome-Led

**Route:** `app/v1/page.tsx` + `components/sections/v1/`  
**Structure:** Dream-outcome-led (Hormozi/Iles) — open on after-state, then mechanism, then proof, then de-risk  
**Mentor principles applied:**
- 1.5 (Haynes): stack two desires (time freed + pipeline), hero block
- 2.3 (Iles): reframe metric from meetings → closed revenue within first two scrolls
- 8.1 (Iles): desirability before quality — optimize want-signal first
- 4.2 steps 1-4 (Iles): hook → reframe → push-away → mechanism
- 3.2 (Iles): guarantee the conservative floor (8 meetings), not upside
- X.1 (Iles): one claim per section, completeness is the AI tell

**Section order:**
1. `v1/V1Nav.tsx` — minimal top nav, logo + CTA button scrolling to embed
2. `v1/V1Hero.tsx` — dream after-state H1 + subhead + CTA button + guarantee pill (hero CTA)
3. `v1/V1DreamPain.tsx` — "right now your reps are grinding lists" + "here is what changes"
4. `v1/V1Mechanism.tsx` — how we validate offer frames before scaling (3S: problem/person/mechanism)
5. `v1/V1Stats.tsx` — 7 clients, 92K emails, 287 leads strip
6. `v1/V1Guarantee.tsx` — 8 meetings / money back card, mentor principle 3.4 (headline + PS)
7. `v1/V1CTA.tsx` — final CTA with Cal embed + "pay once" echo headline
8. `v1/V1Footer.tsx` — minimal footer

**Hero copy direction:**
- H1: leads with the after-state (reps closing, not prospecting)
- Sub: names the mechanism in one line (pay once, 90 days, qualified meetings)
- CTA button: "See if your business qualifies"
- No VSL in v1 (desirability-first, Iles: text beats video for cold)

---

## Phase 2: v2 — Long-Form Direct-Response

**Route:** `app/v2/page.tsx` + `components/sections/v2/`  
**Structure:** Long-form DR — hero → problem → mechanism → proof stack → offer → objection crush → guarantee → CTA  
**Mentor principles applied:**
- 1.3 (Gordon): mechanism headline for stage-3 market
- 2.1 (Gordon): 3S formula throughout
- 2.2 (Gordon): mechanism explains why past cold email failed
- 4.2 full block order (Iles): 10-block VSL sequence
- 5.6 (Gordon): 10-15 stacked case study one-liners for proof volume
- 6.1 (Iles/Gordon): "I tried cold email before" section — pre-empt with mechanism
- 6.3 (Iles): quantify cost of inaction
- 3.1 (Iles): two guarantees (entry + results)
- 8.4 (Iles): repeat guarantee as CTA PS

**Section order:**
1. `v2/V2Nav.tsx` — nav with CTA button
2. `v2/V2Hero.tsx` — mechanism headline + locked public hook + hero CTA button
3. `v2/V2Problem.tsx` — "I tried cold email and got nothing" named + why it failed
4. `v2/V2Mechanism.tsx` — 3S: specific problem, specific person, specific mechanism
5. `v2/V2ProofStack.tsx` — rapid-fire one-liners from 7 clients + stats strip (volume = trust signal)
6. `v2/V2Offer.tsx` — day-1 / day-14 / day-30 / day-90 plan (each step resolves an objection)
7. `v2/V2Objections.tsx` — "not for you if" + "how is this different from last time" + cost of inaction
8. `v2/V2Guarantee.tsx` — two guarantees side by side: entry + results
9. `v2/V2CTA.tsx` — Cal embed + guarantee echo as PS
10. `v2/V2Footer.tsx`

---

## Phase 3: v3 — Minimalist / Iles

**Route:** `app/v3/page.tsx` + `components/sections/v3/`  
**Structure:** Minimalist/clarity-first (Iles design lean) — short, high-whitespace, one bold claim per viewport, strong typographic hierarchy, single CTA repeated  
**Mentor principles applied:**
- 1.1 (Iles): guarantee as the headline promise (most persuasive hook)
- 4.1 (Iles): no VSL, text-first, one claim per section
- 7.3 (Haynes): "see if you qualify" CTA framing
- 6.4 (Iles): push-away strengthens pull for right buyers
- X.1 (Iles): completeness is the AI tell — one benefit, one proof, stop
- X.2 (Iles): no second price point on same page
- 8.4 (Iles): repeat headline as CTA PS
- 1.2 (Iles): visual open loop in hero (sub-line creates curiosity gap)

**Section order:**
1. `v3/V3Nav.tsx` — ultra-minimal nav, one CTA
2. `v3/V3Hero.tsx` — guarantee AS headline (Principle 1.1). Sub creates open loop. One CTA button.
3. `v3/V3Proof.tsx` — single stat strip (3 numbers, no narrative)
4. `v3/V3Claim.tsx` — one bold mechanism claim, full viewport
5. `v3/V3PushAway.tsx` — "this is NOT for you if" block (disqualification = trust)
6. `v3/V3CTABlock.tsx` — Cal embed, minimal frame, guarantee repeated above button
7. `v3/V3Footer.tsx`

Design notes for v3:
- Massive whitespace, large type, dark background with single accent color
- No cards, no borders on sections — pure typographic hierarchy
- framer-motion: simple fade-in only (no stagger complexity)
- Font: geist-sans, heavy weight H1, light weight body

---

## Routing

All variants use Next.js App Router. Each is fully self-contained:
- `app/v1/page.tsx` — imports only from `components/sections/v1/` + `components/ui/`
- `app/v2/page.tsx` — imports only from `components/sections/v2/` + `components/ui/`
- `app/v3/page.tsx` — imports only from `components/sections/v3/` + `components/ui/`

Shared allowed imports:
- `@/lib/animations` (existing animation tokens)
- `@/components/ui/*` (shadcn primitives)
- `@calcom/embed-react` (Cal embed)
- `framer-motion`
- `lucide-react` icons

**NEVER import from `@/components/sections/` (root) in variant files.**

---

## Mechanical Gate (per phase)

After building each variant, run:
```
npm run build && npm run lint && npm run test:run
```
All three must exit 0. A variant that breaks the build is BLOCKED, not COMPLETE.

---

## Commit Strategy

- Commit after each variant build: `feat(v1): dream-outcome-led variant`
- Commit after each cycle fix: `fix(v2): strengthen mechanism section for checker cycle 2`
- Never push.

---

## PROGRESS.md protocol

After each phase, append to PROGRESS.md:
```
## Phase N: v{N} — {Structure}
COMPLETE
Artifact: app/v{N}/page.tsx + components/sections/v{N}/
Proof: [command output showing build/lint/test:run passing]
Commit: [SHA]
Mentor principles: [cite which principles applied, per HARNESS requirement]
```
