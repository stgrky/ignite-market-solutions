import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { privacy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Ignite Creative Co collects, uses, and protects information from visitors to this website.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-28">
      <Container className="max-w-3xl">
        <h1 className="font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.6rem]">
          {privacy.heading}
        </h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Last updated: {privacy.lastUpdated}
        </p>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
          {privacy.intro}
        </p>

        <div className="mt-12 space-y-10">
          {privacy.sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-serif text-xl font-bold text-[var(--color-foreground)]">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted)]"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[var(--color-muted)]"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
