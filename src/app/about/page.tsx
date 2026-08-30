import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { safeFetch } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { aboutPageQuery } from "@/sanity/queries";
import type { AboutPage } from "@/sanity/types";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const about = await safeFetch<AboutPage | null>(aboutPageQuery, {}, null);
  return {
    title: "About",
    description: about?.metaDescription ?? about?.intro ?? undefined,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPageRoute() {
  const about = await safeFetch<AboutPage | null>(aboutPageQuery, {}, null);
  const hasContent = Boolean(about?.heading || about?.body?.length);

  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-28">
      <Container className="max-w-3xl">
        {hasContent ? (
          <>
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                About
              </p>
            </Reveal>

            {about?.heading ? (
              <Reveal delay={0.06}>
                <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.7rem]">
                  {about.heading}
                </h1>
              </Reveal>
            ) : null}

            {about?.intro ? (
              <Reveal delay={0.12}>
                <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
                  {about.intro}
                </p>
              </Reveal>
            ) : null}

            {about?.portrait ? (
              <Reveal delay={0.18}>
                <div className="relative mt-12 aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={urlForImage(about.portrait).width(1000).height(750).url()}
                    alt={about.portrait.alt ?? ""}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ) : null}

            {about?.body?.length ? (
              <Reveal delay={0.24}>
                <div className="prose-icc mt-12">
                  <PortableText value={about.body} />
                </div>
              </Reveal>
            ) : null}

            <div className="mt-16 border-t border-[var(--color-subtle)] pt-10 text-center">
              <p className="font-serif text-xl font-bold text-[var(--color-foreground)]">
                Want to talk it through?
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/#shop"
                  className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
                >
                  See available websites
                </Link>
                <Link
                  href="/#contact"
                  className="rounded-full border border-[var(--color-subtle)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition hover:border-[var(--color-accent)]"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </>
        ) : (
          // Nothing written yet. Deliberately blank rather than filled with
          // placeholder copy that could ship to production by accident.
          <div className="rounded-2xl border border-dashed border-[var(--color-subtle)] p-12 text-center">
            <p className="font-serif text-xl text-[var(--color-foreground)]">
              This page is waiting on you.
            </p>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
              Open the Studio, choose <strong>About Page</strong>, and write.
              It publishes here within a minute — no deploy needed.
            </p>
            <a
              href="https://icc-company-site.sanity.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-strong)]"
            >
              Open the Studio →
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
