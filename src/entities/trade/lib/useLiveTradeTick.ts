import { TradeTickMapper } from '@/src/entities/trade';
import { TradeTickSocketSchema, UpbitTradeTickSocketDTO } from '@/src/entities/trade/model/schema';
import { useUpbitSocketBase } from '@/src/shared/lib/upbitSocket';
import { useMemo } from 'react';

export const useLiveTradeTick = (code: string) => {
  const { data: socketData } = useUpbitSocketBase<UpbitTradeTickSocketDTO>({
    type: 'trade',
    code: code,
  });

  return useMemo(() => {
    if (!socketData) {
      return null;
    }

    const result = TradeTickSocketSchema.safeParse(socketData);

    if (!result.success) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Socket Error] ${code}:`, result.error);
      }
      return null;
    }

    return TradeTickMapper.toTradeTickFromSocket(result.data);
  }, [socketData, code]);
};
