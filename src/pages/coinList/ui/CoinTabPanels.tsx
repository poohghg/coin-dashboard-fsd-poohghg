import { Coin } from '@/src/entities/coin/model';
import { FavoritesCoins, useSortCoins } from '@/src/features/coin';
import { Tabs } from '@/src/shared/uiKit';
import dynamic from 'next/dynamic';
import React from 'react';

const CoinListTable = dynamic(() => import('@/src/pages/coinList/ui/CoinListTable'), {
  ssr: false,
  loading: () => <div className="text-center text-gray-400">Loading coins...</div>,
});

interface CoinTabPadelProps {
  coins: Coin[];
}

const CoinTabPanels = ({ coins }: CoinTabPadelProps) => {
  // 검색어 처리 -> 정렬 처리 순서로 변경 필요
  const { sortedCoins, sortState, changeSortState } = useSortCoins(coins);

  return (
    <>
      <Tabs.Panel tabKey="all">
        <CoinListTable coins={coins} sortedCoins={sortedCoins} sortState={sortState} onChangeSort={changeSortState} />
      </Tabs.Panel>
      <Tabs.Panel tabKey="favorites">
        <FavoritesCoins coins={coins}>
          {favoriteCoins => (
            <CoinListTable
              coins={favoriteCoins}
              sortedCoins={favoriteCoins}
              sortState={sortState}
              onChangeSort={changeSortState}
            />
          )}
        </FavoritesCoins>
      </Tabs.Panel>
    </>
  );
};

export default CoinTabPanels;
