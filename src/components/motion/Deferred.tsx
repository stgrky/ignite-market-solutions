"use client";

import dynamic from "next/dynamic";

/**
 * Decoration that loads after the page is interactive.
 *
 * All three animate continuously and none of them carry information: a
 * drifting gradient backdrop, a scrolling strip of practice types, and the
 * scroll-progress hairline. Shipping them in the first JS payload meant the
 * main thread was busy with ornament before a visitor could click anything.
 *
 * These live in a client component because `next/dynamic` with `ssr: false`
 * isn't allowed from a Server Component — the pages that use them are server
 * components, so the deferral has to happen behind this boundary.
 */

export const DeferredGradientMesh = dynamic(
  () => import("./GradientMesh").then((m) => m.GradientMesh),
  { ssr: false },
);

export const DeferredScrollProgress = dynamic(
  () => import("./ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false },
);

export const DeferredMarquee = dynamic(
  () => import("../site/Marquee").then((m) => m.Marquee),
  { ssr: false },
);
