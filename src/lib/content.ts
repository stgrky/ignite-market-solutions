/**
 * Single source of truth for all site copy. Edit text here — no CMS needed for
 * the company's own marketing site. (Client sites get Sanity; this one doesn't
 * need the overhead.)
 *
 * Pricing, terms, and workflow mirror ims-ops/BUSINESS_PLAN.md — keep the two
 * in sync when either changes.
 */

export const site = {
  name: "Ignite Creative Co",
  shortName: "Ignite",
  tagline: "Web design & digital services for the wellness space",
  description:
    "Ignite Creative Co is a web design and digital-services studio with a focus on the mental health, wellness, and coaching space. Fast, beautiful websites you own and can update yourself — a low one-time build fee, then a simple monthly plan.",
  url: "https://ignitecreativeco.world",
  email: "grant@ignitecreativeco.world",
  phone: "(737) 420-2743",
  phoneHref: "tel:+17374202743",
  location: "Austin, TX",
};

export const nav = [
  { label: "What you get", href: "#value" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Work", href: "#work" },
];

export const hero = {
  eyebrow: "Web & digital services · mental health, wellness & coaching",
  headlineLead: "Websites that turn visitors into",
  headlineAccent: "clients.",
  subhead:
    "We design and build fast, beautiful websites — and the digital services around them — with a focus on therapists, coaches, and wellness practitioners. Sites you own, can update yourself, and never pay rising platform fees to keep. A low one-time build fee, then a simple monthly plan, and you're live in about a week.",
  primaryCta: { label: "Book a free intro call", href: "#contact" },
  secondaryCta: { label: "See recent work", href: "#work" },
  trustLine:
    "No cookie-cutter templates. No monthly platform ransom. No code degree required to update it.",
};

export const marquee = [
  "Therapists",
  "Counselors",
  "Coaches",
  "Wellness practitioners",
  "Psychotherapy",
  "Holistic health",
  "Mindfulness",
  "Private practice",
];

export const manifesto = {
  line: "Your practice deserves a website as considered as the work you do in it.",
  sub: "Calm, fast, and unmistakably yours — built to earn trust the second someone lands on it.",
};

export const problems = {
  heading: "Sound familiar?",
  intro:
    "Most small-business owners are stuck with a website that quietly works against them.",
  items: [
    "Your site looks nothing like the quality of the work you actually do.",
    "You pay Squarespace or Wix every month and still can't make it look right.",
    "Someone built it once, disappeared, and now you can't change a single word.",
    "It loads slowly, breaks on phones, and never shows up on Google.",
  ],
  closer: "That's exactly what we fix.",
};

export const value = {
  heading: "A website that earns its place in your business",
  intro:
    "Everything is built around one goal: turning the people who find you into people who book you.",
  cards: [
    {
      title: "Custom design, not a template",
      body: "A site designed around your business and your clients — not a theme thousands of other businesses are already using.",
    },
    {
      title: "Built to book clients",
      body: "Every page guides visitors toward one thing: reaching out to you. Clear calls to action, zero clutter.",
    },
    {
      title: "You own it, fully",
      body: "The site is yours — files, domain, content. No platform lock-in: cancel anytime and the whole site comes with you.",
    },
    {
      title: "Edit it yourself",
      body: "Change your hours, prices, or photos in minutes with a simple editor. No developer, no waiting, no extra invoice.",
    },
    {
      title: "Fast & found on Google",
      body: "Loads in milliseconds, looks flawless on phones, and ships with the SEO basics built in from day one.",
    },
    {
      title: "A real human, not a ticket queue",
      body: "You work directly with me from first call to launch and beyond. Questions get answered by the person who built it.",
    },
  ],
};

export const system = {
  eyebrow: "How we keep it fast & affordable",
  heading: "Start from a proven design, not a blank page",
  intro:
    "We maintain a set of complete, ready-built practice websites — real, live sites, not mockups. You pick the one closest to your vision and we customize it to your brand. That's how a professional custom-feeling site gets delivered in about a week at a price a solo practice can actually justify.",
  included: {
    title: "Customized to you",
    items: [
      "Your color palette",
      "Your fonts",
      "Your imagery and content layout",
      "Section sizing and arrangement",
    ],
  },
  excluded: {
    title: "Kept out of scope (it's how the price stays low)",
    items: [
      "Ground-up custom builds",
      "Unlimited open-ended revisions",
    ],
  },
  note: "Want something beyond the included scope? No problem — extra work is simply quoted at $60/hour and agreed in writing before anything starts. No surprise invoices.",
};

export const styleDirections = {
  eyebrow: "Five ready-built designs",
  heading: "Pick the design that already feels like your practice",
  intro:
    "Every design below is a real, complete site — not a mockup. Each has its own palette, type, and layout, so you're choosing a finished direction, not staring at a blank page.",
  designs: [
    {
      name: "Meridian",
      vibe: "Clean & clinical",
      swatch: "#1e4d6b",
      href: "https://icc-meridian-demo.vercel.app",
    },
    {
      name: "Bloom",
      vibe: "Warm & editorial",
      swatch: "#c4623f",
    },
    {
      name: "Haven",
      vibe: "Soft & somatic",
      swatch: "#8897bf",
    },
    {
      name: "Anchor",
      vibe: "Grounded & modern",
      swatch: "#2f8f83",
    },
    {
      name: "Grove",
      vibe: "Warm & relational",
      swatch: "#6b8e7f",
    },
  ],
  note: "See a link above? It's live — click through. The rest are finishing final touches before their own demo links go live.",
};

export const process = {
  heading: "How it works",
  intro:
    "From first hello to live site in about a week — with the scope, the price, and the process in writing at every step.",
  steps: [
    {
      title: "Tell us about your practice",
      body: "Fill out a short intake form — your practice, your style, your colors and fonts. Then we hop on a free 45-minute consult to pick your design and scope your customizations. No pressure, no pitch.",
    },
    {
      title: "Confirm scope & pay",
      body: "After the call you get a written summary: exactly what's included, any add-ons you chose, and a secure payment link. Pay once, upfront — then the build begins.",
    },
    {
      title: "We build, you review",
      body: "Your site is customized to your brand in about a week. Two rounds of revisions are included — handled over email, on your schedule.",
    },
    {
      title: "Go live — with support",
      body: "We launch on your domain, walk you through editing everything yourself, and your monthly plan quietly takes over: hosting, monitoring, maintenance.",
    },
  ],
};

export const pricing = {
  heading: "Simple, transparent pricing",
  intro:
    "A low one-time build fee gets you online. Then a flat monthly plan keeps you fast, healthy, and growing. No hidden fees, no surprise invoices six months in.",
  build: {
    label: "One-time",
    name: "Initial Build",
    price: "$333",
    blurb:
      "A 5-page professional website — Home, About, Services, Blog, and Contact — customized from one of our ready-built designs and delivered in about a week.",
    features: [
      "Five pages: Home, About, Services, Blog, Contact",
      "Customized to your brand: palette, fonts, imagery, layout",
      "Two rounds of revisions included (up to 4 hours, async)",
      "Basic Google Analytics, set up via delegated access",
      "Your own secure login — manage every word, photo, and post",
    ],
    overageNote:
      "Need more than the included revisions? Extra work is $60/hour — always quoted and agreed in writing before it happens.",
  },
  tiersHeading: "Then choose your plan",
  tiersIntro:
    "Pick the level of ongoing support that fits how active you want your site to be. Change tiers anytime, or cancel — your site comes with you.",
  tiers: [
    {
      tierLabel: "Tier 1 · Hosting & Maintenance",
      name: "Essentials",
      price: "$39",
      cadence: "/month",
      blurb: "Keep your site online, fast, and healthy. Quiet, reliable, hands-off.",
      features: [
        "Hosting and infrastructure",
        "Security monitoring",
        "Outage monitoring and alerts",
        "Maintenance — bugs, errors, and outages fixed",
      ],
      bestFor:
        "Best for practitioners who want a dependable online presence that asks nothing of them — a professional digital business card that just works.",
      featured: false,
    },
    {
      tierLabel: "Tier 2 · Hosting + Full Support",
      name: "Growth",
      price: "$59",
      cadence: "/month",
      blurb:
        "Everything in Essentials, plus active growth support — analytics, SEO, and a monthly hour of dev work on the house.",
      features: [
        "Everything in Essentials",
        "One hour of development work per month",
        "Advanced analytics + monthly performance reviews",
        "Google Business Profile management",
        "Contact form, set up and ready",
        "Testimonial collection + monthly curation",
        "SEO setup + monthly monitoring",
      ],
      bestFor:
        "Best for practitioners who want the site actively growing the practice — continuous optimization and marketing insight, with zero technical work on their end.",
      featured: true,
    },
  ],
  addOnsHeading: "Add-ons, if you want them",
  addOnsIntro:
    "À la carte, added at intake and billed once. The base package covers what most practices actually need — tap any add-on for the what, the why, and who it's for.",
  addOns: [
    {
      label: "Extra page",
      price: "$49 / page",
      what: "A page beyond the base five — an FAQ, a specialties breakdown, a telehealth explainer, a resource library.",
      why: "Sometimes one page can't carry everything a visitor needs to know. Extra pages give specific topics room to breathe.",
      whoFor: "Practitioners with multiple specialties or services, group practices, or anyone cramming three topics into one section.",
    },
    {
      label: "Legal / disclaimer pages",
      price: "$29 / page",
      what: "Privacy policy, HIPAA notice, terms of service, accessibility statement — placed and formatted from copy you or your attorney provide.",
      why: "Cheaper than a regular page because we're placing your provided copy into a clean template — regulators and insurance carriers like to see these.",
      whoFor: "Every licensed practice eventually. Often required for ad networks and some referral directories.",
    },
    {
      label: "Contact form",
      price: "$49",
      what: "A proper inquiry form on your site — visitors write to you without opening their email app, and submissions land in your inbox.",
      why: "For an anxious first-time visitor, a quiet form is a lower bar than composing an email. Lower bar, more inquiries.",
      whoFor: "Anyone whose contact page is currently just an email address. (Included free with the Growth plan.)",
    },
    {
      label: "Scheduling integration (Calendly / Cal.com)",
      price: "$49",
      what: "Your booking widget embedded directly on the site so visitors can pick a consult time without leaving.",
      why: "Removes the click between “interested” and “booked.” For a hesitant prospective client, that click is the conversion-killer.",
      whoFor: "Anyone who already uses a scheduler — or can spare 10 minutes to set one up.",
    },
    {
      label: "Testimonial collection (Typeform)",
      price: "$49",
      what: "A polished form where past clients submit testimonials. You review and approve before anything goes live.",
      why: "Choosing a practitioner is an emotional decision — social proof matters. A streamlined process means you actually end up with quotes.",
      whoFor: "Established practices with happy clients who'd give a review if asked.",
    },
    {
      label: "Google Business Profile setup",
      price: "$49",
      what: "We claim or create your Google Business Profile via delegated access, optimize it with photos, hours, and services, and link it to your site.",
      why: "Most people find a nearby practitioner through Google's map. Without a profile, you're invisible to local search.",
      whoFor: "Anyone with a physical office — even part-time. Telehealth-only practices benefit less.",
    },
    {
      label: "Content migration from your old site",
      price: "from $49",
      what: "We move your existing blog posts — text, images, dates — from your current site into your new editor. $49 up to 25 posts, $99 up to 100, custom beyond.",
      why: "Keeps the writing and search ranking you've already built. No re-typing, no starting your blog at zero.",
      whoFor: "Anyone moving from WordPress, Squarespace, or Webflow with posts worth keeping.",
    },
    {
      label: "SEO setup",
      price: "$99",
      what: "Meta titles and descriptions for every page, an XML sitemap, local-business schema markup, and keyword research for your niche.",
      why: "Helps the right kind of clients find you on Google. Most of the work is one-time; the payoff compounds.",
      whoFor: "Practices that want long-term organic traffic instead of paying for ads forever.",
    },
    {
      label: "Advanced Analytics setup",
      price: "$99",
      what: "Google Analytics 4 with conversion goals and event tracking for the actions that matter — booking clicks, form submissions, calls.",
      why: "You can finally answer “is the site actually working?” with data instead of guesses.",
      whoFor: "Practitioners spending on marketing who want to know what's pulling its weight.",
    },
    {
      label: "Custom logo design",
      price: "$99",
      what: "A simple, professional wordmark or lockup for your practice, with a round or two of revisions.",
      why: "A logo signals you're a real practice, not a side project — used in your header, favicon, and email signature.",
      whoFor: "New practices, rebrands, or anyone still using a Canva template.",
    },
  ],
  terms: {
    heading: "Straight terms, in writing",
    items: [
      {
        title: "Payment upfront",
        body: "The build fee and any add-ons are paid in full before work begins — one secure Stripe link, no deposits or installment juggling.",
      },
      {
        title: "Fair cancellation",
        body: "Change your mind after paying? You get 75% back. We keep 25% to cover the consultation and scoping already done. It's in the agreement, not fine print.",
      },
      {
        title: "No surprise overages",
        body: "Anything beyond your included scope is $60/hour — always scoped and agreed in writing before the work happens.",
      },
      {
        title: "Leave anytime",
        body: "Change tiers or cancel whenever. You own your code — your site can offboard to any developer or agency you choose.",
      },
    ],
  },
  footnote:
    "Not sure which fits? The intro consult sorts it out — and you'll have the full scope in writing before you pay a dollar.",
};

export const work = {
  heading: "Recent work",
  intro: "Real sites, built to be owned and run by the people who use them.",
  projects: [
    {
      name: "dateable()af",
      tag: "Brand site · CMS · Podcast hub",
      body: "A relationships-podcast brand with a bold editorial design, a custom content editor the founders run themselves, and a built-in Spotify podcast hub.",
      href: "https://ims-getdateable.vercel.app",
      linkLabel: "View site",
    },
  ],
};

export const faqs = {
  heading: "Good questions",
  items: [
    {
      q: "How long does it take?",
      a: "About a week from payment to launch, once your content and photos are in hand. If we're gathering content together it can stretch a little — but this is a productized build, not a three-month agency project.",
    },
    {
      q: "Do I need to be technical?",
      a: "Not at all. If you can use email, you can update your site. You get your own secure login and a walkthrough at launch.",
    },
    {
      q: "Who writes the website copy?",
      a: "You bring the words — your bio, your services, your voice. We shape and place them so they land well, but nobody knows your practice like you do. (Blog posts you write later publish through your own editor in minutes.)",
    },
    {
      q: "What does it cost to keep running?",
      a: "$333 once, then $39 or $59/month for hosting, maintenance, and support — plus your domain (about $15/year, which you own). No surprise platform fees, ever.",
    },
    {
      q: "What if I want changes after the included revisions?",
      a: "Two revision rounds are included with the build. Beyond that, work is $60/hour — always quoted and agreed in writing before it happens. Growth-plan members also get an hour of dev work every month.",
    },
    {
      q: "What if I change my mind?",
      a: "If you back out after paying, you're refunded 75% of the build fee — we keep 25% to cover the consultation and scoping already done. It's written into the agreement, not buried in fine print.",
    },
    {
      q: "I already have a website — can you help?",
      a: "Yes. We can migrate your blog and content and rebuild it properly. Migration starts at $49 as a simple add-on.",
    },
    {
      q: "Do I need to buy anything else?",
      a: "Just your domain (about $15/year) — you purchase it so you own it, and we guide you through pointing it at your new site.",
    },
  ],
};

export const referral = {
  heading: "Know someone who needs a site?",
  body: "Send them my way. If they sign up, you both get three months of free hosting at your respective tier. No limits, no catches, no fine print.",
  cards: [
    { label: "You get", amount: "3 months free", note: "at your tier" },
    { label: "They get", amount: "3 months free", note: "at their tier" },
  ],
};

export const finalCta = {
  heading: "Ready to ignite your online presence?",
  body: "Book a free 20-minute intro call. We'll talk through what your business needs — no pressure, no jargon, no obligation.",
  cta: { label: "Book your free intro call", href: "#contact" },
};

export const contact = {
  heading: "Let's talk",
  body: "Tell me a little about your business and what you're hoping for. I read every message myself and reply within a day.",
  emailLabel: "Email me directly",
  phoneLabel: "Or call/text",
};
