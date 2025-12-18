import { coinService } from '@/src/entities/coin/model/service';
import { Coin } from '@/src/entities/coin/model/type';
import { HTTPErrorCodes } from '@/src/shared/lib/error/BaseError';
import { ServerFetcher } from '@/src/shared/uiKit';
import { ReactNode } from 'react';

interface CoinListFetcherProps {
  fetcher: () => Promise<Coin[]>;
  children: (coins: Coin[]) => ReactNode;
}

const CoinListFetcher = async ({ children }: CoinListFetcherProps) => {
  return (
    <ServerFetcher
      fetcher={coinService.getCoinList}
      errorComponent={HTTPError => {
        if (HTTPError.equals(HTTPErrorCodes.TOO_MANY_REQUESTS)) {
          return <>Rate limit exceeded. Please try again later.</>;
        }
        return <>An error occurred while fetching coin data.</>;
      }}
    >
      {data => children(data)}
    </ServerFetcher>
  );
};

export default CoinListFetcher;
