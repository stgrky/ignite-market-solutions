import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { site } from "@/lib/content";
import { safeFetch, sanityClient } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/queries";
import { CATEGORY_LABELS, type Post } from "@/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!sanityClient) return [];
  try {
    const slugs = await sanityClient.fetch<{ slug: string }[]>(postSlugsQuery);
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await safeFetch<Post | null>(postBySlugQuery, { slug }, null);
  if (!post) return { title: "Not found" };

  const description = post.metaDescription ?? post.excerpt;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `${site.url}/blog/${post.slug}`,
      images: post.coverImage
        ? [urlForImage(post.coverImage).width(1200).height(630).url()]
        : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await safeFetch<Post | null>(postBySlugQuery, { slug }, null);
  if (!post) notFound();

  // Article schema, plus FAQ schema when the post answers a specific question.
  // The FAQ block is what AI assistants and Google's answer boxes actually pull.
  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription ?? post.excerpt,
      datePublished: post.publishedAt,
      author: { "@type": "Organization", name: site.name, url: site.url },
      publisher: { "@type": "Organization", name: site.name, url: site.url },
      mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    },
  ];
  if (post.question && post.shortAnswer) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: post.question,
          acceptedAnswer: { "@type": "Answer", text: post.shortAnswer },
        },
      ],
    });
  }

  return (
    <article className="bg-[var(--color-surface)] py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-semibold text-[var(--color-accent-strong)] hover:text-[var(--color-accent)]"
        >
          ← All posts
        </Link>

        {post.category ? (
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
            {CATEGORY_LABELS[post.category] ?? post.category}
          </p>
        ) : null}

        <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.7rem]">
          {post.title}
        </h1>

        <p className="mt-5 text-sm text-[var(--color-muted)]">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {post.question && post.shortAnswer ? (
          <div className="mt-10 rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-accent-soft)]/60 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
              {post.question}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-foreground)]">
              {post.shortAnswer}
            </p>
          </div>
        ) : null}

        {post.coverImage ? (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={urlForImage(post.coverImage).width(1200).height(675).url()}
              alt={post.coverImage.alt ?? ""}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="prose-icc mt-10">
          {post.body ? <PortableText value={post.body} /> : null}
        </div>

        <div className="mt-16 rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-background)] p-8 text-center">
          <p className="font-serif text-xl font-bold text-[var(--color-foreground)]">
            Thinking about a website for your practice?
          </p>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-muted)]">
            Have a look at what&rsquo;s available right now, or send a message
            and I&rsquo;ll answer personally.
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
      </Container>
    </article>
  );
}
