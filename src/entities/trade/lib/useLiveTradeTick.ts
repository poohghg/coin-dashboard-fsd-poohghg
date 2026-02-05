import { TradeTickMapper } from '@/src/entities/trade';
import { TradeTickSocketSchema, UpbitTradeTickSocketDTO } from '@/src/entities/trade/model/schema';
import { useUpbitSocketBase } from '@/src/shared/lib/upbitSocket';
import { useMemo } from 'react';

export const useLiveTradeTick = (code: string) => {
  const { lastMessage: socketData, lastMessages: socketDatas } = useUpbitSocketBase<UpbitTradeTickSocketDTO>({
    type: 'trade',
    code: code,
  });

  const tradeTick = useMemo(() => {
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

  const tradeTicks = useMemo(() => {
    if (!socketDatas || socketDatas.length === 0) {
      return [];
    }

    const ticks = [];

    for (const data of socketDatas) {
      const result = TradeTickSocketSchema.safeParse(data);

      if (!result.success) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[Socket Error] ${code}:`, result.error);
        }
        continue;
      }

      ticks.push(TradeTickMapper.toTradeTickFromSocket(result.data));
    }

    return ticks;
  }, [socketDatas, code]);

  return {
    tradeTick,
    tradeTicks,
  };
};
