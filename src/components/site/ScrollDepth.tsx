"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Reports how far down a page people actually get.
 *
 * The homepage is long and its contact form sits at the very bottom, so
 * "people read for three minutes and leave" and "people never reach the
 * form" look identical in the numbers we have. Average time on the homepage
 * is 184 seconds against a 73% bounce rate, which says visitors are reading
 * rather than bouncing instantly — but nothing tells us whether they ever
 * see the thing we want them to click.
 *
 * Fires once per depth per page view, at 25/50/75/90%. Thresholds are
 * crossed on the way down only: scrolling back up does not re-fire, so a
 * single visitor cannot inflate the count.
 */
const MARKS = [25, 50, 75, 90] as const;

export function ScrollDepth() {
  const pathname = usePathname();
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current = new Set();

    let ticking = false;
    const check = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // A page shorter than the viewport has nothing to scroll; reporting
      // 90% there would be noise, not a signal.
      if (scrollable <= 0) return;

      const pct = ((window.scrollY / scrollable) * 100) | 0;
      for (const mark of MARKS) {
        if (pct >= mark && !fired.current.has(mark)) {
          fired.current.add(mark);
          sendGAEvent("event", "scroll_depth", {
            percent: String(mark),
            page: pathname,
          });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once: a page restored mid-scroll should not report 0%.
    check();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
