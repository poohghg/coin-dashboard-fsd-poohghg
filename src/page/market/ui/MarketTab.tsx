import { CoinDetail } from '@/src/entities/coin/model/type';
import { MarketTabList } from '@/src/page/market/ui/MarketTabList';
import { OrderBookPanel } from '@/src/page/market/ui/OrderBookPanel';
import { Spacing, Tabs, TabsPanel } from '@/src/shared/uiKit';
import { LoadCircleIcon } from '@/src/shared/uiKit/components';
import dynamic from 'next/dynamic';

const Fallback = () => (
  <div className="flex items-center justify-center pt-24">
    <LoadCircleIcon />
  </div>
);

const MarketChart = dynamic(() => import('@/src/page/market/ui/MarketChart').then(mod => mod.MarketChart), {
  loading: Fallback,
});

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
        <OrderBookPanel coin={coin} />
      </TabsPanel>
      <TabsPanel tabKey={'chart'}>
        <MarketChart marketCode={coin.market} />
      </TabsPanel>
    </Tabs>
  );
};
