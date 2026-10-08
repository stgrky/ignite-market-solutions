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
  // Written for what a therapist types into Google, not for how the business
  // describes itself. "Digital-services studio" is agency language nobody
  // searches; "websites for therapists" is the actual query. Austin is in the
  // description because it's a low-competition local term and the referral
  // network is here — the work itself is remote and nationwide.
  tagline: "Websites for therapists and private practices",
  /** The <title>. Kept separate from the tagline because it has to survive
   *  Google's ~60-character cut with the keyword still visible. 57 chars. */
  seoTitle: "Websites for therapists & counselors | Ignite Creative Co",
  description:
    "Websites for therapists and counseling practices in Austin and beyond. Pick a finished design, we tailor it to your practice, and you edit it yourself.",
  url: "https://ignitecreativeco.world",
  email: "grant@ignitecreativeco.world",
  phone: "(737) 420-2743",
  phoneHref: "tel:+17374202743",
  smsHref: "sms:+17374202743",
  location: "Austin, TX",
  /** Google Calendar appointment page. Public, so it lives here rather than in
   *  an environment variable: nothing to leak, and nothing to forget to set. */
  bookingUrl: "https://calendar.app.google/PViD291KT9WftXJv5",
  /** The same calendar in its embeddable form. The short link above redirects
   *  here; "?gv=true" is what renders it as a bookable grid rather than a full
   *  Google Calendar page. Kept separate so the plain link survives as the
   *  fallback when a browser blocks third-party frames. */
  bookingEmbedUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Rerir1l5TbeRfobVMZe6SM1P4JqZd0giMb5r6nqo7MlazyW_E5jQx0qmSUSMzkyGdHvbXqesT?gv=true",
};

// Order matches the order the sections appear on the page — a jump link that
// goes backwards is disorienting, so this list has to be re-sorted whenever the
// home page is.
export const nav = [
  { label: "Shop", href: "/#shop" },
  { label: "What you get", href: "/#value" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];

export const hero = {
  eyebrow: "Websites for therapists, counselors & private practices",
  headlineLead: "Websites that give",
  headlineAccent1: "personality",
  headlineMid: "to your",
  headlineAccent2: "practice.",
  subhead:
    "Websites built for therapists and private practices — yours to own, yours to edit, with no rising platform fees. Pick one of the finished sites below, we tailor it to your practice, and you're live in about a week or two.",
  primaryCta: { label: "Start your intake", href: "/get-started" },
  secondaryCta: { label: "See available websites", href: "/#shop" },
  trustLine:
    "No cookie-cutter templates. No monthly platform ransom. No code degree required to update it. No surprise billing or shady sales tactics.",
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
  "Yoga instructors",
];

export const manifesto = {
  line: "You've put a lot of thought into your practice.",
  sub: "We build websites that are just as thoughtful, so your energy can go where it actually matters — your clients.",
};

export const problems = {
  heading: "Sound familiar?",
  intro:
    "Countless practitioners get stuck with expensive, bloated website platforms, webmasters, and hosting providers that try to get an extra dime out of them at every turn.",
  items: [
    "Your site does not reflect the quality of work you actually do.",
    "You pay Squarespace, Wix, or WordPress every month, still aren't satisfied, and get asked for more money every time you want to do anything remotely useful. We call this being stuck in \"plugin hell.\"",
    "When something breaks, there's no real person to call. Just unanswered emails and calls.",
    "Someone built it once, disappeared, and now you can't change a single word. Meanwhile it loads slowly, breaks on phones, and never shows up on Google.",
  ],
  closer: "That's exactly what we fix.",
};

export const value = {
  heading: "A website that earns its place in your business",
  intro:
    "Everything is built around one goal: making the right people feel confident reaching out to you.",
  cards: [
    {
      title: "Custom design, not a template",
      body: "A site designed around your business and your clients, not a theme thousands of other businesses are already using.",
    },
    {
      title: "Calm by design",
      body: "Clear pages and quiet layouts, so someone who's nervous about reaching out can find what they need without friction.",
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
  eyebrow: "We keep it fast & affordable",
  heading: "Start from a real website, not a blank page",
  intro:
    "Every site in our collection is a complete, one-of-a-kind website we built ourselves. Not a mockup, not a recycled template. You pick the one closest to your vision, we tailor it to your brand, and once it's claimed we retire it and build something entirely new to take its place. That's how you get a genuinely custom site delivered in about a week or two, at a price your practice can justify.",
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
      "A brand-new concept designed from scratch around your specific brief",
      "Unlimited open-ended revisions",
    ],
  },
  note: "Want something beyond the included scope? No problem. Extra work is simply quoted at $60/hour and agreed in writing before anything starts. No surprise invoices.",
};

/**
 * The live inventory. Add or remove an entry here and every "how many are
 * available" mention across the site updates itself — headline, eyebrow, and
 * the pricing blurb all count this array rather than hardcoding a number.
 */
const availableWebsites = [
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
    href: "https://icc-bloom-demo.vercel.app",
  },
  {
    name: "Anchor",
    vibe: "Grounded & modern",
    swatch: "#2f8f83",
    href: "https://icc-anchor-demo.vercel.app",
  },
  {
    name: "Willow",
    vibe: "Gentle & resilient",
    swatch: "#b97c68",
    href: "https://icc-willow-demo.vercel.app",
  },
  {
    name: "Commons",
    vibe: "Collective & grounded",
    swatch: "#7a4f63",
    href: "https://icc-commons-demo.vercel.app",
  },
  {
    name: "Cove",
    vibe: "Still & sheltered",
    swatch: "#6f9c98",
    href: "https://icc-cove-demo.vercel.app",
  },
];

