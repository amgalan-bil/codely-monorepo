/**
 * Blockchain network backdrop for the marketing heroes.
 *
 * Blocks are rounded squares wired together by chain edges, with pulse rings
 * on the anchors and packets travelling the chain. Every coordinate is
 * hard-coded rather than generated so the server and client render the same
 * markup, and the whole thing is one inert SVG — no layout, no listeners.
 *
 * Two arrangements: `wide` for short banner heroes, and `full` for a hero that
 * fills the viewport. One layout cannot serve both — `slice` scaling a banner
 * up to screen height blows every block up several times over.
 */

type Node = { x: number; y: number; size: number; tone: string; anchor?: boolean };

type Packet = { path: string; tone: string; dur: string; delay: string };

type Layout = {
  viewBox: string;
  nodes: Node[];
  edges: Array<[number, number]>;
  packets: Packet[];
};

const purple = 'var(--brand)';
const green = 'var(--track-monpy)';
const red = 'var(--track-cat-ai)';

const layouts: Record<'wide' | 'full', Layout> = {
  wide: {
    viewBox: '0 0 980 220',
    nodes: [
      { x: 60, y: 120, size: 5, tone: purple },
      { x: 168, y: 62, size: 9, tone: purple, anchor: true },
      { x: 118, y: 196, size: 4, tone: purple },
      { x: 246, y: 148, size: 5, tone: purple },
      { x: 300, y: 44, size: 6, tone: purple },
      { x: 372, y: 178, size: 4, tone: green },
      { x: 470, y: 96, size: 10, tone: green, anchor: true },
      { x: 428, y: 32, size: 5, tone: green },
      { x: 556, y: 160, size: 6, tone: green },
      { x: 610, y: 58, size: 4, tone: red },
      { x: 700, y: 128, size: 9, tone: red, anchor: true },
      { x: 782, y: 46, size: 5, tone: red },
      { x: 836, y: 172, size: 6, tone: red },
      { x: 920, y: 92, size: 4, tone: red },
    ],
    edges: [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 3], [3, 5], [4, 6], [5, 6], [6, 7],
      [6, 8], [8, 9], [8, 10], [9, 10], [10, 11], [10, 12], [11, 13], [12, 13],
    ],
    packets: [
      { path: 'M60 120 L168 62 L246 148 L372 178', tone: purple, dur: '7s', delay: '0s' },
      { path: 'M428 32 L470 96 L556 160 L610 58', tone: green, dur: '9s', delay: '1.4s' },
      { path: 'M700 128 L782 46 L920 92', tone: red, dur: '8s', delay: '2.8s' },
    ],
  },

  // 16:10 so a laptop screen shows nearly all of it. The centre column, where
  // the headline and terminal card sit, is left clear: purple climbs the left
  // edge, green runs along the top, red descends the right.
  full: {
    viewBox: '0 0 1600 1000',
    nodes: [
      { x: 80, y: 150, size: 5, tone: purple },
      { x: 230, y: 300, size: 11, tone: purple, anchor: true },
      { x: 120, y: 470, size: 5, tone: purple },
      { x: 300, y: 560, size: 7, tone: purple },
      { x: 170, y: 760, size: 6, tone: purple },
      { x: 60, y: 900, size: 4, tone: purple },
      { x: 360, y: 880, size: 5, tone: purple },
      { x: 420, y: 90, size: 5, tone: green },
      { x: 600, y: 60, size: 6, tone: green },
      { x: 800, y: 118, size: 12, tone: green, anchor: true },
      { x: 1000, y: 50, size: 5, tone: green },
      { x: 1180, y: 110, size: 6, tone: green },
      { x: 1330, y: 250, size: 5, tone: red },
      { x: 1420, y: 400, size: 11, tone: red, anchor: true },
      { x: 1300, y: 600, size: 6, tone: red },
      { x: 1520, y: 620, size: 5, tone: red },
      { x: 1400, y: 820, size: 7, tone: red },
      { x: 1540, y: 180, size: 4, tone: red },
      { x: 1250, y: 920, size: 5, tone: red },
    ],
    edges: [
      [0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [4, 5], [4, 6], [3, 6], [0, 7],
      [1, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [11, 17], [12, 13],
      [17, 13], [13, 14], [13, 15], [14, 15], [14, 16], [15, 16], [16, 18],
    ],
    packets: [
      { path: 'M80 150 L230 300 L300 560 L170 760', tone: purple, dur: '8s', delay: '0s' },
      { path: 'M420 90 L600 60 L800 118 L1000 50 L1180 110', tone: green, dur: '10s', delay: '1.6s' },
      { path: 'M1540 180 L1420 400 L1300 600 L1400 820', tone: red, dur: '9s', delay: '3s' },
    ],
  },
};

export function BlockchainBg({
  className = '',
  layout = 'wide',
}: {
  className?: string;
  layout?: 'wide' | 'full';
}) {
  const { viewBox, nodes, edges, packets } = layouts[layout];

  return (
    <svg
      aria-hidden
      viewBox={viewBox}
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
