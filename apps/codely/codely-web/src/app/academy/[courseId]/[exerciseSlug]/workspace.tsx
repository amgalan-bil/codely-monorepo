'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Copy, Lock, Menu, X } from 'lucide-react';
import { CodeEditor } from '@/components/code-editor';
import { courseExercises, type Course, type Exercise } from '@/data/courses';

const helpSections = [
  { icon: '💡', title: 'Hint', body: 'Read the instructions once more and start with the smallest thing that could work. Run early — the terminal tells you more than staring does.' },
  { icon: '▶️', title: 'Walkthrough video', body: 'A short recorded walkthrough for this exercise. Video hosting is not connected yet.' },
  { icon: '◎', title: 'Solution', body: 'The reference solution unlocks after your first submission, so the attempt stays worth something.' },
  { icon: '✦', title: 'AI coding companion', body: 'Ask a question about this exercise in plain language. The companion is not wired to a model yet.' },
];

export function LessonWorkspace({ course, exercise }: { course: Course; exercise: Exercise }) {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openHelp, setOpenHelp] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const all = courseExercises(course);
  const index = all.findIndex((item) => item.slug === exercise.slug);
  const previous = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;
  const percent = Math.round((index / all.length) * 100);

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(course.cheatSheet[0].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-surface">
      {/* ------------------------------------------------------------- top bar */}
      <header className="flex h-11 shrink-0 items-center gap-3 border-b border-hairline px-3">
        <button
          type="button"
          aria-label="Open chapters"
          onClick={() => setDrawerOpen(true)}
          className="flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
        >
          <Menu className="size-4" />
        </button>

        <nav className="flex items-center gap-2 font-mono text-[11.5px]">
          <Link href={`/academy/${course.id}`} className="text-zinc-400 hover:text-white">
            {course.name}
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-white">{exercise.title}</span>
        </nav>

        <div className="ml-4 hidden h-1 w-40 overflow-hidden rounded-full bg-white/[0.08] sm:block">
          <span
            className="block h-full rounded-full transition-[width] duration-500"
            style={{ width: `${percent}%`, backgroundColor: course.color }}
          />
        </div>
        <span className="hidden font-mono text-[11px] text-zinc-500 sm:inline">{percent}%</span>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center sm:flex">
            {['E', 'K', 'T'].map((initial, position) => (
              <span
                key={initial}
                className="-ml-1.5 flex size-6 items-center justify-center rounded-full font-mono text-[9.5px] font-bold text-white ring-2 ring-surface first:ml-0"
                style={{
                  backgroundColor: ['#10b981', '#ec4899', '#06b6d4'][position],
                }}
              >
                {initial}
              </span>
            ))}
          </div>
          <span className="hidden font-mono text-[11px] text-zinc-500 sm:inline">+485 online</span>
          <Link
            href="/signup"
            className="rounded-lg bg-amber-400 px-3.5 py-1.5 text-[12.5px] font-bold text-black transition-colors hover:bg-amber-300"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* ------------------------------------------------------------- panels */}
      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <section className="relative flex min-h-0 flex-col border-r border-hairline">
          <div className="flex shrink-0 items-center justify-between border-b border-hairline px-6 py-2.5">
            <span className="font-mono text-[11.5px] text-zinc-400">Exercise</span>
            <span className="hidden font-mono text-[11px] text-zinc-500 sm:inline">
              +485 also slacking
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-24 pt-6">
            <h1 className="text-[26px] font-bold text-white">
              {String(index + 1).padStart(2, '0')}. {exercise.title}
            </h1>

            <p className="mt-5 font-mono text-[15px] font-bold" style={{ color: course.color }}>
              # {course.name}
            </p>

            <p className="mt-5 text-[14.5px] leading-[1.75] text-zinc-300">
              Welcome to this lesson! Here you will learn the fundamentals through interactive
              examples and hands-on exercises.
            </p>
            <p className="mt-3.5 text-[14.5px] leading-[1.75] text-zinc-300">
              The language we are learning today is widely used across many different fields and
              industries.
            </p>

            <div
              aria-hidden
              className="mt-6 inline-flex gap-3 rounded-xl border border-hairline bg-surface-2 px-4 py-3 text-[26px] leading-none"
            >
              <span>🧙</span>
              <span>🧑‍💻</span>
              <span>{course.emoji}</span>
            </div>

            <ul className="mt-5 space-y-2">
              {course.usedFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-zinc-300">
                  <span
                    className="mt-[7px] size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: course.color }}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 overflow-hidden rounded-xl border border-brand/25 bg-brand/[0.07]">
              <div className="flex items-center justify-between border-b border-brand/15 px-4 py-2.5">
                <span className="font-mono text-[11.5px] text-zinc-400">
                  {course.cheatSheet[0].label}
                </span>
                <button
                  type="button"
                  onClick={copySnippet}
                  aria-label="Copy snippet"
                  className="text-zinc-500 transition-colors hover:text-white"
                >
                  {copied ? (
                    <span className="font-mono text-[10.5px] text-emerald-400">Copied</span>
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
              <code
                className="block px-4 py-3.5 font-mono text-[13px]"
                style={{ color: course.color }}
              >
                {course.cheatSheet[0].code}
              </code>
            </div>

            <p className="mt-6 text-[14.5px] leading-[1.75] text-zinc-300">
              All the code we write in this course will be in {course.filename} files. Write your
              code in the editor on the right, then press <b className="text-white">Run</b> to see
              the result.
            </p>
            <p className="mt-3.5 text-[14.5px] leading-[1.75] text-zinc-300">
              Then press the <b className="text-white">&ldquo;Submit answer&rdquo;</b> button and
              then <b className="text-white">&ldquo;Next&rdquo;</b> to continue.
            </p>

            <h2 className="mt-10 border-t border-hairline pt-6 text-[16px] font-bold text-white">
              Help
            </h2>
            <div className="mt-4 space-y-2.5">
              {helpSections.map((section) => {
                const open = openHelp === section.title;
                return (
                  <div
                    key={section.title}
                    className="overflow-hidden rounded-xl border border-hairline bg-surface-2"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenHelp(open ? null : section.title)}
                      aria-expanded={open}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="text-[15px] leading-none">{section.icon}</span>
                      <span className="flex-1 text-[14px] font-semibold text-white">
                        {section.title}
                      </span>
                      <ChevronDown
                        className={`size-4 text-zinc-500 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {open ? (
                      <p className="border-t border-hairline px-4 py-3.5 text-[13.5px] leading-relaxed text-zinc-400">
                        {section.body}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-[13.5px] text-zinc-400">
              Still want help? Get live help from other learners in our Discord.
            </p>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-[13.5px] font-bold text-white transition-colors hover:bg-indigo-500"
            >
              💬 Join Discord
            </a>
          </div>

          {/* Bottom bar pinned over the scrolling body. */}
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-hairline bg-surface/95 px-6 py-2.5 backdrop-blur">
            <button
              type="button"
              aria-label="Open chapters"
              onClick={() => setDrawerOpen(true)}
              className="flex size-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <Menu className="size-4" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-bold text-white">{exercise.title}</p>
              <p className="font-mono text-[10.5px] text-zinc-500">
                Exercise {index + 1}/{all.length} · {exercise.xp} XP
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                disabled={!previous}
                onClick={() => previous && router.push(`/academy/${course.id}/${previous.slug}`)}
                className="h-9 rounded-lg border border-white/[0.28] bg-white/[0.12] px-5 text-[13px] font-semibold text-zinc-200 transition-colors hover:bg-white/[0.2] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!next}
                onClick={() => next && router.push(`/academy/${course.id}/${next.slug}`)}
                className="h-9 rounded-lg border border-white/[0.28] bg-white/[0.12] px-5 text-[13px] font-semibold text-zinc-200 transition-colors hover:bg-white/[0.2] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="hidden min-h-0 lg:block">
          <CodeEditor
            filename={course.filename}
            emoji={course.emoji}
            accent={course.color}
            initial={course.starter}
            onSubmit={() => next && router.push(`/academy/${course.id}/${next.slug}`)}
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
          aria-label="Close chapters"
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 cursor-default bg-black/60"
        />
        <aside
          className="absolute inset-y-0 left-0 flex w-[320px] max-w-[85vw] flex-col border-r border-hairline bg-surface-2 transition-transform duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
            <span className="text-[14px] font-bold text-white">{course.name}</span>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setDrawerOpen(false)}
              className="text-zinc-500 transition-colors hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
            {course.chapters.map((chapter, chapterIndex) => (
              <div key={chapter.title} className="mb-5">
                <p className="px-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-zinc-500">
                  {chapterIndex + 1}. {chapter.title}
                </p>
                <ul className="mt-2 space-y-0.5">
                  {chapter.exercises.map((item) => {
                    const position = all.findIndex((entry) => entry.slug === item.slug);
                    const current = item.slug === exercise.slug;
                    const unlocked = position <= index;

                    return (
                      <li key={item.slug}>
                        <Link
                          href={`/academy/${course.id}/${item.slug}`}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors ${
                            current
                              ? 'bg-white/[0.08] font-semibold text-white'
                              : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'
                          }`}
                        >
                          <span className="w-4 shrink-0 text-center">
                            {unlocked ? (
                              <span className="font-mono text-[10px] text-zinc-500">
                                {String(position + 1).padStart(2, '0')}
                              </span>
                            ) : (
                              <Lock className="size-3 text-zinc-600" />
                            )}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{item.title}</span>
                          <span className="shrink-0 font-mono text-[10px] text-zinc-600">
                            {item.xp} XP
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
