'use client';

import { MergeElementProps } from '@/src/shared/type/reactElement';
import { useTabsContext } from '@/src/shared/uiKit/components/Tabs/Context';
import { ReactNode } from 'react';

export interface TabProps {
  tabKey: string;
  children: ReactNode;
}

const TabsPanel = ({ tabKey, children, ...props }: MergeElementProps<'div', TabProps>) => {
  const { selectedKey } = useTabsContext();
  const isSelected = tabKey === selectedKey;

  if (!isSelected) {
    return null;
  }

  return (
    <div role="tabpanel" {...props}>
      {children}
    </div>
  );
};

TabsPanel.displayName = 'TabsPanel';
export default TabsPanel;
