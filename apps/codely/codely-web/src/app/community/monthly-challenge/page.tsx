import type { CSSProperties } from 'react';
import { monthlyChallenge } from '@/data/community';
import { programs } from '@/data/programs';

export const metadata = {
  title: 'Monthly Challenge',
  description: monthlyChallenge.description,
};

function colorOf(slug: string) {
  return programs.find((program) => program.slug === slug)?.color ?? 'var(--brand)';
}

function nameOf(slug: string) {
  return programs.find((program) => program.slug === slug)?.name ?? slug;
}

const medals = ['🥇', '🥈', '🥉'];

export default function MonthlyChallengePage() {
  const stats = [
    { value: `${monthlyChallenge.daysLeft}d`, label: 'Days Left', tone: 'text-red-400' },
    { value: String(monthlyChallenge.participants), label: 'Participants', tone: 'text-brand-soft' },
    { value: monthlyChallenge.totalPrize, label: 'Total Prize', tone: 'text-amber-400' },
  ];

  return (
    <div>
      <h1 className="text-[30px] font-bold text-white">Monthly Challenge</h1>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_294px]">
        <div className="min-w-0">
          <section className="overflow-hidden rounded-2xl border border-hairline bg-surface-2">
            <div className="bg-[linear-gradient(125deg,rgb(124_58_237/28%),rgb(6_182_212/10%))] px-6 py-8">
              <span className="inline-block rounded-full bg-brand/25 px-3 py-1 font-mono text-[11px] text-brand-soft">
                {monthlyChallenge.month}
              </span>
              <h2 className="mt-4 text-[30px] font-bold leading-tight text-white">
                {monthlyChallenge.title}
              </h2>
              <p className="mt-4 max-w-[560px] text-[14px] leading-[1.7] text-zinc-300">
                {monthlyChallenge.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 px-6 pt-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-hairline bg-white/[0.02] px-3 py-5 text-center"
                >
                  <p className={`font-display text-[26px] font-bold ${stat.tone}`}>{stat.value}</p>
                  <p className="mt-1 font-mono text-[11px] text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="px-6 py-7">
              <h3 className="text-[16px] font-bold text-white">How to Enter</h3>
              <ol className="mt-4 space-y-3">
                {monthlyChallenge.rules.map((rule, index) => (
                  <li key={rule} className="flex items-start gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-brand/15 font-mono text-[10.5px] text-brand-soft">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-[13.5px] text-zinc-300">{rule}</span>
                  </li>
                ))}
              </ol>

              <button
                type="button"
                className="mt-7 flex h-12 w-full items-center justify-center rounded-xl bg-brand text-[14.5px] font-bold text-white transition-colors hover:bg-brand-strong"
              >
                Submit Your Project →
              </button>
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-hairline bg-surface-2 p-5">
            <h3 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
              Past Challenge Winners
            </h3>
            <ul className="mt-4 space-y-3.5">
              {monthlyChallenge.pastWinners.map((winner) => (
                <li
                  key={winner.title}
                  style={{ '--track': colorOf(winner.program) } as CSSProperties}
                  className="flex items-center gap-3"
                >
                  <span className="text-[16px] leading-none">🏆</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-bold text-white">{winner.title}</p>
                    <p className="font-mono text-[11px] text-zinc-500">
                      {winner.author} · {winner.month}
                    </p>
                  </div>
                  <span className="track-pill shrink-0 rounded-md px-2 py-1 font-mono text-[10.5px]">
                    {nameOf(winner.program)}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:h-fit">
          <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
            <h3 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
              Prizes
            </h3>
            <ul className="mt-4 space-y-3.5">
              {monthlyChallenge.prizes.map((prize) => (
                <li key={prize.place} className="flex items-start gap-3">
                  <span className="text-[15px] leading-none">{prize.medal}</span>
                  <div>
                    <p className="text-[13px] font-bold text-amber-400">{prize.place}</p>
                    <p className="font-mono text-[11.5px] text-zinc-400">{prize.reward}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
            <h3 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
              Current Standings
            </h3>
            <ul className="mt-4 space-y-3.5">
              {monthlyChallenge.standings.map((entry) => (
                <li
                  key={entry.title}
                  style={{ '--track': colorOf(entry.program) } as CSSProperties}
                  className="flex items-center gap-2.5"
                >
                  <span className="w-5 shrink-0 text-center font-mono text-[11px] text-zinc-500">
                    {entry.rank <= 3 ? medals[entry.rank - 1] : `#${entry.rank}`}
                  </span>
                  <span className="track-icon flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[9.5px] font-bold text-white">
                    {entry.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-bold text-white">{entry.title}</p>
                    <p className="truncate font-mono text-[10.5px] text-zinc-500">{entry.author}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-[12px] font-medium text-amber-400">
                      {entry.votes}
                    </p>
                    <p className="font-mono text-[10px] text-zinc-600">votes</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
