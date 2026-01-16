'use client';

import { Coin } from '@/src/entities/coin';
import { useSearchedCoins, useSortCoins } from '@/src/features/coin';
import { HomeTabs } from '@/src/pages/home/constant';
import HomeCoinList from '@/src/pages/home/ui/HomeCoinList';
import { HomeListFilter } from '@/src/pages/home/ui/HomeListFilter';
import { Spacing, Tabs } from '@/src/shared/uiKit';

interface HomeTabPanelsProps {
  coins: Coin[];
}

const HomeTabPanels = ({ coins }: HomeTabPanelsProps) => {
  const searchedCoins = useSearchedCoins(coins);
  const { sortedCoins, sortState, changeSortState } = useSortCoins(coins);
  return (
    <>
      <HomeListFilter sortState={sortState} changeSortState={changeSortState} />
      <Spacing size={12} />
      {HomeTabs.map(({ tabKey }) => (
        <Tabs.Panel key={tabKey} tabKey={tabKey}>
          <HomeCoinList coins={sortedCoins} />
        </Tabs.Panel>
      ))}
    </>
  );
};

export default HomeTabPanels;
