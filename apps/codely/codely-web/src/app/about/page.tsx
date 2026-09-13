import Image from 'next/image';
import Link from 'next/link';
import { milestones, mission } from '@/data/team';
import { TeamGrid } from './team-grid';

export const metadata = {
  title: 'About Us',
  description:
    'Codely Coding Academy was founded in 2021 with one mission: to democratize coding education in Mongolia.',
};

export default function AboutPage() {
  return (
    <main>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 size-[600px] rounded-full bg-[radial-gradient(circle,rgb(124_58_237/20%),transparent_65%)] blur-2xl"
        />
        <div className="relative mx-auto w-full max-w-[1130px] px-6 py-24">
          <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.28em] text-brand-soft">
            // About Us
          </p>
          <h1 className="mt-3 max-w-[720px] text-[42px] font-bold leading-[1.08] text-white sm:text-[54px]">
            <span>Changing Mongolia&apos;s </span>
            <span className="bg-gradient-to-r from-brand-soft to-brand bg-clip-text text-transparent">
              Tech Landscape
            </span>
          </h1>
          <p className="mt-6 max-w-[600px] text-[15.5px] leading-[1.8] text-zinc-400">
            Codely Coding Academy was founded in 2021 with one mission: to democratize coding
            education in Mongolia. We believe every Mongolian deserves access to world-class tech
            education — in their own language, with mentors who understand their context.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- mission */}
      <section className="border-b border-hairline bg-surface-2/30 py-20">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <h2 className="text-[30px] font-bold text-white">Our Mission</h2>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
            <ul className="space-y-3.5">
              {mission.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-4 rounded-xl border border-hairline bg-surface-2 px-5 py-4"
                >
                  <span className="text-[17px] leading-none">{item.icon}</span>
                  <p className="text-[13.5px] leading-relaxed text-zinc-300">{item.text}</p>
                </li>
              ))}
            </ul>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=70"
                alt="Codely students working together"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- journey */}
      <section className="border-b border-hairline py-20">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <h2 className="text-[30px] font-bold text-white">Our Journey</h2>

          <ol className="relative mt-8 space-y-4">
            <span aria-hidden className="absolute bottom-8 left-8 top-8 w-px bg-brand/35" />
            {milestones.map((milestone) => (
              <li key={milestone.year} className="relative flex items-center gap-6">
                <span className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-xl border border-brand/45 bg-surface font-mono text-[13px] font-medium text-brand-soft">
                  {milestone.year}
                </span>
                <p className="flex-1 rounded-xl border border-hairline bg-surface-2 px-5 py-5 text-[13.5px] leading-relaxed text-zinc-300">
                  {milestone.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- team */}
      <section id="team" className="scroll-mt-20 py-20">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <div className="text-center">
            <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.28em] text-brand-soft">
              // Our Team
            </p>
            <h2 className="mt-2 text-[34px] font-bold leading-tight text-white sm:text-[40px]">
              Meet the People Behind Codely
            </h2>
          </div>

          <div className="mt-12">
            <TeamGrid />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- hiring */}
      <section id="careers" className="scroll-mt-20 border-t border-hairline py-20 text-center">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <h2 className="text-[30px] font-bold text-white sm:text-[34px]">
            Want to Join Our Team?
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[14.5px] text-zinc-400">
            We&apos;re always looking for passionate instructors, curriculum designers, and tech
            educators.
          </p>
          <Link
            id="contact"
            href="mailto:hello@codely.mn"
            className="mt-8 inline-flex h-12 items-center rounded-xl bg-brand px-7 text-[15px] font-bold text-white transition-colors hover:bg-brand-strong"
          >
            Apply to Teach →
          </Link>
        </div>
      </section>
    </main>
  );
}
