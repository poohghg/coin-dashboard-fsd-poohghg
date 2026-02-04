import { CoinDetail } from '@/src/entities/coin/model/type';
import { MarketTabList } from '@/src/pages/market/ui/MarketTabList';
import { OrderBookPanel } from '@/src/pages/market/ui/OrderBookPanel';
import { Spacing, Tabs, TabsPanel } from '@/src/shared/uiKit';

interface MarketTabProps {
  coin: CoinDetail;
}

export const MarketTab = ({ coin }: MarketTabProps) => {
  return (
    <Tabs defaultKey={'orderbook'} className={'w-full px-3'}>
      <MarketTabList />
      <Spacing size={12} />
      <TabsPanel tabKey={'orderbook'}>
        <OrderBookPanel coin={coin} />
      </TabsPanel>
    </Tabs>
  );
};
