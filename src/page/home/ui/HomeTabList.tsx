'use client';

import { HomeTabs } from '@/src/page/home/constant';
import { TabsList, TabsListActive, TabsTrigger } from '@/src/shared/uiKit';

const HomeTabList = () => {
  return (
    <TabsList className="border-b border-gray-400">
      <TabsListActive className={'rounded-[100px]'} />
      {HomeTabs.map(({ tabKey, label }) => (
        <TabsTrigger key={tabKey} tabKey={tabKey}>
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default HomeTabList;
