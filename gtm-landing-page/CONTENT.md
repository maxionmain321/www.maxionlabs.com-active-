# Content guide

Where to find things when you need to update copy, testimonials, or activate the results page.

## Landing page blocks

| Block | File |
|---|---|
| Header + nav CTA | `components/sections/Header.tsx` |
| Hero (eyebrow pill, H1, subhead, CTA, scarcity, VSL) | `components/sections/Hero.tsx` |
| Live stats strip | `components/sections/LiveStatsStrip.tsx` + `app/api/live-stats/route.ts` |
| Video testimonials | `components/sections/VideoTestimonials.tsx` |
| Final CTA + Cal embed | `components/sections/FinalCTA.tsx` |
| Footer | `components/sections/Footer.tsx` |

## Adding a new video testimonial

File: `components/sections/VideoTestimonials.tsx`

1. Record the video and upload to YouTube.
   - Must be regular 16:9 video, **not a Short** (YouTube classifies any vertical <60s clip as a Short, which embeds poorly).
   - If your source is vertical (phone recording), re-encode with FFmpeg first:
     ```
     ffmpeg -i "input.mov" -filter_complex "[0:v]split=2[bg][fg];[bg]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=luma_radius=40:luma_power=2[bg_blur];[fg]scale=-1:1080[fg_scaled];[bg_blur][fg_scaled]overlay=(W-w)/2:0,format=yuv420p[v]" -map "[v]" -map 0:a? -c:v libx264 -preset medium -crf 18 -c:a aac -b:a 192k "output-16x9.mp4"
     ```
2. Grab the video ID from the YouTube URL (`https://youtu.be/VIDEO_ID`).
3. Add to the `testimonials` array at the top of the file. See the inline comment for the schema.
4. If cards look cramped with 3+ entries, change `md:grid-cols-2` → `md:grid-cols-3` in the grid className.

## Activating the `/results` (Case Studies) page

The page is scaffolded but archived at `app/_archive-results/page.tsx`. Next.js ignores folders starting with `_`.

**To activate:**

1. Rename the folder: `app/_archive-results` → `app/results`
2. Open `app/results/page.tsx` and fill in the `snapshots` array at the top:
   - Replace every `'TODO'` metric value with real numbers
   - Replace date ranges
   - Add `photo: '/testimonials/<file>.jpg'` pointing to a client photo in `public/testimonials/`
   - Get real quotes from each client before going live
3. Re-add the Results nav link in `Header.tsx`:
   ```tsx
   <a href="/results" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
     Results
   </a>
   ```
4. Push.

## Stats data source

`landing_page_stats` table in Railway Postgres. Written by the `campaign-intel-collector` Trigger.dev task (in the separate `gtm-context-os-quickstart` repo, not this one).

Columns:
- `positive_replies_30d` → shown as "engaged leads"
- `active_clients` → shown as "active clients"
- `pipeline_value_usd` → shown as "pipeline value"
- `meetings_booked_30d` → shown as "meetings booked" (currently always 0 — needs data source wired)

If the API returns 503 (no data), the strip renders zeros across the board rather than hiding. The ZERO_STATS fallback in `LiveStatsStrip.tsx` controls this.
