import { useCallback, useEffect, useState } from 'react';

export const useTransitionState = (duration?: number) => {
  const [isClose, setIsClose] = useState(false);
  const [isAppearing, setIsAppearing] = useState(false);

  const close = useCallback(() => {
    setIsClose(true);
  }, []);

  useEffect(() => {
    const refId = setTimeout(() => {
      setIsAppearing(true);
    }, duration ?? 0);
    return () => {
      clearTimeout(refId);
    };
  }, []);

  return {
    isClose,
    isAppearing,
    close,
  };
};
