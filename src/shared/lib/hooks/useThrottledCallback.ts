import { throttle } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';

export const useThrottledCallback = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCanvas = useMemo(() => {
    // eslint-disable-next-line react-hooks/refs
    const throttledFn = throttle((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay);

    return throttledFn;
  }, [delay]);

  useEffect(() => {
    return () => {
      throttledCanvas.cancel();
    };
  }, [throttledCanvas]);

  return throttledCanvas;
};
