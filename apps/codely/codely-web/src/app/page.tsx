import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AcademyPreview } from '@/components/academy-preview';
import { BlockchainBg } from '@/components/blockchain-bg';
import { ProgramCard } from '@/components/program-card';
import { TestimonialCard, type Testimonial } from '@/components/testimonial-card';
import { programs } from '@/data/programs';

const stats = [
  { icon: '👩‍💻', value: '4,460+', label: 'Students Trained', tone: 'text-brand-soft' },
  { icon: '✅', value: '82,000+', label: 'Lessons Completed', tone: 'text-cyan-400' },
  { icon: '🚀', value: '890+', label: 'Graduates Hired', tone: 'text-emerald-400' },
  { icon: '🎯', value: '6', label: 'Programs Running', tone: 'text-amber-400' },
];

const testimonials: Testimonial[] = [
  {
    name: 'Enkhjargal B.',
    programName: 'She Can Code',
    programColor: 'var(--track-she-can-code)',
    stars: 5,
    quote:
      'Codely changed my life. I went from zero coding knowledge to landing a front-end developer job at a tech startup in just 6 months. The instructors are incredibly supportive.',
  },
  {
    name: 'Tulgaa M.',
    programName: 'MonPy',
    programColor: 'var(--track-monpy)',
    stars: 5,
    quote:
      'The MonPy program gave me a strong Python foundation, and Cat AI pushed me into machine learning territory I never imagined I could reach. Now I am building ML models at my company.',
  },
  {
    name: 'Munkh-Erdene G.',
    programName: 'I++',
    programColor: 'var(--track-lpp)',
    stars: 5,
    quote:
      'Best investment I have made. The project-based curriculum and real-world assignments made all the difference. I shipped my first full-stack app during the program.',
  },
];

const introCode = [
  { indent: 0, parts: [['def ', 'text-brand-soft'], ['start_journey', 'text-cyan-300'], ['(name):', 'text-zinc-400']] },
  { indent: 1, parts: [['# Your coding adventure begins', 'text-zinc-600']] },
  { indent: 1, parts: [['xp ', 'text-white'], ['= ', 'text-zinc-500'], ['0', 'text-amber-300']] },
  { indent: 1, parts: [['skills ', 'text-white'], ['= ', 'text-zinc-500'], ['[]', 'text-amber-300']] },
  {
    indent: 1,
    parts: [
      ['return ', 'text-brand-soft'],
      ['f"Welcome, {name}! Let’s build something amazing"', 'text-emerald-300'],
    ],
  },
  { indent: 0, parts: [['', '']] },
  { indent: 0, parts: [['start_journey', 'text-cyan-300'], ['(', 'text-zinc-400'], ['"You"', 'text-emerald-300'], [')', 'text-zinc-400']] },
  { indent: 0, parts: [['> "Welcome, You! Let’s build something amazing"', 'text-zinc-500']] },
] as const;

export default function HomePage() {
  return (
    <main>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="absolute inset-0 text-white">
          <BlockchainBg />
        </div>
        {/*
          Drop a hero illustration at public/hero-city.png and it renders here
          behind the network; until then the network alone carries the section.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(124_58_237/16%),transparent_62%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-surface"
        />

        <div className="relative mx-auto w-full max-w-[1130px] px-6 pb-24 pt-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 font-mono text-[11.5px] text-brand-soft">
            <span className="size-1.5 rounded-full bg-brand-soft" />
            Mongolia&apos;s 1st non-profit Coding Academy
          </span>

          <h1 className="mx-auto mt-7 max-w-[860px] text-[46px] font-bold leading-[1.03] text-white sm:text-[68px]">
            <span>Code Your </span>
            <span className="bg-gradient-to-r from-brand-soft to-brand bg-clip-text text-transparent">
              Future.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-zinc-400">
            Join 4,460+ students on a structured journey from zero to developer. Real projects,
            real mentors, real results — in Mongolian and English.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-black px-6 text-[14px] font-bold text-white shadow-[0_10px_36px_-12px_rgb(124_58_237/80%)] transition-opacity hover:opacity-90"
            >
              Start Learning Free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex h-11 items-center rounded-lg border border-hairline bg-white/[0.04] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >
              Explore Programs
            </Link>
          </div>

          {/* Terminal card — decorative, so it is inert to assistive tech. */}
          <div
            aria-hidden
            className="mx-auto mt-14 max-w-[600px] overflow-hidden rounded-xl border border-hairline bg-[#0d0d16] text-left shadow-[0_30px_80px_-30px_rgb(0_0_0/90%)]"
          >
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-red-500/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-zinc-500">codely_intro.py</span>
            </div>
            <pre className="code-surface overflow-x-auto px-5 py-4">
              {introCode.map((line, index) => (
                <div key={index} style={{ paddingLeft: line.indent * 16 }}>
                  {line.parts.map(([text, tone], part) => (
                    <span key={part} className={tone}>
                      {text}
                    </span>
                  ))}
                  {line.parts[0][0] === '' ? ' ' : null}
                </div>
              ))}
            </pre>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- stats */}
      <section className="border-b border-hairline py-14">
        <div className="mx-auto grid w-full max-w-[1130px] grid-cols-2 gap-4 px-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-hairline bg-surface-2 px-4 py-7 text-center"
            >
              <p className="text-[22px] leading-none">{stat.icon}</p>
              <p className={`mt-3 font-display text-[28px] font-bold ${stat.tone}`}>{stat.value}</p>
              <p className="mt-1 font-mono text-[11.5px] text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ programs */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <div className="text-center">
            <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.28em] text-brand-soft">
              // Our Programs
            </p>
            <h2 className="mt-2 text-[38px] font-bold leading-tight text-white sm:text-[44px]">
              6 Paths to Mastery
            </h2>
            <p className="mx-auto mt-3 max-w-[520px] text-[14.5px] leading-relaxed text-zinc-400">
              From beginner-friendly bootcamps to advanced specializations — find the program that
              fits your goals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/programs"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-6 text-[14px] font-bold text-white transition-colors hover:bg-brand-strong"
            >
              View All Programs
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <AcademyPreview />

      {/* -------------------------------------------------------- testimonials */}
      <section className="py-20">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <div className="text-center">
            <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.28em] text-emerald-400">
              // Student Stories
            </p>
            <h2 className="mt-2 text-[38px] font-bold leading-tight text-white sm:text-[42px]">
              What Our Students Say
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- cta */}
      <section className="pb-24">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <div className="relative overflow-hidden rounded-3xl border border-brand/25 bg-[linear-gradient(135deg,rgb(124_58_237/22%),rgb(6_182_212/8%))] px-6 py-16 text-center">
            <h2 className="text-[32px] font-bold leading-tight text-white sm:text-[40px]">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[14.5px] leading-relaxed text-zinc-300">
              Join thousands of Mongolian students already building the future. Sign up free — no
              credit card required.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-black px-7 text-[15px] font-bold text-white shadow-[0_14px_44px_-14px_rgb(124_58_237/85%)] transition-opacity hover:opacity-90"
            >
              Get Started for Free
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
