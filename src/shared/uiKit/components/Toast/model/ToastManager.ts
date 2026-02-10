'use client';

import { Toast, ToastType } from '@/src/shared/uiKit/components/Toast/model/type';

const DEFAULT_DELAY = 3000;

class Toasts {
  constructor(
    private notify: () => void,
    private _toasts: Toast[] = []
  ) {}

  get toasts() {
    return this._toasts;
  }

  close(id: string) {
    this._toasts = this._toasts.filter(toast => toast.id !== id);
    this.notify();
  }

  allClose() {
    this._toasts = [];
    this.notify();
  }

  success(message: string, delay?: number) {
    return this.open('success', message, delay);
  }

  info(message: string, delay?: number) {
    return this.open('info', message, delay);
  }

  error(message: string, delay?: number) {
    return this.open('error', message, delay);
  }

  warn(message: string, delay?: number) {
    return this.open('warn', message, delay);
  }

  private open(type: ToastType, message: string, delay: number = DEFAULT_DELAY): string {
    const id = Date.now().toString();
    const newToast: Toast = { type, id, message, delay };
    this._toasts = [...this._toasts, newToast];
    this.notify();
    return id;
  }
}

class ToastManager {
  private static instance: ToastManager;
  public toast = new Toasts(this.notify.bind(this));
  private subscribers: Set<() => void> = new Set();

  private constructor() {}

  get toastsList() {
    return this.toast.toasts;
  }

  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  public subscribe(listener: () => void): () => void {
    this.subscribers.add(listener);

    return () => {
      this.subscribers.delete(listener);
    };
  }

  private notify() {
    this.subscribers.forEach(listener => {
      listener();
    });
  }
}

export const toastManager = ToastManager.getInstance();
export const toasts = toastManager.toast;
