'use client';

import { useSearchParams } from 'next/navigation';
import { useState, type CSSProperties } from 'react';
import { levels, tracks, type Level } from './data';
import { ProjectCard } from './project-card';

type Filter = 'All' | Level;

const filters: Filter[] = ['All', ...levels];

export function AcademyCatalog() {
  // The header search routes here as /academy?q=…
  const query = (useSearchParams().get('q') ?? '').trim().toLowerCase();
  const [trackId, setTrackId] = useState(tracks[0].id);
  const [filter, setFilter] = useState<Filter>('All');

  const track = tracks.find((item) => item.id === trackId) ?? tracks[0];

  // A search spans every track; without one the selected track's grid shows.
  const searched = query
    ? tracks.flatMap((item) =>
        item.projects.filter(
          (project) =>
            project.title.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.tag.label.toLowerCase().includes(query) ||
            item.name.toLowerCase().includes(query),
        ),
      )
    : null;

  const scoped = searched ?? track.projects;
  const projects =
    filter === 'All'
      ? scoped
      : scoped.filter((project) => project.level === filter);

  function selectTrack(id: string) {
    setTrackId(id);
    // Levels differ per track, so a carried-over filter can empty the grid.
    setFilter('All');
  }

  return (
    <>
      <div className="relative border-y border-hairline">
        <div className="mx-auto w-full max-w-[1130px] px-6 py-[18px]">
          <div className="flex flex-wrap items-center gap-3">
            {tracks.map((item) => {
              const isActive = item.id === track.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectTrack(item.id)}
                  aria-pressed={isActive}
                  style={{ '--track': item.color } as CSSProperties}
                  className={`flex h-10 items-center gap-2 rounded-full border px-4 transition-colors ${
                    isActive ? 'track-chip-active' : 'track-chip-idle'
                  }`}
                >
                  <span className="text-[15px] leading-none">{item.icon}</span>
                  <span className="text-[13.5px] font-semibold">
                    {item.name}
                  </span>
                  {item.progress ? (
                    <span className="track-progress rounded-md px-1.5 py-0.5 font-mono text-[11px] font-medium">
                      {item.progress.done}/{item.progress.total}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-[1058px] px-6 pb-24 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[30px] leading-none">
              {searched ? '🔍' : track.icon}
            </span>
            <div>
              <h2 className="text-[22px] font-bold tracking-tight">
                {searched ? `Results for “${query}”` : track.title}
              </h2>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {searched
                  ? `${searched.length} project${searched.length === 1 ? '' : 's'} across all tracks`
                  : track.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {filters.map((item) => {
              const isActive = item === filter;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  aria-pressed={isActive}
                  className={`h-8 rounded-full px-4 text-[13px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand text-white'
                      : 'border border-hairline text-zinc-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-[13.5px] text-muted-foreground">
            {searched
              ? 'Nothing matched that search yet.'
              : `No ${filter.toLowerCase()} projects in this track yet.`}
          </p>
        )}
      </section>
    </>
  );
}
