export type TeamMember = {
  name: string;
  role: string;
  color: string;
  photo: string;
  bio: string;
};

export const team: TeamMember[] = [
  {
    name: 'Nomindari Gantulga',
    role: 'CEO & Founder',
    color: 'var(--track-lpp)',
    photo:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=70',
    bio: 'Founded Codely in 2021 after a decade building products in Ulaanbaatar and Seoul.',
  },
  {
    name: 'Battulga Erdene',
    role: 'CTO & Lead Instructor',
    color: 'var(--track-monpy)',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=70',
    bio: 'Backend engineer turned educator. Writes the curriculum that every program builds on.',
  },
  {
    name: 'Enkhjargal Munkhbat',
    role: 'Head of Programs',
    color: 'var(--track-she-can-code)',
    photo:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=70',
    bio: 'Runs She Can Code and the mentor network across the Mongolian tech sector.',
  },
  {
    name: 'Tserenpuntsag Bat',
    role: 'Full-Stack Instructor',
    color: 'var(--track-cpp)',
    photo:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=70',
    bio: 'Teaches the web track end to end, from semantic HTML through React and deployment.',
  },
  {
    name: 'Ankhtsetseg Davaasuren',
    role: 'AI/ML Instructor',
    color: 'var(--track-cat-ai)',
    photo:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=70',
    bio: 'Leads Cat AI. Published on Mongolian-language NLP and handwriting recognition.',
  },
  {
    name: 'Gantulga Byambaa',
    role: 'Hardware & IoT Instructor',
    color: 'var(--track-arduino)',
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=70',
    bio: 'Runs the Arduino Workshop and the campus lab bench. Builds things that survive winter.',
  },
];

export const milestones = [
  { year: '2021', text: 'Codely founded with first She Can Code cohort of 20 students.' },
  { year: '2022', text: 'MonPy and I++ programs launched. Partnership with 3 Mongolian tech companies.' },
  { year: '2023', text: 'Cat AI program launches. 1,000th student graduates. First dedicated campus in UB.' },
  { year: '2024', text: 'Arduino & C++ workshops added. 4,460+ students trained. EN/MN bilingual platform launched.' },
];

export const mission = [
  { icon: '🎯', text: 'Make coding education accessible to every Mongolian regardless of background.' },
  { icon: '🌐', text: 'Deliver curriculum in both Mongolian and English to remove language barriers.' },
  { icon: '💼', text: 'Connect graduates with local and international employment opportunities.' },
  { icon: '♀', text: "Champion gender diversity in Mongolia's tech sector through She Can Code." },
];
