/**
 * Language courses behind the Academy.
 *
 * Academy project cards are grouped by program, but every card teaches a
 * language — so the card links through to that language's course, and the
 * course is where chapters, exercises and the editor live.
 */

export type Exercise = {
  slug: string;
  title: string;
  xp: number;
};

export type Chapter = {
  title: string;
  exercises: Exercise[];
};

export type CheatSheetEntry = {
  label: string;
  code: string;
};

export type Course = {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Drives the hero wash, CTA and accent throughout the course. */
  color: string;
  emoji: string;
  filename: string;
  starter: string;
  description: string;
  hours: string;
  learners: number;
  heroImage: string;
  chapters: Chapter[];
  cheatSheet: CheatSheetEntry[];
  /** Bullet list rendered inside every exercise body. */
  usedFor: string[];
};

function ex(title: string, xp = 34): Exercise {
  return { slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), title, xp };
}

export const courses: Course[] = [
  {
    id: 'html',
    name: 'HTML',
    level: 'Beginner',
    color: '#f97316',
    emoji: '🌐',
    filename: 'index.html',
    starter: '<!-- Write code below 💗 -->\n',
    description:
      'Build the skeleton of every web page. Learn semantic markup, forms, media, accessibility, and modern HTML5 elements from scratch.',
    hours: '~4 hours',
    learners: 6400,
    heroImage:
      'https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=1600&q=70',
    usedFor: [
      'Web page structure',
      'Forms and user input',
      'Accessibility (a11y)',
      'Email templates',
      'And more!',
    ],
    chapters: [
      {
        title: 'Getting Started',
        exercises: [
          ex('What Is HTML'),
          ex('Your First Element'),
          ex('Headings'),
          ex('Paragraphs'),
          ex('Comments'),
        ],
      },
      {
        title: 'Text & Links',
        exercises: [ex('Bold and Italic'), ex('Lists'), ex('Anchors'), ex('Attributes')],
      },
      {
        title: 'Images & Media',
        exercises: [ex('The Img Tag'), ex('Alt Text'), ex('Audio and Video')],
      },
      {
        title: 'Forms & Inputs',
        exercises: [ex('The Form Tag'), ex('Text Inputs'), ex('Buttons'), ex('Labels')],
      },
      {
        title: 'Semantic HTML',
        exercises: [ex('Header and Footer'), ex('Section and Article'), ex('Landmarks')],
      },
    ],
    cheatSheet: [
      { label: 'Heading', code: '<h1>–<h6>' },
      { label: 'Paragraph', code: '<p>' },
      { label: 'Link', code: '<a href="url">' },
      { label: 'Image', code: '<img src="url" alt="">' },
    ],
  },
  {
    id: 'css',
    name: 'CSS',
    level: 'Beginner',
    color: '#38bdf8',
    emoji: '🎨',
    filename: 'style.css',
    starter: '/* Write code below 💗 */\n',
    description:
      'Style everything. Colors, typography, the box model, Flexbox, Grid and responsive layouts that hold up on any screen.',
    hours: '~5 hours',
    learners: 5200,
    heroImage:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=1600&q=70',
    usedFor: [
      'Layout and spacing',
      'Typography and color',
      'Responsive design',
      'Animation',
      'And more!',
    ],
    chapters: [
      {
        title: 'Selectors & Values',
        exercises: [ex('What Is CSS'), ex('Selectors'), ex('Colors'), ex('Units')],
      },
      {
        title: 'The Box Model',
        exercises: [ex('Margin and Padding'), ex('Borders'), ex('Box Sizing')],
      },
      {
        title: 'Flexbox',
        exercises: [ex('Flex Container'), ex('Justify and Align'), ex('Flex Items')],
      },
      {
        title: 'Grid',
        exercises: [ex('Grid Template'), ex('Gaps and Areas'), ex('Auto Fit')],
      },
      {
        title: 'Responsive & Motion',
        exercises: [ex('Media Queries'), ex('Transitions'), ex('Keyframes')],
      },
    ],
    cheatSheet: [
      { label: 'Class selector', code: '.card { }' },
      { label: 'Flex row', code: 'display: flex;' },
      { label: 'Grid columns', code: 'grid-template-columns' },
      { label: 'Breakpoint', code: '@media (min-width: 48rem)' },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    level: 'Beginner',
    color: '#facc15',
    emoji: '✨',
    filename: 'script.js',
    starter: '// Write code below 💗\n',
    description:
      'Make pages do things. Variables, functions, the DOM, events, async/await and the patterns real front-end code is built from.',
    hours: '~7 hours',
    learners: 5900,
    heroImage:
      'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1600&q=70',
    usedFor: [
      'Interactive interfaces',
      'Fetching data from APIs',
      'Browser automation',
      'Back-end services (Node)',
      'And more!',
    ],
    chapters: [
      {
        title: 'Language Basics',
        exercises: [ex('What Is JavaScript'), ex('Variables'), ex('Types'), ex('Operators')],
      },
      {
        title: 'Control Flow',
        exercises: [ex('If and Else'), ex('Loops'), ex('Functions')],
      },
      {
        title: 'Collections',
        exercises: [ex('Arrays'), ex('Objects'), ex('Map and Filter')],
      },
      {
        title: 'The DOM',
        exercises: [ex('Query Selector'), ex('Events'), ex('Changing the Page')],
      },
      {
        title: 'Async JavaScript',
        exercises: [ex('Promises'), ex('Async Await'), ex('Fetch')],
      },
    ],
    cheatSheet: [
      { label: 'Declare', code: 'const x = 1;' },
      { label: 'Function', code: '() => { }' },
      { label: 'Select node', code: 'document.querySelector()' },
      { label: 'Fetch', code: 'await fetch(url)' },
    ],
  },
  {
    id: 'react',
    name: 'React',
    level: 'Intermediate',
    color: '#22d3ee',
    emoji: '⚛️',
    filename: 'App.jsx',
    starter: '// Write code below 💗\n',
    description:
      'Build component-driven interfaces. JSX, props, state, effects, and the composition patterns behind modern web apps.',
    hours: '~8 hours',
    learners: 3800,
    heroImage:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=70',
    usedFor: [
      'Single-page applications',
      'Design systems',
      'Dashboards',
      'React Native apps',
      'And more!',
    ],
    chapters: [
      {
        title: 'Components',
        exercises: [ex('What Is React'), ex('JSX'), ex('Your First Component'), ex('Props')],
      },
      {
        title: 'State',
        exercises: [ex('useState'), ex('Events'), ex('Lists and Keys')],
      },
      {
        title: 'Effects',
        exercises: [ex('useEffect'), ex('Data Fetching'), ex('Cleanup')],
      },
      {
        title: 'Composition',
        exercises: [ex('Lifting State'), ex('Context'), ex('Custom Hooks')],
      },
    ],
    cheatSheet: [
      { label: 'Component', code: 'function App() { }' },
      { label: 'State', code: 'const [n, setN] = useState(0)' },
      { label: 'Effect', code: 'useEffect(fn, [deps])' },
      { label: 'Render list', code: 'items.map((i) => <li key=…>)' },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    level: 'Beginner',
    color: '#10b981',
    emoji: '🐍',
    filename: 'script.py',
    starter: '# Write code below 💗\n',
    description:
      'The language behind data science, automation and AI. Start from print statements and finish writing programs that do real work.',
    hours: '~6 hours',
    learners: 8100,
    heroImage:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1600&q=70',
    usedFor: [
      'Data analysis & visualization',
      'Artificial intelligence (AI)',
      'Machine learning (ML)',
      'Web development',
      'And more!',
    ],
    chapters: [
      {
        title: 'Getting Started',
        exercises: [ex('What Is Python'), ex('Print'), ex('Comments'), ex('Errors')],
      },
      {
        title: 'Variables & Types',
        exercises: [ex('Variables'), ex('Strings'), ex('Numbers'), ex('Booleans')],
      },
      {
        title: 'Control Flow',
        exercises: [ex('If Statements'), ex('For Loops'), ex('While Loops')],
      },
      {
        title: 'Collections',
        exercises: [ex('Lists'), ex('Dictionaries'), ex('Comprehensions')],
      },
      {
        title: 'Functions & Files',
        exercises: [ex('Defining Functions'), ex('Arguments'), ex('Reading Files')],
      },
    ],
    cheatSheet: [
      { label: 'Print', code: 'print("hi")' },
      { label: 'Variable', code: 'name = "Codely"' },
      { label: 'Loop', code: 'for i in range(5):' },
      { label: 'Function', code: 'def greet(name):' },
    ],
  },
  {
    id: 'cpp',
    name: 'C++',
    level: 'Advanced',
    color: '#f59e0b',
    emoji: '⚙️',
    filename: 'main.cpp',
    starter: '// Write code below 💗\n',
    description:
      'Systems-level programming with modern C++. Memory, ownership, templates and the performance work the language exists for.',
    hours: '~9 hours',
    learners: 2100,
    heroImage:
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=1600&q=70',
    usedFor: [
      'Game engines',
      'Browsers and operating systems',
      'High-frequency trading',
      'Embedded systems',
      'And more!',
    ],
    chapters: [
      {
        title: 'Foundations',
        exercises: [ex('Hello C Plus Plus'), ex('Types'), ex('References'), ex('Auto')],
      },
      {
        title: 'Memory',
        exercises: [ex('Stack and Heap'), ex('Smart Pointers'), ex('RAII')],
      },
      {
        title: 'Classes',
        exercises: [ex('Constructors'), ex('Rule of Five'), ex('Virtual Functions')],
      },
      {
        title: 'Templates & STL',
        exercises: [ex('Function Templates'), ex('Containers'), ex('Algorithms')],
      },
    ],
    cheatSheet: [
      { label: 'Include', code: '#include <iostream>' },
      { label: 'Print', code: 'std::cout << x;' },
      { label: 'Vector', code: 'std::vector<int> v;' },
      { label: 'Smart pointer', code: 'std::make_unique<T>()' },
    ],
  },
  {
    id: 'arduino',
    name: 'Arduino',
    level: 'Beginner',
    color: '#06b6d4',
    emoji: '🔌',
    filename: 'sketch.ino',
    starter: '// Write code below 💗\n',
    description:
      'Write C that moves things. Pins, sensors, motors and serial communication on real hardware you can hold.',
    hours: '~4 hours',
    learners: 1600,
    heroImage:
      'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1600&q=70',
    usedFor: [
      'Sensors and data logging',
      'Robotics',
      'Home automation',
      'IoT devices',
      'And more!',
    ],
    chapters: [
      {
        title: 'First Sketch',
        exercises: [ex('What Is Arduino'), ex('Setup and Loop'), ex('Blink')],
      },
      {
        title: 'Input',
        exercises: [ex('Digital Read'), ex('Analog Read'), ex('Serial Monitor')],
      },
      {
        title: 'Output',
        exercises: [ex('PWM'), ex('Servos'), ex('Motors')],
      },
      {
        title: 'Connected',
        exercises: [ex('Wi-Fi'), ex('Sending Data'), ex('Alerts')],
      },
    ],
    cheatSheet: [
      { label: 'Setup', code: 'void setup() { }' },
      { label: 'Loop', code: 'void loop() { }' },
      { label: 'Pin mode', code: 'pinMode(13, OUTPUT);' },
      { label: 'Write', code: 'digitalWrite(13, HIGH);' },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function courseTotals(course: Course): { exercises: number; xp: number } {
  const all = course.chapters.flatMap((chapter) => chapter.exercises);
  return {
    exercises: all.length,
    xp: all.reduce((sum, exercise) => sum + exercise.xp, 0),
  };
}

/** Flat exercise list, used for Back/Next in the workspace. */
export function courseExercises(course: Course): Exercise[] {
  return course.chapters.flatMap((chapter) => chapter.exercises);
}

/** Academy project cards carry a language label; this maps it to a course. */
export const languageToCourse: Record<string, string> = {
  Python: 'python',
  'HTML/CSS': 'html',
  HTML: 'html',
  CSS: 'css',
  JavaScript: 'javascript',
  React: 'react',
  'C++': 'cpp',
  'Arduino C': 'arduino',
  Arduino: 'arduino',
};
