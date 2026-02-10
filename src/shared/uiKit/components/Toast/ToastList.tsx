'use client';

import { useAutoClose, useTransitionState } from '@/src/shared/lib/hooks';
import { cn, toasts } from '@/src/shared/uiKit';
import { useToast } from '@/src/shared/uiKit/components/Toast/lib/useToast';
import type { Toast, ToastType } from '@/src/shared/uiKit/components/Toast/model/type';
import { XIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';

const toastTypeClasses: Record<ToastType, { container: string }> = {
  success: {
    container: 'border-blue-200 bg-white text-blue-800',
  },
  error: {
    container: 'border-red-200 bg-white text-red-800',
  },
  warn: {
    container: 'border-yellow-200 bg-white text-yellow-800',
  },
  info: {
    container: 'border-green-200 bg-white text-green-800',
  },
};

const ToastItem = ({ type, id, message, delay }: Toast) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { isClose, close } = useTransitionState(100);

  useAutoClose(delay, close);

  const animateClasses = isClose ? 'animate-out' : 'animate-in';

  return (
    <div
      ref={ref}
      className={cn(
        `pointer-events-auto relative flex w-[280px] max-w-[320px] items-center justify-between overflow-hidden rounded-lg border px-4 py-3 shadow-lg transition-all duration-1000 ${toastTypeClasses[type].container} `,
        animateClasses
      )}
      onAnimationEnd={() => {
        if (isClose) {
          toasts.close(id);
        }
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-[13px] leading-none font-medium">{message}</p>
      </div>
      <button onClick={close} className="ml-4 opacity-50 transition-opacity hover:opacity-100">
        <XIcon />
      </button>
      <div
        className={`absolute bottom-0 left-0 h-1 w-full opacity-20 ${toastTypeClasses[type].container.split(' ')[0].replace('border', 'bg')}`}
      />
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

export default dynamic(() => Promise.resolve(ToastList), { ssr: false });
