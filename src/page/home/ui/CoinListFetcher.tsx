import { Coin } from '@/src/entities/coin/model/type';
import { homeUseCase } from '@/src/page/home/usecase/homeService';
import { ServerFetcher } from '@/src/shared/uiKit';
import { ReactNode } from 'react';

interface CoinListFetcherProps {
  children: (data: Coin[]) => ReactNode;
}

export const CoinListFetcher = ({ children }: CoinListFetcherProps) => {
  return (
    <ServerFetcher
      fetcher={homeUseCase.getCoinList}
      errorComponent={error => {
        return <>Failed to load coin data. Please try again later.</>;
      }}
    >
      {data => children(data)}
    </ServerFetcher>
  );
};
