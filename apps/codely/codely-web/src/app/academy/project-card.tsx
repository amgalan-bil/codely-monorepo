import Link from 'next/link';
import { Lock, Play, RotateCw } from 'lucide-react';
import { languageToCourse } from '@/data/courses';
import type { Level, Project, ProjectStatus } from './data';

const levelStyles: Record<Level, string> = {
  Beginner: 'bg-level-beginner/12 text-level-beginner',
  Intermediate: 'bg-level-intermediate/12 text-level-intermediate',
  Advanced: 'bg-level-advanced/12 text-level-advanced',
};

const tagStyles = {
  python: 'bg-lang-python/12 text-lang-python',
  web: 'bg-lang-web/12 text-lang-web',
} as const;

const actionStyles: Record<ProjectStatus, string> = {
  completed:
    'bg-level-beginner/12 text-level-beginner hover:bg-level-beginner/20',
  available: 'bg-brand text-white hover:bg-brand-strong',
  locked: 'bg-white/[0.035] text-zinc-500 cursor-not-allowed',
};

const actionLabels: Record<ProjectStatus, string> = {
  completed: 'Redo Project',
  available: 'Start Project',
  locked: 'Locked',
};

const actionIcons = {
  completed: RotateCw,
  available: Play,
  locked: Lock,
} as const;

export function ProjectCard({ project }: { project: Project }) {
  const ActionIcon = actionIcons[project.status];
  const isLocked = project.status === 'locked';
  // Every project teaches a language; the course for that language is where
  // the chapters, exercises and editor live.
  const courseId = languageToCourse[project.tag.label] ?? 'python';

  return (
    <article className="flex flex-col rounded-xl border border-hairline bg-surface-2 p-4 transition-colors hover:border-white/15">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            levelStyles[project.level]
          }`}
        >
          {project.level}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-xp/12 px-2.5 py-1 font-mono text-[11px] font-medium text-xp">
            +{project.xp} XP
          </span>
          {isLocked ? (
            <Lock className="size-3.5 shrink-0 text-zinc-600" />
          ) : null}
        </div>
      </div>

      <h3 className="mt-3 text-[17px] font-bold tracking-tight">
        {project.title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-[1.45] text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-auto">
        <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-hairline pt-3">
          <span
            className={`rounded-md px-2 py-1 font-mono text-[11px] font-medium ${
              tagStyles[project.tag.tone]
            }`}
          >
            {project.tag.label}
          </span>
          <span className="text-[12px] text-zinc-500">{project.duration}</span>
        </div>

        {isLocked ? (
          <span
            aria-disabled
            className={`mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-semibold ${actionStyles.locked}`}
          >
            <ActionIcon className="size-3.5" />
            {actionLabels.locked}
          </span>
        ) : (
          <Link
            href={`/academy/${courseId}`}
            className={`mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-semibold transition-colors ${
              actionStyles[project.status]
            }`}
          >
            <ActionIcon
              className={`size-3.5 ${
                project.status === 'available' ? 'fill-current' : ''
              }`}
            />
            {actionLabels[project.status]}
          </Link>
        )}
      </div>
    </article>
  );
}
