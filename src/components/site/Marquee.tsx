"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  items: string[];
};

/**
 * Slow, seamless horizontal ribbon of niche keywords. Two copies of the row
 * slide as one to loop without a seam. Pauses for reduced-motion.
 */
export function Marquee({ items }: Props) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-[var(--color-subtle)] bg-[var(--color-surface)] py-5">
      {/* soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-surface)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-surface)] to-transparent" />

      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-serif text-xl italic text-[var(--color-foreground)]/80 md:text-2xl">
              {item}
            </span>
            <span aria-hidden className="text-[var(--color-accent)]">
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
