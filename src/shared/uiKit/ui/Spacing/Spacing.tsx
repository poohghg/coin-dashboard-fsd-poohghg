import { cn } from '@/src/shared/uiKit';

interface SpacingProps {
  size: number;
  className?: string;
}

const Spacing = ({ size, className }: SpacingProps) => {
  return <div className={cn('flex flex-shrink-0', className)} style={{ height: size }} />;
};

export default Spacing;
