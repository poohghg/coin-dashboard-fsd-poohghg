import { cn } from '@/src/shared/uiKit';
import { memo } from 'react';

const SkeletonBox = ({ className }: { className?: string }) => {
  return <div className={cn('bg-gray-200 animate-pulse rounded', className)} />;
};

export default memo(SkeletonBox);
