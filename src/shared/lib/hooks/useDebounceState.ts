import { debounce } from 'lodash';
import { SetStateAction, useCallback, useMemo, useState } from 'react';

export const useDebounceState = <T>(init: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(init);

  const debouncedFunction = useMemo(
    () =>
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
    [debouncedFunction, debouncedValue]
  );

  return [debouncedValue, setValue] as const;
};
