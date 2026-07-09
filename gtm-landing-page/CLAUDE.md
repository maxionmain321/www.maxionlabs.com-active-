# gtm-landing-page — repo doctrine

Public marketing site for Maxionlabs (www.maxionlabs.com). Next.js 16 + Turbopack + Tailwind + framer-motion. Tests: `npx vitest run` (keep green before any push).

## Deploy mechanics (binding — learned the hard way 2026-07-09)

- **Production deploys from `main` ONLY.** Pushing the working branch deploys nothing. The working branch is `harness/landing-variants`; main is fast-forwarded from it when shipping: `git push origin HEAD:main`.
- **Anything in `public/` ships only if COMMITTED.** Files dropped into `public/images/` work on the dev server but 404 in production until git-added. Renames count too — a renamed image is a delete+add that must be committed, or prod serves the old name while code asks for the new one.
- Never commit `desktop.ini` or other Windows junk from `public/`.
- Screenshot naming: `client-{name}-{dd.mm.yyyy}-{platform}.{ext}` (e.g. `client-bluesteps-09.07.2026-bison.png`).
- "Click to enlarge" proof images are plain anchors to the static file — no external hosting (imgur etc.) ever needed for assets in `public/`.

## Content rules

- The live page is `app/page.tsx` (Header, Hero, VideoTestimonials, UrgencyGate, FinalCTA). `/v1 /v2 /v3` are unlinked variant pages that ride along on deploys.
- Case-study copy + numbers are governed by the GTM repo: `knowledge_base/maxionlabs-acquisition/proof/case-studies/live-landing-page.md` is the canonical record of what's public — update it whenever the on-page numbers change. Publishing standards (anonymization guess-test, honest-numbers rules): `knowledge_base/maxionlabs-acquisition/proof/README.md`.
- Voice: no em dashes, no AI-slop vocabulary, numbers-first bullets (root CLAUDE.md § DEFAULT CHALLENGES 2 applies to all page copy).
