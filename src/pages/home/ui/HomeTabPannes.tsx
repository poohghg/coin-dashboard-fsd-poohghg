'use client';

import { Coin } from '@/src/entities/coin';
import { CoinSortableField, FavoritesCoins, useSearchCoins, useSortCoins } from '@/src/features/coin';
import { HomeTabs } from '@/src/pages/home/constant';
import { ListFilter } from '@/src/pages/home/ui/ListFilter';
import RealTimeChart from '@/src/pages/home/ui/RealTimeChart';
import { yieldToMain } from '@/src/shared/lib/utils';
import { If, SearchBar, TabsPanel } from '@/src/shared/uiKit';

interface HomeTabPanelsProps {
  coins: Coin[];
  fetchedAt: Date;
}

const HomeTabPanels = ({ coins, fetchedAt }: HomeTabPanelsProps) => {
  const { searchedCoins, searchQuery, setQuery } = useSearchCoins(coins);
  const { sortedCoins, sortState, changeSortState, changeDirection } = useSortCoins(searchedCoins);
  const queryKey = `${searchQuery}-${sortState.field}`;

  const handleChangeSortState = async (field: CoinSortableField) => {
    changeSortState(field);
    await yieldToMain();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <SearchBar
        placeholder="Search something... (BTC, Bitcoin, B...)"
        value={searchQuery}
        onInputChange={setQuery}
        useDebounce
      />
      <ListFilter sortState={sortState} onChangeSortState={handleChangeSortState} onChangeDirection={changeDirection} />
      {HomeTabs.map(({ tabKey }) => (
        <TabsPanel key={tabKey} tabKey={tabKey}>
          <If condition={tabKey === 'live'}>
            <RealTimeChart coins={sortedCoins} fetchedAt={fetchedAt} queryKey={queryKey} />
          </If>
          <If condition={tabKey === 'favorite'}>
            <FavoritesCoins coins={sortedCoins}>
              {favoriteCoins => <RealTimeChart coins={favoriteCoins} fetchedAt={fetchedAt} queryKey={queryKey} />}
            </FavoritesCoins>
          </If>
        </TabsPanel>
      ))}
    </div>
  );
};

export default HomeTabPanels;
