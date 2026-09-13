import { BlockchainBg } from '@/components/blockchain-bg';
import { ProgramCard } from '@/components/program-card';
import { TestimonialCard, type Testimonial } from '@/components/testimonial-card';
import { programs } from '@/data/programs';

export const metadata = {
  title: 'Programs',
  description:
    '4 intensive programs and 2 focused workshops. Whether you are starting from scratch or levelling up — we have a track for you.',
};

const testimonials: Testimonial[] = [
  {
    name: 'Enkhjargal B.',
    programName: 'She Can Code',
    programColor: 'var(--track-she-can-code)',
    stars: 5,
    quote:
      'Before She Can Code I had never written a single line of code. Eight weeks later I built my own portfolio website. The instructors made every concept feel approachable and the community kept me going on hard days.',
  },
  {
    name: 'Tulgaa M.',
    programName: 'MonPy',
    programColor: 'var(--track-monpy)',
    stars: 5,
    quote:
      'MonPy gave me real Python skills, not just theory. I automated a whole reporting workflow at my job within a month of graduating. The project-based structure made everything stick.',
  },
  {
    name: 'Nominchimeg D.',
    programName: 'Cat AI',
    programColor: 'var(--track-cat-ai)',
    stars: 5,
    quote:
      'Cat AI was intense but incredibly rewarding. I went from not knowing what a tensor was to training my own image classifier. The mentors are world-class and always available.',
  },
  {
    name: 'Gantulga O.',
    programName: 'C++ Workshop',
    programColor: 'var(--track-cpp)',
    stars: 4,
    quote:
      'The C++ Workshop is no joke — it pushed me hard. But that is exactly what I needed. I now understand what is happening under the hood of every program I write. Essential for any serious developer.',
  },
  {
    name: 'Bayarjargal S.',
    programName: 'Arduino Workshop',
    programColor: 'var(--track-arduino)',
    stars: 5,
    quote:
      'I built a weather monitoring station that uploads to the cloud. Never thought I could do hardware programming — the Arduino Workshop proved me wrong. Hands-on, fun, and practical.',
  },
  {
    name: 'Munkh-Erdene G.',
    programName: 'I++',
    programColor: 'var(--track-lpp)',
    stars: 5,
    quote:
      'I++ taught me to think like a computer. Understanding memory, pointers, and performance at this level changed how I approach every programming problem. Challenging, but worth every hour.',
  },
];

export default function ProgramsPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="absolute inset-0 text-white">
          <BlockchainBg />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(124_58_237/14%),transparent_65%)]"
        />

        <div className="relative mx-auto w-full max-w-[1130px] px-6 py-24 text-center">
          <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.28em] text-brand-soft">
            // Programs
          </p>
          <h1 className="mt-3 text-[46px] font-bold leading-[1.03] text-white sm:text-[60px]">
            <span>Choose Your </span>
            <span className="bg-gradient-to-r from-brand-soft to-brand bg-clip-text text-transparent">
              Path
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[540px] text-[15px] leading-relaxed text-zinc-400">
            4 intensive programs and 2 focused workshops. Whether you&apos;re starting from scratch
            or levelling up — we have a track for you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid w-full max-w-[1130px] gap-5 px-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>

      <section className="border-t border-hairline py-20">
        <div className="mx-auto w-full max-w-[1130px] px-6">
          <div className="text-center">
            <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.28em] text-brand-soft">
              // Student Voices
            </p>
            <h2 className="mt-2 text-[36px] font-bold leading-tight text-white sm:text-[42px]">
              What Our Participants Say
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
