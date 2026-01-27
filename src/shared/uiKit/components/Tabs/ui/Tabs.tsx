'use client';

import { MergeElementProps } from '@/src/shared/type/reactElement';
import { TabsContextProvider } from '@/src/shared/uiKit/components/Tabs/Context';
import dynamic from 'next/dynamic';
import { ElementType, ReactNode } from 'react';

const TabPanel = dynamic(() => import('@/src/shared/uiKit/components/Tabs/ui/TabPanel'));
const TabsList = dynamic(() => import('@/src/shared/uiKit/components/Tabs/ui/TabList'));
const TabTrigger = dynamic(() => import('@/src/shared/uiKit/components/Tabs/ui/TabTrigger'));
const TabListBar = dynamic(() => import('@/src/shared/uiKit/components/Tabs/ui/TabListBar'));

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

export default Object.assign(Tabs, {
  List: TabsList,
  Panel: TabPanel,
  Trigger: TabTrigger,
  ListBar: TabListBar,
});
