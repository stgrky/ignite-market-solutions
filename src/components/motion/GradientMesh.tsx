"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
};

/**
 * Slow-breathing, painterly warm backdrop — clay, honey, and a soft sage
 * undertone drifting over the cream surface. Calm but alive. Use as an
 * absolute-positioned background inside a relative, overflow-hidden container.
 */
export function GradientMesh({ className }: Props) {
  const reduceMotion = useReducedMotion();

  const blob =
    "absolute aspect-square rounded-full blur-3xl mix-blend-multiply";

  const blobs = [
    { color: "rgba(191,106,67,0.38)", w: "60%", from: { x: "-18%", y: "-10%" }, to: { x: ["-18%", "10%", "-6%", "-18%"], y: ["-10%", "12%", "-4%", "-10%"] }, dur: 24 },
    { color: "rgba(216,166,112,0.42)", w: "55%", from: { x: "45%", y: "30%" }, to: { x: ["45%", "62%", "38%", "45%"], y: ["30%", "10%", "40%", "30%"] }, dur: 30 },
    { color: "rgba(150,168,150,0.30)", w: "48%", from: { x: "10%", y: "55%" }, to: { x: ["10%", "-6%", "24%", "10%"], y: ["55%", "38%", "62%", "55%"] }, dur: 34 },
  ];

  if (reduceMotion) {
    return (
      <div aria-hidden className={`pointer-events-none overflow-hidden ${className ?? ""}`}>
        {blobs.map((b, i) => (
          <div
            key={i}
            className={blob}
            style={{ background: b.color, width: b.w, left: b.from.x, top: b.from.y }}
          />
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className ?? ""}`}>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={blob}
          style={{ background: b.color, width: b.w }}
          initial={b.from}
          animate={b.to}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
