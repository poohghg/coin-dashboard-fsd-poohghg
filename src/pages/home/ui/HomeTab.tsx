import { CoinSearchBar } from '@/src/features/coin';
import CoinListFetcher from '@/src/pages/home/ui/CoinListFetcher';
import HomeTabList from '@/src/pages/home/ui/HomeTabList';
import HomeTabPannes from '@/src/pages/home/ui/HomeTabPannes';
import { Spacing, Tabs } from '@/src/shared/uiKit';

const HomeTab = () => {
  return (
    <Tabs defaultKey={'live'} className={'w-full'}>
      {/*<ToolTip text={'CryptoDash Home'} position={'bottom'}>*/}
      {/*  <div className="mb-2 text-sm text-gray-500">*/}
      {/*    Welcome to CryptoDash! Explore real-time cryptocurrency prices, market trends, and detailed coin information*/}
      {/*    all in one place. Use the search bar to quickly find your favorite coins and stay updated with the latest*/}
      {/*    market movements.*/}
      {/*  </div>*/}
      {/*</ToolTip>*/}
      <HomeTabList />
      <Spacing size={16} />
      <CoinSearchBar />
      <Spacing size={24} />
      <CoinListFetcher>{coins => <HomeTabPannes coins={coins} />}</CoinListFetcher>
    </Tabs>
  );
};

export default HomeTab;
