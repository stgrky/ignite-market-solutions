# Ignite Market Solutions — site backlog

Pending tasks for the ignitemarket.solutions marketing site.

## Analytics
- [ ] **Add Google Analytics (GA4) to the site.**
  - Create a GA4 property in analytics.google.com → grab the Measurement ID
    (`G-XXXXXXXXXX`).
  - Wire it in cleanly via Next's first-party helper:
    `@next/third-parties/google` → `<GoogleAnalytics gaId="G-..." />` in
    `src/app/layout.tsx`. Keep the ID in an env var
    (`NEXT_PUBLIC_GA_ID`) so it's not hard-coded.
  - ♻️ Reusable: this is the same "basic Google Analytics included" line from
    the $333 client build — whatever pattern we ship here becomes the
    per-client GA setup.

## Conversion / lead capture
- [ ] Wire "Book a free intro call" to a real intake form (Typeform, per the
  business plan) → HubSpot. CTAs are mailto/anchor only right now.

## Polish / content
- [ ] Swap the abstract hero browser-mockup for a framed shot of real work
  (the live Get Dateable site).
- [ ] Confirm real social links + footer details.

## Business admin (not site code)
- [ ] EIN from irs.gov (free, ~10 min).
- [ ] Get Dateable: migrate the Webflow blog (CSV export → Sanity).
