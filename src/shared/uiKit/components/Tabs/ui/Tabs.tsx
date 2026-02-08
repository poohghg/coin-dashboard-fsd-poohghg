'use client';

import { MergeElementProps } from '@/src/shared/type/reactElement';
import { TabsContextProvider } from '@/src/shared/uiKit/components/Tabs/Context';
import TabsList from '@/src/shared/uiKit/components/Tabs/ui/TabsList';
import TabsListActive from '@/src/shared/uiKit/components/Tabs/ui/TabsListActive';
import TabsPanel from '@/src/shared/uiKit/components/Tabs/ui/TabsPanel';
import { TabsTrigger } from '@/src/shared/uiKit/components/Tabs/ui/TabsTrigger';
import { ElementType, ReactNode } from 'react';

interface TabsProps {
  children: ReactNode;
  defaultKey: string;
  as?: ElementType;
  controlledKey?: string;
  onChange?: (key: string) => void;
}

const Tabs = ({ controlledKey, defaultKey, as, onChange, children, ...props }: MergeElementProps<'div', TabsProps>) => {
  const Comp = as || 'div';

  return (
    <TabsContextProvider controlledValue={controlledKey} defaultValue={defaultKey} onChange={onChange}>
      <Comp {...props}>{children}</Comp>
    </TabsContextProvider>
  );
};

Tabs.displayName = 'Tabs';

export { Tabs, TabsList, TabsPanel, TabsTrigger, TabsListActive };
