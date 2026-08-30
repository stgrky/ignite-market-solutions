import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

/** Next generates /robots.txt from this. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The API route is POST-only and the Studio is a private admin app —
      // neither is crawlable content worth spending crawl budget on.
      disallow: ["/api/", "/studio"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
