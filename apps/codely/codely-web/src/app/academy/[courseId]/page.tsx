import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ListChecks, MessageCircle, Users } from 'lucide-react';
import { courseExercises, courses, courseTotals, getCourse } from '@/data/courses';
import { CourseOutline } from './course-outline';

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) return { title: 'Course' };
  return { title: course.name, description: course.description };
}

const badgeSlots = ['🥇', '⭐', '🔥', '💎', '🚀', '🎯', '🏆', '✨'];

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();

  const totals = courseTotals(course);
  const first = courseExercises(course)[0];

  return (
    <main>
      {/* -------------------------------------------------------------- banner */}
      <section className="relative overflow-hidden border-b border-hairline">
        <Image
          src={course.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(100deg, ${course.color}5c 0%, rgb(10 10 15 / 92%) 62%, rgb(10 10 15) 100%)`,
          }}
        />

        <div className="relative mx-auto w-full max-w-[1130px] px-6 py-20">
          <span className="inline-block rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-200">
            {course.level} Course
          </span>

          <h1 className="mt-5 text-[56px] font-bold leading-none text-white sm:text-[76px]">
            {course.name}
          </h1>

          <p className="mt-5 max-w-[470px] text-[14.5px] leading-[1.7] text-zinc-300">
            {course.description}
          </p>

          <Link
            href={`/academy/${course.id}/${first.slug}`}
            className="mt-8 inline-flex h-12 items-center rounded-xl bg-amber-400 px-7 text-[15px] font-bold text-black transition-colors hover:bg-amber-300"
          >
            Start Learning for Free
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 font-mono text-[11.5px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {course.hours}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" />
              {course.learners.toLocaleString()} learners
            </span>
            <span className="flex items-center gap-1.5">
              <ListChecks className="size-3.5" />
              {totals.exercises} Exercises · {totals.xp} XP
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-[1130px] gap-8 px-6 py-14 lg:grid-cols-[1fr_296px]">
        <CourseOutline course={course} />

        <aside className="space-y-4 lg:sticky lg:top-20 lg:h-fit">
          {/* Sign-up prompt. The auth provider is still being chosen, so this
              links to the sign-up page rather than opening a session flow. */}
          <div className="rounded-2xl border border-hairline bg-surface-2 px-5 py-6 text-center">
            <span
              className="mx-auto flex size-14 items-center justify-center rounded-full text-[22px]"
              style={{ backgroundColor: `color-mix(in oklab, ${course.color} 18%, transparent)` }}
            >
              👤
            </span>
            <h2 className="mt-4 text-[15px] font-bold text-white">Track your progress</h2>
            <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-400">
              Sign up to save your progress, earn XP, and unlock badges.
            </p>
            <Link
              href="/signup"
              className="mt-4 flex h-10 items-center justify-center rounded-lg text-[13.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: course.color }}
            >
              Sign Up — It&apos;s Free
            </Link>
          </div>

          <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
              Course Progress
            </h2>
            <div className="mt-4 space-y-3.5">
              {[
                { label: 'Exercises', value: `0/${totals.exercises}` },
                { label: 'Projects', value: '0/2' },
                { label: 'XP', value: `0/${totals.xp}` },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[12.5px] text-zinc-400">{row.label}</span>
                    <span className="font-mono text-[11.5px] text-zinc-500">{row.value}</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <span className="block h-full w-0 rounded-full" style={{ backgroundColor: course.color }} />
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={`/academy/${course.id}/${first.slug}`}
              className="mt-5 flex h-10 items-center justify-center rounded-lg text-[13.5px] font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: course.color }}
            >
              Start Course →
            </Link>
          </div>

          <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
              Course Badges
            </h2>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {badgeSlots.map((icon, index) => (
                <span
                  key={index}
                  className="flex aspect-square items-center justify-center rounded-lg bg-white/[0.04] text-[15px] opacity-30 grayscale"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                Cheat Sheet
              </h2>
              <span
                className="rounded-md px-2 py-0.5 font-mono text-[10px]"
                style={{
                  backgroundColor: `color-mix(in oklab, ${course.color} 18%, transparent)`,
                  color: course.color,
                }}
              >
                {course.name}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {course.cheatSheet.map((entry) => (
                <div key={entry.label} className="rounded-lg bg-white/[0.03] px-3 py-2.5">
                  <p className="text-[12.5px] font-semibold text-zinc-300">{entry.label}</p>
                  <code className="mt-1 block font-mono text-[11px]" style={{ color: course.color }}>
                    {entry.code}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-hairline bg-surface-2 p-5">
            <h2 className="flex items-center gap-2 text-[14px] font-bold text-white">
              <MessageCircle className="size-4" />
              Need Help?
            </h2>
            <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-400">
              Get help from other learners and mentors in the Codely community.
            </p>
            <Link
              href="/community"
              className="mt-4 flex h-10 items-center justify-center rounded-lg border border-hairline bg-white/[0.05] text-[13.5px] font-semibold text-white transition-colors hover:bg-white/[0.1]"
            >
              Go to Community
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
