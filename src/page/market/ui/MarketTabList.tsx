'use client';

import { MarketTabs } from '@/src/page/market/constant';
import { TabsList, TabsListActive, TabsTrigger } from '@/src/shared/uiKit';

interface MarketTabListProps {
  market: string;
}

export const MarketTabList = ({ market }: MarketTabListProps) => {
  const handleTabChange = (key: string) => {
    history.replaceState(null, '', `/market/${market}/${key}`);
  };

  return (
    <div className="top-content-top sticky z-50 border-b border-gray-300 bg-white py-1">
      <TabsList>
        <TabsListActive type={'button'} />
        {MarketTabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            className="text-[15px] font-semibold text-gray-400"
            tabKey={tab.value}
            onClick={() => handleTabChange(tab.value)}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};
