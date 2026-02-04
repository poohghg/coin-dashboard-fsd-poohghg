import { getSocketManager } from '@/src/shared/lib/webSocket/model/socketManagerStore';
import { KeyExtractor } from '@/src/shared/lib/webSocket/model/type';
import { useCallback, useSyncExternalStore } from 'react';

interface UseWebSocketParams {
  url: string;
  key: string; // 구독할 데이터의 식별자
  keyExtractor: KeyExtractor; // 메시지가 왔을 때 key을 판별하는 로직
}

export const useWebSocket = <T>({ url, key, keyExtractor }: UseWebSocketParams) => {
  const manager = getSocketManager(url, keyExtractor);

  const data = useSyncExternalStore<T | null>(
    useCallback(onStoreChange => manager.subscribe(key, onStoreChange), [manager, key]),
    useCallback(() => manager.getSnapshot(key), [manager, key]),
    () => null
  );

  const sendMessage = useCallback(
    (msg: any) => {
      manager.sendMessage(msg);
    },
    [manager]
  );

  return {
    data: data,
    sendMessage,
    readyState: manager.getStatus(),
  };
};
