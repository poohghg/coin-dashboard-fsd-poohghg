import { coinService } from '@/src/entities/coin/api/service';
import { Coin } from '@/src/entities/coin/model/type';
import CoinTabs from '@/src/pages/coinList/ui/CoinTabs';
import { ReactNode } from 'react';

interface CoinListFetcherProps {
  children?: (coins: Coin[]) => ReactNode;
}

const CoinListFetcher = async ({ children }: CoinListFetcherProps) => {
  const res = await coinService.getCoinList();

  if (!res.ok) {
    return <div>Failed to load coin data.</div>;
  }

  return (
    <div>
      <CoinTabs coins={res.data}></CoinTabs>
    </div>
  );
};

export default CoinListFetcher;