// Spelled-out numbers read better in a headline than digits do.
const NUMBER_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six",
  "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
];

const availableCount = availableWebsites.length;
const countWord = NUMBER_WORDS[availableCount] ?? String(availableCount);
const s = availableCount === 1 ? "" : "s";

export const styleDirections = {
  eyebrow: `${countWord} available website${s}`,
  headingCount: countWord,
  headingRest: ` website${s} currently available, ready to become yours`,
  intro: `These aren't templates or mockups. These are ${countWord.toLowerCase()} complete, fully custom website${s}, live right now. Pick the one that already feels like your practice and we'll tailor it to your brand, with any reasonable finishing touches, until you're happy to put your name on it. Once a site is claimed it's retired for good and we build a new one to take its place — so what's available here changes regularly. If one feels like yours, reach out before someone else claims it.`,
  scopeLinkLabel: "See exact scope & pricing",
  designs: availableWebsites,
  note: "Every website above is real, live, and available right now. Feel free to click through and explore.",
};

/**
 * The client journey, start to finish.
 *
 * Eight steps rather than four: the old version compressed everything after
 * "pay a deposit" into one box, which is exactly where a prospective client's
 * questions live. The two footnotes it carried (deposit, revisions) are kept
 * and still appear beneath the section.
 */
export const process = {
  heading: "How it works",
  intro:
    "From first hello to a site you own, with the scope, the price, and the process in writing at every step.",
  /** Shown under the section, keyed by marker, exactly as before. */
  notes: [
    {
      marker: "†",
      note: "Your 25% deposit covers the consultation and scoping work that happens before your build starts, so it isn't refundable. If you see your finished site and decide it isn't right for you, that's completely fine — you simply don't owe the remaining balance, and the site stays with me.",
    },
    {
      marker: "*",
      note: "Your build includes up to 2 hours of back-and-forth on revisions. The balance is due at the end of the two weeks you spend with your site. Anything beyond the included time gets noted as a separate request. We'll quote it, and nothing extra happens until you approve it.",
    },
  ],
  steps: [
    {
      title: "Browse the collection",
      body:
        "Click through the live websites and find the one that already feels like your practice. Every one is a real, finished site, and once it's claimed it's retired for good.",
      badge: "Take your time",
      visual: "browsers",
    },
    {
      title: "Fill out the intake",
      body:
        "Tell me which site you picked, what you'd keep, what you'd change, and how your brand should look and sound: colors, fonts, the works. Skip anything you're unsure about.",
      badge: "About 10 minutes",
      visual: "form",
      cta: { label: "Start your intake →", href: "/get-started" },
    },
    {
      title: "A quick 15-minute call",
      body:
        "I'll have already read your intake, so we skip the small talk and confirm your scope, any add-ons, and timing.",
      badge: "15 minutes",
      visual: "calendar",
    },
    {
      title: "Agreement & deposit",
      body:
        "You get a written summary and a simple agreement. A 25% deposit starts your build, and along with it you'll share access to your current site and any photos or logo. That deposit is the only thing you're committed to.",
      badge: "Everything in writing",
      visual: "document",
      marker: "†",
    },
    {
      title: "I build your site",
      body:
        "Your chosen site is tailored to your brand, and the content from your current site is moved across for you.",
      badge: "About 1–2 weeks",
      visual: "palette",
    },
    {
      title: "You review and refine",
      body:
        "Your site comes back to you, fully editable, on a private preview link. Up to 2 hours of revisions are included, handled over email. You get two weeks with it to decide: pay the balance and it's yours, or tell me it isn't right and you owe nothing further.",
      badge: "2 hours of revisions included",
      visual: "comments",
      marker: "*",
    },
    {
      title: "Go live on your schedule",
      body:
        "We launch on your domain whenever you're ready, and I walk you through editing everything yourself. Your hosting starts that day.",
      badge: "Your timing",
      visual: "live",
    },
    {
      title: "Ongoing care",
      body:
        "Hosting, backups, monitoring, and fixes are handled. Quick questions and small changes are on the house; just email me.",
      badge: "$120/year, cancel anytime",
      visual: "shield",
    },
  ],
  primaryCta: { label: "Start your intake →", href: "/get-started" },
  secondaryCta: { label: "Browse the websites ↑", href: "/#shop" },
};

