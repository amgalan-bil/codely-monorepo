import { Suspense } from 'react';
import { ProfileView } from './profile-view';

export const metadata = {
  title: 'Profile',
  description: 'Your Codely progress, lessons, XP and badges.',
};

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileView />
    </Suspense>
  );
}
