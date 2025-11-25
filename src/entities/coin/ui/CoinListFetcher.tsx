import { CoinApiImpl } from '@/src/entities/coin/api';
import { coinService } from '@/src/entities/coin/api/service';
import { Coin } from '@/src/entities/coin/model/type';
import RetryButton from '@/src/entities/coin/ui/RetryButton';
import { ReactNode } from 'react';

interface CoinListFetcherProps {
  children: (coins: Coin[]) => ReactNode;
}

const CoinListFetcher = async ({ children }: CoinListFetcherProps) => {
  const res = await coinService.getCoinList();
  // const res1 = await new CoinApiImpl().fetchCoinKrwList();

  console.log(res);
  const res2 = await new CoinApiImpl().fetchCoinMarketAll();

  console.log(res2);

  if (!res.ok) {
    if (res.status === 429) {
      return (
        <div>
          Too many requests. Please try again later.
          <RetryButton />
        </div>
      );
    }
    /**
     * 에러처리를 통해 Next.js의 라우터 에러 페이지로 이동시키거나
     * 커스텀 에러 컴포넌트를 렌더링할 수 있다.
     */
    return <>Error loading coins.</>;
  }

  return <>{children(res.data)}</>;
};

export default CoinListFetcher;
