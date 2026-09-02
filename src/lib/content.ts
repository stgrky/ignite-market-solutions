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
    "Ignite Creative Co is a web design and digital-services studio with a focus on the mental health, wellness, and coaching space. Fast, beautiful websites you own and can update yourself — a low one-time build fee, then one simple plan.",
  url: "https://ignitecreativeco.world",
  email: "grant@ignitecreativeco.world",
  phone: "(737) 420-2743",
  phoneHref: "tel:+17374202743",
  smsHref: "sms:+17374202743",
  location: "Austin, TX",
};

export const nav = [
  { label: "What you get", href: "/#value" },
  { label: "Shop", href: "/#shop" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
];

export const hero = {
  eyebrow: "Web & digital services · mental health, wellness & coaching",
  headlineLead: "Websites that give",
  headlineAccent1: "personality",
  headlineMid: "to your",
  headlineAccent2: "practice.",
  subhead:
    "We design and build fast, beautiful websites, and the digital services around them, with a focus on the wellness space. Sites you own, can update yourself, and never pay rising platform fees to keep. A low one-time build fee, then one simple plan, and you're live in about a week or two.",
  primaryCta: { label: "Book a free intro call", href: "/#contact" },
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
    name: "Haven",
    vibe: "Soft & somatic",
    swatch: "#8897bf",
    href: "https://icc-haven-demo.vercel.app",
  },
  {
    name: "Anchor",
    vibe: "Grounded & modern",
    swatch: "#2f8f83",
    href: "https://icc-anchor-demo.vercel.app",
  },
  {
    name: "Grove",
    vibe: "Warm & relational",
    swatch: "#6b8e7f",
    href: "https://icc-grove-demo.vercel.app",
  },
  {
    name: "Willow",
    vibe: "Gentle & resilient",
    swatch: "#b97c68",
    href: "https://icc-willow-demo.vercel.app",
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

export const process = {
  heading: "How it works",
  intro:
    "From first hello to live site in about a week or two, with the scope, the price, and the process in writing at every step.",
  steps: [
    {
      title: "Tell me about your practice",
      body: "Fill out a short intake form — your practice, your style, your colors and fonts. Then we hop on a free 45-minute consult to pick your website and scope your customizations. No pressure, no pitch.",
    },
    {
      title: "Confirm scope and pay a deposit",
      bodyLead:
        "After the call you get a written summary: exactly what's included, any add-ons you chose, and a secure payment link. ",
      bodyHighlight: "Pay a 20% deposit of the build price",
      bodyAfter: " — then the build begins.",
      marker: "†",
      note: "Your 20% deposit covers the consultation and scoping work that happens before your build starts, so it isn't refundable. If you decide not to move forward before launch, that's completely fine — you simply don't owe the remaining balance.",
    },
    {
      title: "We build, you review",
      bodyLead: "Your site is customized to your brand in about a week or two. ",
      bodyHighlight: "Two rounds of revisions are included",
      bodyAfter: " — handled over email, on your schedule.",
      marker: "*",
      note: "Two rounds of revisions means up to 2 hours of back-and-forth included in your build. Anything beyond that scope gets noted as a separate request. We'll quote it, and nothing extra happens until you approve it. Full scope and expectations are agreed upfront, before any work begins.",
    },
    {
      title: "Go live — with support",
      body: "We launch on your domain, walk you through editing everything yourself, and your hosting plan quietly takes over: hosting, monitoring, maintenance, and whatever else you need for your success.",
    },
  ],
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
      "Two rounds of revisions included (up to 2 hours, async)",
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
      what: "A page beyond the base five — an FAQ, a specialties breakdown, a telehealth explainer, a resource library.",
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
      label: "Content migration from your old site",
      price: "from $50",
      what: "We move your existing blog posts — text, images, dates — from your current site into your new editor. $50 up to 25 posts, $100 up to 100, custom beyond.",
      why: "Keeps the writing and search ranking you've already built. No re-typing, no starting your blog at zero.",
      whoFor: "Anyone moving from WordPress, Squarespace, or Webflow with posts worth keeping.",
    },
    {
      label: "Domain transfer & DNS setup",
      price: "from $60/hour",
      what: "We move your existing domain to a new registrar, or safely repoint its DNS in place, without breaking anything already running on it — most commonly your email. Billed for time spent, since a simple repoint and a full registrar transfer take very different amounts of work.",
      why: "A domain rarely lives alone. Get one DNS record wrong and you can silently break inbound email for days before anyone notices. We handle the transfer and the records so nothing goes down.",
      whoFor:
        "Anyone bringing a domain they already own, especially if email or anything else is already running on it. (Buying a domain fresh for a new site is already covered — see the cost FAQ below.)",
    },
    {
      label: "SEO setup",
      price: "$100",
      what: "Meta titles and descriptions for every page, an XML sitemap, and keyword research for your niche.",
      why: "Helps the right kind of clients find you on Google. Most of the work is one-time; the payoff compounds.",
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
  terms: {
    heading: "Straight terms, in writing",
    items: [
      {
        title: "Pay in two simple steps",
        body: "A 20% deposit gets your build started, and the balance is due before your site goes live. One secure Stripe link each time, no installment juggling.",
      },
      {
        title: "Fair cancellation",
        body: "Change your mind before launch? You simply don't pay the remaining balance. The 20% deposit stays with us to cover the consultation and scoping already done. It's in the agreement, not fine print.",
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
    "Need something that isn't listed? Content writing, SEO, and most other digital work fall well within what I do — they're quoted per project rather than listed here, because scope varies too much to put a fixed number on. Bring it up on your intro call and you'll get a straight price in writing before anything starts.",
  addOnsNote:
    "Not planning to blog, but you'd like a contact form? Want a photo gallery on your services page? Just ask. We're glad to discuss swaps and small additions that keep the same overall scope and structure. The goal is a site you're genuinely happy with, not a rigid checklist.",
  footnote:
    "Not sure what you need? That's exactly what the free intro call is for. You'll have the full scope and final price in writing before you pay anything.",
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
      a: "About a week or two from payment to launch, once your content and photos are in hand. If we're gathering content together it can stretch a little — but this is a productized build, not a three-month agency project.",
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
      a: "You bring the words — your bio, your services, your voice. We shape and place them so they land well, but nobody knows your practice like you do. Want help getting it written? That's available as an add-on — just ask. (Blog posts you write later publish through your own editor in minutes.)",
    },
    {
      q: "What does it cost to keep running?",
      a: "$330 once, then $120/year for hosting, maintenance, and support — or $12/month if you'd rather. Plus your domain, about $15/year, which you own. No surprise platform fees, ever."
    },
    {
      q: "What if I want changes after the included revisions?",
      a: "Two revision rounds are included with the build. Beyond that, work is $60/hour — always quoted and agreed in writing before it happens. Once you're on hosting, quick questions and small changes are on the house; just email me."
    },
    {
      q: "What if I change my mind?",
      a: "No problem at all. You pay a 20% deposit to start and the balance only when your site is ready to go live — so if you decide not to move forward before launch, you simply don't owe the rest. The deposit covers the consultation and scoping already done. It's written into the agreement, not buried in fine print.",
    },
    {
      q: "I already have a website — can you help?",
      a: "Yes. We can migrate your blog and content and rebuild it properly. Migration starts at $50 as a simple add-on.",
    },
    {
      q: "Do I need to buy anything else?",
      a: "Just your domain (about $15/year) — you purchase it so you own it, and we guide you through pointing it at your new site.",
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
  body: "Text or email me and we'll find twenty minutes to talk through your business needs. No pressure, no jargon, no obligation. It reaches me directly, btw.",
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
        "This site uses two analytics services, both of which set cookies in your browser:",
      ],
      bullets: [
        "Google Analytics — measures overall site traffic and which pages people find useful.",
        "HubSpot — our customer relationship system. Its cookie lets us connect a contact form submission to the pages that visitor viewed beforehand, so we understand what someone was looking for before they reached out.",
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
