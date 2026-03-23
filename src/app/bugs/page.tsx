import { Suspense } from 'react';
import BugsClient from './BugsClient';
import { SkeletonList } from '@/components/ui';

export default function BugsPage() {
  return (
    <Suspense fallback={<SkeletonList count={5} />}>
      <BugsClient />
    </Suspense>
  );
}
