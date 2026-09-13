import Link from 'next/link';
import { packXp, type ChallengePack } from '@/data/challenges';

/**
 * Trading-card tile. The burst behind the icon is drawn as plain SVG lines
 * rather than a repeating-conic-gradient — a conic gradient plus a blend mode
 * pushes every card onto its own compositing layer and the grid drops frames.
 * The gradient id is namespaced per pack so cards do not steal each other's.
 */
export function PackCard({ pack }: { pack: ChallengePack }) {
  const rays = Array.from({ length: 24 }, (_, index) => (index * 360) / 24);
  const gradientId = `burst-${pack.id}`;

  return (
    <Link
      href={`/challenges/${pack.id}`}
      className="flip-scene group block aspect-[3/4] w-full"
      aria-label={`${pack.language} — ${pack.topic}`}
    >
      <div className="flip-inner size-full group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
        {/* ------------------------------------------------------------ front */}
        <div
          className="flip-face relative size-full overflow-hidden rounded-2xl border-2"
          style={{
            borderColor: pack.color,
            boxShadow: `0 0 34px -6px ${pack.color}`,
            backgroundColor: pack.color,
          }}
        >
          <svg
            aria-hidden
            viewBox="0 0 200 260"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
          >
            <defs>
              <radialGradient id={gradientId} cx="50%" cy="50%" r="62%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
                <stop offset="34%" stopColor="#ffffff" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.42" />
              </radialGradient>
            </defs>
            <rect width="200" height="260" fill={`url(#${gradientId})`} />
            <g stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.4">
              {rays.map((angle) => {
                const radians = (angle * Math.PI) / 180;
                // Whole pixels: Node and the browser disagree in the last digit
                // of sin/cos, which breaks hydration if the raw float is used.
                return (
                  <line
                    key={angle}
                    x1="100"
                    y1="130"
                    x2={Math.round(100 + Math.cos(radians) * 230)}
                    y2={Math.round(130 + Math.sin(radians) * 230)}
                  />
                );
              })}
            </g>
          </svg>

          {pack.club ? (
            <span className="absolute left-3 top-3 rounded-full bg-pink-500 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
              CLUB
            </span>
          ) : null}

          <div className="relative flex size-full flex-col items-center justify-between px-4 py-7">
            <PixelLabel text={pack.language} />
            <span className="text-[52px] leading-none drop-shadow-[0_4px_10px_rgb(0_0_0/45%)]">
              {pack.emoji}
            </span>
            <PixelLabel text={pack.topic} />
          </div>
        </div>

        {/* ------------------------------------------------------------- back */}
        <div
          className="flip-face flip-face-back overflow-hidden rounded-2xl border-2"
          style={{ borderColor: pack.color, backgroundColor: pack.color }}
        >
          <div className="flex size-full flex-col justify-between bg-black/[0.58] px-5 py-7 text-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                {pack.language}
              </p>
              <h3 className="mt-2 text-[21px] font-bold text-white">{pack.topic}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/80">
                {pack.description}
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-[12px] text-white/85">
                {pack.challenges.length} Challenges
              </p>
              <p className="font-mono text-[12px] text-white/85">{pack.duration}</p>
              <span className="inline-block rounded-full bg-amber-400 px-3.5 py-1 font-mono text-[12px] font-bold text-black">
                {packXp(pack)} XP
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Pixel-art label: yellow fill on a heavy black outline, italic. */
function PixelLabel({ text }: { text: string }) {
  return (
    <span
      className="font-display text-[19px] font-bold italic text-amber-300"
      style={{
        WebkitTextStroke: '1.4px #17110a',
        paintOrder: 'stroke fill',
        textShadow: '0 2px 0 rgb(0 0 0 / 45%)',
      }}
    >
      {text}
    </span>
  );
}
