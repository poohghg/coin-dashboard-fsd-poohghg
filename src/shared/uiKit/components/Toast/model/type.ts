export type ToastType = 'success' | 'error' | 'info' | 'warn';

export interface Toast {
  type: ToastType;
  id: string;
  message: string;
  delay: number;
}
