import { UpbitSocketType } from '@/src/shared/lib/upbitSocket/type';
import { v4 as uuidv4 } from 'uuid';

type SenderFunction = (msg: any) => void;

export class UpbitSubscriptionManager {
  private subscriptions: Record<UpbitSocketType, Map<string, number>> = {
    ticker: new Map(),
    orderbook: new Map(),
    trade: new Map(),
    'candle.1m': new Map(),
    'candle.15m': new Map(),
    'candle.60m': new Map(),
    'candle.240m': new Map(),
  };

  private socketSender: SenderFunction | null = null;
  private updateTimeout: NodeJS.Timeout | null = null;
  private isUpdatePending = false;
  private readonly THROTTLE_MS = 20;
  private readonly UPBIT_TYPES: UpbitSocketType[] = [
    'ticker',
    'orderbook',
    'trade',
    'candle.1m',
    'candle.15m',
    'candle.60m',
    'candle.240m',
  ];

  public registerSender(sender: SenderFunction) {
    this.socketSender = sender;
  }

  public add(type: UpbitSocketType, codes: string[]) {
    const map = this.subscriptions[type];
    let changed = false;

    codes.forEach(code => {
      const count = map.get(code) || 0;
      map.set(code, count + 1);
      if (count === 0) {
        changed = true;
      }
    });

    if (changed) {
      this.scheduleUpdate();
    }
  }

  public remove(type: UpbitSocketType, codes: string[]) {
    const map = this.subscriptions[type];
    let changed = false;

    codes.forEach(code => {
      const count = map.get(code);
      if (count) {
        if (count === 1) {
          map.delete(code);
          changed = true;
        } else {
          map.set(code, count - 1);
        }
      }
    });

    if (changed) {
      this.scheduleUpdate();
    }
  }

  public clear() {
    this.subscriptions.ticker.clear();
    this.subscriptions.orderbook.clear();
    this.subscriptions.trade.clear();
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
  }

  private scheduleUpdate() {
    if (this.updateTimeout) {
      this.isUpdatePending = true;
      return;
    }

    this.updateTimeout = setTimeout(() => {
      this.flushSubscriptions();
      this.updateTimeout = null;
      if (this.isUpdatePending) {
        this.isUpdatePending = false;
        this.scheduleUpdate();
      }
    }, this.THROTTLE_MS);
  }

  private flushSubscriptions() {
    if (!this.socketSender) {
      return;
    }

    const payload: any[] = [{ ticket: uuidv4() }];
    let hasSubscription = false;

    this.UPBIT_TYPES.forEach(type => {
      const map = this.subscriptions[type];
      if (0 < map.size) {
        payload.push({
          type,
          codes: Array.from(map.keys()),
          isOnlyRealtime: true,
        });
        hasSubscription = true;
      }
    });

    if (hasSubscription) {
      this.socketSender(payload);
    }
  }
}

export const upbitSubscriptionManager = new UpbitSubscriptionManager();
