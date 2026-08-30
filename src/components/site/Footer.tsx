import Image from "next/image";

import { Container } from "@/components/Container";
import { nav, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-subtle)]/70 bg-[var(--color-surface)]">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/flame.png"
                alt=""
                width={153}
                height={281}
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
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
              {site.tagline}. Designed and built in {site.location}.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Explore
              </p>
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent-strong)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                Get in touch
              </p>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent-strong)]"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="text-sm text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent-strong)]"
              >
                {site.phone}
              </a>
              <a
                href="#contact"
                className="text-sm text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent-strong)]"
              >
                Book a free intro call
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--color-subtle)]/70 pt-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <a
            href="/privacy"
            className="transition-colors hover:text-[var(--color-accent-strong)]"
          >
            Privacy Policy
          </a>
        </div>
      </Container>
    </footer>
  );
}
