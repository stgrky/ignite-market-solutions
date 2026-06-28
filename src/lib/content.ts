/**
 * Single source of truth for all site copy. Edit text here — no CMS needed for
 * the company's own marketing site. (Client sites get Sanity; this one doesn't
 * need the overhead.)
 *
 * NOTE: prices in `pricing` are placeholders — confirm/replace with real numbers
 * before launch.
 */

export const site = {
  name: "Ignite Market Solutions",
  shortName: "Ignite",
  tagline: "Web design & digital services for the wellness space",
  description:
    "Ignite Market Solutions is a web design and digital-services studio with a focus on the mental health, wellness, and coaching space. Fast, beautiful websites you own and can update yourself — a low one-time build fee, then a simple monthly plan.",
  url: "https://ignitemarket.solutions",
  email: "hello@grantkyle.com",
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

export const process = {
  heading: "How it works",
  intro: "Four simple steps. No jargon, no homework, no surprises.",
  steps: [
    {
      title: "Free intro call",
      body: "We talk through your business, your clients, and what your site actually needs to do. No pressure, no pitch.",
    },
    {
      title: "Design & build",
      body: "I design your site, polish the words, and build it — sharing progress so you're never guessing what you'll get.",
    },
    {
      title: "Review & launch",
      body: "We refine together until it's right, then go live: connected to your domain, your email, and Google.",
    },
    {
      title: "You're live — with support",
      body: "You get a short walkthrough on editing it yourself, plus me on call whenever you need a hand.",
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
      "A 5-page professional website — Home, About, Services, Blog, and Contact — built for you in about a week.",
    features: [
      "Five custom pages: Home, About, Services, Blog, Contact",
      "Two rounds of revisions (up to 4 hours)",
      "Basic analytics — see who visits and what they read",
      "Your own secure login to manage every word, photo, and post",
    ],
  },
  tiersHeading: "Then choose your plan",
  tiersIntro:
    "Pick the level of ongoing support that fits how active you want your site to be. Change tiers anytime, or cancel — your site comes with you.",
  tiers: [
    {
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
      featured: false,
    },
    {
      name: "Growth",
      price: "$59",
      cadence: "/month",
      blurb:
        "Everything in Essentials, plus active growth support — analytics, SEO, and a monthly hour of dev work on the house.",
      features: [
        "Everything in Essentials",
        "One hour of development work per month",
        "Advanced analytics + monthly performance reviews",
        "Google Business Profile setup + maintenance",
        "Contact form, set up and ready",
        "Testimonial collection + monthly curation",
        "SEO setup + monthly monitoring",
      ],
      featured: true,
    },
  ],
  addOnsHeading: "Add-ons, if you want them",
  addOnsIntro:
    "À la carte, added at intake and billed once. The base package covers what most businesses actually need.",
  addOns: [
    { label: "Extra page", price: "$49 / page" },
    { label: "Legal / disclaimer pages", price: "$29 / page" },
    { label: "Scheduling integration (Calendly / Cal.com)", price: "$49" },
    { label: "Testimonial collection (Typeform)", price: "$49" },
    { label: "Google Business Profile setup", price: "$49" },
    { label: "Content migration from your old site", price: "from $49" },
    { label: "SEO setup", price: "$99" },
    { label: "Advanced analytics setup", price: "$99" },
    { label: "Custom logo design", price: "$99" },
  ],
  footnote: "Not sure which fits? The intro call sorts that out in 20 minutes.",
};

export const work = {
  heading: "Recent work",
  intro: "Real sites, built to be owned and run by the people who use them.",
  projects: [
    {
      name: "dateable()af",
      tag: "Brand site · CMS · Podcast hub",
      body: "A relationships-podcast brand with a bold editorial design, a custom content editor the founders run themselves, and a built-in Spotify podcast hub.",
      href: "https://ims-getdateable-i624.vercel.app",
      linkLabel: "View site",
    },
  ],
};

export const faqs = {
  heading: "Good questions",
  items: [
    {
      q: "How long does it take?",
      a: "Most sites launch in 2–4 weeks once we have your content and photos.",
    },
    {
      q: "Do I need to be technical?",
      a: "Not at all. If you can use email, you can update your site. I'll show you exactly how.",
    },
    {
      q: "What does it cost to keep running?",
      a: "A low one-time build fee, then $39 or $59/month for hosting, maintenance, and support — plus your domain (about $15/year). No surprise platform fees, ever.",
    },
    {
      q: "I already have a website — can you help?",
      a: "Yes. We can migrate your content and rebuild it properly. Migration is a simple add-on.",
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
};
