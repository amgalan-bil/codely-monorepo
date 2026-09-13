'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Lock } from 'lucide-react';
import type { Course } from '@/data/courses';

/**
 * Chapter timeline. The first chapter opens by default; the rest reveal on
 * click. Only the first exercise of the course is unlocked, matching a
 * signed-out visitor's view — progress will come from the session once auth
 * is wired.
 */
export function CourseOutline({ course }: { course: Course }) {
  const [open, setOpen] = useState<number | null>(0);

  let seen = 0;

  return (
    <ol className="relative space-y-3">
      {/* Spine linking the numbered chapter markers. */}
      <span
        aria-hidden
        className="absolute bottom-6 left-[19px] top-6 w-px bg-hairline"
      />

      {course.chapters.map((chapter, index) => {
        const expanded = open === index;
        const chapterStart = seen;
        seen += chapter.exercises.length;

        return (
          <li key={chapter.title} className="relative">
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : index)}
              aria-expanded={expanded}
              className="flex w-full items-center gap-4 text-left"
            >
              <span
                className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-medium text-white"
                style={{
                  backgroundColor: expanded
                    ? course.color
                    : 'color-mix(in oklab, white 8%, transparent)',
                }}
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-bold text-white">{chapter.title}</span>
                <span className="mt-0.5 block font-mono text-[11.5px] text-zinc-500">
                  0/{chapter.exercises.length} exercises completed
                </span>
              </span>
              <ChevronDown
                className={`size-4 shrink-0 text-zinc-500 transition-transform ${
                  expanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expanded ? (
              <div className="ml-[54px] mt-3 overflow-hidden rounded-xl border border-hairline bg-surface-2">
                {chapter.exercises.map((exercise, position) => {
                  const overall = chapterStart + position;
                  const unlocked = overall === 0;

                  return (
                    <div
                      key={exercise.slug}
                      className={`flex items-center gap-3 px-4 py-3 ${
                        position > 0 ? 'border-t border-hairline' : ''
                      } ${unlocked ? 'bg-white/[0.03]' : ''}`}
                    >
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-md font-mono text-[10.5px] ${
                          unlocked ? 'text-white' : 'text-zinc-600'
                        }`}
                        style={{
                          backgroundColor: unlocked
                            ? `color-mix(in oklab, ${course.color} 22%, transparent)`
                            : 'rgb(255 255 255 / 4%)',
                        }}
                      >
                        {unlocked ? (
                          String(overall + 1).padStart(2, '0')
                        ) : (
                          <Lock className="size-3" />
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10.5px] uppercase tracking-wide text-zinc-500">
                          Exercise {overall + 1}
                        </p>
                        <p
                          className={`truncate text-[14px] font-semibold ${
                            unlocked ? 'text-white' : 'text-zinc-600'
                          }`}
                        >
                          {unlocked ? exercise.title : '???'}
                        </p>
                      </div>

                      <span className="shrink-0 font-mono text-[11.5px] text-zinc-500">
                        {exercise.xp} XP
                      </span>

                      {unlocked ? (
                        <Link
                          href={`/academy/${course.id}/${exercise.slug}`}
                          className="shrink-0 rounded-lg px-3.5 py-1.5 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: course.color }}
                        >
                          Start →
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
