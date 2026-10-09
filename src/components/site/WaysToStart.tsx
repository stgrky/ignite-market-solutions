import Link from "next/link";

/**
 * The three ways into a conversation, offered side by side.
 *
 * Ranked by what they cost the visitor in time rather than by what they're
 * called. Nobody weighs "intake form" against "contact form" — those are our
 * words for our things. Everybody can weigh fifteen minutes against ten
 * against one, and picks without stalling.
 *
 * Two cards, not three. Write or talk is a clean either/or; adding the intake
 * made it a three-way choice in which one option was visibly the most work,
 * and a card is an invitation to click. Clicking into a six-step form before
 * you have decided anything is how people leave.
 *
 * The intake still exists and is still linked, as a line of text under the
 * contact form and from the booking page. That is the right weight for it: a
 * ten-minute form is a qualifying tool, not a first-touch one, and the people
 * who want it are already looking for it.
 *
 * `tone` exists because this sits on both the cream page body and the dark
 * closing band, and the dark one needs its own colors rather than a tinted
 * version of the light ones.
 */

type Props = {
  heading?: string;
  intro?: string;
  tone?: "light" | "dark";
  /** Hide a card on the page that already is that thing. */
  omit?: "ask" | "book";
  /** Quieter type, for where this is the alternative rather than the ask. */
  compact?: boolean;
};

const ways = [
  {
    id: "ask",
    label: "Send me a message",
    time: "1 minute",
    body: "Your name, your email, and a sentence about what you need. I read every one myself and reply the same day.",
    href: "/#ask",
  },
  {
    id: "book",
    // No duration here on purpose. On the other two it reads as "this is
    // cheap"; on a call it reads as "this will take fifteen minutes of your
    // day", which is the opposite of the nudge we want.
    label: "Book a call",
    body: "Rather talk it through? Pick a time that suits you. No pressure and no pitch.",
    href: "/book",
  },
];

export function WaysToStart({
  heading = "Two ways to start",
  intro = "Whichever suits you. They all reach me.",
  tone = "light",
  omit,
  compact = false,
}: Props) {
  const dark = tone === "dark";
  const items = ways.filter((w) => w.id !== omit);

  return (
    <div className="w-full">
      <div className="text-center">
        <h2
          className={`font-serif ${compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"} ${
            dark ? "text-white" : "text-[var(--color-foreground)]"
          }`}
        >
          {heading}
        </h2>
        <p
          className={`mt-2.5 ${compact ? "text-sm" : "text-[15px]"} ${
            dark ? "text-white/60" : "text-[var(--color-muted)]"
          }`}
        >
          {intro}
        </p>
      </div>

      <ul
        className={`mt-8 grid gap-4 ${
          items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {items.map((way) => {
          const featured = way.id === "ask";
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
              {way.time ? (
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    dark ? "text-white/50" : "text-[var(--color-accent-strong)]"
                  }`}
                >
                  {way.time}
                </span>
              ) : (
                // Holds the line the other cards' eyebrows sit on, so the
                // titles still line up across the row.
                <span aria-hidden className="text-[11px] tracking-[0.18em]">
                  &nbsp;
                </span>
              )}
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
                {way.id === "book"
                  ? "See available times →"
                  : way.id === "ask"
                    ? "Write to me →"
                    : "Go →"}
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
