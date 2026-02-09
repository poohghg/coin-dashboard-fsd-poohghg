import { throttle } from 'lodash';
import { useEffect, useRef } from 'react';

export const useThrottledCallback = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
  const callbackRef = useRef(callback);
  const throttledRef = useRef<ReturnType<typeof throttle> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  if (!throttledRef.current) {
    throttledRef.current = throttle((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay);
  }

  useEffect(() => {
    return () => {
      throttledRef.current?.cancel();
    };
  }, []);

  return throttledRef.current!;
};
