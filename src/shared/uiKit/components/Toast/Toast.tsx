'use client';

import { useAutoClose } from '@/src/shared/lib/hooks';
import { toasts } from '@/src/shared/uiKit';
import { useToast } from '@/src/shared/uiKit/components/Toast/lib/useToast';
import type { Toast, ToastType } from '@/src/shared/uiKit/components/Toast/model/type';
import React, { useCallback, useEffect, useState } from 'react';

const toastTypeClasses: Record<ToastType, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warn: 'bg-yellow-500 text-black',
  info: 'bg-gray-500',
};

const ToastItem = ({ type, id, message, delay }: Toast) => {
  const [isClose, setIsClose] = useState(false);
  const [isAppearing, setIsAppearing] = useState(false);

  useEffect(() => {
    setIsAppearing(true);
  }, []);

  const handleAutoClose = useCallback(() => {
    setIsClose(true);
  }, [id]);

  useAutoClose(delay, handleAutoClose);

  const baseClasses = `px-4 py-2 rounded shadow-md text-white ${toastTypeClasses[type]} transition-all duration-200 ease-in-out`;

  const enterExitClasses = isClose
    ? 'opacity-0 translate-y-[-20px]'
    : isAppearing
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-[20px]';

  return (
    <div
      className={`${baseClasses} ${enterExitClasses}`}
      style={{
        width: '250px',
      }}
      onTransitionEnd={() => {
        if (isClose) {
          toasts.close(id);
        }
      }}
    >
      {message}
    </div>
  );
};

const Toast = () => {
  const toasts = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={'fixed top-5 right-1/2 flex flex-col gap-2 z-50 transform translate-x-1/2'}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default Toast;
