import { LoaderCircleIcon } from 'lucide-react';

interface LoadCircleIconProps {
  className?: string;
  iconSize?: number;
}

export const LoadCircleIcon = ({ className, iconSize = 24 }: LoadCircleIconProps) => {
  return (
    <div className={`flex justify-center items-center mb-4 ${className ?? ''}`}>
      <LoaderCircleIcon className={'animate-spin'} style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
    </div>
  );
};
