import { LoaderCircleIcon } from 'lucide-react';

interface LoadCircleIconProps {
  className?: string;
  iconSize?: number;
}

export const LoadCircleIcon = ({ className, iconSize = 24 }: LoadCircleIconProps) => {
  return (
    <div className={`mb-4 flex items-center justify-center ${className ?? ''}`}>
      <LoaderCircleIcon className={'animate-spin'} style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
    </div>
  );
};
