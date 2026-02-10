'use client';

import { Coin } from '@/src/entities/coin';
import { FavoritesCoins, useSearchCoins, useSortCoins } from '@/src/features/coin';
import { HomeTabs } from '@/src/page/home/constant';
import { ListFilter } from '@/src/page/home/ui/ListFilter';
import RealTimeChart from '@/src/page/home/ui/RealTimeChart';
import { If, SearchBar, TabsPanel } from '@/src/shared/uiKit';

interface HomeTabPanelsProps {
  coins: Coin[];
}

const HomeTabPanels = ({ coins }: HomeTabPanelsProps) => {
  const { searchedCoins, searchQuery, setQuery } = useSearchCoins(coins);
  const { sortedCoins, sortState, changeSortState, changeDirection } = useSortCoins(searchedCoins);
  const queryKey = `${searchQuery}-${sortState.field}`;

  return (
    <div>
      <SearchBar
        placeholder="Search something... (BTC, Bitcoin, B...)"
        value={searchQuery}
        onInputChange={setQuery}
        useDebounce
      />
      <ListFilter sortState={sortState} onChangeSortState={changeSortState} onChangeDirection={changeDirection} />
      {HomeTabs.map(({ tabKey }) => (
        <TabsPanel key={tabKey} tabKey={tabKey}>
          <If condition={tabKey === 'live'}>
            <RealTimeChart coins={sortedCoins} queryKey={queryKey} />
          </If>
          <If condition={tabKey === 'favorite'}>
            <FavoritesCoins coins={sortedCoins}>
              {favoriteCoins => <RealTimeChart coins={favoriteCoins} queryKey={queryKey} />}
            </FavoritesCoins>
          </If>
        </TabsPanel>
      ))}
    </div>
  );
};

export default HomeTabPanels;
