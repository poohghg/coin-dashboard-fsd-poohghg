import { CoinListFetcher } from '@/src/pages/home/ui/CoinListFetcher';
import HomeTabList from '@/src/pages/home/ui/HomeTabList';
import HomeTabPannes from '@/src/pages/home/ui/HomeTabPannes';
import { Spacing, Tabs } from '@/src/shared/uiKit';

const HomeTab = () => {
  return (
    <Tabs defaultKey={'live'} className={'w-full'}>
      <HomeTabList />
      <Spacing size={16} />
      <CoinListFetcher>{coins => <HomeTabPannes coins={coins} />}</CoinListFetcher>
    </Tabs>
  );
};

export default HomeTab;
