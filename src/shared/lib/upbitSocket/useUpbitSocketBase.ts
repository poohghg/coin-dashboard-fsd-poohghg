'use client';

import { UpbitSocketType } from '@/src/shared/lib/upbitSocket/type';
import { upbitSubscriptionManager } from '@/src/shared/lib/upbitSocket/UpbitSubscriptionManager';
import { useWebSocket } from '@/src/shared/lib/webSocket/lib/useWebSocket';
import { useEffect } from 'react';

const UPBIT_SOCKET_URL = 'wss://api.upbit.com/websocket/v1';
const upbitKeyExtractor = (message: any) => {
  if (message.type && message.code) {
    return `${message.type}:${message.code}`;
  }
  return null;
};

interface UseUpbitSocketBaseProps {
  type: UpbitSocketType;
  code: string;
}

export const useUpbitSocketBase = <T>({ type, code }: UseUpbitSocketBaseProps) => {
  const key = `${type}:${code}`;

  const { lastMessage, lastMessages, sendMessage } = useWebSocket<T>({
    url: UPBIT_SOCKET_URL,
    key,
    keyExtractor: upbitKeyExtractor,
  });

  useEffect(() => {
    upbitSubscriptionManager.registerSender(sendMessage);
  }, [sendMessage]);

  useEffect(() => {
    upbitSubscriptionManager.add(type, [code]);
    return () => {
      upbitSubscriptionManager.remove(type, [code]);
    };
  }, [type, code]);

  return {
    lastMessage,
    lastMessages,
  };
};
