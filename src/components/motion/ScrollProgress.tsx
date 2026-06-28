"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin warm progress bar pinned to the top edge that fills as you scroll.
 * Small, premium "this is engineered" detail.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left"
      style={{ scaleX, background: "var(--ignite-gradient)" }}
    />
  );
}
