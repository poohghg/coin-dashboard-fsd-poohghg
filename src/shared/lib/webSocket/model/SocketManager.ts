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
  private store = new Map<string, any>();
  private listeners = new Map<string, Set<() => void>>();

  // 리소스 관리
  private subscriberCount = 0;
  private cleanupTimeoutId: NodeJS.Timeout | null = null;

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
    // 연결이 끊겨도 구독자가 있다면 Transport 내부에서 재연결을 시도하므로
    // 여기서 특별히 할 일은 없으나, 필요하다면 UI 갱신 로직 추가 가능
    if (this.subscriberCount > 0) {
      // keep waiting for reconnect inside transport
    }
  }

  private cleanup() {
    this.transport.disconnect();
    removeManagerFromCache(this.url);
  }

  private updateStore(key: string, data: any) {
    this.store.set(key, data);
    if (this.listeners.has(key)) {
      this.listeners.get(key)!.forEach(listener => listener());
    }
  }
}
