import { notFound } from 'next/navigation';
import { challengePacks, getPack } from '@/data/challenges';
import { ChallengeWorkspace } from './workspace';

export function generateStaticParams() {
  return challengePacks.map((pack) => ({ packId: pack.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ packId: string }> }) {
  const { packId } = await params;
  const pack = getPack(packId);
  if (!pack) return { title: 'Challenge Pack' };
  return { title: `${pack.topic} · ${pack.language}`, description: pack.description };
}

export default async function ChallengePackPage({
  params,
}: {
  params: Promise<{ packId: string }>;
}) {
  const { packId } = await params;
  const pack = getPack(packId);
  if (!pack) notFound();

  return <ChallengeWorkspace pack={pack} />;
}
