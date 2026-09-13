import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Program } from '@/data/programs';

/**
 * One program tile. Used unchanged on the home page and the programs index so
 * the two never drift apart.
 */
export function ProgramCard({ program }: { program: Program }) {
  return (
    <article
      style={{ '--track': program.color } as CSSProperties}
      className="track-card flex flex-col rounded-2xl border border-hairline bg-surface-2 p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-3">
        <span className="track-icon flex size-11 shrink-0 items-center justify-center rounded-xl text-[20px] leading-none">
          {program.icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-[19px] font-bold leading-tight text-white">{program.name}</h3>
          <p className="track-text mt-0.5 text-[12.5px] italic leading-snug">
            {program.tagline}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-[1.55] text-zinc-400">{program.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {[program.level, program.duration, `${program.projects} projects`].map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[11.5px] font-medium text-zinc-300"
          >
            {pill}
          </span>
        ))}
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {program.languages.map((language) => (
          <span
            key={language}
            className="track-pill rounded-md px-2 py-1 font-mono text-[11px] font-medium"
          >
            {language}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="font-mono text-[11.5px] text-zinc-500">
          {program.enrolled.toLocaleString()} enrolled
        </span>
        <Link
          href={`/programs/${program.slug}`}
          className="track-text group inline-flex items-center gap-1.5 text-[13px] font-semibold"
        >
          View Program
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
