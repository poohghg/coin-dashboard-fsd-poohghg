import { v4 as uuidv4 } from 'uuid';

export type UpbitType = 'ticker' | 'orderbook' | 'trade';
type SenderFunction = (msg: any) => void;

export class UpbitSubscriptionManager {
  private subscriptions: Record<UpbitType, Map<string, number>> = {
    ticker: new Map(),
    orderbook: new Map(),
    trade: new Map(),
  };

  private socketSender: SenderFunction | null = null;
  private updateTimeout: NodeJS.Timeout | null = null;
  private isUpdatePending = false;
  private readonly THROTTLE_MS = 20;
  private readonly UPBIT_TYPES: UpbitType[] = ['ticker', 'orderbook', 'trade'];

  public registerSender(sender: SenderFunction) {
    this.socketSender = sender;
  }

  public add(type: UpbitType, codes: string[]) {
    const map = this.subscriptions[type];
    let changed = false;

    codes.forEach(code => {
      const count = map.get(code) || 0;
      map.set(code, count + 1);
      if (count === 0) changed = true; // 새로 추가된 경우 중복은 변경 아님
    });

    if (changed) this.scheduleUpdate();
  }

  public remove(type: UpbitType, codes: string[]) {
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

    if (changed) this.scheduleUpdate();
  }

  public clear() {
    this.subscriptions.ticker.clear();
    this.subscriptions.orderbook.clear();
    this.subscriptions.trade.clear();
    if (this.updateTimeout) clearTimeout(this.updateTimeout);
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
    if (!this.socketSender) return;

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
