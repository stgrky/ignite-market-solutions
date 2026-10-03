"use client";

import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  /** Stagger delay in seconds before this element animates */
  delay?: number;
  /** How far it travels (px) before settling */
  distance?: number;
  /** Duration in seconds */
  duration?: number;
  /** Apply once only? Defaults to true. */
  once?: boolean;
  /** Tailwind classes on the wrapper */
  className?: string;
  /** Render as block; pass "span" if needed inside text */
  as?: "div" | "span";
};

/**
 * Scroll-triggered fade + lift. The atom of our motion system.
 *
 * Deliberately NOT framer-motion. The home page mounts 64 of these, and as
 * motion components that meant 64 animation runtimes and 64 scroll observers
 * hydrating before the page could respond — the largest single contributor to
 * a Total Blocking Time of ~8.9s. The visual result here is identical: the same
 * cubic-bezier, the same travel, the same stagger, run by the compositor off a
 * CSS transition instead of by JavaScript on every frame.
 *
 * One IntersectionObserver is shared by every instance rather than one each.
 *
 * Reduced motion and the no-JS case are handled in globals.css: `.reveal` only
 * hides itself when the document has `js-ready` on <html>, so if this component
 * never hydrates the content is simply visible.
 */

const VISIBLE = "reveal-visible";

let observer: IntersectionObserver | null = null;
const onceEls = new WeakSet<Element>();

function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add(VISIBLE);
          if (onceEls.has(el)) observer?.unobserve(el);
        } else if (!onceEls.has(el)) {
          el.classList.remove(VISIBLE);
        }
      }
    },
    { rootMargin: "-80px" },
  );
  return observer;
}

export function Reveal({
  children,
  delay = 0,
  distance = 24,
  duration = 0.9,
  once = true,
  className,
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement & HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el) return;

    // No observer support: show it rather than leave it blank.
    if (!io) {
      el.classList.add(VISIBLE);
      return;
    }
    if (once) onceEls.add(el);
    io.observe(el);
    return () => io.unobserve(el);
  }, [once]);

  const Component = as;

  return (
    <Component
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      style={
        {
          "--reveal-distance": `${distance}px`,
          "--reveal-duration": `${duration}s`,
          "--reveal-delay": `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </Component>
  );
}
