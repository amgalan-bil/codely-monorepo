'use client';

import Link from 'next/link';
import { useState, type CSSProperties } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { programs } from '@/data/programs';

type PreviewLesson = {
  title: string;
  program: string;
  module: string;
  xp: number;
  done: boolean;
  courseId: string;
};

const lessons: PreviewLesson[] = [
  { title: 'Python Basics', program: 'monpy', module: 'Module 1', xp: 50, done: true, courseId: 'python' },
  { title: 'Variables & Types', program: 'monpy', module: 'Module 2', xp: 60, done: true, courseId: 'python' },
  { title: 'Control Flow', program: 'monpy', module: 'Module 3', xp: 70, done: false, courseId: 'python' },
  { title: 'Functions & Scope', program: 'monpy', module: 'Module 4', xp: 80, done: false, courseId: 'python' },
  { title: 'HTML Foundations', program: 'l-plus-plus', module: 'Module 1', xp: 50, done: true, courseId: 'html' },
  { title: 'CSS Layouts', program: 'l-plus-plus', module: 'Module 2', xp: 60, done: false, courseId: 'css' },
  { title: 'Tensors & Training', program: 'cat-ai', module: 'Module 1', xp: 90, done: false, courseId: 'python' },
  { title: 'Pointers in C', program: 'l-plus-plus', module: 'Module 5', xp: 85, done: false, courseId: 'cpp' },
];

const tracks = ['All', 'monpy', 'l-plus-plus', 'cat-ai'];

const stats = [
  { value: '270+', label: 'Total Lessons', tone: 'text-brand-soft' },
  { value: '65 XP', label: 'Avg XP / Lesson', tone: 'text-amber-400' },
  { value: '94%', label: 'Completion Rate', tone: 'text-emerald-400' },
];

export function AcademyPreview() {
  const [track, setTrack] = useState('All');

  const visible =
    track === 'All' ? lessons.slice(0, 6) : lessons.filter((lesson) => lesson.program === track);

  function nameOf(slug: string) {
    return programs.find((program) => program.slug === slug)?.name ?? slug;
  }

  function colorOf(slug: string) {
    return programs.find((program) => program.slug === slug)?.color ?? 'var(--brand)';
  }

  return (
    <section className="relative overflow-hidden border-t border-hairline py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgb(124_58_237/13%),transparent_70%)] blur-2xl"
      />

      <div className="relative mx-auto w-full max-w-[1058px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.28em] text-brand-soft">
              // Academy
            </p>
            <h2 className="mt-2 text-[40px] font-bold leading-[1.05] text-white sm:text-[46px]">
              Learn by Doing
            </h2>
            <p className="mt-3 max-w-[420px] text-[14.5px] leading-relaxed text-zinc-400">
              Bite-sized lessons, real projects, instant XP. Pick a track and start building today.
            </p>
          </div>

          <Link
            href="/academy"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-brand/45 bg-brand/10 px-5 text-[13.5px] font-semibold text-brand-soft transition-colors hover:bg-brand/20"
          >
            Browse all lessons
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {tracks.map((item) => {
            const active = item === track;
            const label = item === 'All' ? 'All' : nameOf(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => setTrack(item)}
                aria-pressed={active}
                style={
                  { '--track': item === 'All' ? 'var(--brand)' : colorOf(item) } as CSSProperties
                }
                className={`h-9 rounded-lg border px-4 font-mono text-[12px] font-medium transition-colors ${
                  active ? 'track-chip-active' : 'track-chip-idle'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <ul className="mt-6 space-y-2.5">
          {visible.map((lesson, index) => (
            <li key={lesson.title}>
              <Link
                href={`/academy/${lesson.courseId}`}
                style={{ '--track': colorOf(lesson.program) } as CSSProperties}
                className="group flex items-center gap-4 rounded-xl border border-hairline bg-surface-2 px-4 py-3.5 transition-colors hover:border-white/15 hover:bg-surface-3"
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg font-mono text-[11.5px] font-medium ${
                    lesson.done
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-brand/12 text-brand-soft'
                  }`}
                >
                  {lesson.done ? (
                    <Check className="size-4" />
                  ) : (
                    String(index + 1).padStart(2, '0')
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14.5px] font-bold text-white">{lesson.title}</p>
                  <p className="mt-0.5 font-mono text-[11.5px] text-zinc-500">
                    {nameOf(lesson.program)} · {lesson.module}
                  </p>
                </div>

                {lesson.done ? (
                  <span className="hidden rounded-full bg-emerald-500/12 px-2.5 py-1 font-mono text-[10.5px] text-emerald-400 sm:inline">
                    Completed
                  </span>
                ) : null}

                <span className="rounded-full bg-amber-500/12 px-2.5 py-1 font-mono text-[11px] font-medium text-amber-400">
                  ⚡ {lesson.xp} XP
                </span>

                <ArrowRight className="size-4 shrink-0 text-zinc-600 transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-white" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-hairline bg-surface-2 px-4 py-6 text-center"
            >
              <p className={`font-display text-[28px] font-bold ${stat.tone}`}>{stat.value}</p>
              <p className="mt-1 font-mono text-[11.5px] text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
