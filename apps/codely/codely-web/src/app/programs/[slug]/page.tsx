import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Target, Users } from 'lucide-react';
import { ProgramGallery } from '@/components/program-gallery';
import { getProgram, programs } from '@/data/programs';

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: 'Program' };
  return { title: program.name, description: program.overview };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const facts = [
    { icon: Users, label: 'Students', value: program.enrolled.toLocaleString() },
    { icon: CalendarDays, label: 'Duration', value: program.duration },
    { icon: Target, label: 'Level', value: program.level },
  ];

  return (
    <main style={{ '--track': program.color } as CSSProperties}>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 size-[620px] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: `radial-gradient(circle, ${program.color}, transparent 65%)` }}
        />

        <div className="relative mx-auto w-full max-w-[1130px] px-6 pb-20 pt-12">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-[13px] text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            Back to Programs
          </Link>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_460px]">
            <div>
              <span className="track-icon inline-flex size-12 items-center justify-center rounded-xl text-[22px] leading-none">
                {program.icon}
              </span>

              <span className="track-pill mt-6 inline-block rounded-full px-3 py-1 font-mono text-[11px]">
                {program.level} · {program.duration}
              </span>

              <h1 className="mt-4 text-[42px] font-bold leading-[1.05] text-white sm:text-[52px]">
                {program.name}
              </h1>
              <p className="track-text mt-2 text-[16px] font-semibold">{program.tagline}</p>

              <p className="mt-5 max-w-[520px] text-[14.5px] leading-[1.7] text-zinc-400">
                {program.overview}
              </p>

              <dl className="mt-7 flex flex-wrap gap-3">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-xl border border-hairline bg-surface-2 px-4 py-3"
                  >
                    <dt className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wide text-zinc-500">
                      <fact.icon className="size-3" />
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-[14px] font-bold text-white">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center gap-2 rounded-lg px-6 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: program.color }}
                >
                  Enroll Now
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/academy"
                  className="inline-flex h-11 items-center rounded-lg border border-hairline bg-white/[0.04] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-white/[0.08]"
                >
                  Preview Lessons
                </Link>
              </div>
            </div>

            <div
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hairline"
              style={{ boxShadow: `0 30px 90px -40px ${program.color}` }}
            >
              <Image
                src={program.heroImage}
                alt={`${program.name} students at work`}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- skills */}
      <section className="border-y border-hairline bg-surface-2/40 py-14">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <h2 className="text-[26px] font-bold text-white">Skills You&apos;ll Gain</h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {program.skills.map((skill) => (
              <span
                key={skill}
                className="track-pill rounded-full px-4 py-2 font-mono text-[12.5px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- unique */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <h2 className="text-[26px] font-bold text-white">
            What Makes {program.name} Unique
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {program.unique.map((point, index) => (
              <div
                key={point}
                className="flex items-start gap-4 rounded-xl border border-hairline bg-surface-2 px-5 py-4"
              >
                <span className="track-pill flex size-8 shrink-0 items-center justify-center rounded-lg font-mono text-[11.5px] font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="pt-1 text-[13.5px] leading-relaxed text-zinc-300">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- curriculum */}
      <section className="pb-20">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <h2 className="text-[26px] font-bold text-white">Curriculum</h2>
          <ol className="mt-6 space-y-3">
            {program.curriculum.map((module, index) => (
              <li
                key={module.title}
                className="flex items-center gap-4 rounded-xl border border-hairline bg-surface-2 px-5 py-4"
              >
                <span className="track-pill flex size-9 shrink-0 items-center justify-center rounded-lg font-mono text-[11.5px] font-medium">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-bold text-white">{module.title}</p>
                  <p className="mt-0.5 text-[13px] text-zinc-500">{module.summary}</p>
                </div>
                <span className="shrink-0 font-mono text-[12px] text-zinc-500">
                  {module.lessons} lessons
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {program.gallery ? (
        <ProgramGallery stops={program.gallery} color={program.color} title={program.name} />
      ) : null}
    </main>
  );
}
