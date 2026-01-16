import { Coin } from '@/src/entities/coin/model/type';
import { homeUseCase } from '@/src/pages/home/usecase/homeService';
import { ServerFetcher } from '@/src/shared/uiKit';
import { ReactNode } from 'react';

interface CoinListFetcherProps {
  children: (coins: Coin[]) => ReactNode;
}

const CoinListFetcher = ({ children }: CoinListFetcherProps) => {
  return (
    <ServerFetcher
      fetcher={homeUseCase.getCoinList}
      errorComponent={error => {
        return <>Failed to load coin data. Please try again later.</>;
        // if (error.equals(HttpErrorCodes.TOO_MANY_REQUESTS)) {
        //   return <>Rate limit exceeded. Please try again later.</>;
        // }
        // return <>An error occurred while fetching coin data.</>;
      }}
    >
      {data => children(data)}
    </ServerFetcher>
  );
};

export default CoinListFetcher;
