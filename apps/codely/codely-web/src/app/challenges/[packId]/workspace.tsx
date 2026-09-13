'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Lock, Menu, X } from 'lucide-react';
import { CodeEditor } from '@/components/code-editor';
import type { ChallengePack, Difficulty } from '@/data/challenges';

const difficultyColor: Record<Difficulty, string> = {
  EASY: '#10b981',
  MEDIUM: '#f59e0b',
  HARD: '#ef4444',
};

export function ChallengeWorkspace({ pack }: { pack: ChallengePack }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [solved, setSolved] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const challenge = pack.challenges[index];
  const accent = difficultyColor[challenge.difficulty];
  const percent = Math.round((solved.length / pack.challenges.length) * 100);
  const earned = pack.challenges
    .filter((item) => solved.includes(item.slug))
    .reduce((sum, item) => sum + item.xp, 0);

  function go(next: number) {
    setIndex(next);
    // A new problem always opens on its statement, never on the hint.
    setFlipped(false);
  }

  function submit() {
    setSolved((current) =>
      current.includes(challenge.slug) ? current : [...current, challenge.slug],
    );
    if (index < pack.challenges.length - 1) go(index + 1);
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-surface">
      <header className="flex h-11 shrink-0 items-center gap-3 border-b border-hairline px-3">
        <Link
          href="/challenges"
          className="flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
          aria-label="Back to challenge packs"
        >
          <X className="size-4" />
        </Link>

        <nav className="flex items-center gap-2 font-mono text-[11.5px]">
          <Link href="/challenges" className="text-zinc-400 hover:text-white">
            {pack.language}
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-white">{pack.topic}</span>
        </nav>

        <div className="ml-4 hidden h-1 w-40 overflow-hidden rounded-full bg-white/[0.08] sm:block">
          <span
            className="block h-full rounded-full bg-emerald-500 transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="hidden font-mono text-[11px] text-zinc-500 sm:inline">{percent}%</span>

        <div className="ml-auto flex items-center gap-3">
          <span className="rounded-full bg-amber-500/12 px-2.5 py-1 font-mono text-[11px] font-medium text-amber-400">
            ⚡ {earned} XP
          </span>
          <Link
            href="/signup"
            className="rounded-lg bg-amber-400 px-3.5 py-1.5 text-[12.5px] font-bold text-black transition-colors hover:bg-amber-300"
          >
            Sign up
          </Link>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        {/* -------------------------------------------------------- problem */}
        <section className="flex min-h-0 flex-col border-r border-hairline">
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto flex h-full max-w-[520px] flex-col">
              <div className="flip-scene min-h-[440px] flex-1">
                <div className="flip-inner size-full" data-flipped={flipped}>
                  {/* --------------------------------------------- statement */}
                  <div
                    className="flip-face size-full overflow-hidden rounded-2xl border-2 bg-surface-2"
                    style={{ borderColor: accent }}
                  >
                    <div className="flex items-start gap-3 px-5 pb-4 pt-5">
                      <span className="text-[26px] leading-none">{challenge.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500">
                          Challenge {index + 1}
                        </p>
                        <h1 className="mt-0.5 text-[20px] font-bold text-white">
                          {challenge.title}
                        </h1>
                      </div>
                      <span className="shrink-0 rounded-full bg-amber-500/15 px-2.5 py-1 font-mono text-[11px] font-medium text-amber-400">
                        {challenge.xp} XP
                      </span>
                    </div>

                    <div className="px-5 pb-4">
                      <span
                        className="rounded-full px-2.5 py-1 font-mono text-[10.5px] font-bold"
                        style={{
                          backgroundColor: `color-mix(in oklab, ${accent} 18%, transparent)`,
                          color: accent,
                        }}
                      >
                        {challenge.difficulty}
                      </span>
                    </div>

                    {/*
                      The statement sits on a light card so long Mongolian
                      prose reads like a printed problem sheet; #e8eaf0 rather
                      than white keeps it from glaring against the dark shell.
                    */}
                    <div className="mx-5 mb-5 rounded-xl bg-[#e8eaf0] px-5 py-4 text-[#1b1f2a]">
                      <h2 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#5b6376]">
                        Бодлого
                      </h2>
                      {challenge.prompt.map((paragraph) => (
                        <p key={paragraph} className="mt-2 text-[13.5px] leading-[1.65]">
                          {paragraph}
                        </p>
                      ))}

                      <dl className="mt-4 space-y-2 border-t border-black/10 pt-3 text-[13px]">
                        <div className="flex gap-2">
                          <dt className="shrink-0 font-bold">Оролт:</dt>
                          <dd>{challenge.input}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="shrink-0 font-bold">Гаралт:</dt>
                          <dd>{challenge.output}</dd>
                        </div>
                      </dl>

                      <pre className="code-surface mt-3 overflow-x-auto rounded-lg bg-[#1b1f2a] px-3 py-2.5 text-[#e8eaf0]">
                        {challenge.example}
                      </pre>
                    </div>
                  </div>

                  {/* -------------------------------------------------- hint */}
                  <div
                    className="flip-face flip-face-back overflow-hidden rounded-2xl border-2 bg-surface-2"
                    style={{ borderColor: accent }}
                  >
                    <div className="flex h-full flex-col px-5 py-6">
                      <h2 className="text-[18px] font-bold text-white">💡 Зөвлөмж</h2>
                      <p className="mt-3 text-[14px] leading-[1.7] text-zinc-300">
                        {challenge.hint}
                      </p>

                      <h3 className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500">
                        Түргэн санамж
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {challenge.tips.map((tip) => (
                          <li
                            key={tip}
                            className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-zinc-400"
                          >
                            <span
                              className="mt-[7px] size-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: accent }}
                            />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFlipped((current) => !current)}
                className="mt-5 h-10 shrink-0 rounded-lg border border-hairline bg-white/[0.05] text-[13.5px] font-semibold text-zinc-200 transition-colors hover:bg-white/[0.1]"
              >
                {flipped ? 'Бодлого руу буцах' : 'Зөвлөмж харах'}
              </button>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 border-t border-hairline px-6 py-2.5">
            <button
              type="button"
              aria-label="Open challenge list"
              onClick={() => setDrawerOpen(true)}
              className="flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <Menu className="size-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-bold text-white">{challenge.title}</p>
              <p className="font-mono text-[10.5px] text-zinc-500">
                Challenge {index + 1}/{pack.challenges.length} · {challenge.xp} XP
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => go(index - 1)}
                className="h-9 rounded-lg border border-white/[0.28] bg-white/[0.12] px-5 text-[13px] font-semibold text-zinc-200 transition-colors hover:bg-white/[0.2] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                disabled={index === pack.challenges.length - 1}
                onClick={() => go(index + 1)}
                className="h-9 rounded-lg border border-white/[0.28] bg-white/[0.12] px-5 text-[13px] font-semibold text-zinc-200 transition-colors hover:bg-white/[0.2] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="hidden min-h-0 lg:block">
          <CodeEditor
            key={challenge.slug}
            filename={pack.filename}
            emoji={pack.emoji}
            accent={accent}
            initial={challenge.starter}
            onSubmit={submit}
          />
        </section>
      </div>

      {/* -------------------------------------------------------------- drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          aria-label="Close challenge list"
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 cursor-default bg-black/60"
        />
        <aside
          className="absolute inset-y-0 left-0 flex w-[320px] max-w-[85vw] flex-col border-r border-hairline bg-surface-2 transition-transform duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
            <div>
              <p className="text-[14px] font-bold text-white">{pack.topic}</p>
              <p className="font-mono text-[10.5px] text-zinc-500">{pack.language}</p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setDrawerOpen(false)}
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>

          <ul className="min-h-0 flex-1 overflow-y-auto p-3">
            {pack.challenges.map((item, position) => {
              const done = solved.includes(item.slug);
              const current = position === index;

              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => {
                      go(position);
                      setDrawerOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      current ? 'bg-white/[0.08]' : 'hover:bg-white/[0.05]'
                    }`}
                  >
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-md ${
                        done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.06] text-zinc-600'
                      }`}
                    >
                      {done ? <Check className="size-3" /> : <Lock className="size-3" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                        Exercise {String(position + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`block truncate text-[13px] ${
                          current ? 'font-semibold text-white' : 'text-zinc-300'
                        }`}
                      >
                        {item.title}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-amber-500/12 px-2 py-0.5 font-mono text-[10px] text-amber-400">
                      {item.xp} XP
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}
