"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Container } from "@/components/Container";
import { nav } from "@/lib/content";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-subtle)]/70 bg-[var(--color-background)]/85 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/brand/flame.png"
            alt=""
            width={153}
            height={281}
            priority
            unoptimized
            className="h-8 w-auto"
          />
          <span className="flex flex-col leading-none">
            <span className="font-sans text-lg font-semibold tracking-tight text-[var(--color-foreground)]">
              Ignite
            </span>
            <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Creative Co.
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
          >
            Book a call
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--color-foreground)] md:hidden"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-[var(--color-subtle)]/70 bg-[var(--color-background)] md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-base font-medium text-[var(--color-foreground)] hover:bg-[var(--color-accent-soft)]"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white"
            >
              Book a call
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
