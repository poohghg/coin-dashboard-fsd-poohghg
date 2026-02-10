interface TransportOptions {
  url: string;
  maxReconnectDelay: number;
  debug: boolean;
  onMessage: (event: MessageEvent) => void;
  onClose: () => void;
}

export class SocketTransport {
  private socket: WebSocket | null = null;
  private reconnectTimeoutId: NodeJS.Timeout | null = null;
  private reconnectAttempt = 0;
  private messageQueue: string[] = [];

  constructor(private options: TransportOptions) {
    if (typeof window === 'undefined') {
      return;
    }
    this.connect();
  }

  get getSocket() {
    return this.socket;
  }

  public sendMessage(data: any) {
    const serialized = JSON.stringify(data);

    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(serialized);
    } else {
      this.log('Socket not ready. Queuing message.');
      this.messageQueue.push(serialized);
      this.ensureConnection();
    }
  }

  public ensureConnection() {
    if (!this.socket || this.socket.readyState === WebSocket.CLOSED || this.socket.readyState === WebSocket.CLOSING) {
      this.reconnectAttempt = 0;
      this.connect();
    }
  }

  public disconnect() {
    if (this.socket) {
      this.handleTransportClose(new CloseEvent('close', { code: 1000, reason: 'Manual disconnect' }), false);
    }
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
    }
    this.messageQueue = [];
  }

  public getStatus() {
    return this.socket?.readyState ?? WebSocket.CLOSED;
  }

  private connect() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      return;
    }

    this.log(`Connecting to ${this.options.url}...`);
    this.socket = new WebSocket(this.options.url);

    this.socket.onopen = () => {
      this.log('Connected');
      this.reconnectAttempt = 0;
      if (this.reconnectTimeoutId) {
        clearTimeout(this.reconnectTimeoutId);
      }
      this.flushMessageQueue();
    };

    this.socket.onmessage = this.options.onMessage;

    this.socket.onclose = event => {
      this.handleTransportClose(event);
    };

    this.socket.onerror = error => {
      console.error('[SocketTransport] Error:', error);
    };
  }

  private handleTransportClose(event: CloseEvent, reconnect: boolean = true) {
    this.log(`Disconnected (Code: ${event.code})`);
    this.log('Close event:', event);
    this.socket = null;
    this.options.onClose();
    if (reconnect) {
      this.scheduleReconnect();
    }
  }

  private flushMessageQueue() {
    if (this.messageQueue.length === 0) {
      return;
    }

    const index = 0;
    while (this.messageQueue.length > 0 && this.socket?.readyState === WebSocket.OPEN) {
      const msg = this.messageQueue.shift();
      if (msg) {
        setTimeout(() => {
          this.socket!.send(msg);
        }, index * 1000);
      } else {
        if (msg) {
          this.messageQueue.unshift(msg);
        }
        break;
      }
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
    }

    const delay = Math.min(1000 * 2 ** this.reconnectAttempt, this.options.maxReconnectDelay);

    this.log(`Reconnecting in ${delay}ms... (Attempt: ${this.reconnectAttempt + 1})`);

    this.reconnectTimeoutId = setTimeout(() => {
      this.reconnectAttempt++;
      this.connect();
    }, delay);
  }

  private log(...args: any[]) {
    if (this.options.debug) {
      console.log(`[SocketTransport]`, ...args);
    }
  }
}
