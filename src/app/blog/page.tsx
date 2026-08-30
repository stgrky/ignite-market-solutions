import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { safeFetch } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { allPostsQuery } from "@/sanity/queries";
import { CATEGORY_LABELS, type Post } from "@/sanity/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Plain-English writing on websites, getting found online, and running a private practice — from Ignite Creative Co.",
  alternates: { canonical: "/blog" },
};

// Content is fetched fresh so a published post appears without a redeploy.
export const revalidate = 60;

export default async function BlogIndex() {
  const posts = await safeFetch<Post[]>(allPostsQuery, {}, []);

  return (
    <section className="bg-[var(--color-surface)] py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
              Blog
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.15] text-[var(--color-foreground)] md:text-[2.6rem]">
              Straight answers about websites for your practice.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
              No jargon, no sales pitch. Just the things practitioners actually
              ask before they build a website.
            </p>
          </Reveal>
        </div>

        {posts.length === 0 ? (
          <Reveal delay={0.18}>
            <p className="mt-14 rounded-2xl border border-dashed border-[var(--color-subtle)] p-10 text-center text-[15px] text-[var(--color-muted)]">
              First post coming shortly.
            </p>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <Reveal key={post._id} delay={0.06 * (i % 4)} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-background)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-card)]"
                >
                  {post.coverImage ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={urlForImage(post.coverImage).width(800).height(450).url()}
                        alt={post.coverImage.alt ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-7">
                    {post.category ? (
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                        {CATEGORY_LABELS[post.category] ?? post.category}
                      </p>
                    ) : null}
                    <h2 className="mt-3 font-serif text-xl font-bold leading-tight text-[var(--color-foreground)]">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-grow text-[15px] leading-relaxed text-[var(--color-muted)]">
                      {post.excerpt}
                    </p>
                    <p className="mt-5 text-xs text-[var(--color-muted)]">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
