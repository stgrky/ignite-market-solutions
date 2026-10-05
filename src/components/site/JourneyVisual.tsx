/**
 * The small illustration beside each journey step.
 *
 * Inline SVG drawn with the site's own tokens rather than image files: it
 * inherits the palette, costs no extra request, stays sharp at any size, and
 * can't be the thing that makes this section slow.
 *
 * Decorative by definition — the step's title and body carry the meaning — so
 * every one is aria-hidden.
 */
export function JourneyVisual({ kind }: { kind: string }) {
  const stroke = "var(--color-accent)";
  const soft = "var(--color-accent-soft)";
  const subtle = "var(--color-subtle)";

  const frame = (x: number, y: number, w: number, h: number, fill = "var(--color-surface)") => (
    <>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} stroke={subtle} />
      <circle cx={x + 10} cy={y + 9} r="2" fill={subtle} />
      <circle cx={x + 18} cy={y + 9} r="2" fill={subtle} />
      <circle cx={x + 26} cy={y + 9} r="2" fill={subtle} />
      <line x1={x} y1={y + 18} x2={x + w} y2={y + 18} stroke={subtle} />
    </>
  );

  const common = { viewBox: "0 0 160 120", "aria-hidden": true as const, className: "h-28 w-40" };

  switch (kind) {
    case "browsers":
      return (
        <svg {...common}>
          <g opacity="0.45">{frame(8, 26, 110, 78)}</g>
          <g opacity="0.7">{frame(20, 16, 110, 78)}</g>
          {frame(32, 6, 112, 80)}
          <rect x="42" y="36" width="52" height="6" rx="3" fill={stroke} />
          <rect x="42" y="48" width="78" height="4" rx="2" fill={soft} />
          <rect x="42" y="58" width="68" height="4" rx="2" fill={soft} />
        </svg>
      );
    case "form":
      return (
        <svg {...common}>
          {frame(20, 10, 120, 100)}
          <rect x="32" y="34" width="44" height="5" rx="2.5" fill={stroke} />
          <rect x="32" y="48" width="96" height="10" rx="3" fill={soft} />
          <rect x="32" y="66" width="96" height="10" rx="3" fill={soft} />
          <rect x="32" y="88" width="96" height="5" rx="2.5" fill={subtle} />
          <rect x="32" y="88" width="58" height="5" rx="2.5" fill={stroke} />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="30" y="18" width="100" height="84" rx="8" fill="var(--color-surface)" stroke={subtle} />
          <rect x="30" y="18" width="100" height="20" rx="8" fill={soft} />
          <line x1="52" y1="12" x2="52" y2="26" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <line x1="108" y1="12" x2="108" y2="26" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <rect x="44" y="50" width="72" height="30" rx="6" fill={stroke} />
          <text x="80" y="70" textAnchor="middle" fontSize="15" fill="#fff" fontFamily="system-ui">
            15 min
          </text>
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <rect x="38" y="8" width="84" height="104" rx="6" fill="var(--color-surface)" stroke={subtle} />
          <rect x="52" y="28" width="56" height="5" rx="2.5" fill={soft} />
          <rect x="52" y="42" width="44" height="5" rx="2.5" fill={soft} />
          <rect x="52" y="56" width="52" height="5" rx="2.5" fill={soft} />
          <circle cx="104" cy="90" r="16" fill={stroke} />
          <path d="M97 90l5 5 10-11" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          {frame(16, 14, 128, 92)}
          <rect x="28" y="44" width="48" height="48" rx="6" fill={stroke} />
          <rect x="84" y="44" width="22" height="22" rx="5" fill={soft} />
          <rect x="112" y="44" width="22" height="22" rx="5" fill={subtle} />
          <rect x="84" y="72" width="50" height="6" rx="3" fill={soft} />
          <rect x="84" y="84" width="34" height="6" rx="3" fill={soft} />
        </svg>
      );
    case "comments":
      return (
        <svg {...common}>
          {frame(10, 14, 116, 88)}
          <rect x="22" y="42" width="60" height="5" rx="2.5" fill={soft} />
          <rect x="22" y="56" width="80" height="5" rx="2.5" fill={soft} />
          <rect x="22" y="70" width="48" height="5" rx="2.5" fill={soft} />
          <g>
            <circle cx="118" cy="44" r="14" fill={stroke} />
            <path d="M112 60l6-8 5 4z" fill={stroke} />
            <text x="118" y="49" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="system-ui">
              1
            </text>
          </g>
          <circle cx="140" cy="78" r="10" fill={soft} stroke={stroke} />
        </svg>
      );
    case "live":
      return (
        <svg {...common}>
          {frame(14, 16, 132, 88)}
          <rect x="26" y="44" width="64" height="7" rx="3.5" fill={stroke} />
          <rect x="26" y="58" width="96" height="5" rx="2.5" fill={soft} />
          <rect x="26" y="70" width="76" height="5" rx="2.5" fill={soft} />
          <rect x="96" y="26" width="42" height="14" rx="7" fill={stroke} />
          <text x="117" y="36" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="system-ui" letterSpacing="0.5">
            LIVE
          </text>
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M80 14l36 14v30c0 24-16 40-36 48-20-8-36-24-36-48V28z"
            fill={soft}
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="M56 66h14l6-12 10 24 7-14h15"
            fill="none"
            stroke={stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