export const pricing = {
  heading: "Simple, transparent pricing",
  intro:
    "It works in three steps: pick your website, keep it running, add anything extra. That's the whole model — you'll know your full cost before you pay a cent, and there are no hidden fees or surprise invoices six months in.",
  buildStep: "Step 1",
  buildHeading: "Pick your website",
  buildStepIntro:
    "Choose the one closest to your vision. We tailor it to your brand and hand it over, built and live — a single fee, paid once.",
  buildStepBackLink: {
    label: `Browse the ${countWord.toLowerCase()} available website${s}`,
    href: "#shop",
  },
  build: {
    label: "One-time",
    name: "Initial Build",
    price: "$330",
    blurb:
      `A 5-page professional website — Home, About, Services, Blog, and Contact — customized from one of our ${countWord.toLowerCase()} available website${s} and delivered in about a week or two.`,
    features: [
      "Five pages: Home, About, Services, Blog, Contact",
      "Customized to your brand: palette, fonts, imagery, layout",
      "Your existing content moved across for you (up to 6 pages)",
      "Your domain pointed at the new site, with your email left running",
      "The first hour of that work included, whatever it turns out to involve",
      "Up to 2 hours of revisions included (async)",
      "Your own secure login — manage every word, photo, and post",
    ],
    overageNote:
      "Need more than the included revisions? Extra work is $60/hour — always quoted and agreed in writing before it happens.",
  },
  tiersStep: "Step 2",
  tiersHeading: "Keep it running",
  tiersIntro:
    "One plan, one price. Everything your site needs to stay online, secure, and healthy — with no tiers to compare and nothing to upgrade into later.",
  tiers: [
    {
      tierLabel: "Hosting & care",
      name: "Everything included",
      price: "$120",
      cadence: "/year",
      altPrice: "or $12/month",
      blurb:
        "Your site stays fast, secure, and backed up — and if anything breaks, it's on me to fix it.",
      features: [
        "Hosting and infrastructure",
        "Security monitoring and updates",
        "Outage monitoring and alerts",
        "Domain and SSL expiry monitoring",
        "Automated backups, so nothing is ever lost",
        "Maintenance — bugs, errors, and outages fixed",
        "Quick questions and small changes, on the house — just email, no ticket queue",
      ],
      bestFor:
        "Cancel or change it whenever you like. Your site is yours either way — it comes with you.",
      featured: true,
    },
  ],
  addOnsStep: "Step 3",
  addOnsStepNote: "optional",
  addOnsHeading: "Add anything extra",
  addOnsIntro:
    "À la carte, added at intake and billed once. The base package covers what most practices actually need — tap any add-on for the what, the why, and who it's for.",
  addOns: [
    {
      label: "Extra page",
      price: "$50 / page",
      what: "A page beyond the base five — a specialties breakdown, a telehealth explainer, a resource library.",
      why: "Sometimes one page can't carry everything a visitor needs to know. Extra pages give specific topics room to breathe.",
      whoFor: "Practitioners with multiple specialties or services, group practices, or anyone cramming three topics into one section.",
    },
    {
      label: "Legal / disclaimer pages",
      price: "$30 / page",
      what: "Privacy policy, HIPAA notice, terms of service, accessibility statement — placed and formatted from copy you or your attorney provide.",
      why: "Cheaper than a regular page because we're placing your provided copy into a clean template — regulators and insurance carriers like to see these.",
      whoFor: "Every licensed practice eventually. Often required for ad networks and some referral directories.",
    },
    {
      label: "Contact form",
      price: "$50",
      what: "A proper inquiry form on your site — visitors write to you without opening their email app, and submissions land in your inbox.",
      why: "For an anxious first-time visitor, a quiet form is a lower bar than composing an email. Lower bar, more inquiries.",
      whoFor: "Anyone whose contact page is currently just an email address."
    },
    {
      label: "Scheduling integration (Calendly / Cal.com)",
      price: "$50",
      what: "Your booking widget embedded directly on the site so visitors can pick a consult time without leaving.",
      why: "Removes the click between “interested” and “booked.” For a hesitant prospective client, that click is the conversion-killer.",
      whoFor: "Anyone who already uses a scheduler — or can spare 10 minutes to set one up.",
    },
    {
      label: "Google Business Profile setup",
      price: "$80",
      what: "We claim or optimize your Google Business Profile — photos, hours, service area, categories — and add local-business structured data to your site so search engines understand your practice.",
      why: "Most people looking for a nearby practitioner start in Google Maps. Without a claimed, complete profile you're effectively invisible to local search.",
      whoFor:
        "Anyone with a physical office who wants to show up in Google Map searches for their practice. Telehealth-only practices benefit less.",
    },
    {
      label: "Complicated domain moves",
      price: "$60/hour",
      what: "Pointing your domain at your new site is included, and so is the first hour of doing it. Most moves take well under that: sign in where your domain lives, read the settings, change two of them. If yours turns out to need longer, I stop and tell you what is left and what it would cost, and nothing continues until you say so.",
      why: "A domain usually has more than a website attached to it. Your email almost certainly runs on the same name, and one wrong setting can stop mail arriving for days before anyone notices. The awkward ones are awkward because of how they were set up years ago, which is nobody's fault and not something you can tell in advance.",
      whoFor:
        "Usually nobody. It comes up when a previous web designer still controls the domain, the company it was bought from has disappeared, or the settings live somewhere other than where you bought it. You will never get a bill for this without agreeing to it first.",
    },
    {
      label: "SEO setup",
      price: "$100",
      what: "Five things: meta titles and descriptions for every page, an XML sitemap (a file that helps Google find every page on your site), keyword research built around how your ideal clients actually search for someone like you, a dedicated FAQ section on your site, and structured data — hidden code added to that FAQ and your practice info so Google reads and understands it accurately.",
      why: "Helps the right kind of clients find you on Google, and gives visitors quick, honest answers before they ever have to email you. Most of the work is one-time; the payoff compounds.",
      whoFor: "Practices that want long-term organic traffic instead of paying for ads forever.",
    },
    {
      label: "Advanced Analytics setup",
      price: "$100",
      what: "Google Analytics 4 with conversion goals and event tracking for the actions that matter — booking clicks, form submissions, calls.",
      why: "You can finally answer “is the site actually working?” with data instead of guesses.",
      whoFor: "Practitioners spending on marketing who want to know what's pulling its weight.",
    },
    {
      label: "Custom logo design",
      price: "$100",
      what: "A simple, professional wordmark or lockup for your practice, with a round or two of revisions.",
      why: "A logo signals you're a real practice, not a side project — used in your header, favicon, and email signature.",
      whoFor: "New practices, rebrands, or anyone still using a Canva template.",
    },
  ],
  /**
   * Sits directly after the add-on prices, which is where cost doubt actually
   * lands rather than at the build price on its own.
   *
   * "Sliding scale" is deliberate. It is the phrase these therapists use with
   * their own clients every week, so it needs no explaining and it signals that
   * the same principle is being offered back to them. The heading speaks to the
   * situation rather than the discount, so it reads as understanding a stage of
   * a career rather than as a sale.
   */
  slidingScale: {
    eyebrow: "Sliding scale",
    heading: "Early in your practice?",
    body: "If you're pre-licensure, working under a supervisor, or just getting a practice off the ground, I know full price may not be realistic right now. That shouldn't be the reason you go without a decent website. Tell me where you are and I can usually bring the cost down considerably.",
    cta: { label: "Book fifteen minutes", href: "/book" },
    note: "No form to fill in and nothing to prove. We talk about what works and I quote you accordingly.",
  },
  terms: {
    heading: "Straight terms, in writing",
    items: [
      {
        title: "Pay in two simple steps",
        body: "A 25% deposit gets your build started, and the balance is due two weeks after your site is handed back to you — so you see the finished thing before you pay for it. Your hosting starts the day you go live. Launching on your domain happens on your schedule and never holds up the build. One secure Stripe link each time, no installment juggling.",
      },
      {
        title: "Fair cancellation",
        body: "See your site and decide it isn't for you? You simply don't pay the remaining balance. The 25% deposit stays with us to cover the consultation and scoping already done, and the site stays with us too. It's in the agreement, not fine print.",
      },
      {
        title: "No surprise overages",
        body: "Anything beyond your included scope is $60/hour — always scoped and agreed in writing before the work happens.",
      },
      {
        title: "Leave anytime",
        body: "Switch between monthly and annual, or cancel, whenever you like. You own your code — your site can offboard to any developer or agency you choose.",
      },
    ],
  },
  addOnsCustomNote:
    "Need something that isn't listed? Content writing, SEO, and most other digital work fall well within what I do — they're quoted per project rather than listed here, because scope varies too much to put a fixed number on. Mention it in your intake and you'll get a straight price in writing before anything starts.",
  addOnsNote:
    "Not planning to blog, but you'd like a contact form? Want a photo gallery on your services page? Just ask. We're glad to discuss swaps and small additions that keep the same overall scope and structure. The goal is a site you're genuinely happy with, not a rigid checklist.",
  footnote:
    "Not sure what you need? Say so in the intake — that's what our 15-minute call is for. You'll have the full scope and final price in writing before you pay anything.",
};

