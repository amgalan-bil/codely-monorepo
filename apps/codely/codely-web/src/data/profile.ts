/**
 * The signed-in student the UI is designed around.
 *
 * Sign-in is not wired yet (auth provider still being chosen), so this stands
 * in for the session. Everything that will later come from the API is shaped
 * the way the API should return it.
 */

export type BadgeState = {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  color: string;
};

export type ActiveLesson = {
  title: string;
  courseId: string;
  program: string;
  programName: string;
  chapter: string;
  percent: number;
  xp: number;
};

export type CompletedLesson = {
  title: string;
  programName: string;
  date: string;
  xp: number;
};

export type NextLesson = {
  title: string;
  courseId: string;
  exerciseSlug: string;
  programName: string;
  level: string;
  xp: number;
};

export const profile = {
  name: 'Ariunaa Oyunbaatar',
  handle: '@ariunaa_o',
  initials: 'AO',
  since: 'Aug 2024',
  programs: ['MonPy', 'I++'],
  streak: 4,
  totalXp: 2480,
  rank: 12,
  completed: 5,
  level: 12,
  levelFloor: 2000,
  levelCeiling: 3000,
};

export const badges: BadgeState[] = [
  {
    id: 'gold-coder',
    name: 'Gold Coder',
    icon: '⚡',
    description: 'Completed 10 lessons',
    earned: true,
    color: '#f59e0b',
  },
  {
    id: 'bug-hunter',
    name: 'Bug Hunter',
    icon: '🐛',
    description: 'Fixed 5 bugs in code review',
    earned: true,
    color: '#10b981',
  },
  {
    id: 'starter',
    name: 'Starter',
    icon: '🌱',
    description: 'Completed first lesson',
    earned: true,
    color: '#f97316',
  },
  {
    id: 'seven-day',
    name: '7-Day Streak',
    icon: '🔥',
    description: 'Code every day for a week',
    earned: false,
    color: '#ef4444',
  },
  {
    id: 'pythonista',
    name: 'Pythonista',
    icon: '🐍',
    description: 'Complete MonPy program',
    earned: false,
    color: '#10b981',
  },
  {
    id: 'ai-pioneer',
    name: 'AI Pioneer',
    icon: '🤖',
    description: 'Build your first ML model',
    earned: false,
    color: '#60a5fa',
  },
];

export const activeLessons: ActiveLesson[] = [
  {
    title: 'Weather Report Bot',
    courseId: 'python',
    program: 'monpy',
    programName: 'MonPy',
    chapter: 'Chapter 3/8',
    percent: 38,
    xp: 150,
  },
  {
    title: 'Portfolio Website',
    courseId: 'html',
    program: 'l-plus-plus',
    programName: 'I++',
    chapter: 'Chapter 1/5',
    percent: 20,
    xp: 100,
  },
];

export const completedLessons: CompletedLesson[] = [
  { title: 'Hello, Mongolia!', programName: 'MonPy', date: 'Aug 1', xp: 50 },
  { title: 'Mongolian Calculator', programName: 'MonPy', date: 'Aug 2', xp: 80 },
  { title: 'HTML Foundations', programName: 'I++', date: 'Jul 28', xp: 50 },
  { title: 'CSS Flexbox Challenge', programName: 'I++', date: 'Jul 25', xp: 70 },
  { title: 'Variables & Types', programName: 'MonPy', date: 'Jul 22', xp: 60 },
];

export const nextLessons: NextLesson[] = [
  {
    title: 'Control Flow in Python',
    courseId: 'python',
    exerciseSlug: 'if-statements',
    programName: 'MonPy',
    level: 'Beginner',
    xp: 70,
  },
  {
    title: 'Functions & Scope',
    courseId: 'python',
    exerciseSlug: 'defining-functions',
    programName: 'MonPy',
    level: 'Beginner',
    xp: 80,
  },
  {
    title: 'JavaScript DOM Basics',
    courseId: 'javascript',
    exerciseSlug: 'query-selector',
    programName: 'I++',
    level: 'Intermediate',
    xp: 90,
  },
];

/**
 * Daily activity as `YYYY-M-D` → intensity 0–4, the shape a GitHub-style
 * heatmap wants. Generated from a fixed seed so the grid is stable between
 * renders and identical on server and client.
 */
export function activityFor(year: number, month: number): Map<number, number> {
  const days = new Date(year, month + 1, 0).getDate();
  const map = new Map<number, number>();
  for (let day = 1; day <= days; day += 1) {
    // Deterministic pseudo-random: no Math.random, so SSR and client agree.
    const seed = (year * 37 + (month + 1) * 17 + day * 7) % 11;
    map.set(day, seed > 6 ? seed - 6 : 0);
  }
  return map;
}
