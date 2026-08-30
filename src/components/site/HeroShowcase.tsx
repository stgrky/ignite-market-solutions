"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MouseEvent } from "react";
import { useRef } from "react";

import { Float } from "@/components/motion/Float";

/**
 * The hero showpiece: a "site we built" browser mockup — with a real warm
 * interior photo standing in for a therapist's own hero image, so a visiting
 * practitioner sees the *kind* of site they'd get, not abstract UI bars. Tilts
 * toward the cursor in 3D, drifts gently on scroll, and is ringed by floating
 * trust chips. Desktop-only, fully inert under prefers-reduced-motion.
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

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), {
    stiffness: 120,
    damping: 24,
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

  return (
    <div
      ref={sectionRef}
      className="relative [perspective:1300px]"
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={onLeave}
    >
      <motion.div style={reduce ? undefined : { y: parallaxY }}>
        <Float duration={9} distance={6}>
          <motion.div
            style={
              reduce
                ? undefined
                : { rotateX, rotateY, transformStyle: "preserve-3d" }
            }
            className="relative overflow-hidden rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-surface)] shadow-[0_40px_80px_-30px_rgba(43,43,43,0.45)]"
          >
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-[var(--color-subtle)] bg-[var(--color-background)] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-subtle)]" />
              <span className="ml-3 flex h-5 flex-1 items-center rounded-full bg-[var(--color-subtle)]/50 px-3">
                <span className="text-[10px] text-[var(--color-muted)]">
                  yourpractice.com
                </span>
              </span>
            </div>

            {/* real photo standing in for a client's own hero */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&h=680&fit=crop&q=80"
                alt="A warm, softly lit therapy office"
                fill
                sizes="(max-width: 768px) 90vw, 460px"
                className="object-cover"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(43,43,43,0.55) 0%, rgba(43,43,43,0.05) 45%, transparent 65%)",
                }}
              />
              <div className="absolute inset-x-5 bottom-5 space-y-2.5">
                <span className="block h-3.5 w-2/3 rounded-full bg-white/90" />
                <span className="block h-3 w-2/5 rounded-full bg-white/60" />
                <span
                  className="mt-3 inline-block h-7 w-28 rounded-full"
                  style={{ background: "var(--ignite-gradient)" }}
                />
              </div>
            </div>

            {/* mini content rows below the fold */}
            <div className="space-y-3 p-6">
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="space-y-2 rounded-lg border border-[var(--color-subtle)] bg-[var(--color-background)] p-3"
                  >
                    <span className="block h-6 w-6 rounded-full bg-[var(--color-accent-soft)]" />
                    <span
                      className="block h-2 rounded-full"
                      style={{ width: "85%", background: "var(--color-subtle)" }}
                    />
                    <span
                      className="block h-2 rounded-full"
                      style={{ width: "60%", background: "var(--color-subtle)" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Float>
      </motion.div>

      {/* floating trust chips */}
      <Chip className="-left-5 top-10" delay={0.2} label="Live in a week or two" icon="⚡" />
      <Chip className="-right-4 top-1/3" delay={0.5} label="You own it" icon="✦" />
      <Chip className="bottom-8 -left-3" delay={0.35} label="Edit it yourself" icon="✎" />
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
        className={`absolute ${className} flex items-center gap-1.5 rounded-full border border-[var(--color-subtle)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-foreground)] shadow-[0_14px_30px_-14px_rgba(43,43,43,0.4)]`}
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
