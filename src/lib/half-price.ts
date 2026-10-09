/**
 * Halve a price string for the supervisee rate.
 *
 * Derived rather than hand-written so the supervisee page cannot drift from
 * the real add-on menu. Change a price in `content.ts` and the half-price
 * column follows it. Hand-maintaining a second table is how a public page ends
 * up quoting a number we no longer charge.
 *
 * Handles the shapes actually in use: "$330", "$50 / page", "$60/hour".
 * Anything it does not recognize comes back untouched, so a new price format
 * shows the full price rather than a wrong half.
 */
export function halfPrice(price: string): string {
  return price.replace(/\$(\d+(?:\.\d+)?)/, (_, n: string) => {
    const halved = Number(n) / 2;
    // Keep whole dollars whole. $30/page halves to $15, not $15.00.
    return `$${Number.isInteger(halved) ? halved : halved.toFixed(2)}`;
  });
}
