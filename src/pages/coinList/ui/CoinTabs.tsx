'use client';

import { Coin } from '@/src/entities/coin/model';
import CoinTabPanels from '@/src/pages/coinList/ui/CoinTabPanels';
import SearchButton from '@/src/pages/coinList/ui/SearchButton';
import { Tabs } from '@/src/shared/uiKit';
import React from 'react';

interface CoinListContentProps {
  coins: Coin[];
}

const TAB_KEYS = ['all', 'favorites'] as const;

const CoinTabs = ({ coins }: CoinListContentProps) => {
  return (
    <Tabs className="mb-6 space-y-4" defaultKey="all">
      <Tabs.List className="mb-6 space-y-4">
        {TAB_KEYS.map(tabKey => (
          <Tabs.Trigger
            key={tabKey}
            className="px-4 py-2 text-sm font-semibold text-gray-400 aria-selected:text-blue-600 hover:text-white transition duration-75"
            tabKey={tabKey}
          >
            {tabKey === 'all' ? 'All Coins' : 'My Favorites'}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <SearchButton />
      <CoinTabPanels coins={coins} />
    </Tabs>
  );
};

export default CoinTabs;