/**
 * Parked, not deleted.
 *
 * A section headed "Recent work" that holds a single project reads as "one
 * client" — worse than showing nothing. The proof itself still appears, as an
 * answer to "Can I see something you've built?" in the FAQ, which is where a
 * skeptic looks anyway and which doesn't promise a portfolio.
 *
 * Restore the section on the homepage once there are enough projects that the
 * heading is telling the truth (Steven's bar: ~10 clients).
 */
export const work = {
  heading: "Recent work",
  intro: "Real sites, built to be owned and run by the people who use them.",
  projects: [
    {
      name: "dateable()af",
      tag: "Brand site · CMS · Podcast hub",
      body: "A relationships-podcast brand with a bold editorial design, a custom content editor the founders run themselves, and a built-in Spotify podcast hub.",
      href: "https://dateableaf.com",
      linkLabel: "View site",
    },
  ],
};

export const faqs = {
  heading: "Good questions",
  items: [
    {
      q: "How long does it take?",
      a: "About a week or two from your deposit to the site coming back to you, once I have access to your current site and anything new you want added, like a logo or fresh photos. From there you review, we refine, and we launch on your schedule. This is a productized build, not a three-month agency project.",
    },
    {
      q: "Can I see something you've built?",
      a: "Every website in the collection above is a real, finished site — not a mockup or a screenshot. Click any of them and you're on the live build. For a site that's out in the world with a client running it day to day, have a look at dateableaf.com: custom design, and a content editor the founders update themselves without touching code.",
    },
    {
      q: "Do I need to be technical?",
      a: "Not at all. If you can use email, you can update your site. You get your own secure login and a walkthrough at launch.",
    },
    {
      q: "Who writes the website copy?",
      a: "If you already have a website, I move your existing words across for you — your bio, your services, your voice, as you wrote them. Anything new is yours to bring, because nobody knows your practice like you do. Want help writing it? That's quoted separately — just ask. (Blog posts you write later publish through your own editor in minutes.)",
    },
    {
      q: "What does it cost to keep running?",
      a: "$330 once, then $120/year for hosting, maintenance, and support — or $12/month if you'd rather. Plus your domain, about $15/year, which you own. No surprise platform fees, ever."
    },
    {
      q: "What if I want changes after the included revisions?",
      a: "Up to 2 hours of revisions are included with the build. Beyond that, work is $60/hour — always quoted and agreed in writing before it happens. Once you're on hosting, quick questions and small changes are on the house; just email me."
    },
    {
      q: "What if I change my mind?",
      a: "No problem at all — the 25% deposit is the only thing you're committed to. You see your finished site on a private link first, and you get two weeks with it. If you decide it isn't right, tell me and the balance is never invoiced; the deposit covers the consultation and scoping already done, and the site stays with me. If you say nothing, the balance is due at the end of those two weeks. It's written into the agreement, not buried in fine print.",
    },
    {
      q: "I already have a website — can you help?",
      a: "Yes — and moving your existing content across is included. I'll carry over up to six pages from your current site as a first pass, so you're reviewing a real draft instead of starting from a blank page. Bigger sites or long blog archives get a straight quote first.",
    },
    {
      q: "Do I need to buy anything else?",
      a: "Just your domain (about $15/year). You buy it so that you own it, and pointing it at your new site is something I do for you, not something you have to work out.",
    },
  ],
};

