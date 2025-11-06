import { MergeElementProps } from '@/src/shared/model/reactElement';
import { useTabsContext } from '@/src/shared/uiKit/components/Tabs/Context';
import { memo, ReactNode } from 'react';

export interface TabProps {
  tabKey: string;
  children: ReactNode;
}

const TabPanel = ({ tabKey, children, ...props }: MergeElementProps<'div', TabProps>) => {
  const { selectedKey } = useTabsContext();
  const isSelected = tabKey === selectedKey;

  return (
    <>
      {isSelected && (
        <div role="tabpanel" {...props}>
          {children}
        </div>
      )}
    </>
  );
};

TabPanel.displayName = 'TabPanel';
export default memo(TabPanel);
