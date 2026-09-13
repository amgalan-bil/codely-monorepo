/** Seed content for the community feed, leaderboard, showcase and challenge. */

export type Author = {
  name: string;
  initials: string;
  program: string;
};

export type Post = {
  id: string;
  author: Author;
  time: string;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  comments: number;
  pinned?: boolean;
};

export type ShowcaseProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  author: Author;
  time: string;
  likes: number;
  comments: number;
};

export type LeaderRow = {
  rank: number;
  name: string;
  initials: string;
  program: string;
  xp: number;
  streak: number;
  badges: number;
};

export const posts: Post[] = [
  {
    id: 'weather-bot',
    author: { name: 'Tulgaa M.', initials: 'TM', program: 'monpy' },
    time: '3 hrs ago',
    title: 'Just shipped my Weather Bot!',
    body: "Finished the Weather Bot project and it actually works! 🎉 Pulling live data for Ulaanbaatar — -12°C right now 🥶 The requests library is SO much simpler than I expected.",
    tags: ['#Python', '#API'],
    likes: 34,
    comments: 8,
  },
  {
    id: 'first-interview',
    author: { name: 'Nomin B.', initials: 'NB', program: 'she-can-code' },
    time: '6 hrs ago',
    title: 'First tech interview next week 😱',
    body: "Got my first technical interview next week with a company in UB! She Can Code's career module prepared me well. Anyone have tips for live coding rounds?",
    tags: ['#Career', '#Interview'],
    likes: 52,
    comments: 15,
    pinned: true,
  },
  {
    id: 'handwriting',
    author: { name: 'Khurelbaatar E.', initials: 'KE', program: 'cat-ai' },
    time: '1 day ago',
    title: 'Mongolian Handwriting Recognition — 91% accuracy',
    body: 'Cat AI capstone done — CNN + transfer learning from ResNet. 3 hrs training on free Colab GPU. Happy to share the notebook and paper draft!',
    tags: ['#PyTorch', '#CNN', '#ML'],
    likes: 87,
    comments: 22,
  },
  {
    id: 'malloc',
    author: { name: 'Munkh-Erdene G.', initials: 'MG', program: 'l-plus-plus' },
    time: '2 days ago',
    title: 'Wrote my own malloc this week',
    body: 'I++ week 6 had us implement a pool allocator with a free list. Benchmarked it against system malloc and it wins on small fixed-size blocks. Pointers finally clicked.',
    tags: ['#C', '#Memory'],
    likes: 61,
    comments: 12,
  },
  {
    id: 'air-monitor',
    author: { name: 'Gantulga B.', initials: 'GB', program: 'arduino-workshop' },
    time: '3 days ago',
    title: 'Air quality monitor survived -30°C',
    body: 'Left the ger air monitor running through the cold snap. DHT22 held up, the ESP32 kept reporting. Telegram alerts fired every time CO₂ crossed 1200ppm.',
    tags: ['#Arduino', '#IoT', '#Sensors'],
    likes: 44,
    comments: 9,
  },
];

export const showcase: ShowcaseProject[] = [
  {
    id: 'flight-tracker',
    title: 'MonUB Flight Tracker',
    description:
      'Real-time tracking of MIAT flights using Python + Pandas + Plotly. Fetches live data and renders interactive map dashboards.',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=70',
    tags: ['#Python', '#Pandas', '#API'],
    author: { name: 'Enkhjin T.', initials: 'ET', program: 'monpy' },
    time: '2 days ago',
    likes: 142,
    comments: 23,
  },
  {
    id: 'gobishop',
    title: 'GobiShop E-Commerce',
    description:
      'Full-stack Mongolian artisan marketplace with Next.js, Stripe payments, and PostgreSQL. Features traditional crafts and seller dashboards.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=70',
    tags: ['#Next.js', '#Stripe', '#PostgreSQL'],
    author: { name: 'Oyunbileg M.', initials: 'OM', program: 'she-can-code' },
    time: '5 days ago',
    likes: 98,
    comments: 17,
  },
  {
    id: 'ger-air',
    title: 'Smart Ger Air Monitor',
    description:
      'Arduino-based indoor air quality monitor for traditional gers. Measures CO₂, temperature, humidity and sends Telegram alerts.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=70',
    tags: ['#Arduino', '#IoT', '#Sensors'],
    author: { name: 'Gantulga B.', initials: 'GB', program: 'arduino-workshop' },
    time: '1 week ago',
    likes: 214,
    comments: 31,
  },
  {
    id: 'tuvan-music',
    title: 'ML Tuvan Music Classifier',
    description:
      'CNN-based classifier that identifies Mongolian music genres with 94% accuracy. Transfer learning from a pre-trained audio model.',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=70',
    tags: ['#PyTorch', '#CNN', '#Audio'],
    author: { name: 'Ankhtsetseg D.', initials: 'AD', program: 'cat-ai' },
    time: '1 week ago',
    likes: 189,
    comments: 28,
  },
  {
    id: 'tugrik-budget',
    title: 'Tögrög Budget Tracker',
    description:
      'A personal finance tracker built with React and Chart.js. Supports MNT currency, MNB exchange rates, and spending categories.',
    image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=70',
    tags: ['#React', '#Chart.js', '#Finance'],
    author: { name: 'Solongo N.', initials: 'SN', program: 'she-can-code' },
    time: '2 weeks ago',
    likes: 76,
    comments: 12,
  },
  {
    id: 'ub-traffic',
    title: 'UB Traffic Simulator',
    description:
      'Simulation of Ulaanbaatar traffic flow using Python + NetworkX. Models peak-hour congestion on major intersections.',
    image:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=70',
    tags: ['#Python', '#NetworkX', '#Simulation'],
    author: { name: 'Tulgaa M.', initials: 'TM', program: 'monpy' },
    time: '2 weeks ago',
    likes: 63,
    comments: 9,
  },
];

