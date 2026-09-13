'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { activityFor } from '@/data/profile';

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Five steps of brand purple, quiet → loud. */
const intensity = [
  'bg-white/[0.04]',
  'bg-brand/25',
  'bg-brand/45',
  'bg-brand/70',
  'bg-brand',
];

/**
 * Month-at-a-time activity grid, GitHub-style: columns are weeks, rows are
 * weekdays starting Monday, and arrows walk back through earlier months.
 */
export function StreakCalendar({ streak }: { streak: number }) {
  // Fixed "today" so the server and the first client render agree; it becomes
  // the real date once activity comes from the API.
  const [cursor, setCursor] = useState({ year: 2026, month: 8 });

  const activity = activityFor(cursor.year, cursor.month);
  const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();

  // JS weeks start Sunday; shift so Monday is row 0.
  const firstWeekday = (new Date(cursor.year, cursor.month, 1).getDay() + 6) % 7;
  const cells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = Array.from({ length: cells.length / 7 }, (_, week) =>
    cells.slice(week * 7, week * 7 + 7),
  );

  const activeDays = [...activity.values()].filter((value) => value > 0).length;

  function shift(delta: number) {
    setCursor((current) => {
      const next = current.month + delta;
      if (next < 0) return { year: current.year - 1, month: 11 };
      if (next > 11) return { year: current.year + 1, month: 0 };
      return { year: current.year, month: next };
    });
  }

  return (
    <section className="rounded-2xl border border-hairline bg-surface-2 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[15px] font-bold text-white">
          🔥 {streak} day streak
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => shift(-1)}
            className="flex size-7 items-center justify-center rounded-md border border-hairline text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <span className="min-w-[118px] text-center font-mono text-[12px] text-zinc-300">
            {months[cursor.month]} {cursor.year}
          </span>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => shift(1)}
            className="flex size-7 items-center justify-center rounded-md border border-hairline text-zinc-400 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        <div className="grid shrink-0 grid-rows-7 gap-1">
          {weekdays.map((day, index) => (
            <span
              key={index}
              className="flex h-4 items-center font-mono text-[9.5px] text-zinc-600"
            >
              {day}
            </span>
          ))}
        </div>

        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid shrink-0 grid-rows-7 gap-1">
            {week.map((day, dayIndex) => {
              if (day === null) {
                return <span key={dayIndex} className="size-4" />;
              }
              const level = activity.get(day) ?? 0;
              return (
                <span
                  key={dayIndex}
                  title={`${months[cursor.month]} ${day} — ${level === 0 ? 'no activity' : `${level * 25} XP`}`}
                  className={`size-4 rounded-[3px] ${intensity[level]}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-3.5">
        <p className="font-mono text-[11px] text-zinc-500">
          {activeDays} active {activeDays === 1 ? 'day' : 'days'} in {months[cursor.month]}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[10px] text-zinc-600">Less</span>
          {intensity.map((tone) => (
            <span key={tone} className={`size-3 rounded-[3px] ${tone}`} />
          ))}
          <span className="font-mono text-[10px] text-zinc-600">More</span>
        </div>
      </div>
    </section>
  );
}
