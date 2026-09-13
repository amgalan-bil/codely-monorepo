/**
 * The `</codely>` wordmark. Drawn rather than set as text so the angle
 * brackets keep their weight and spacing at any size.
 */
export function CodelyLogo({ height = 22 }: { height?: number }) {
  return (
    <svg
      viewBox="0 0 148 34"
      height={height}
      width={(148 / 34) * height}
      role="img"
      aria-label="Codely"
      className="shrink-0 overflow-visible"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M13 3 2 17l11 14" />
        <path d="M25 2 17 32" />
        <path d="M135 3l11 14-11 14" />
      </g>
      <text
        x="33"
        y="25.5"
        fill="currentColor"
        fontFamily="var(--font-chakra), system-ui, sans-serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="0.5"
      >
        codely
      </text>
      <rect x="33" y="29.5" width="96" height="2.6" fill="currentColor" />
    </svg>
  );
}

/** Square app mark, used on the auth pages and in the footer. */
export function CodelyMark({ size = 32 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg bg-brand text-white"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width={size * 0.56} height={size * 0.56} fill="none">
        <path
          d="M9 7 4 12l5 5M15 7l5 5-5 5M13.5 4.5l-3 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
