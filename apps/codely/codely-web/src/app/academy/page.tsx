import { Suspense } from 'react';
import { AcademyCatalog } from './academy-catalog';

export const metadata = {
  title: 'Project Tutorials',
  description:
    "Learn by building. Each project teaches real skills you'll use in the industry.",
};

export default function AcademyPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Brand glow bleeding out of the top-left corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-40 size-[620px] rounded-full bg-[radial-gradient(circle,rgb(124_58_237/20%),transparent_65%)] blur-2xl"
      />

      <section className="relative mx-auto w-full max-w-[1130px] px-6 pb-[76px] pt-[60px]">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-brand-soft">
          // Academy
        </p>
        <h1 className="mt-2 text-[38px] font-bold leading-[1.05] sm:text-[53px]">
          Project Tutorials
        </h1>
        <p className="mt-3.5 max-w-[478px] text-[15px] leading-relaxed text-muted-foreground">
          Learn by building. Each project teaches real skills you&apos;ll use in
          the industry.
        </p>
      </section>

      {/* useSearchParams needs a suspense boundary during prerender. */}
      <Suspense fallback={null}>
        <AcademyCatalog />
      </Suspense>
    </div>
  );
}
