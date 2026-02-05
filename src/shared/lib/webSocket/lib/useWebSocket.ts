import { getSocketManager } from '@/src/shared/lib/webSocket/model/socketManagerStore';
import { KeyExtractor } from '@/src/shared/lib/webSocket/model/type';
import { useCallback, useSyncExternalStore } from 'react';

interface UseWebSocketParams {
  url: string;
  key: string;
  keyExtractor: KeyExtractor;
}

/**
 * @param url 웹소켓 서버 URL
 * @param key 구독할 데이터의 식별자
 * @param keyExtractor 메시지가 왔을 때 key을 판별하는 로직
 * @returns
  - lastMessage: 마지막으로 수신된 메시지(최신 데이터)
  - lastMessages: 현재 업데이트 주기에 수신된 모든 메시지(전체 데이터X)
  - sendMessage: 메시지 전송 함수
  - readyState: 웹소켓 연결 상태
 */

export const useWebSocket = <T>({ url, key, keyExtractor }: UseWebSocketParams) => {
  const manager = getSocketManager(url, keyExtractor);

  const data = useSyncExternalStore<T[] | null>(
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

  // manager.socket?.addEventListener('message', event => {
  //   // Optional: 메시지 수신 시 추가 로직을 여기에 작성할 수 있습니다.
  // });

  return {
    lastMessage: data ? data[data.length - 1] : null,
    lastMessages: data,
    sendMessage,
    readyState: manager.getStatus(),
  };
};
