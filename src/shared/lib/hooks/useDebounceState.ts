import { debounce } from 'lodash';
import { SetStateAction, useCallback, useState } from 'react';

export const useDebounceState = <T>(init: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(init);

  const debouncedFunction = useCallback(
    debounce((v: T) => {
      setDebouncedValue(v);
    }, delay),
    [delay]
  );

  const setValue = useCallback(
    (next: SetStateAction<T>) => {
      const nextValue = typeof next === 'function' ? (next as (prev: T) => T)(debouncedValue) : next;
      debouncedFunction(nextValue);
    },
    [delay, debouncedValue]
  );

  return [debouncedValue, setValue] as const;
};
