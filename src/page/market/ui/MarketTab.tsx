import { CoinDetail } from '@/src/entities/coin/model/type';
import { MarketChart } from '@/src/page/market/ui/MarketChart';
import { MarketTabList } from '@/src/page/market/ui/MarketTabList';
import { OrderBookPanel } from '@/src/page/market/ui/OrderBookPanel';
import { Spacing, Tabs, TabsPanel } from '@/src/shared/uiKit';
import { Suspense } from 'react';

interface MarketTabProps {
  coin: CoinDetail;
  defaultTab: string;
}

export const MarketTab = async ({ coin, defaultTab }: MarketTabProps) => {
  return (
    <Tabs defaultKey={defaultTab} className={'w-full px-3'}>
      <MarketTabList market={coin.market} />
      <Spacing size={12} />
      <TabsPanel tabKey={'orderbook'}>
        <Suspense>
          <OrderBookPanel coin={coin} />
        </Suspense>
      </TabsPanel>
      <TabsPanel tabKey={'chart'}>
        <MarketChart marketCode={coin.market} />
      </TabsPanel>
    </Tabs>
  );
};