export const leaderboard: LeaderRow[] = [
  { rank: 1, name: 'Enkhjin T.', initials: 'ET', program: 'monpy', xp: 8400, streak: 24, badges: 12 },
  { rank: 2, name: 'Oyunbileg M.', initials: 'OM', program: 'l-plus-plus', xp: 7300, streak: 18, badges: 9 },
  { rank: 3, name: 'Ankhtsetseg D.', initials: 'AD', program: 'cat-ai', xp: 6900, streak: 15, badges: 8 },
  { rank: 4, name: 'Solongo N.', initials: 'SN', program: 'she-can-code', xp: 5600, streak: 12, badges: 7 },
  { rank: 5, name: 'Gantulga B.', initials: 'GB', program: 'arduino-workshop', xp: 5200, streak: 10, badges: 6 },
  { rank: 6, name: 'Tulgaa M.', initials: 'TM', program: 'monpy', xp: 4900, streak: 8, badges: 5 },
  { rank: 7, name: 'Bayarjargal S.', initials: 'BS', program: 'cpp-workshop', xp: 4200, streak: 7, badges: 4 },
  { rank: 8, name: 'Nomin B.', initials: 'NB', program: 'she-can-code', xp: 3800, streak: 6, badges: 4 },
  { rank: 9, name: 'Khurelbaatar E.', initials: 'KE', program: 'cat-ai', xp: 3400, streak: 5, badges: 3 },
  { rank: 10, name: 'Munkh-Erdene G.', initials: 'MG', program: 'l-plus-plus', xp: 3100, streak: 4, badges: 3 },
];

export const monthlyChallenge = {
  month: 'August 2026',
  title: 'Build a Mongolian CLI Tool',
  description:
    'Create a command-line application that solves a real problem for Mongolian users — weather updates, currency conversion, news parsing, public transit info, or anything else that makes life easier.',
  daysLeft: 8,
  participants: 142,
  totalPrize: '150k₮',
  rules: [
    'Built with any language taught at Codely',
    'Must be open-source on GitHub',
    'Include a README with install instructions',
    'Solves a real Mongolian problem',
  ],
  prizes: [
    { place: '1st Place', reward: '100,000 MNT', medal: '🥇' },
    { place: '2nd Place', reward: '50,000 MNT', medal: '🥈' },
    { place: '3rd Place', reward: '25,000 MNT', medal: '🥉' },
    { place: 'All Top 10', reward: 'Gold Coder Badge', medal: '🏅' },
    { place: 'All Entries', reward: 'Codely Merch Pack', medal: '🎁' },
  ],
  standings: [
    { rank: 1, title: 'UB Air Quality CLI', author: 'Enkhjin T.', initials: 'ET', program: 'monpy', votes: 89 },
    { rank: 2, title: 'Tögrög Converter', author: 'Bayaraa S.', initials: 'BS', program: 'l-plus-plus', votes: 67 },
    { rank: 3, title: 'MNB Rate Tracker', author: 'Solongo N.', initials: 'SN', program: 'she-can-code', votes: 54 },
    { rank: 4, title: 'Ulaanbaatar Bus CLI', author: 'Gantulga B.', initials: 'GB', program: 'arduino-workshop', votes: 41 },
    { rank: 5, title: 'Mongolian Dictionary', author: 'Nomin B.', initials: 'NB', program: 'she-can-code', votes: 38 },
  ],
  pastWinners: [
    { title: 'UB Air Quality CLI', author: 'Enkhjin T.', month: 'July 2026', program: 'monpy' },
    { title: 'Smart Ger Monitor v1', author: 'Gantulga B.', month: 'June 2026', program: 'arduino-workshop' },
    { title: 'Mongolian NLP API', author: 'Ankhtsetseg D.', month: 'May 2026', program: 'cat-ai' },
  ],
};

export const trendingTags = [
  '#Python',
  '#ML',
  '#Arduino',
  '#Next.js',
  '#Career',
  '#IoT',
  '#API',
  '#React',
];

export const communityStats = [
  { label: 'Members', value: '4,460+' },
  { label: 'Posts', value: '12.8k' },
  { label: 'Projects', value: '890+' },
];
