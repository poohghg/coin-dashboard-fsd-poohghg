'use client';

import { TimeFrame } from '@/src/entities/candle';
import { useCandlestickInfiniteQuery } from '@/src/pages/market/query/useCandlestickInfiniteQuery';
import { Chart } from '@/src/pages/market/ui/Chart/Chart';
import { ChartLegend } from '@/src/pages/market/ui/Chart/ChartLegend';
import { TimeFrames } from '@/src/pages/market/ui/Chart/TimeFrames';
import { CandlestickData } from 'lightweight-charts';
import React, { useMemo, useState } from 'react';

interface ChartProps {
  marketCode: string;
}

export interface LegendData {
  open: number;
  high: number;
  low: number;
  close: number;
  changeRate: number;
}

export const UpbitChart = ({ marketCode }: ChartProps) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('days');
  const [legendData, setLegendData] = useState<LegendData | null>(null);
  const {
    data: candlePages,
    fetchNextPage,
    hasNextPage,
    isFetchingPreviousPage,
  } = useCandlestickInfiniteQuery({
    market: marketCode,
    timeframe: timeFrame,
  });

  const updateLegendData = (data: LegendData | null) => {
    setLegendData(data);
  };

  const chartData = useMemo<CandlestickData[]>(() => {
    if (!candlePages?.pages) return [];

    const candlestickData: CandlestickData[] = [];

    for (let i = candlePages.pages.length - 1; 0 <= i; i--) {
      const page = candlePages.pages[i];
      for (let j = page.length - 1; 0 <= j; j--) {
        const candle = page[j];
        candlestickData.push(candle.candlestickData);
      }
    }

    return candlestickData;
  }, [candlePages?.pages]);

  return (
    <div className="w-full bg-white">
      <TimeFrames timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      <div className="relative w-full">
        <ChartLegend legendData={legendData} />
        <Chart
          data={chartData}
          timeFrame={timeFrame}
          setLegend={updateLegendData}
          onLoadMore={fetchNextPage}
          hasMore={hasNextPage}
          isLoading={isFetchingPreviousPage}
        />
      </div>
    </div>
  );
};
