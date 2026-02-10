import { MergeElementProps } from '@/src/shared/type/reactElement';
import { useTabsContext } from '@/src/shared/uiKit/components/Tabs/Context';
import { useEffect } from 'react';

type SizeType = 'underline' | 'button';

const sizeStyles: Record<SizeType, string> = {
  underline: 'h-[3px] rounded-full bg-blue-500',
  button: 'inset-0 rounded-50 bg-blue-100',
};

const TabsListActive = ({
  className,
  type = 'underline',
  ...props
}: MergeElementProps<
  'div',
  {
    ref?: React.Ref<HTMLDivElement>;
    type?: SizeType;
  }
>) => {
  const { selectedKey } = useTabsContext();

  useEffect(() => {
    // resize 대응
    const handleResize = () => {
      const activeEl = document.getElementById('tabs-list-active-indicator') as HTMLDivElement;
      if (activeEl && selectedKey) {
        const selectedTab = document.getElementById(`tab-${selectedKey}`);
        if (selectedTab) {
          const rect = selectedTab.getBoundingClientRect();
          activeEl.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
          activeEl.style.width = `${rect.width}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedKey]);

  return (
    <div
      ref={el => {
        if (el && selectedKey) {
          const selectedTab = document.getElementById(`tab-${selectedKey}`);
          if (selectedTab) {
            const rect = selectedTab.getBoundingClientRect();
            el.style.transform = `translateX(${selectedTab.offsetLeft}px)`;
            el.style.width = `${rect.width}px`;
            el.style.opacity = '1';
          }
        }
      }}
      id="tabs-list-active-indicator"
      className={`absolute bottom-0 left-0 w-0 rounded-[32px] opacity-0 transition-all duration-300 ${sizeStyles[type]} ${className}`}
      {...props}
    />
  );
};

export default TabsListActive;
