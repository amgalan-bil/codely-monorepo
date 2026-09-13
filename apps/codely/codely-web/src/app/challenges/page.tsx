import { ChallengeGrid } from './challenge-grid';

export const metadata = {
  title: 'Challenge Packs',
  description:
    'Бодлогын санаа дэлгүүрлэж, XP цуглуул. Программчлалын концептуудыг бататгах код бодлогын цуглуулгыг дуусга.',
};

export default function ChallengesPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 size-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(124_58_237/14%),transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto w-full max-w-[1130px] px-6 pb-24 pt-16">
        <div className="text-center">
          <h1 className="text-[42px] font-bold leading-tight text-white sm:text-[50px]">
            Challenge Packs
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-[14.5px] leading-relaxed text-zinc-400">
            Бодлогын санаа дэлгүүрлэж, XP цуглуул! Программчлалын концептуудыг бататгах код
            бодлогын цуглуулгыг дуусга.
          </p>
        </div>

        <div className="mt-12">
          <ChallengeGrid />
        </div>
      </div>
    </main>
  );
}
