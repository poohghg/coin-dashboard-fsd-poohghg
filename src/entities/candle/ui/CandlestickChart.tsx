import { CoinViewModel } from '@/src/entities/coin';
import {
  CandlestickData,
  CandlestickSeries,
  ChartOptions,
  ColorType,
  createChart,
  DeepPartial,
  IChartApi,
  ISeriesApi,
  LogicalRange,
  MouseEventParams,
  Time,
} from 'lightweight-charts';
import React, { useEffect, useImperativeHandle, useRef } from 'react';

const THEME = {
  upColor: '#D24F45',
  downColor: '#1261C4',
  bgColor: '#FFFFFF',
  textColor: '#333333',
  gridColor: '#F0F0F0',
};

export interface ChartCommands {
  fitToContent: () => void;
  applyChartOptions: (options: DeepPartial<ChartOptions>) => void;
  setHeight: (callback: (chartContainer?: HTMLDivElement | null) => number | undefined) => void;
}

interface ChartEvents {
  onCrosshairMove?: (data: CandlestickData | null) => void;
  onVisibleRangeChange?: (range: LogicalRange | null) => void;
}

interface ChartProps {
  data: CandlestickData[];
  isMinuteChart?: boolean;
  events?: ChartEvents;
  onChart?: (chart: IChartApi) => void;
  onSeries?: (series: ISeriesApi<'Candlestick'>) => void;
  onResize?: (container: HTMLDivElement | null) => { width?: number; height?: number } | undefined;
}

export const CandlestickChart = ({
  data,
  isMinuteChart,
  events,
  onChart,
  onSeries,
  onResize,
  chartCommandsRef,
}: ChartProps & { chartCommandsRef?: React.Ref<ChartCommands> }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  const setTimeOptions = () => {
    chartRef.current?.applyOptions({
      timeScale: {
        timeVisible: isMinuteChart,
        secondsVisible: false,
        tickMarkFormatter: (time: Time) => {
          const date = new Date((time as number) * 1000);
          const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Seoul', hour12: false };
          if (isMinuteChart) {
            return date.toLocaleTimeString('ko-KR', {
              ...options,
              hour: '2-digit',
              minute: '2-digit',
              ...(date.getHours() === 0 && { month: '2-digit', day: '2-digit' }),
            });
          } else {
            return date.toLocaleDateString('ko-KR', { ...options, month: '2-digit', day: '2-digit' });
          }
        },
      },
      localization: {
        dateFormat: 'yyyy-MM-dd',
        timeFormatter: (time: Time) => {
          const date = new Date((time as number) * 1000);
          return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            ...(isMinuteChart && { hour: '2-digit', minute: '2-digit', hour12: false }),
            timeZone: 'Asia/Seoul',
          }).format(date);
        },
      },
    });
  };

  const fitToContent = () => {
    if (!chartRef.current || !seriesRef.current?.data().length) {
      return;
    }
    chartRef.current.timeScale().fitContent();
    chartRef.current.priceScale('right').applyOptions({ autoScale: true });
  };

  const applyChartOptions = (options: DeepPartial<ChartOptions>) => {
    if (!chartRef.current) {
      return;
    }
    chartRef.current.applyOptions(options);
  };

  const setHeight = (callback: (chartContainer?: HTMLDivElement | null) => number | undefined) => {
    if (!chartContainerRef.current || !chartRef.current) {
      return;
    }
    const height = callback(chartContainerRef.current);
    if (!height) {
      return;
    }
    chartRef.current.resize(chartContainerRef.current.clientWidth, height);
  };

  useImperativeHandle(chartCommandsRef, () => ({
    fitToContent,
    applyChartOptions,
    setHeight,
  }));

  useEffect(() => {
    if (!chartContainerRef.current) {
      return;
    }

    const height = window.innerHeight - chartContainerRef.current.getBoundingClientRect().top - 20;
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
      timeScale: { borderVisible: false, timeVisible: true, secondsVisible: false },
      localization: {
        dateFormat: 'yyyy-MM-dd',
        priceFormatter: (price: number) => CoinViewModel.formatPrice(price as number),
      },
      crosshair: { mode: 0, vertLine: { labelVisible: true }, horzLine: { labelVisible: true } },
      handleScroll: { horzTouchDrag: true, vertTouchDrag: true },
      handleScale: { axisPressedMouseMove: true, mouseWheel: true, pinch: true },
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

    onChart?.(chart);
    onSeries?.(series);

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  useEffect(() => {
    seriesRef.current?.setData(data);
  }, [data]);

  useEffect(() => {
    setTimeOptions();
  }, [isMinuteChart]);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    const chart = chartRef.current;

    const handleResize = () => {
      if (!onResize) {
        chart.resize(
          chartContainerRef.current!.clientWidth,
          window.innerHeight - chartContainerRef.current!.getBoundingClientRect().top - 20
        );
      } else {
        const size = onResize(chartContainerRef.current);
        chart.resize(
          size?.width ?? chartContainerRef.current!.clientWidth,
          size?.height ?? window.innerHeight - chartContainerRef.current!.getBoundingClientRect().top - 20
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onResize]);

  useEffect(() => {
    if (!events?.onCrosshairMove || !seriesRef.current) {
      return;
    }

    const chart = chartRef.current!;
    const series = seriesRef.current;

    const handler = (param: MouseEventParams<Time>) => {
      if (!param.time || !param.point) {
        events.onCrosshairMove?.(null);
        return;
      }
      const candle = param.seriesData.get(series) as CandlestickData | undefined;
      events.onCrosshairMove?.(candle ?? null);
    };

    chart.subscribeCrosshairMove(handler);
    return () => chart.unsubscribeCrosshairMove(handler);
  }, [events?.onCrosshairMove]);

  useEffect(() => {
    if (!chartRef.current || !events?.onVisibleRangeChange) {
      return;
    }

    const chart = chartRef.current;
    const handler = (range: LogicalRange | null) => {
      events.onVisibleRangeChange?.(range);
    };

    chart.timeScale().subscribeVisibleLogicalRangeChange(handler);
    return () => chart.timeScale().unsubscribeVisibleLogicalRangeChange(handler);
  }, [events?.onVisibleRangeChange]);

  return <div ref={chartContainerRef} className="w-full" />;
};
