/**
 * Whisper-fine film grain across the whole viewport. Adds editorial "tooth"
 * so the site feels printed/crafted rather than flat-digital. Static SVG
 * noise, fixed, non-interactive, barely-there opacity.
 */
export function GrainOverlay() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.04] mix-blend-multiply"
    >
      <filter id="ims-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.82"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#ims-grain)" />
    </svg>
  );
}
