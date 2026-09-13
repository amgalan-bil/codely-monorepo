/**
 * The six tracks Codely teaches: four programs and two workshops.
 *
 * `color` points at a `--track-*` token in global.css rather than carrying a
 * hex value, so re-toning the palette is a one-file change. Order here is the
 * order they appear everywhere on the site.
 */

export type ProgramLevel = 'Beginner' | 'Beginner+' | 'Intermediate' | 'Advanced';

export type CurriculumModule = {
  title: string;
  summary: string;
  lessons: number;
};

export type GalleryStop = {
  label: string;
  description: string;
  image: string;
};

export type Program = {
  slug: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  description: string;
  /** Longer copy for the program's own page hero. */
  overview: string;
  level: ProgramLevel;
  duration: string;
  projects: number;
  languages: string[];
  enrolled: number;
  skills: string[];
  unique: string[];
  curriculum: CurriculumModule[];
  heroImage: string;
  /** Present only on tracks that have photography to show. */
  gallery?: GalleryStop[];
};

export const programs: Program[] = [
  {
    slug: 'she-can-code',
    name: 'She Can Code',
    icon: '👩‍💻',
    color: 'var(--track-she-can-code)',
    tagline: 'Where women begin their tech story.',
    description:
      'A welcoming, community-first program designed to give women the confidence and skills to start their coding journey. No prior experience required — just curiosity.',
    overview:
      'A comprehensive 12-week program designed specifically for women entering the tech industry. From web fundamentals to career readiness, She Can Code equips you with the skills and confidence to launch your tech career.',
    level: 'Beginner',
    duration: '12 weeks',
    projects: 8,
    languages: ['HTML', 'CSS', 'JavaScript', 'React', 'C++'],
    enrolled: 2400,
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Git',
      'Responsive Design',
      'Portfolio Building',
    ],
    unique: [
      'Women-only cohorts for a supportive environment',
      "Female mentor network across Mongolia's tech sector",
      'Career placement support with 85% job placement rate',
      'Scholarship opportunities available',
    ],
    curriculum: [
      {
        title: 'Digital Literacy & Mindset',
        summary: 'Computing basics, internet, how software works',
        lessons: 5,
      },
      {
        title: 'HTML & Web Structure',
        summary: 'Semantic HTML, document structure, forms',
        lessons: 8,
      },
      {
        title: 'CSS & Styling',
        summary: 'Layouts, Flexbox, Grid, responsive design',
        lessons: 10,
      },
      {
        title: 'JavaScript Fundamentals',
        summary: 'Variables, functions, DOM manipulation',
        lessons: 12,
      },
      {
        title: 'React Basics',
        summary: 'Components, props, state management',
        lessons: 8,
      },
      {
        title: 'Career Readiness',
        summary: 'Portfolio, resume, interview prep',
        lessons: 6,
      },
    ],
    heroImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70',
    gallery: [
      {
        label: 'Programming',
        description:
          'Hands-on coding sessions where students build real projects together, guided by experienced instructors.',
        image:
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1100&q=70',
      },
      {
        label: 'Office Tour',
        description:
          'Visits to partner studios and product teams in Ulaanbaatar, so the job you are training for stops being abstract.',
        image:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1100&q=70',
      },
      {
        label: 'Guest Speakers',
        description:
          'Engineers, founders and designers from across the Mongolian tech sector share what the work actually looks like.',
        image:
          'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1100&q=70',
      },
      {
        label: 'Sisterhood Community',
        description:
          'A cohort that stays in touch long after graduation — review partners, referrals, and people who answer at 1am.',
        image:
          'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1100&q=70',
      },
      {
        label: 'Demo Day',
        description:
          'Every cohort closes by shipping in front of a room of mentors, hiring partners and the next cohort.',
        image:
          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1100&q=70',
      },
    ],
  },
  {
    slug: 'monpy',
    name: 'MonPy',
    icon: '🐍',
    color: 'var(--track-monpy)',
    tagline: 'Master Python, one monster project at a time.',
    description:
      "MonPy takes you from Python novice to confident scripting practitioner. You'll build real tools — web scrapers, data analyzers, automation bots — and actually understand why they work.",
    overview:
      'MonPy is a 12-week Python program built around shipping. Every module ends with a tool you can run, read and explain — scrapers, analyzers, bots and small services — so the language sticks because you used it, not because you memorised it.',
    level: 'Beginner+',
    duration: '12 weeks',
    projects: 10,
    languages: ['Python'],
    enrolled: 3100,
    skills: [
      'Python',
      'Requests',
      'BeautifulSoup',
      'pandas',
      'Flask',
      'SQLite',
      'Automation',
    ],
    unique: [
      'Project-first curriculum — every module ships a runnable tool',
      'Weekly code review with a working Python engineer',
      'Mongolian-language explanations for every core concept',
      'Direct path into the Cat AI program on graduation',
    ],
    curriculum: [
      {
        title: 'Python Foundations',
        summary: 'Syntax, types, control flow, functions',
        lessons: 9,
      },
      {
        title: 'Data Structures',
        summary: 'Lists, dicts, sets, comprehensions',
        lessons: 8,
      },
      {
        title: 'Files & The Web',
        summary: 'File I/O, JSON, HTTP, requests',
        lessons: 7,
      },
      {
        title: 'Scraping & Automation',
        summary: 'BeautifulSoup, schedulers, bots',
        lessons: 8,
      },
      {
        title: 'Data Analysis',
        summary: 'pandas, matplotlib, real datasets',
        lessons: 10,
      },
      {
        title: 'Shipping Python',
        summary: 'Flask APIs, packaging, deployment',
        lessons: 7,
      },
    ],
    heroImage:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=70',
  },
  {
    slug: 'cat-ai',
    name: 'Cat AI',
    icon: '🤖',
    color: 'var(--track-cat-ai)',
    tagline: 'Feed your curiosity. Build intelligent things.',
    description:
      'Cat AI is your launchpad into machine learning and artificial intelligence. Go from neural network theory to building your first real AI model in Python with scikit-learn and TensorFlow.',
    overview:
      'Cat AI is a 14-week applied machine learning program. You start from linear models and finish having trained, evaluated and deployed a model on a Mongolian dataset you chose yourself.',
    level: 'Intermediate',
    duration: '14 weeks',
    projects: 7,
    languages: ['Python', 'AI Modeling'],
    enrolled: 1800,
    skills: [
      'Python',
      'NumPy',
      'scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Model Evaluation',
      'MLOps Basics',
    ],
    unique: [
      'Train on Mongolian-language datasets, not just English benchmarks',
      'Free GPU compute credits for every enrolled student',
      'Capstone reviewed by practising ML engineers',
      'Research reading group runs alongside the course',
    ],
    curriculum: [
      {
        title: 'Math You Actually Need',
        summary: 'Vectors, matrices, gradients, probability',
        lessons: 8,
      },
      {
        title: 'Classical ML',
        summary: 'Regression, trees, clustering, evaluation',
        lessons: 10,
      },
      {
        title: 'Neural Networks',
        summary: 'Perceptrons, backprop, activation functions',
        lessons: 9,
      },
      {
        title: 'Computer Vision',
        summary: 'CNNs, augmentation, transfer learning',
        lessons: 8,
      },
      {
        title: 'Language & Sequences',
        summary: 'Embeddings, RNNs, transformers, fine-tuning',
        lessons: 9,
      },
      {
        title: 'Shipping a Model',
        summary: 'Serving, monitoring, capstone project',
        lessons: 6,
      },
    ],
    heroImage:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=70',
  },
  {
    slug: 'cpp-workshop',
    name: 'C++ Workshop',
    icon: '🛠️',
    color: 'var(--track-cpp)',
    tagline: 'Power, performance, and a little danger.',
    description:
      'C++ powers game engines, browsers, and financial systems. This workshop covers modern C++ (C++17/20) — from classes and templates to memory management and performance tuning.',
    overview:
      'A 12-week workshop on modern C++. You will write code that manages its own memory, measure what it costs, and learn why the language makes the trade-offs it does.',
    level: 'Advanced',
    duration: '12 weeks',
    projects: 6,
    languages: ['C++'],
    enrolled: 760,
    skills: [
      'C++17/20',
      'RAII',
      'Templates',
      'STL',
      'Move Semantics',
      'Profiling',
      'CMake',
    ],
    unique: [
      'Every exercise is benchmarked, not just compiled',
      'Modern C++ only — no 1998 habits taught by accident',
      'Pair-programming format with rotating partners',
      'Open-source contribution week to close the workshop',
    ],
    curriculum: [
      {
        title: 'Modern Foundations',
        summary: 'Types, references, auto, ranges',
        lessons: 7,
      },
      {
        title: 'Memory & RAII',
        summary: 'Stack, heap, smart pointers, ownership',
        lessons: 8,
      },
      {
        title: 'Classes & Polymorphism',
        summary: 'Constructors, virtuals, rule of five',
        lessons: 8,
      },
      {
        title: 'Templates & The STL',
        summary: 'Generics, containers, algorithms, concepts',
        lessons: 9,
      },
      {
        title: 'Performance',
        summary: 'Move semantics, cache behaviour, profiling',
        lessons: 7,
      },
      {
        title: 'Build & Ship',
        summary: 'CMake, testing, sanitizers, packaging',
        lessons: 5,
      },
    ],
    heroImage:
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=1200&q=70',
  },
  {
    slug: 'arduino-workshop',
    name: 'Arduino Workshop',
    icon: '⚙️',
    color: 'var(--track-arduino)',
    tagline: 'Code meets the physical world.',
    description:
      'The Arduino Workshop bridges software and hardware. You’ll wire up sensors, control motors, read input, and write C code that directly talks to the physical world. No experience needed.',
    overview:
      'An 8-week hands-on hardware workshop. Every student gets a kit, and every week ends with something on the bench that blinks, moves, measures or reports.',
    level: 'Beginner',
    duration: '8 weeks',
    projects: 5,
    languages: ['Arduino C'],
    enrolled: 980,
    skills: [
      'Arduino C',
      'Breadboarding',
      'Sensors',
      'Motors & PWM',
      'Serial I/O',
      'IoT Basics',
    ],
    unique: [
      'Hardware kit included with enrolment — yours to keep',
      'Lab bench access at the Ulaanbaatar campus',
      'Projects designed around Mongolian winter conditions',
      'Ends with a working IoT device you built end to end',
    ],
    curriculum: [
      {
        title: 'Circuits 101',
        summary: 'Voltage, current, breadboards, LEDs',
        lessons: 5,
      },
      {
        title: 'Arduino C',
        summary: 'setup/loop, pins, timing, serial',
        lessons: 6,
      },
      {
        title: 'Reading the World',
        summary: 'Analog input, temperature, light, motion',
        lessons: 6,
      },
      {
        title: 'Driving Things',
        summary: 'PWM, servos, motors, relays',
        lessons: 6,
      },
      {
        title: 'Connected Devices',
        summary: 'Wi-Fi, MQTT, dashboards, alerts',
        lessons: 6,
      },
    ],
    heroImage:
      'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1200&q=70',
  },
  {
    slug: 'l-plus-plus',
    name: 'I++',
    icon: '⚡',
    color: 'var(--track-lpp)',
    tagline: 'C for those who want to understand the machine.',
    description:
      'I++ strips away abstraction and teaches you C — the language at the heart of operating systems, embedded systems, and performance-critical software. Think in bits, write lean code.',
    overview:
      'A 10-week systems programming program. Pointers, memory layout and the C standard library, taught by writing the tools you normally take for granted.',
    level: 'Intermediate',
    duration: '10 weeks',
    projects: 6,
    languages: ['C++'],
    enrolled: 1200,
    skills: [
      'C',
      'Pointers',
      'Memory Layout',
      'Data Structures',
      'Makefiles',
      'Debugging',
      'Systems Calls',
    ],
    unique: [
      'Write your own malloc, shell and string library',
      'Debugger-first teaching — gdb from week one',
      'Weekly algorithm clinic with competitive programmers',
      'Feeds directly into the C++ Workshop',
    ],
    curriculum: [
      {
        title: 'C Fundamentals',
        summary: 'Types, control flow, functions, headers',
        lessons: 7,
      },
      {
        title: 'Pointers & Memory',
        summary: 'Addresses, arrays, malloc/free, leaks',
        lessons: 9,
      },
      {
        title: 'Data Structures by Hand',
        summary: 'Linked lists, stacks, trees, hash maps',
        lessons: 9,
      },
      {
        title: 'The Standard Library',
        summary: 'strings, files, errno, formatted I/O',
        lessons: 6,
      },
      {
        title: 'Talking to the OS',
        summary: 'Processes, syscalls, pipes, signals',
        lessons: 7,
      },
      {
        title: 'Tooling & Debugging',
        summary: 'make, gdb, valgrind, sanitizers',
        lessons: 5,
      },
    ],
    heroImage:
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=70',
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}

/** Compact lookup for badges and pills that only need a name and a colour. */
export const programColors: Record<string, string> = Object.fromEntries(
  programs.map((program) => [program.slug, program.color]),
);
