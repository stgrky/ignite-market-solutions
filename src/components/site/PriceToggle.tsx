"use client";

import { useState } from "react";

import { supervisees } from "@/lib/content";

type Plan = (typeof supervisees.plans)["yearly" | "monthly"];
type Card = Plan["cards"][number] & {
  sub?: string;
  was?: string;
  unit?: string;
  extra?: string;
  under?: string;
};

/**
 * Yearly / monthly switch for the supervisee prices.
 *
 * Yearly is the default because it is the cheaper of the two. Defaulting to
 * monthly would make the headline number look smaller, which is the trick this
 * page spends the rest of its length arguing against.
 *
 * Both routes render the same two cards, so switching swaps numbers rather
 * than reflowing the section. The alternative, stacking both, is what this
 * replaced: it put four sentences of payment-plan explanation directly under
 * the price the page exists to show.
 */
export function PriceToggle() {
  const [planId, setPlanId] = useState<"yearly" | "monthly">("yearly");
  const plan: Plan = supervisees.plans[planId];
  const options = [supervisees.plans.yearly, supervisees.plans.monthly];

  return (
    <div>
      <div
        role="group"
        aria-label="Payment schedule"
        className="mx-auto inline-flex rounded-full border border-[var(--color-subtle)] bg-[var(--color-background)] p-1"
      >
        {options.map((option) => {
          const selected = option.id === planId;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setPlanId(option.id as "yearly" | "monthly")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                selected
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-6 grid max-w-xl gap-4 sm:grid-cols-2">
        {(plan.cards as Card[]).map((card) => (
          // Each card owns the line beneath it, so the comparison stays with
          // the price it compares against instead of floating under the row.
          <div key={card.label} className="flex flex-col">
            <div
              className={`flex-1 rounded-2xl bg-[var(--color-background)] px-6 py-7 ${
                card.featured
                  ? "border border-[var(--color-accent)] shadow-[var(--shadow-card)]"
                  : "border border-[var(--color-subtle)]"
              }`}
            >
              <p
                className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  card.featured
                    ? "text-[var(--color-accent-strong)]"
                    : "text-[var(--color-muted)]"
                }`}
              >
                {card.label}
              </p>
              <p className="mt-3 font-serif text-4xl text-[var(--color-foreground)]">
                {card.amount}
                {card.unit ? (
                  <span className="ml-1 text-xl font-normal text-[var(--color-muted)]">
                    {card.unit}
                  </span>
                ) : null}
              </p>
              {card.extra ? (
                <p className="mt-1.5 font-serif text-lg font-semibold text-[var(--color-foreground)]">
                  {card.extra}
                </p>
              ) : null}
              {card.sub ? (
                <p className="mt-1 text-sm text-[var(--color-muted)]">{card.sub}</p>
              ) : null}
            </div>
            {/* Rendered on every card, blank where there is nothing to say.
                Without the placeholder the column carrying this line gives up
                the height to it and that card ends shorter than its neighbor. */}
            <p className="mt-2.5 text-sm text-[var(--color-muted)]" aria-hidden={!card.under}>
              {card.under ? (
                <>
                  <span className="line-through">{card.under.split(" ")[0]}</span>{" "}
                  {card.under.split(" ").slice(1).join(" ")}
                </>
              ) : (
                <>&nbsp;</>
              )}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--color-muted)]">
        {plan.note}
      </p>
    </div>
  );
}
