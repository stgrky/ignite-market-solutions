import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

import { GrainOverlay } from "@/components/motion/GrainOverlay";
import { DeferredScrollProgress } from "@/components/motion/Deferred";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { site } from "@/lib/content";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // Keyword first, brand second: Google truncates the tail, and no one
    // searches the brand name yet.
    default: site.seoTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: site.seoTitle,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Structured data so search engines can read ICC as a business rather than
 * guessing from prose. Only facts we can actually stand behind — no invented
 * ratings, hours, or review counts (fabricated schema is a manual-action risk).
 */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  legalName: "Ignite Creative Co LLC",
  description: site.description,
  url: site.url,
  logo: `${site.url}/icon.png`,
  image: `${site.url}/opengraph-image.png`,
  email: site.email,
  telephone: site.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  areaServed: { "@type": "Country", name: "United States" },
  serviceType: "Website design and digital services for wellness practitioners",
  founder: { "@type": "Person", name: "Steven Grant Kyle" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        {/* Hides scroll-reveal content before first paint, so it can fade in.
         *
         * This injects a stylesheet rather than setting a class on <html>:
         * React owns <html>'s attributes and would report a hydration mismatch
         * for a class added before it hydrates, whereas a <style> appended to
         * <head> sits outside the tree it reconciles.
         *
         * Two deliberate consequences: if JavaScript never runs, the rule is
         * never added and every section is simply visible; and if the visitor
         * asks for reduced motion, we skip it so nothing moves or hides. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var s=document.createElement('style');s.textContent='.reveal:not(.reveal-visible){opacity:0;transform:translateY(var(--reveal-distance,24px))}';document.head.appendChild(s)}catch(e){}})()",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <GrainOverlay />
        <DeferredScrollProgress />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
        <Script
          id="hs-script-loader"
          src="//js-na2.hs-scripts.com/246937212.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
