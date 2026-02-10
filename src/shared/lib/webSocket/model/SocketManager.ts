import { removeManagerFromCache } from '@/src/shared/lib/webSocket/model/socketManagerStore';
import { SocketTransport } from '@/src/shared/lib/webSocket/model/SocketTransport';
import { KeyExtractor } from '@/src/shared/lib/webSocket/model/type';

interface SocketManagerOptions {
  url: string;
  keyExtractor: KeyExtractor;
  maxReconnectDelay?: number;
  cleanupDelay?: number;
  debug?: boolean;
}

export class SocketManager {
  private transport: SocketTransport;

  private readonly keyExtractor: KeyExtractor;
  private readonly cleanupDelay: number;
  private readonly url: string;

  // 상태 저장소 & 구독자 관리
  private store = new Map<string, any[]>();
  private listeners = new Map<string, Set<() => void>>();

  // 리소스 관리
  private subscriberCount = 0;
  private cleanupTimeoutId: NodeJS.Timeout | null = null;

  // 배치 처리를 위한 큐와 플래그
  private updateQueue = new Map<string, any[]>();
  private isProcessing = false;
  private processTimerId: NodeJS.Timeout | null = null;

  constructor(options: SocketManagerOptions) {
    this.url = options.url;
    this.keyExtractor = options.keyExtractor;
    this.cleanupDelay = options.cleanupDelay ?? 30000;
    this.transport = new SocketTransport({
      url: this.url,
      maxReconnectDelay: options.maxReconnectDelay ?? 30000,
      debug: options.debug ?? false,
      onMessage: e => this.handleMessage(e),
      onClose: () => this.handleTransportClose(),
    });
  }

  get socket() {
    return this.transport.getSocket;
  }

  public subscribe = (key: string, listener: () => void) => {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }

    this.listeners.get(key)!.add(listener);
    this.subscriberCount++;

    if (this.cleanupTimeoutId) {
      clearTimeout(this.cleanupTimeoutId);
      this.cleanupTimeoutId = null;
    }

    return () => {
      const keyListeners = this.listeners.get(key);
      if (keyListeners) {
        keyListeners.delete(listener);
        if (keyListeners.size === 0) {
          this.listeners.delete(key);
          this.store.delete(key);
        }
      }

      this.subscriberCount--;

      if (this.subscriberCount === 0) {
        this.cleanupTimeoutId = setTimeout(() => {
          this.cleanup();
        }, this.cleanupDelay);
      }
    };
  };

  public sendMessage = (data: any) => {
    this.transport.sendMessage(data);
  };

  public getSnapshot = (key: string) => {
    return this.store.get(key) || null;
  };

  public getStatus = () => {
    return this.transport.getStatus();
  };

  private async handleMessage(event: MessageEvent) {
    try {
      let message: any;
      if (typeof event.data === 'string') {
        message = JSON.parse(event.data);
      } else if (event.data instanceof Blob) {
        const text = await event.data.text();
        message = JSON.parse(text);
      } else {
        return;
      }

      const key = this.keyExtractor(message);

      if (key) {
        this.updateStore(key, message);
      }
    } catch (e) {
      console.error('[SocketManager] Parse error:', e);
    }
  }

  private handleTransportClose() {
    if (this.subscriberCount > 0) {
      // keep waiting for reconnect inside transport
    }
  }

  private cleanup() {
    this.transport.disconnect();
    this.store.clear();
    this.listeners.clear();
    if (this.processTimerId) {
      clearTimeout(this.processTimerId);
    }
    removeManagerFromCache(this.url);
  }

  private updateStore(key: string, data: any) {
    if (!this.listeners.has(key)) {
      return;
    }

    if (!this.updateQueue.has(key)) {
      this.updateQueue.set(key, []);
    }
    this.updateQueue.get(key)!.push(data);

    if (!this.isProcessing) {
      this.isProcessing = true;
      this.processTimerId = setTimeout(() => {
        this.flushSubscriptions();
      }, 0);
    }
  }

  private flushSubscriptions() {
    const currentQueue = this.updateQueue;
    this.updateQueue = new Map();
    this.isProcessing = false;

    currentQueue.forEach((updates, key) => {
      const keyListeners = this.listeners.get(key);

      if (!keyListeners) {
        return;
      }

      this.store.set(key, updates);
      keyListeners.forEach(listener => listener());
    });
  }
}
