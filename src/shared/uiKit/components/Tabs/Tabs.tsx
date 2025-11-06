'use client';

import { MergeElementProps } from '@/src/shared/model/reactElement';
import { TabsContextProvider } from '@/src/shared/uiKit/components/Tabs/Context';
import TabPanel from '@/src/shared/uiKit/components/Tabs/ui/TabPanel';
import TabsList from '@/src/shared/uiKit/components/Tabs/ui/TabsList';
import TabsTrigger from '@/src/shared/uiKit/components/Tabs/ui/TabsTrigger';
import { ReactNode } from 'react';

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
  Trigger: TabsTrigger,
});
