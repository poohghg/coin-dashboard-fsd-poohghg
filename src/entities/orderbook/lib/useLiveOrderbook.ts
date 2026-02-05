import { Orderbook, OrderbookMapper } from '@/src/entities/orderbook/model';
import { OrderbookSocketDTO, OrderbooksSocketSchema } from '@/src/entities/orderbook/model/schema';
import { useUpbitSocketBase } from '@/src/shared/lib/upbitSocket';
import { useMemo } from 'react';

export const useLiveOrderbook = (code: string, orderbook: Orderbook) => {
  const { lastMessage: socketData } = useUpbitSocketBase<OrderbookSocketDTO>({
    type: 'orderbook',
    code: code,
  });

  return useMemo(() => {
    if (!socketData) {
      return orderbook;
    }

    const result = OrderbooksSocketSchema.safeParse(socketData);

    if (!result.success) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Socket Error] ${code}:`, result.error);
      }
      return orderbook;
    }

    return OrderbookMapper.toOrderbook(result.data);
  }, [socketData, orderbook, code]);
};
