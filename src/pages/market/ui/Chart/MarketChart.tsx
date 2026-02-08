'use client';

import { TimeFrame } from '@/src/entities/candle';
import { useCandlestickInfiniteQuery } from '@/src/pages/market/query/useCandlestickInfiniteQuery';
import { Chart } from '@/src/pages/market/ui/Chart/Chart';
import { ChartLegend } from '@/src/pages/market/ui/Chart/ChartLegend';
import { TimeFrames } from '@/src/pages/market/ui/Chart/TimeFrames';
import { CandlestickData, Time } from 'lightweight-charts';
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
    fetchPreviousPage,
    hasPreviousPage,
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

    // pages는 [과거 데이터, ..., 최신 데이터] 순서로 정렬되어 있다고 가정
    // (fetchPreviousPage 사용 시 새 데이터가 배열의 앞쪽에 추가됨)
    const allCandles = candlePages.pages.flat();

    console.log('allCandles length:', allCandles);

    // 중복 제거 및 포맷팅
    const uniqueMap = new Map<Time, CandlestickData>();

    allCandles.forEach(item => {
      uniqueMap.set(item.candle_date_time_kst, item.candlestickData);
    });

    // 시간 순 정렬 (Lightweight Charts는 시간 순서가 필수)
    return Array.from(uniqueMap.values()).sort((a, b) => (a.time as number) - (b.time as number));
  }, [candlePages?.pages]);

  return (
    <div className="w-full bg-white">
      <div className="flex items-center">
        <TimeFrames timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      </div>
      <div className="relative w-full">
        <ChartLegend legendData={legendData} />
        <Chart
          data={chartData}
          timeFrame={timeFrame}
          setLegend={updateLegendData}
          onLoadMore={fetchPreviousPage}
          hasMore={hasPreviousPage}
          isLoading={isFetchingPreviousPage}
        />
      </div>
    </div>
  );
};
