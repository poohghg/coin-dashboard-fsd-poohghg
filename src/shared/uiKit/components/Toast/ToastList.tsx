'use client';

import { useAutoClose, useTransitionState } from '@/src/shared/lib/hooks';
import { toasts } from '@/src/shared/uiKit';
import { useToast } from '@/src/shared/uiKit/components/Toast/lib/useToast';
import type { Toast, ToastType } from '@/src/shared/uiKit/components/Toast/model/type';
import React from 'react';

const toastTypeClasses: Record<ToastType, string> = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warn: 'bg-yellow-500 text-black',
  info: 'bg-gray-500',
};

const ToastItem = ({ type, id, message, delay }: Toast) => {
  const { isClose, isAppearing, close } = useTransitionState(100);

  useAutoClose(delay, close);

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

const ToastList = () => {
  const toasts = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={'fixed top-5 right-1/2 z-50 flex translate-x-1/2 transform flex-col gap-2'}>
      {toasts.map(toast => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastList;
