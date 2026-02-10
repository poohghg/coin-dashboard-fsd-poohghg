# React Concurrent WebSocket Store

React 18의 `useSyncExternalStore`와 Singleton 패턴을 활용한 **고성능 웹소켓 상태 관리 모듈**입니다.
단일 소켓 연결로 다중 데이터를 처리(Multiplexing)하며, 불필요한 리렌더링을 방지하고 자동 리소스 정리를 지원합니다.

---

## 1. 💡 Motivation (도입 배경)

기존의 `useEffect`와 `useState`를 이용한 웹소켓 구현 방식에는 다음과 같은 한계가 있었습니다.

1. **Over-fetching & Connection Limit:** 컴포넌트마다 소켓을 연결하면 브라우저 연결 제한(약 6개)에 걸리고 서버 부하가 가중됩니다.
2. **Rendering Performance:** 고빈도 데이터(주식, 코인 시세 등) 수신 시, 상태 업데이트 스케줄링이 꼬이거나 불필요한 컴포넌트까지 리렌더링되는 성능 저하�� 발생합니다.
3. **Tearing:** React 18의 동시성 렌더링(Concurrent Rendering) 중 UI와 데이터 상태가 일시적으로 불일치하는 현상이 발생할 수 있습니다.
4. **Complex Cleanup:** 페이지 이동이나 컴포넌트 언마운트 시 연결 해제/재연결 로직을 개별적으로 관리하기 어렵습니다.

이러한 문제를 해결하기 위해 **"하나의 물리적 연결(Connection) 위에서 논리적 구독(Subscription)을 분리"**하는 중앙 집중식 매니저를 개발했습니다.

---

## 2. 🚀 Architecture & Advantages (구조 및 장점)

### Architecture Diagram

```mermaid
[WebSocket Server]
      │ (Physical Connection: 1 per URL)
      ▼
[SocketManager (Singleton)]
      │ Parses Message & Extracts Key
      │ (e.g., "ticker:BTC", "chat:Room1")
      ▼
[Store (Map<Key, Data>)]
      │ Notify specific listeners only
      ▼
[React Components]
(Componet A: BTC)  (Component B: XRP)  (Component C: Chat)
      ▲                  ▲                   ▲
      │ UseSyncExternalStore (Selective Update)
```

### Key Advantages

1. **Multiplexing (다중화):** URL당 단 하나의 소켓 연결만 유지합니다. 여러 컴포넌트가 같은 URL을 사용하면 자동으로 연결을 공유합니다.
2. **Selective Rendering:** 소켓 데이터가 쏟아져도, 해당 데이터의 `Topic(Key)`을 구독하는 컴포넌트만 정확히 리렌더링됩니다.
3. **Automatic Resource Management:**
   - **Reference Counting:** 구독자 수를 추적합니다.
   - **Delayed Cleanup:** 구독자가 0명이 되어도 즉시 끊지 않고(기본 2초), 페이지 이동 간 재연결 비용을 방지합니다.
4. **Reliability:** 연결 끊김 시 `Exponential Backoff`(지수 백오프) 전략으로 자동 재연결을 시도합니다.
5. **SSR Support:** Next.js 등 서버 사이드 렌더링 환경에서의 Hydration Error를 방지합니다.

---

## 3. ✨ Features (주요 특징)

- **`KeyExtractor` 전략:** 단순 ID뿐만 아니라 데이터 타입과 결합한 **복합 키(Composite Key)** 생성을 지원하여, 하나의 소켓에서 다양한 종류의 데이터(Ticker,
  Orderbook, Chat)를 충돌 없이 처리합니다.
- **Connection Assurance:** `ensureConnection()` 메서드를 통해 필요시(예: 버튼 클릭) 즉시 연결 상태를 보장할 수 있습니다.
- **Performance Optimization:** 스토어 업데이트는 동기(Sync)로, 렌더링은 마이크로태스크 큐를 통한 배칭(Batching)으로 처리되어 UI 블로킹을 최소화합니다.

---

## 4. 📚 API Reference

