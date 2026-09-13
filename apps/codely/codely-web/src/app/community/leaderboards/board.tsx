'use client';

import { useState, type CSSProperties } from 'react';
import { leaderboard } from '@/data/community';
import { programs } from '@/data/programs';

const periods = ['This Week', 'This Month', 'All Time'] as const;
type Period = (typeof periods)[number];

/** Weekly and all-time views scale the same seed rather than inventing rows. */
const multiplier: Record<Period, number> = {
  'This Week': 0.28,
  'This Month': 1,
  'All Time': 4.6,
};

const medals = ['🥇', '🥈', '🥉'];

function colorOf(slug: string) {
  return programs.find((program) => program.slug === slug)?.color ?? 'var(--brand)';
}

function nameOf(slug: string) {
  return programs.find((program) => program.slug === slug)?.name ?? slug;
}

function formatXp(value: number) {
  return `${(value / 1000).toFixed(1)}k`;
}

export function Leaderboards() {
  const [period, setPeriod] = useState<Period>('This Month');

  const rows = leaderboard.map((row) => ({
    ...row,
    xp: Math.round(row.xp * multiplier[period]),
    streak: Math.max(1, Math.round(row.streak * Math.min(multiplier[period], 1.6))),
  }));

  // Podium order reads 2nd, 1st, 3rd so the winner stands in the middle.
  const podium = [rows[1], rows[0], rows[2]];
  const heights = ['h-[70px]', 'h-[104px]', 'h-[58px]'];
  const places = ['2nd', '1st', '3rd'];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-bold text-white">Leaderboards</h1>
          <p className="mt-1 text-[13.5px] text-zinc-400">Top coders ranked by XP earned</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {periods.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPeriod(item)}
              aria-pressed={item === period}
              className={`h-9 rounded-full px-4 text-[12.5px] font-semibold transition-colors ${
                item === period
                  ? 'bg-brand text-white'
                  : 'border border-hairline text-zinc-400 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex items-end justify-center gap-3 sm:gap-6">
        {podium.map((row, index) => (
          <div key={row.rank} className="flex w-[30%] max-w-[190px] flex-col items-center">
            <span className="text-[20px] leading-none">{medals[row.rank - 1]}</span>
            <span
              className="mt-2 flex size-14 items-center justify-center rounded-full border-2 font-mono text-[14px] font-bold text-white"
              style={{
                borderColor: colorOf(row.program),
                backgroundColor: `color-mix(in oklab, ${colorOf(row.program)} 22%, transparent)`,
              }}
            >
              {row.initials}
            </span>
            <p className="mt-2.5 text-center text-[13.5px] font-bold text-white">{row.name}</p>
            <p
              className="font-mono text-[12px]"
              style={{ color: colorOf(row.program) }}
            >
              {formatXp(row.xp)} XP
            </p>
            <div
              className={`mt-3 flex w-full items-center justify-center rounded-t-xl border border-b-0 border-hairline bg-gradient-to-b from-white/[0.07] to-transparent font-display text-[19px] font-bold text-zinc-300 ${heights[index]}`}
            >
              {places[index]}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-surface-2">
        <table className="w-full">
          <thead>
            <tr className="border-b border-hairline">
              {['#', 'Member', 'XP', 'Streak', 'Badges'].map((heading, index) => (
                <th
                  key={heading}
                  className={`px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500 ${
                    index > 1 ? 'text-right' : 'text-left'
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.rank}
                style={{ '--track': colorOf(row.program) } as CSSProperties}
                className="border-b border-hairline last:border-0"
              >
                <td className="px-4 py-3 font-mono text-[12px] text-zinc-500">
                  {row.rank <= 3 ? medals[row.rank - 1] : `#${row.rank}`}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="track-icon flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-[10.5px] font-bold text-white">
                      {row.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-bold text-white">{row.name}</p>
                      <p className="track-text font-mono text-[11px]">{nameOf(row.program)}</p>
                    </div>
                  </div>
                </td>
                <td className="track-text px-4 py-3 text-right font-mono text-[12.5px] font-medium">
                  {formatXp(row.xp)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-[12px] text-zinc-400">
                  🔥 {row.streak} days
                </td>
                <td className="px-4 py-3 text-right font-mono text-[12px] text-zinc-400">
                  🏅 {row.badges}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
