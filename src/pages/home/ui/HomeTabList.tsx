'use client';

import { HomeTabs } from '@/src/pages/home/constant';
import { Tabs } from '@/src/shared/uiKit';

const HomeTabList = () => {
  return (
    <Tabs.List className="border-b border-gray-400">
      <Tabs.ListBar />
      {HomeTabs.map(({ tabKey, label }) => (
        <Tabs.Trigger
          key={tabKey}
          className="px-4 py-3 text-[15px] font-semibold text-gray-400 aria-selected:text-blue-600 hover:text-blue-500 transition duration-75"
          tabKey={tabKey}
        >
          {label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
};

export default HomeTabList;