### `SocketManagerOptions`

| Property            | Type                           | Default | Description                            |
| ------------------- | ------------------------------ | ------- | -------------------------------------- |
| `url`               | `string`                       | -       | 연결할 웹소켓 URL                      |
| `keyExtractor`      | `(msg: any) => string \| null` | -       | 메시지에서 고유 식별자를 추출하는 함수 |
| `maxReconnectDelay` | `number`                       | `30000` | 재연결 시도 최대 대기 시간(ms)         |
| `cleanupDelay`      | `number`                       | `2000`  | 구독자 0명 시 연결 해제 대기 시간(ms)  |

### Hook: `useWebSocket<T>`

```typescript
const { data, sendMessage, ensureConnection, readyState } = useWebSocket<T>({
  url: string,
  topic: string,
  keyExtractor: msg => string | null,
});
```

- **Parameters:**
  - `url`: 소켓 서버 주소.
  - `topic`: 이 컴포넌트가 구독할 데이터의 키 (예: `'ticker:BTC'`).
  - `keyExtractor`: 들어오는 메시지가 어떤 토픽인지 판별하는 함수.
- **Returns:**
  - `data`: 최신 데이터 (`T | null`).
  - `sendMessage`: 메시지 전송 함수.
  - `ensureConnection`: 연결이 끊겨있을 때 강제 재연결 시도 함수.

---

## 5. 🛠 Usage (사용법)

### Step 1. KeyExtractor 정의

서버에서 내려오는 메시지 구조에 맞춰 고유 키 생성 로직을 작성합니다.

```typescript
// utils/socketUtils.ts
export const appKeyExtractor = (msg: any) => {
  // 예: { type: "ticker", code: "BTC", price: ... }
  if (msg.type === 'ticker') return `ticker:${msg.code}`;

  // 예: { type: "chat", roomId: "101", text: ... }
  if (msg.type === 'chat') return `chat:${msg.roomId}`;

  return null; // 알 수 없는 메시지는 무시
};
```

### Step 2. 컴포넌트에서 사용

같은 URL을 사용하더라도, `topic`에 따라 서로 다른 데이터를 받아 렌더링합니다.

```tsx
import { useWebSocket } from './hooks/useWebSocket';
import { appKeyExtractor } from './utils/socketUtils';

// 📈 비트코인 가격 컴포넌트
const BitcoinTicker = () => {
  // 'ticker:BTC' 데이터가 올 때만 리렌더링 됨
  const { data } = useWebSocket({
    url: 'wss://api.exchange.com',
    topic: 'ticker:BTC',
    keyExtractor: appKeyExtractor,
  });

  return <div>BTC Price: {data?.price}</div>;
};

// 💬 채팅방 컴포넌트 (같은 소켓 연결 공유!)
const ChatRoom = ({ roomId }) => {
  const { data, sendMessage } = useWebSocket({
    url: 'wss://api.exchange.com',
    topic: `chat:${roomId}`,
    keyExtractor: appKeyExtractor,
  });

  const send = () => sendMessage({ type: 'chat', roomId, text: 'Hello' });

  return (
    <div>
      <p>Last Msg: {data?.text}</p>
      <button onClick={send}>Send</button>
    </div>
  );
};
```

---

## 6. ⚠️ Performance Note (성능 관련 참고사항)

이 모듈은 리액트의 렌더링 성능을 극대화하기 위해 다음과 같이 동작합니다.

1. **Store Update (Sync):** 웹소켓 메시지가 도착하면 `Map` 데이터는 **즉시(동기)** 업데이트됩니다. 따라서 데이터의 정합성은 항상 보장됩니다.
2. **UI Render (Microtask):** 리액트의 `useSyncExternalStore`는 업데이트 신호를 받아 **마이크로태스크 큐(Microtask Queue)**에 렌더링 작업을 예약합니다.
   - 데이터가 1ms마다 들어와도, 브라우저가 처리 가능한 프레임 단위로 **Batching(일괄 처리)**되어 렌더링되므로 렉(Lag)이 발생하지 않습니다.
