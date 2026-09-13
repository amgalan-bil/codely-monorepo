export const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;

export type Level = (typeof levels)[number];

/** `completed` unlocks a redo, `locked` needs earlier projects finished first. */
export type ProjectStatus = 'completed' | 'available' | 'locked';

export type Project = {
  id: string;
  title: string;
  description: string;
  level: Level;
  xp: number;
  tag: { label: string; tone: 'python' | 'web' };
  duration: string;
  status: ProjectStatus;
};

export type Track = {
  id: string;
  name: string;
  icon: string;
  /** Identity colour, defined as a token in global.css. */
  color: string;
  title: string;
  tagline: string;
  progress?: { done: number; total: number };
  projects: Project[];
};

export const tracks: Track[] = [
  {
    id: 'monpy',
    name: 'MonPy',
    icon: '🐍',
    color: 'var(--track-monpy)',
    title: 'MonPy Projects',
    tagline: 'Python from basics to data science',
    progress: { done: 18, total: 54 },
    projects: [
      {
        id: 'web-scraper',
        title: 'Build a Web Scraper',
        description:
          'Scrape data from websites using requests and BeautifulSoup. Parse HTML, extract data, and save to CSV.',
        level: 'Beginner',
        xp: 150,
        tag: { label: 'Python', tone: 'python' },
        duration: '2–3 hrs',
        status: 'completed',
      },
      {
        id: 'number-guessing-game',
        title: 'Number Guessing Game',
        description:
          'Create an interactive CLI game with loops, conditionals, and user input. Great first Python project.',
        level: 'Beginner',
        xp: 80,
        tag: { label: 'Python', tone: 'python' },
        duration: '1 hr',
        status: 'completed',
      },
      {
        id: 'image-classifier',
        title: 'Train an Image Classifier',
        description:
          'Use TensorFlow to build a convolutional neural network that classifies images with 90%+ accuracy.',
        level: 'Advanced',
        xp: 500,
        tag: { label: 'Python', tone: 'python' },
        duration: '6–8 hrs',
        status: 'available',
      },
      {
        id: 'portfolio-website',
        title: 'Portfolio Website',
        description:
          'Build a personal portfolio site with HTML, CSS, and vanilla JavaScript. Host it on GitHub Pages.',
        level: 'Beginner',
        xp: 120,
        tag: { label: 'HTML/CSS', tone: 'web' },
        duration: '3–4 hrs',
        status: 'available',
      },
      {
        id: 'data-dashboard',
        title: 'Data Dashboard',
        description:
          'Visualize data sets using matplotlib and pandas. Create bar charts, line plots, and scatter graphs.',
        level: 'Intermediate',
        xp: 320,
        tag: { label: 'Python', tone: 'python' },
        duration: '4–5 hrs',
        status: 'locked',
      },
      {
        id: 'discord-bot',
        title: 'Discord Bot',
        description:
          'Build a fully functional Discord bot using discord.py that responds to commands and polls.',
        level: 'Intermediate',
        xp: 280,
        tag: { label: 'Python', tone: 'python' },
        duration: '3–4 hrs',
        status: 'locked',
      },
      {
        id: 'flask-rest-api',
        title: 'Flask REST API',
        description:
          'Build a REST API with Flask and SQLAlchemy. Handle JSON payloads, routing, and database migrations.',
        level: 'Intermediate',
        xp: 380,
        tag: { label: 'Python', tone: 'python' },
        duration: '4–6 hrs',
        status: 'locked',
      },
      {
        id: 'stock-price-predictor',
        title: 'Stock Price Predictor',
        description:
          'Use pandas and scikit-learn to model historical market data and forecast closing prices.',
        level: 'Advanced',
        xp: 600,
        tag: { label: 'Python', tone: 'python' },
        duration: '8–10 hrs',
        status: 'locked',
      },
    ],
  },
  {
    id: 'she-can-code',
    name: 'She Can Code',
    icon: '👩‍💻',
    color: 'var(--track-she-can-code)',
    title: 'She Can Code Projects',
    tagline: 'Mentored builds for women entering tech',
    projects: [
      {
        id: 'first-landing-page',
        title: 'Your First Landing Page',
        description:
          'Ship a responsive landing page with semantic HTML and modern CSS layout. No frameworks needed.',
        level: 'Beginner',
        xp: 100,
        tag: { label: 'HTML/CSS', tone: 'web' },
        duration: '2–3 hrs',
        status: 'available',
      },
      {
        id: 'habit-tracker',
        title: 'Habit Tracker App',
        description:
          'Track daily habits with local storage, streak counters, and a calendar heat map view.',
        level: 'Intermediate',
        xp: 260,
        tag: { label: 'HTML/CSS', tone: 'web' },
        duration: '4–5 hrs',
        status: 'locked',
      },
      {
        id: 'mentor-matcher',
        title: 'Mentor Matcher',
        description:
          'Match mentees to mentors with a weighted scoring algorithm and a searchable directory.',
        level: 'Advanced',
        xp: 480,
        tag: { label: 'Python', tone: 'python' },
        duration: '6–7 hrs',
        status: 'locked',
      },
    ],
  },
  {
    id: 'cat-ai',
    name: 'Cat AI',
    icon: '🤖',
    color: 'var(--track-cat-ai)',
    title: 'Cat AI Projects',
    tagline: 'Applied machine learning, one model at a time',
    projects: [
      {
        id: 'sentiment-analyzer',
        title: 'Sentiment Analyzer',
        description:
          'Classify text as positive or negative using scikit-learn and a bag-of-words pipeline.',
        level: 'Intermediate',
        xp: 300,
        tag: { label: 'Python', tone: 'python' },
        duration: '3–4 hrs',
        status: 'available',
      },
      {
        id: 'rag-chatbot',
        title: 'RAG Chatbot',
        description:
          'Ground an LLM in your own documents with embeddings, a vector store, and retrieval.',
        level: 'Advanced',
        xp: 550,
        tag: { label: 'Python', tone: 'python' },
        duration: '7–9 hrs',
        status: 'locked',
      },
    ],
  },
  {
    id: 'l-plus-plus',
    name: 'I++',
    icon: '⚡',
    color: 'var(--track-lpp)',
    title: 'I++ Projects',
    tagline: 'Algorithms, data structures and problem solving',
    progress: { done: 5, total: 54 },
    projects: [
      {
        id: 'sorting-visualizer',
        title: 'Sorting Visualizer',
        description:
          'Animate bubble, merge, and quick sort side by side to compare how each one behaves.',
        level: 'Beginner',
        xp: 140,
        tag: { label: 'HTML/CSS', tone: 'web' },
        duration: '2–3 hrs',
        status: 'completed',
      },
      {
        id: 'pathfinding-maze',
        title: 'Pathfinding Maze',
        description:
          'Implement BFS, Dijkstra, and A* on a grid and watch each algorithm search for the exit.',
        level: 'Intermediate',
        xp: 340,
        tag: { label: 'Python', tone: 'python' },
        duration: '4–5 hrs',
        status: 'available',
      },
    ],
  },
  {
    id: 'arduino',
    name: 'Arduino',
    icon: '⚙️',
    color: 'var(--track-arduino)',
    title: 'Arduino Projects',
    tagline: 'Physical computing with sensors and circuits',
    projects: [
      {
        id: 'led-traffic-light',
        title: 'LED Traffic Light',
        description:
          'Wire three LEDs to an Arduino and drive a timed traffic light sequence in the loop.',
        level: 'Beginner',
        xp: 90,
        tag: { label: 'Python', tone: 'python' },
        duration: '1–2 hrs',
        status: 'available',
      },
      {
        id: 'weather-station',
        title: 'Weather Station',
        description:
          'Read temperature and humidity from a DHT22 sensor and log readings to an SD card.',
        level: 'Intermediate',
        xp: 310,
        tag: { label: 'Python', tone: 'python' },
        duration: '4–5 hrs',
        status: 'locked',
      },
    ],
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '🛠️',
    color: 'var(--track-cpp)',
    title: 'C++ Projects',
    tagline: 'Systems programming from the ground up',
    projects: [
      {
        id: 'text-adventure',
        title: 'Text Adventure Engine',
        description:
          'Model rooms, items, and commands with classes to build a playable text adventure.',
        level: 'Beginner',
        xp: 160,
        tag: { label: 'Python', tone: 'python' },
        duration: '3–4 hrs',
        status: 'available',
      },
      {
        id: 'memory-allocator',
        title: 'Custom Memory Allocator',
        description:
          'Write a pool allocator with free lists and benchmark it against the system malloc.',
        level: 'Advanced',
        xp: 620,
        tag: { label: 'Python', tone: 'python' },
        duration: '8–10 hrs',
        status: 'locked',
      },
    ],
  },
];
