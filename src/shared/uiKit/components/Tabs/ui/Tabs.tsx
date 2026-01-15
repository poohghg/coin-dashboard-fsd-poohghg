'use client';

import { MergeElementProps } from '@/src/shared/model/reactElement';
import { TabsContextProvider } from '@/src/shared/uiKit/components/Tabs/Context';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const TabPanel = dynamic(() => import('@/src/shared/uiKit/components/Tabs/ui/TabPanel'));
const TabsList = dynamic(() => import('@/src/shared/uiKit/components/Tabs/ui/TabList'));
const TabTrigger = dynamic(() => import('@/src/shared/uiKit/components/Tabs/ui/TabTrigger'));
const TabListBar = dynamic(() => import('@/src/shared/uiKit/components/Tabs/ui/TabListBar'));

interface TabsProps {
  children: ReactNode;
  defaultKey: string;
  controlledKey?: string;
  onChange?: (key: string) => void;
}

const Tabs = ({ controlledKey, defaultKey, onChange, children, ...props }: MergeElementProps<'div', TabsProps>) => {
  return (
    <TabsContextProvider controlledValue={controlledKey} defaultValue={defaultKey} onChange={onChange}>
      <div {...props}>{children}</div>
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
