import type { MetadataRoute } from "next";

import { site } from "@/lib/content";
import { sanityClient } from "@/sanity/client";
import { postSlugsQuery } from "@/sanity/queries";

/**
 * Next generates /sitemap.xml from this.
 *
 * Blog posts are pulled from Sanity at build time, so publishing a post gets it
 * into the sitemap automatically — no code change, no manual submission.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  if (!sanityClient) return staticRoutes;

  try {
    const posts = await sanityClient.fetch<{ slug: string; publishedAt: string }[]>(
      postSlugsQuery,
    );
    // Only advertise the blog index once there's something on it — an empty
    // page in the sitemap is thin content Google doesn't need to see.
    if (posts.length === 0) return staticRoutes;

    return [
      ...staticRoutes,
      {
        url: `${site.url}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      ...posts.map((post) => ({
        url: `${site.url}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    // A Sanity outage shouldn't break the sitemap entirely.
    return staticRoutes;
  }
}
