'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';
import { team } from '@/data/team';

/** Cards reveal a short bio in place rather than opening a dialog. */
export function TeamGrid() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => {
        const expanded = open === member.name;

        return (
          <button
            key={member.name}
            type="button"
            onClick={() => setOpen(expanded ? null : member.name)}
            aria-expanded={expanded}
            style={{ '--track': member.color } as CSSProperties}
            className="track-card overflow-hidden rounded-2xl border border-hairline bg-surface-2 text-left transition-[border-color,box-shadow]"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-surface-2 via-surface-2/25 to-transparent"
              />
            </div>

            <div className="p-5">
              <h3 className="text-[15.5px] font-bold text-white">{member.name}</h3>
              <p className="track-text mt-1 font-mono text-[11.5px]">{member.role}</p>

              {expanded ? (
                <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">{member.bio}</p>
              ) : (
                <p className="mt-3 text-[12.5px] text-zinc-600">Click to learn more →</p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
