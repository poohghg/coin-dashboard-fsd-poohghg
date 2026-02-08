import { MarketTabKeys } from '@/src/pages/market/constant';
import { MarketHeader } from '@/src/pages/market/ui/MarketHeader';
import { MarketTab } from '@/src/pages/market/ui/MarketTab';
import { marketService } from '@/src/pages/market/usecase/marketService';
import { ServerFetcher } from '@/src/shared/uiKit';
import { notFound, redirect } from 'next/navigation';

const marketPage = async ({ params }: { params: Promise<{ market: string; tab: string }> }) => {
  let { market, tab } = await params;

  if (!tab) {
    redirect(`/market/${market}/orderbook`);
  }

  if (!MarketTabKeys.has(tab as any)) {
    return notFound();
  }

  return (
    <ServerFetcher
      fetcher={() => marketService.getCoinDetail(market)}
      errorComponent={error => {
        return <div className="mt-10 text-center">해당 코인에 대한 정보가 없습니다.</div>;
      }}
    >
      {coinDetail => (
        <div className="flex w-full flex-col">
          <MarketHeader coin={coinDetail} />
          <MarketTab coin={coinDetail} defaultTab={tab} />
        </div>
      )}
    </ServerFetcher>
  );
};

export default marketPage;
