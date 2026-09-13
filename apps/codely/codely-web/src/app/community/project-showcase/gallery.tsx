'use client';

import Image from 'next/image';
import { useState, type CSSProperties } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { showcase } from '@/data/community';
import { programs } from '@/data/programs';

function colorOf(slug: string) {
  return programs.find((program) => program.slug === slug)?.color ?? 'var(--brand)';
}

function nameOf(slug: string) {
  return programs.find((program) => program.slug === slug)?.name ?? slug;
}

export function ShowcaseGallery() {
  const [track, setTrack] = useState('All');
  const [liked, setLiked] = useState<string[]>([]);

  const visible =
    track === 'All' ? showcase : showcase.filter((item) => item.author.program === track);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-bold text-white">Project Showcase</h1>
          <p className="mt-1 text-[13.5px] text-zinc-400">Real projects built by Codely students</p>
        </div>
        <button
          type="button"
          className="rounded-xl bg-brand px-5 py-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-brand-strong"
        >
          + Submit Project
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {[{ slug: 'All', name: 'All', icon: '✦', color: 'var(--brand)' }, ...programs].map(
          (item) => {
            const active = item.slug === track || (track === 'All' && item.slug === 'All');
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setTrack(item.slug)}
                aria-pressed={active}
                style={{ '--track': item.color } as CSSProperties}
                className={`flex h-9 items-center gap-2 rounded-full border px-3.5 font-mono text-[12px] transition-colors ${
                  active ? 'track-chip-active' : 'track-chip-idle'
                }`}
              >
                <span className="text-[13px] leading-none">{item.icon}</span>
                {item.name}
              </button>
            );
          },
        )}
      </div>

      {visible.length > 0 ? (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => {
            const isLiked = liked.includes(project.id);
            return (
              <article
                key={project.id}
                style={{ '--track': colorOf(project.author.program) } as CSSProperties}
                className="track-card flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface-2 transition-[border-color,box-shadow]"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                  <span className="track-pill absolute right-3 top-3 rounded-md px-2 py-1 font-mono text-[10.5px] backdrop-blur">
                    {nameOf(project.author.program)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h2 className="text-[15.5px] font-bold text-white">{project.title}</h2>
                  <p className="mt-2 text-[12.5px] leading-[1.55] text-zinc-400">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[10.5px] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center gap-2 border-t border-hairline pt-3.5">
                    <span className="track-icon flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold text-white">
                      {project.author.initials}
                    </span>
                    <span className="truncate font-mono text-[11px] text-zinc-400">
                      {project.author.name}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-600">· {project.time}</span>

                    <div className="ml-auto flex shrink-0 items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setLiked((current) =>
                            current.includes(project.id)
                              ? current.filter((id) => id !== project.id)
                              : [...current, project.id],
                          )
                        }
                        aria-pressed={isLiked}
                        className={`flex items-center gap-1 font-mono text-[11px] transition-colors ${
                          isLiked ? 'text-pink-400' : 'text-zinc-500 hover:text-white'
                        }`}
                      >
                        <Heart className={`size-3 ${isLiked ? 'fill-current' : ''}`} />
                        {project.likes + (isLiked ? 1 : 0)}
                      </button>
                      <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                        <MessageSquare className="size-3" />
                        {project.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-12 text-[13.5px] text-zinc-500">
          No projects submitted for this track yet.
        </p>
      )}
    </div>
  );
}
