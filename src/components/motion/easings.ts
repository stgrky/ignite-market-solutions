import { cubicBezier } from "framer-motion";

/**
 * Slow, editorial out-curve used across the site for premium-feeling motion.
 * Reaches into the upper register quickly, then settles long.
 *
 * The bare tuple `[0.22, 1, 0.36, 1]` widens to `number[]` and trips
 * framer-motion v12's stricter Easing type on the Vercel TS build. Wrapping in
 * cubicBezier() returns a typed EasingFunction that framer-motion accepts.
 */
export const EASE_EDITORIAL = cubicBezier(0.22, 1, 0.36, 1);
