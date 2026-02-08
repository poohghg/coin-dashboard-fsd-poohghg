import { TimeFrame } from '@/src/entities/candle';
import { CoinViewModel } from '@/src/entities/coin';
import { LegendData } from '@/src/pages/market/ui/Chart/MarketChart';
import {
  CandlestickData,
  CandlestickSeries,
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
  LogicalRange,
  MouseEventParams,
  Time,
} from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

const THEME = {
  upColor: '#D24F45',
  downColor: '#1261C4',
  bgColor: '#FFFFFF',
  textColor: '#333333',
  gridColor: '#F0F0F0',
};

interface ChartProps {
  data: CandlestickData[];
  timeFrame: TimeFrame;
  setLegend: (data: LegendData | null) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const Chart = ({ data, setLegend, timeFrame, onLoadMore, hasMore, isLoading }: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const fetchStateRef = useRef({ onLoadMore, hasMore, isLoading });

  // Props가 바뀔 때마다 Ref 업데이트
  useEffect(() => {
    fetchStateRef.current = { onLoadMore, hasMore, isLoading };
  }, [onLoadMore, hasMore, isLoading]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const height = window.innerHeight - chartContainerRef.current.getBoundingClientRect().top;
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: height,
      layout: {
        background: { type: ColorType.Solid, color: THEME.bgColor },
        textColor: THEME.textColor,
        fontFamily: "'Pretendard', sans-serif",
      },
      grid: { vertLines: { color: THEME.gridColor }, horzLines: { color: THEME.gridColor } },
      rightPriceScale: { borderVisible: false },
      timeScale: {
        borderVisible: false,
      },
      localization: {
        priceFormatter: (price: number) => CoinViewModel.formatPrice(price as number),
        dateFormat: 'yyyy-MM-dd',
      },
      crosshair: {
        mode: 1,
        vertLine: { labelVisible: true },
        horzLine: { labelVisible: true },
      },
      handleScroll: {
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: THEME.upColor,
      downColor: THEME.downColor,
      borderVisible: false,
      wickUpColor: THEME.upColor,
      wickDownColor: THEME.downColor,
    });

    chartRef.current = chart;
    seriesRef.current = series;

    //  Ref를 통해 최신 상태 접근
    const handleRangeChange = (newRange: LogicalRange | null) => {
      const { hasMore, isLoading, onLoadMore } = fetchStateRef.current;

      if (newRange) {
        if (newRange.from < 5 && hasMore && !isLoading) {
          onLoadMore();
        }
      }
    };

    chart.timeScale().subscribeVisibleLogicalRangeChange(handleRangeChange);
    // ... (나머지 이벤트 리스너 동일) ...
    chart.subscribeCrosshairMove((param: MouseEventParams) => {
      if (!param.point || !param.time) {
        setLegend(null);
        return;
      }
      const item = param.seriesData.get(series) as CandlestickData | undefined;
      if (item) {
        const rate = (item.close - item.open) / item.open;
        setLegend({
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          changeRate: rate,
        });
      }
    });

    const handleResize = () => chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  // 데이터 변경 감지 및 업데이트
  useEffect(() => {
    if (seriesRef.current && data.length > 0) {
      seriesRef.current.setData(data);
    }
  }, [data]);

  // 타임프레임 변경 시 차트 맞춤
  useEffect(() => {
    if (chartRef.current && seriesRef.current?.data().length) {
      chartRef.current.timeScale().fitContent();
    }
    const isMinuteChart = timeFrame.includes('minutes');
    if (chartRef.current) {
      chartRef.current.applyOptions({
        timeScale: {
          timeVisible: isMinuteChart,
        },
        localization: {
          timeFormatter: (time: Time) => {
            if (!isMinuteChart) return '';
            const date = new Date((time as number) * 1000);
            return date.toLocaleString();
          },
        },
      });
    }
  }, [timeFrame]);

  return <div ref={chartContainerRef} className="w-full" />;
};