export const referral = {
  heading: "Know someone who needs a site?",
  body: "Send them my way. If they sign up, you both get three months of hosting free. No limits, no catches, no fine print.",
  cards: [
    { label: "You get", amount: "3 months free", note: "on your hosting" },
    { label: "They get", amount: "3 months free", note: "on their hosting" },
  ],
};

export const finalCta = {
  heading: "Ready to ignite your online presence?",
  body: "Fill out the intake and we'll take fifteen minutes to confirm the details. No pressure, no jargon, no obligation. It reaches me directly, btw.",
  primaryCta: { label: "Start your intake", href: "/get-started" },
  cta: { label: "Text me" },
  secondaryCta: { label: "Email me" },
};

export const privacy = {
  heading: "Privacy Policy",
  lastUpdated: "August 7, 2026",
  intro:
    "This policy explains what information Ignite Creative Co collects when you visit this website, why we collect it, and what choices you have. We keep this deliberately plain — no dense legal hedging.",
  sections: [
    {
      title: "Who we are",
      body: [
        "Ignite Creative Co LLC is a web design and digital services studio based in Austin, Texas. For any privacy question, or to request access to or deletion of your information, email grant@ignitecreativeco.world.",
      ],
    },
    {
      title: "Information you give us directly",
      body: [
        "If you fill out the contact form on this site, we collect what you type into it:",
      ],
      bullets: [
        "Your first and last name",
        "Your email address",
        "Your phone number, if you choose to provide it",
        "The content of your message",
      ],
    },
    {
      title: "Information collected automatically",
      body: [
        "Like most websites, this site collects some information automatically as you browse. This includes pages you view, how long you spend on them, the approximate region you are visiting from, the type of device and browser you use, and the site or search that referred you.",
        "Our hosting provider also keeps standard server logs, which include IP addresses, as part of delivering and securing the site.",
      ],
    },
    {
      title: "Cookies and tracking",
      body: [
        "This site uses two analytics services and one embedded booking calendar, all of which set cookies in your browser:",
      ],
      bullets: [
        "Google Analytics — measures overall site traffic and which pages people find useful.",
        "HubSpot — our customer relationship system. Its cookie lets us connect a contact form submission to the pages that visitor viewed beforehand, so we understand what someone was looking for before they reached out.",
        "Google Calendar — the booking page at /book embeds Google's own appointment calendar so you can pick a time without leaving this site. That embed is served by Google and sets Google's cookies. Anything you enter to book a call goes to Google Calendar, under Google's privacy policy, not ours. You can open the calendar on Google's own site instead; the link is on that page.",
      ],
    },
    {
      title: "How we use this information",
      body: [
        "We use the information above to respond to your inquiry, to understand which parts of the site are working, and to improve the site over time.",
        "We do not sell your information. We do not run advertising on this site. We do not add you to a marketing email list or automated drip campaign from a contact form submission — if you hear from us, it is a real person replying to you directly.",
      ],
    },
    {
      title: "Who we share it with",
      body: [
        "We share information only with the service providers that make this site work, and only so they can provide their service to us. These include our website host, our analytics providers, our customer relationship system, our email provider, and — if you become a client — our payment processor.",
        "Each of these providers handles data under its own privacy terms. We may also disclose information if required by law.",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "We keep contact form submissions for as long as needed to respond to you and maintain our business records. Analytics data is retained according to each provider's standard retention period. You can ask us to delete your information at any time.",
      ],
    },
    {
      title: "Your choices",
      body: [
        "You can browse this site without submitting any personal information. Most browsers let you block or delete cookies through their settings, and Google offers a browser add-on that opts you out of Google Analytics entirely.",
        "You may also email us at grant@ignitecreativeco.world to ask what information we hold about you, to correct it, or to have it deleted. Depending on where you live, you may have additional rights under laws such as the Texas Data Privacy and Security Act, the CCPA, or the GDPR. We honor these requests regardless of where you live.",
      ],
    },
    {
      title: "Security",
      body: [
        "We use reputable providers and industry-standard measures to protect the information we hold. That said, no method of transmitting or storing data online is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "Children",
      body: [
        "This site is intended for business owners and practitioners. It is not directed at children under 13, and we do not knowingly collect information from them.",
      ],
    },
    {
      title: "Changes to this policy",
      body: [
        "If we change how we handle information, we will update this page and revise the date at the top. Material changes will be reflected here before they take effect.",
      ],
    },
    {
      title: "Contact",
      body: [
        "Questions about this policy, or about your information, can go to grant@ignitecreativeco.world.",
      ],
    },
  ],
};
