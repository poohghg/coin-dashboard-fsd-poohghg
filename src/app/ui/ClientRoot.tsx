'use client';

import { useEffect } from 'react';

export const ClientRoot = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return <>{children}</>;
};
