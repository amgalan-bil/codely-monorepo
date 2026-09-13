import { notFound } from 'next/navigation';
import { courseExercises, courses, getCourse } from '@/data/courses';
import { LessonWorkspace } from './workspace';

export function generateStaticParams() {
  return courses.flatMap((course) =>
    courseExercises(course).map((exercise) => ({
      courseId: course.id,
      exerciseSlug: exercise.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string; exerciseSlug: string }>;
}) {
  const { courseId, exerciseSlug } = await params;
  const course = getCourse(courseId);
  const exercise = course && courseExercises(course).find((item) => item.slug === exerciseSlug);
  if (!course || !exercise) return { title: 'Exercise' };
  return { title: `${exercise.title} · ${course.name}` };
}

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ courseId: string; exerciseSlug: string }>;
}) {
  const { courseId, exerciseSlug } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();

  const exercise = courseExercises(course).find((item) => item.slug === exerciseSlug);
  if (!exercise) notFound();

  return <LessonWorkspace course={course} exercise={exercise} />;
}
