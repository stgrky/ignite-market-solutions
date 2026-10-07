import Link from "next/link";

/**
 * The three ways into a conversation, offered side by side.
 *
 * Ranked by what they cost the visitor in time rather than by what they're
 * called. Nobody weighs "intake form" against "contact form" — those are our
 * words for our things. Everybody can weigh fifteen minutes against ten
 * against one, and picks without stalling.
 *
 * Three equal-weight buttons usually convert worse than one, so the middle
 * option carries the emphasis: it's the path that makes the call short and the
 * build start sooner. The other two stay one tap away for people who aren't
 * ready to answer questions or aren't ready to talk.
 *
 * `tone` exists because this sits on both the cream page body and the dark
 * closing band, and the dark one needs its own colours rather than a tinted
 * version of the light ones.
 */

type Props = {
  heading?: string;
  intro?: string;
  tone?: "light" | "dark";
  /** Hide the intake card on /get-started, where they're already doing it. */
  omit?: "intake";
};

const ways = [
  {
    id: "book",
    label: "Book a call",
    time: "15 minutes",
    body: "Pick a time that suits you. No pressure and no pitch, just a conversation about what you need.",
    // /book rather than the calendar itself: an outbound link at the moment
    // someone is ready to act hands them to another domain, and whatever
    // happens next is invisible to us. The page embeds the same calendar.
    href: "/book",
  },
  {
    id: "intake",
    label: "Fill out the intake",
    time: "10 minutes",
    body: "Answer a few questions first and our call is only confirming details. Some people skip the call entirely.",
    href: "/get-started",
  },
  {
    id: "ask",
    label: "Just ask a question",
    time: "1 minute",
    body: "Your name, your email, and whatever's on your mind. It reaches me directly.",
    // #ask, not #contact: this card sits inside the contact section on the home
    // page, so pointing at the section itself would scroll nowhere.
    href: "/#ask",
  },
];

export function WaysToStart({
  heading = "Three ways to start",
  intro = "Whichever suits you. They all reach me.",
  tone = "light",
  omit,
}: Props) {
  const dark = tone === "dark";
  const items = ways.filter((w) => w.id !== omit);

  return (
    <div className="w-full">
      <div className="text-center">
        <h2
          className={`font-serif text-2xl md:text-3xl ${
            dark ? "text-white" : "text-[var(--color-foreground)]"
          }`}
        >
          {heading}
        </h2>
        <p className={`mt-3 text-[15px] ${dark ? "text-white/60" : "text-[var(--color-muted)]"}`}>
          {intro}
        </p>
      </div>

      <ul
        className={`mt-8 grid gap-4 ${
          items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {items.map((way) => {
          const featured = way.id === "intake";
          const card = [
            "flex h-full flex-col rounded-2xl border p-6 text-left transition",
            dark
              ? featured
                ? "border-white/70 bg-white/10 hover:bg-white/15"
                : "border-white/20 hover:border-white/50"
              : featured
                ? "border-[var(--color-accent)] bg-[var(--color-surface)] shadow-[var(--shadow-card)] hover:border-[var(--color-accent-strong)]"
                : "border-[var(--color-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]",
          ].join(" ");

          const inner = (
            <>
              <span
                className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  dark ? "text-white/50" : "text-[var(--color-accent-strong)]"
                }`}
              >
                {way.time}
              </span>
              <span
                className={`mt-2 font-serif text-xl ${
                  dark ? "text-white" : "text-[var(--color-foreground)]"
                }`}
              >
                {way.label}
              </span>
              <span
                className={`mt-2.5 flex-1 text-[15px] leading-relaxed ${
                  dark ? "text-white/65" : "text-[var(--color-muted)]"
                }`}
              >
                {way.body}
              </span>
              <span
                className={`mt-5 text-sm font-semibold ${
                  dark ? "text-white" : "text-[var(--color-accent-strong)]"
                }`}
              >
                {way.id === "book" ? "See available times →" : "Go →"}
              </span>
            </>
          );

          return (
            <li key={way.id}>
              <Link href={way.href} className={card}>
                {inner}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
