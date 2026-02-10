'use client';

import { ChartTimeFrames, TimeFrame, useChartData, useLiveCandle } from '@/src/entities/candle';
import { LegendData } from '@/src/entities/candle/model/type';
import { CandlestickChart, ChartCommands } from '@/src/entities/candle/ui/CandlestickChart';
import { ChartLegend } from '@/src/entities/candle/ui/ChartLegend';
import { useCandlestickInfiniteQuery } from '@/src/page/market/query/useCandlestickInfiniteQuery';
import { useThrottledCallback } from '@/src/shared/lib/hooks';
import { CandlestickData, LogicalRange } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

interface ChartProps {
  marketCode: string;
}

export const MarketChart = ({ marketCode }: ChartProps) => {
  const chartCommandsRef = useRef<ChartCommands>(null);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('days');
  const [legendData, setLegendData] = useState<LegendData | null>(null);

  const {
    data: candles,
    fetchNextPage,
    hasNextPage,
    isFetchingPreviousPage,
  } = useCandlestickInfiniteQuery({
    market: marketCode,
    timeframe: timeFrame,
  });

  const liveCandle = useLiveCandle({
    code: marketCode,
    timeFrame,
  });

  const chartData = useChartData({
    candles,
    liveCandle,
    timeFrame,
  });

  const throttledLoadMore = useThrottledCallback(() => {
    if (isFetchingPreviousPage || !hasNextPage) {
      return;
    }
    fetchNextPage();
  }, 1000);

  const handleVisibleRangeChange = (range: LogicalRange | null) => {
    if (range && range.from < 5) {
      throttledLoadMore();
    }
  };

  const handleCrosshairMove = (candle: CandlestickData | null) => {
    if (!candle) {
      setLegendData(null);
      return;
    }

    const changeRate = candle.open === 0 ? 0 : (candle.close - candle.open) / candle.open;

    setLegendData({
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
      changeRate,
    });
  };

  useEffect(() => {
    if (chartCommandsRef.current) {
      chartCommandsRef.current.fitToContent();
    }
  }, [timeFrame]);

  return (
    <div className="w-full bg-white">
      <ChartTimeFrames timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      <div className="relative w-full">
        <ChartLegend legendData={legendData} />
        <CandlestickChart
          data={chartData}
          isMinuteChart={timeFrame.includes('minutes')}
          events={{
            onVisibleRangeChange: handleVisibleRangeChange,
            onCrosshairMove: handleCrosshairMove,
          }}
          chartCommandsRef={chartCommandsRef}
        />
      </div>
    </div>
  );
};
