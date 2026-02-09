import { CandleMapper, TimeFrame } from '@/src/entities/candle';
import { CandleSocketDTO, CandleSocketSchema } from '@/src/entities/candle/model/schema';
import { UpbitSocketType, useUpbitSocketBase } from '@/src/shared/lib/upbitSocket';
import { useMemo } from 'react';

interface UseLiveCandleProps {
  code: string;
  timeFrame: TimeFrame;
}

const socketTimeFrameMap = {
  'minutes/1': 'candle.1m',
  'minutes/15': 'candle.15m',
  'minutes/60': 'candle.60m',
  'minutes/240': 'candle.240m',
  days: 'candle.1m',
  weeks: 'candle.1m',
  months: 'candle.1m',
} satisfies Record<TimeFrame, UpbitSocketType>;

export const useLiveCandle = ({ code, timeFrame }: UseLiveCandleProps) => {
  const type = socketTimeFrameMap[timeFrame];

  const { lastMessage: socketData } = useUpbitSocketBase<CandleSocketDTO>({
    type: type,
    code: code,
  });

  return useMemo(() => {
    if (!socketData) {
      return null;
    }

    const result = CandleSocketSchema.safeParse(socketData);

    if (!result.success) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[Socket Error] ${code}:`, result.error);
      }
      return null;
    }

    return CandleMapper.toCandleFromSocket(result.data);
  }, [socketData, code]);
};
