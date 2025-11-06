import { toastManager } from '@/src/shared/uiKit/components/Toast/model/ToastManager';
import { useSyncExternalStore } from 'react';

export const useToast = () => {
  return useSyncExternalStore(
    callback => toastManager.subscribe(callback),
    () => toastManager.toastsList,
    () => toastManager.toastsList
  );
};
