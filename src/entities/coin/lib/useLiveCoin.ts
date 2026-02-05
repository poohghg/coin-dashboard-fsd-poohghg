import { Coin } from '@/src/entities/coin';
import { CoinMapper } from '@/src/entities/coin/model/mapper';
import { CoinDetailSocketDTO, CoinSocketSchema } from '@/src/entities/coin/model/schema';
import { useUpbitSocketBase } from '@/src/shared/lib/upbitSocket';
import { useMemo } from 'react';

export const useLiveCoin = (code: string, initialCoin: Coin): Coin => {
  const { lastMessage: socketData } = useUpbitSocketBase<CoinDetailSocketDTO>({
    type: 'ticker',
    code: code,
  });

  return useMemo(() => {
    if (!socketData) {
      return initialCoin;
    }

    const result = CoinSocketSchema.safeParse(socketData);

    if (!result.success) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Socket Error] ${code}:`, result.error);
      }
      return initialCoin;
    }

    return CoinMapper.toCoinFromSocket(initialCoin, result.data);
  }, [socketData, initialCoin, code]);
};
