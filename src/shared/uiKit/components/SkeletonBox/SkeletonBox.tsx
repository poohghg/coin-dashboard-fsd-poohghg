import { cn } from '@/src/shared/uiKit';
import { memo } from 'react';

const SkeletonBox = ({ className }: { className?: string }) => {
  return <div className={cn('animate-pulse rounded bg-gray-200', className)} />;
};

export default memo(SkeletonBox);
