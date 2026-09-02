import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/content";
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

  // Falls back to a 4:5 portrait if Sanity didn't return dimensions — next/image
  // needs both numbers, and a portrait guess beats a landscape one for a headshot.
  const dims = about?.portraitDimensions;
  const portraitSize = dims?.width && dims?.height ? dims : { width: 800, height: 1000 };

  // Person schema, not just Organization. ICC is one person by design, and the
  // authority signal search engines and AI assistants need is that a real,
  // named human does this work — so the page has to say who, not just what.
  // Emitted only once there's content, so an empty page makes no claims.
  const personSchema = hasContent
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Steven Grant Kyle",
        alternateName: "Grant Kyle",
        jobTitle: "Founder & Web Designer",
        url: `${site.url}/about`,
        description: about?.metaDescription ?? about?.intro ?? undefined,
        image: about?.portrait
          ? urlForImage(about.portrait).width(800).height(800).url()
          : undefined,
        email: site.email,
        worksFor: {
          "@type": "Organization",
          name: site.name,
          url: site.url,
        },
        knowsAbout: [
          "Web design",
          "Web development",
          "Search engine optimization",
          "Websites for therapists and private practice",
          "Websites for wellness practitioners",
        ],
      }
    : null;

  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-28">
      {personSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      ) : null}
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
                {/* Sized as a portrait, not a banner: a headshot at the full
                    768px column width dominates the page and pushes the
                    writing below the fold. Rendered at the asset's own aspect
                    ratio so nothing gets cropped, whatever shape it is. */}
                <figure className="mt-10 max-w-[320px]">
                  <Image
                    src={urlForImage(about.portrait).width(760).fit("max").auto("format").url()}
                    alt={about.portrait.alt ?? ""}
                    width={portraitSize.width}
                    height={portraitSize.height}
                    priority
                    sizes="320px"
                    className="h-auto w-full rounded-2xl border border-[var(--color-subtle)]"
                  />
                </figure>
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
