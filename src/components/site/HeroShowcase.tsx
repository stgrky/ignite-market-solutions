"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MouseEvent } from "react";

import { Float } from "@/components/motion/Float";

/**
 * The hero showpiece: an abstract "site we built" browser mockup that tilts
 * toward the cursor in 3D, gently floats, and is ringed by floating value
 * chips. Pure CSS/markup (no image asset), warm palette, desktop-only.
 * Signals craft without saying a word.
 */
export function HeroShowcase() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), {
    stiffness: 150,
    damping: 18,
  });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const bar = (w: string, c = "var(--color-subtle)") => (
    <span className="block h-2 rounded-full" style={{ width: w, background: c }} />
  );

  return (
    <div
      className="relative [perspective:1300px]"
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={onLeave}
    >
      <Float duration={9} distance={6}>
        <motion.div
          style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative overflow-hidden rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] shadow-[0_40px_80px_-30px_rgba(60,42,24,0.45)]"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-[var(--color-subtle)] bg-[var(--color-background)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-subtle)]" />
            <span className="ml-3 h-5 flex-1 rounded-full bg-[var(--color-subtle)]/50" />
          </div>

          {/* abstract page */}
          <div className="space-y-5 p-6">
            {/* mini hero */}
            <div
              className="relative overflow-hidden rounded-xl p-5"
              style={{ background: "var(--ignite-gradient)" }}
            >
              <div className="space-y-2">
                <span className="block h-3 w-2/3 rounded-full bg-white/85" />
                <span className="block h-3 w-1/2 rounded-full bg-white/60" />
              </div>
              <span className="mt-4 block h-6 w-24 rounded-full bg-white/90" />
            </div>
            {/* card row */}
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="space-y-2 rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] p-3"
                >
                  <span className="block h-7 w-7 rounded-full bg-[var(--color-accent-soft)]" />
                  {bar("90%")}
                  {bar("70%")}
                </div>
              ))}
            </div>
            {/* text block */}
            <div className="space-y-2">
              {bar("80%")}
              {bar("95%")}
              {bar("60%")}
            </div>
          </div>
        </motion.div>
      </Float>

      {/* floating value chips */}
      <Chip className="-left-5 top-10" delay={0.2} label="0.4s load" icon="⚡" />
      <Chip className="-right-4 top-1/3" delay={0.5} label="You own it" icon="✦" />
      <Chip
        className="bottom-8 -left-3"
        delay={0.35}
        label="Edit it yourself"
        icon="✎"
      />
    </div>
  );
}

function Chip({
  className,
  label,
  icon,
  delay,
}: {
  className: string;
  label: string;
  icon: string;
  delay: number;
}) {
  return (
    <Float duration={7} distance={7}>
      <div
        className={`absolute ${className} flex items-center gap-1.5 rounded-full border border-[var(--color-subtle)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-foreground)] shadow-[0_14px_30px_-14px_rgba(60,42,24,0.4)]`}
        style={{ animationDelay: `${delay}s` }}
      >
        <span className="text-[var(--color-accent-strong)]" aria-hidden>
          {icon}
        </span>
        {label}
      </div>
    </Float>
  );
}
