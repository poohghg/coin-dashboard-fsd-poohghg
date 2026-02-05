import { CoinDetail } from '@/src/entities/coin';
import { CoinMapper } from '@/src/entities/coin/model/mapper';
import { CoinDetailSocketDTO, CoinDetailSocketSchema } from '@/src/entities/coin/model/schema';
import { useUpbitSocketBase } from '@/src/shared/lib/upbitSocket';
import { useMemo } from 'react';

export const useLiveCoinDetail = (code: string, initialCoin: CoinDetail): CoinDetail => {
  const { lastMessage: socketData } = useUpbitSocketBase<CoinDetailSocketDTO>({
    type: 'ticker',
    code: code,
  });

  return useMemo(() => {
    if (!socketData) {
      return initialCoin;
    }

    const result = CoinDetailSocketSchema.safeParse(socketData);

    if (!result.success) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Socket Error] ${code}:`, result.error);
      }
      return initialCoin;
    }

    return CoinMapper.toCoinDetailFromSocket(initialCoin, result.data);
  }, [socketData, initialCoin, code]);
};
