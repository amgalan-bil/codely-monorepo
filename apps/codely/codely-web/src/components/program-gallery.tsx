'use client';

import Image from 'next/image';
import { useEffect, useState, type CSSProperties } from 'react';
import type { GalleryStop } from '@/data/programs';

const INTERVAL = 2500;

/**
 * Photos stack down the left, untouched. The right column sticks and runs a
 * vertical ticker: the label slides up out of a clipped window as the next one
 * arrives from below, and the description crossfades with it.
 */
export function ProgramGallery({
  stops,
  color,
  title,
}: {
  stops: GalleryStop[];
  color: string;
  title: string;
}) {
  const [index, setIndex] = useState(0);
  // Pause the loop once someone picks a slide themselves.
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return undefined;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % stops.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [auto, stops.length]);

  const active = stops[index];

  return (
    <section
      style={{ '--track': color } as CSSProperties}
      className="border-t border-hairline py-20"
    >
      <div className="mx-auto w-full max-w-[1130px] px-6">
        <p className="track-text font-mono text-[11.5px] font-medium uppercase tracking-[0.28em]">
          // Experience
        </p>
        <h2 className="mt-2 text-[34px] font-bold leading-tight text-white sm:text-[38px]">
          Life at {title}
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {stops.map((stop) => (
              <div
                key={stop.label}
                className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-hairline bg-surface-2"
              >
                <Image
                  src={stop.image}
                  alt={stop.label}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit lg:pt-6">
            {/* Fixed-height window so the outgoing line is clipped, not pushed. */}
            <div className="h-14 overflow-hidden">
              <h3
                key={active.label}
                className="ticker-line track-text text-[30px] font-bold leading-[56px]"
              >
                {active.label}
              </h3>
            </div>

            <p
              key={`${active.label}-body`}
              className="ticker-line mt-4 max-w-[420px] text-[14.5px] leading-[1.65] text-zinc-400"
            >
              {active.description}
            </p>

            <div className="mt-10 flex items-center justify-between border-t border-hairline pt-5">
              <div className="flex items-center gap-1.5">
                {stops.map((stop, dot) => (
                  <button
                    key={stop.label}
                    type="button"
                    aria-label={stop.label}
                    aria-current={dot === index}
                    onClick={() => {
                      setAuto(false);
                      setIndex(dot);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dot === index ? 'w-7 bg-[var(--track)]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-[11.5px] text-zinc-600">
                {String(index + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
