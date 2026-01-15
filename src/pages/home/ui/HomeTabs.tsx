'use client';

import { Tabs } from '@/src/shared/uiKit';

// 실시간 차트, 관심 차트, 내 보유
const TabList: {
  tabKey: string;
  label: string;
}[] = [
  { tabKey: 'live', label: '실시간 차트' },
  { tabKey: 'favorite', label: '즐겨찾기 차트' },
  { tabKey: 'portfolio', label: '내 보유' },
];

const HomeTabs = () => {
  return (
    <Tabs defaultKey={'live'} className={'w-full'}>
      <Tabs.List className="border-b border-gray-400">
        <Tabs.ListBar />
        {TabList.map(({ tabKey, label }) => (
          <Tabs.Trigger
            key={tabKey}
            className="px-4 py-2 text-[15px] font-semibold text-gray-400 aria-selected:text-blue-600 hover:text-blue-500 transition duration-75"
            tabKey={tabKey}
          >
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
};

export default HomeTabs;
