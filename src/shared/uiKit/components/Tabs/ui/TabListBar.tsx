import { MergeElementProps } from '@/src/shared/model/reactElement';
import { useTabsContext } from '@/src/shared/uiKit/components/Tabs/Context';

const TabListBar = ({
  className,
  ref,
  ...props
}: MergeElementProps<
  'div',
  {
    ref?: React.Ref<HTMLDivElement>;
  }
>) => {
  const { selectedKey } = useTabsContext();
  return (
    <div
      ref={el => {
        if (el && selectedKey) {
          const selectedTab = document.getElementById(`tab-${selectedKey}`);
          if (selectedTab) {
            const rect = selectedTab.getBoundingClientRect();
            el.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
            el.style.width = `${rect.width}px`;
            if (ref) {
              if (typeof ref === 'function') {
                ref(el);
              } else if (typeof ref === 'object' && ref !== null) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
              }
            }
          }
        }
      }}
      className={`absolute bottom-0 h-[3px] bg-blue-500 rounded-full transition-all duration-300 ${className}`}
      {...props}
    />
  );
};

export default TabListBar;
