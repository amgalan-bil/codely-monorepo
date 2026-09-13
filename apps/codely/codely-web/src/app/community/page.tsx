import { Suspense } from 'react';
import { CommunityFeed } from './feed';

export const metadata = {
  title: 'Community',
  description: "Share projects, ask questions, and grow with Mongolia's coding community.",
};

export default function CommunityPage() {
  return (
    <Suspense fallback={null}>
      <CommunityFeed />
    </Suspense>
  );
}
