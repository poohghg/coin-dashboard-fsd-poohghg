import { CoinListFetcher } from '@/src/entities/coin';
import { CoinSearchBar, CoinTabKeys } from '@/src/features/coin';
import { Tabs } from '@/src/shared/uiKit';
import CoinTabList from '@/src/widgets/CoinTabs/ui/CoinTabList';
import CoinTabPanels from '@/src/widgets/CoinTabs/ui/CoinTabPanels';
import React from 'react';

interface CoinTabsProps {
  tabList: {
    tabKey: CoinTabKeys;
    label: string;
  }[];
}

const CoinTabs = ({ tabList }: CoinTabsProps) => {
  return (
    <Tabs className="mb-6 space-y-4" defaultKey="all">
      <CoinTabList tabList={tabList} />
      <CoinSearchBar />
      <CoinListFetcher>{coins => <CoinTabPanels coins={coins} tabList={tabList} />}</CoinListFetcher>
    </Tabs>
  );
};

export default CoinTabs;
