import type { CSSProperties } from 'react';
import { Star, User } from 'lucide-react';

export type Testimonial = {
  name: string;
  programName: string;
  programColor: string;
  stars: number;
  quote: string;
};

/**
 * Avatar → name → program badge → rating → quote, in that order, centred.
 * Real photography is not available for participants, so a glyph stands in.
 */
export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article
      style={{ '--track': item.programColor } as CSSProperties}
      className="track-card flex flex-col items-center rounded-2xl border border-hairline bg-surface-2 p-6 text-center transition-[border-color,box-shadow] duration-200"
    >
      <span className="track-icon flex size-14 items-center justify-center rounded-full">
        <User className="track-text size-6" />
      </span>

      <h3 className="mt-4 text-[15px] font-bold text-white">{item.name}</h3>
      <span className="track-pill mt-2 rounded-full px-2.5 py-1 font-mono text-[11px]">
        {item.programName}
      </span>

      <div className="mt-3 flex gap-0.5" aria-label={`${item.stars} out of 5`}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Star
            key={index}
            className={`size-3.5 ${
              index <= item.stars ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-[13.5px] leading-[1.6] text-zinc-400">&ldquo;{item.quote}&rdquo;</p>
    </article>
  );
}
