/**
 * Blockchain network backdrop for the marketing heroes.
 *
 * Blocks are rounded squares wired together by chain edges, with pulse rings
 * on the anchors and packets travelling the chain. Every coordinate is
 * hard-coded rather than generated so the server and client render the same
 * markup, and the whole thing is one inert SVG — no layout, no listeners.
 */

type Node = { x: number; y: number; size: number; tone: string; anchor?: boolean };

const nodes: Node[] = [
  { x: 60, y: 120, size: 5, tone: 'var(--brand)' },
  { x: 168, y: 62, size: 9, tone: 'var(--brand)', anchor: true },
  { x: 118, y: 196, size: 4, tone: 'var(--brand)' },
  { x: 246, y: 148, size: 5, tone: 'var(--brand)' },
  { x: 300, y: 44, size: 6, tone: 'var(--brand)' },
  { x: 372, y: 178, size: 4, tone: 'var(--track-monpy)' },
  { x: 470, y: 96, size: 10, tone: 'var(--track-monpy)', anchor: true },
  { x: 428, y: 32, size: 5, tone: 'var(--track-monpy)' },
  { x: 556, y: 160, size: 6, tone: 'var(--track-monpy)' },
  { x: 610, y: 58, size: 4, tone: 'var(--track-cat-ai)' },
  { x: 700, y: 128, size: 9, tone: 'var(--track-cat-ai)', anchor: true },
  { x: 782, y: 46, size: 5, tone: 'var(--track-cat-ai)' },
  { x: 836, y: 172, size: 6, tone: 'var(--track-cat-ai)' },
  { x: 920, y: 92, size: 4, tone: 'var(--track-cat-ai)' },
];

const edges: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [3, 5],
  [4, 6],
  [5, 6],
  [6, 7],
  [6, 8],
  [8, 9],
  [8, 10],
  [9, 10],
  [10, 11],
  [10, 12],
  [11, 13],
  [12, 13],
];

/** Packets ride these paths, one per colour cluster. */
const packets = [
  { path: 'M60 120 L168 62 L246 148 L372 178', tone: 'var(--brand)', dur: '7s', delay: '0s' },
  { path: 'M428 32 L470 96 L556 160 L610 58', tone: 'var(--track-monpy)', dur: '9s', delay: '1.4s' },
  { path: 'M700 128 L782 46 L920 92', tone: 'var(--track-cat-ai)', dur: '8s', delay: '2.8s' },
];

export function BlockchainBg({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 980 220"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    >
      <g stroke="currentColor" className="text-white/[0.08]" strokeWidth="0.8">
        {edges.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
          />
        ))}
      </g>

      {nodes.map((node) => (
        <g key={`${node.x}-${node.y}`}>
          {node.anchor ? (
            <>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size * 2.6}
                fill={node.tone}
                opacity="0.14"
              />
              <circle
                cx={node.x}
                cy={node.y}
                className="pulse-ring"
                fill="none"
                stroke={node.tone}
                strokeWidth="1"
                style={{ animationDelay: `${(node.x % 5) * 0.6}s` }}
              />
            </>
          ) : null}
          <rect
            x={node.x - node.size}
            y={node.y - node.size}
            width={node.size * 2}
            height={node.size * 2}
            rx={node.size * 0.34}
            fill={node.tone}
            opacity={node.anchor ? 0.85 : 0.5}
          />
          {node.anchor ? (
            <circle cx={node.x} cy={node.y} r={node.size * 0.34} fill="#fff" opacity="0.9" />
          ) : null}
        </g>
      ))}

      {packets.map((packet) => (
        <circle key={packet.path} r="2.6" fill={packet.tone}>
          <animateMotion
            dur={packet.dur}
            begin={packet.delay}
            repeatCount="indefinite"
            path={packet.path}
          />
        </circle>
      ))}
    </svg>
  );
}
