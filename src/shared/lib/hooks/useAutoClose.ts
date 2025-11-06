import { useCallback, useEffect, useState } from 'react';

export const useAutoClose = (duration: number, onAutoClose?: () => void) => {
  const [show, setShow] = useState<boolean>(true);

  const close = useCallback(() => {
    setShow(false);
  }, []);

  useEffect(() => {
    if (show) {
      const timerId = setTimeout(() => {
        close();
        onAutoClose?.();
      }, duration);
      return () => clearTimeout(timerId);
    }
  }, [show, close, duration, onAutoClose]);

  return show;
};
