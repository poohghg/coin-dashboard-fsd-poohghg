import { Candle, TimeFrame } from '@/src/entities/candle';
import { addHours, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { OhlcData, UTCTimestamp } from 'lightweight-charts';
import { useEffect, useMemo, useState } from 'react';

const normalizeSocketTime = (timeFrame: TimeFrame, liveCandle: Candle): number => {
  const socketTime = liveCandle.candlestickData.time as number;
  const date = new Date(socketTime * 1000);

  switch (timeFrame) {
    case 'days':
      const dayZero = startOfDay(date);
      const dayNine = addHours(dayZero, 9);

      if (date.getTime() < dayNine.getTime()) {
        return dayNine.getTime() / 1000 - 24 * 60 * 60; // 1일 빼기
      }
      return dayNine.getTime() / 1000;

    case 'weeks':
      const mondayZero = startOfWeek(date, { weekStartsOn: 1 });
      const mondayNine = addHours(mondayZero, 9);

      //    [예외 처리] 만약 현재 시간이 월요일 00:00 ~ 08:59 사이라면,
      //    이 데이터는 "이번 주 봉"이 아니라 "저번 주 봉"에 포함되어야 함.
      //    (이미 startOfWeek는 오늘이 월요일이면 이번주 월요일 0시를 뱉으므로,
      //     단순히 +9시간을 하면 미래(오늘 9시)가 되어버림.
      //     따라서 현재 시간이 9시 이전이면 1주일을 빼줘야 함.)
      if (date.getTime() < mondayNine.getTime()) {
        return mondayNine.getTime() / 1000 - 7 * 24 * 60 * 60;
      }

      return mondayNine.getTime() / 1000;

    case 'months':
      const monthZero = startOfMonth(date);
      const monthNine = addHours(monthZero, 9);

      if (date.getTime() < monthNine.getTime()) {
        const prevMonth = new Date(monthNine);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        return prevMonth.getTime() / 1000;
      }
      return monthNine.getTime() / 1000;

    default:
      return socketTime;
  }
};

interface UseChartDataProps {
  candles: Candle[] | undefined;
  liveCandle: Candle | null;
  timeFrame: TimeFrame;
}

export const useChartData = ({ candles, liveCandle, timeFrame }: UseChartDataProps) => {
  const initialData = useMemo(() => {
    if (candles && candles.length > 0) {
      return [...candles].map(c => c.candlestickData).reverse();
    }
    return [];
  }, [candles]);

  const [chartData, setChartData] = useState<Array<OhlcData<UTCTimestamp>>>(initialData);

  useEffect(() => {
    setChartData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (!liveCandle) {
      return;
    }

    setChartData(prevData => {
      if (prevData.length === 0) {
        return prevData;
      }

      const newData = [...prevData];
      const lastCandle = newData[newData.length - 1];
      const liveData = liveCandle.candlestickData;

      const lastCandleTime = lastCandle.time as number;
      const normalizedLiveTime = normalizeSocketTime(timeFrame, liveCandle);

      if (lastCandleTime === normalizedLiveTime) {
        newData[newData.length - 1] = {
          ...lastCandle,
          close: liveData.close,
          high: Math.max(lastCandle.high, liveData.high),
          low: Math.min(lastCandle.low, liveData.low),
        };
      } else if (lastCandleTime < normalizedLiveTime) {
        newData.push({
          ...liveData,
          time: normalizedLiveTime as UTCTimestamp,
        });
      }

      return newData;
    });
  }, [liveCandle, timeFrame]);

  return chartData;
};
