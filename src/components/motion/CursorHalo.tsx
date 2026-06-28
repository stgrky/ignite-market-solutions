"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Soft warm glow that trails the cursor with a little lag. Desktop /
 * fine-pointer only, auto-hidden when the cursor leaves, and fully disabled
 * for prefers-reduced-motion. A quiet "this was hand-built" signal.
 */
export function CursorHalo() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 110, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 110, damping: 18, mass: 0.5 });

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    }
    function handleLeave() {
      setVisible(false);
    }
    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle at center, rgba(191,106,67,0.30) 0%, rgba(191,106,67,0) 70%)",
        opacity: visible ? 1 : 0,
        transition: "opacity 220ms ease",
      }}
    />
  );
}
