interface SpacingProps {
  size: number;
}

const Spacing = ({ size }: SpacingProps) => {
  return <div className={'flex-shrink-0'} style={{ height: size }} />;
};

export default Spacing;
