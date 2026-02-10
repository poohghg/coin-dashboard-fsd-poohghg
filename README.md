# 📈 Coin — 실시간 암호화폐 트레이딩 대시보드

> **Upbit 퍼블릭 API & WebSocket**을 활용한 실시간 암호화폐 시세 조회 웹 애플리케이션  
> 클린 아키텍처(Clean Architecture) + Feature-Sliced Design(FSD) 기반 포트폴리오 프로젝트

---

## 📌 프로젝트 소개

이 프로젝트는 **Upbit 퍼블릭 REST API**와 **WebSocket**을 활용하여 KRW 마켓의 암호화폐 시세를 실시간으로 조회할 수 있는 트레이딩 대시보드입니다. 코인 리스트 조회, 실시간 호가(오더북), 체결 내역, 캔들스틱 차트 등 거래소 핵심 기능을 구현했습니다.

단순한 기능 구현을 넘어, **클린 아키텍처의 레이어 분리 모델**과 **Feature-Sliced Design의 폴더 구조**를 결합한 설계를 적용하여, 확장성과 유지보수성을 갖춘 프론트엔드 아키텍처를 설계하는 것에 중점을 두었습니다.

또한 실시간 통신을 위한 **커스텀 WebSocket 라이브러리**를 직접 설계·구현하여, 자동 재연결, 메시지 배치 처리, 구독 관리 등 프로덕션 레벨의 소켓 통신 인프라를 구축했습니다.

---

## 🖥️ 주요 화면 및 기능

### 홈 — 코인 리스트

- KRW 마켓 전체 코인 목록을 실시간 시세와 함께 조회
- **검색**: 한글명, 영문명, 심볼로 즉시 필터링 (디바운스 적용)
- **정렬**: 현재가, 전일 대비, 거래대금 등 컬럼 헤더 클릭으로 ASC/DESC 토글
- **즐겨찾기**: 관심 코인 등록/해제, 별도 탭에서 모아보기 (localStorage 영속화)
- **실시간 업데이트**: WebSocket Ticker 구독으로 가격·변동률 실시간 반영

### 마켓 상세 — 코인 상세 정보

- **실시간 호가(오더북)**: 매수/매도 호가 10단계를 실시간 WebSocket으로 스트리밍, 호가 비율 시각화
- **체결 내역**: 최근 거래 체결 데이터를 실시간으로 수신하여 표시 (ASK/BID 구분)
- **캔들스틱 차트**: TradingView Lightweight Charts를 활용한 OHLC 차트 렌더링
  - 지원 타임프레임: 1분, 15분, 1시간, 4시간, 일, 주, 월
  - 무한 스크롤 방식으로 과거 데이터 로드 (Infinite Query)
  - WebSocket을 통한 실시간 캔들 업데이트 반영

---

## 1. 기술 스택

### 프레임워크 & 언어

| 기술 | 버전 | 선택 이유 |
|------|------|-----------|
| **Next.js** | 15 (App Router) | React Server Components(RSC)를 활용하여 초기 데이터를 서버에서 패칭한 뒤, React Query의 Dehydration을 통해 클라이언트로 전달하는 SSR/CSR 하이브리드 렌더링 구현. App Router의 레이아웃 중첩과 동적 라우트(`[market]/[tab]`)를 활용한 직관적인 페이지 구조 설계. |
| **TypeScript** | 5 | 도메인 모델(Coin, Orderbook, Trade, Candle), DTO, Mapper 등 모든 계층에 타입을 적용하여 컴파일 타임에 타입 오류를 사전 차단. 특히 WebSocket 메시지 타입과 Zod 스키마 추론 타입(`z.infer`)을 연계하여 런타임 검증과 타입 안정성을 동시에 확보. |
| **React** | 19 | React 19의 최신 기능 활용. |

### 상태 관리 & 데이터 패칭

| 기술 | 선택 이유 |
|------|-----------|
| **TanStack React Query 5** | 서버 상태(코인 리스트, 캔들 데이터 등)의 캐싱, 자동 갱신, SSR Dehydration을 담당. `getDehydratedQuery` 유틸리티를 통해 서버 컴포넌트에서 프리패칭한 데이터를 클라이언트 캐시에 자연스럽게 주입. Infinite Query를 활용한 캔들 차트 페이지네이션 구현. |
| **Zustand** | 즐겨찾기와 같은 순수 클라이언트 상태를 관리. `localStorage`와 연동하여 페이지 새로고침 후에도 상태를 유지하는 영속화(Persistence) 패턴 적용. 보일러플레이트 없이 가볍게 사용할 수 있어 클라이언트 전용 상태에 적합. |

### UI & 스타일링

| 기술 | 선택 이유 |
|------|-----------|
| **Tailwind CSS 4** | 유틸리티 기반의 빠른 UI 개발. 클래스 기반 스타일링으로 컴포넌트 수준에서 스타일을 캡슐화하고, 반응형 디자인을 직관적으로 적용. `tailwind-merge`와 `clsx`를 조합하여 조건부 클래스 관리. |
| **Radix UI** | Label, RadioGroup 등 접근성(a11y)이 보장된 헤드리스 UI 컴포넌트를 활용. 스타일 없이 동작 로직만 제공하므로 Tailwind CSS와의 조합에 최적화. |
| **Lucide React** | 일관된 아이콘 시스템. 트리쉐이킹을 지원하여 사용하는 아이콘만 번들에 포함. |

### 차트 & 가상화

| 기술 | 선택 이유 |
|------|-----------|
| **Lightweight Charts (TradingView)** | 금융 차트에 최적화된 경량 라이브러리. OHLC 캔들스틱, 거래량 히스토그램 등 트레이딩 차트 전용 기능을 네이티브로 제공. UTCTimestamp 기반의 시간축 처리를 도메인 모델에서 직접 변환하여 차트 데이터로 활용. |
| **React Virtuoso** | 200개 이상의 코인 리스트를 가상 스크롤로 렌더링하여 DOM 노드 수를 최소화. 뷰포트에 보이는 항목만 렌더링하므로 대량 데이터에서도 60fps 스크롤 성능 유지. |

### 데이터 검증 & 유틸리티

| 기술 | 선택 이유 |
|------|-----------|
| **Zod** | Upbit API 응답 및 WebSocket 메시지를 런타임에 스키마 검증. `safeParse`를 통해 예상치 못한 응답 구조에도 앱이 크래시하지 않도록 방어적 파싱 적용. 스키마에서 TypeScript 타입을 자동 추론(`z.infer`)하여 DTO 타입 정의와 검증 로직을 단일 소스에서 관리. |
| **date-fns** | 캔들 차트 시간축 변환, 체결 시간 포맷팅 등 날짜 관련 유틸리티 처리. |
| **lodash** | `throttle`, `debounce` 등 검증된 유틸리티 함수를 커스텀 훅에서 활용. |
| **uuid** | Upbit WebSocket 요청 시 티켓(ticket) 식별자 생성. |

---

## 2. 주요 구현 사항

### 2-1. 클린 아키텍처 기반 도메인 모델링

외부 API 의존성을 UI로부터 완전히 분리하기 위해, 각 도메인 엔티티(Coin, Orderbook, Trade, Candle)마다 **일관된 5계층 구조**를 적용했습니다. 이 구조를 통해 Upbit API의 응답 형식이 변경되더라도 Mapper 계층만 수정하면 되며, UI 코드는 도메인 모델에만 의존하므로 영향을 받지 않습니다.

```
Upbit API 응답 → DTO(type.ts) → Zod Schema 검증(schema.ts) → Mapper 변환(mapper.ts) → Domain Entity(domain/) → Service/UI
```

| 계층 | 파일 | 역할 | 구체적 내용 |
|------|------|------|-------------|
| **DTO** | `type.ts` | API 응답 원본 타입 | Upbit REST/Socket 응답의 snake_case 필드를 그대로 타입으로 정의. API 계약서 역할. |
| **Schema** | `schema.ts` | 런타임 검증 | Zod 스키마로 응답 구조를 검증하고, `safeParse`로 유효하지 않은 데이터를 안전하게 필터링. |
| **Domain** | `domain/Derived*.ts` | 비즈니스 모델 | getter 기반의 도메인 클래스. `DerivedCoin`은 `symbol` 추출, `isWarning` 판별 등 비즈니스 로직을 캡슐화. `DerivedCandle`은 `isBullish`(양봉 여부), `candlestickData`(차트 데이터 변환) 등을 제공. |
| **Mapper** | `mapper.ts` | DTO → Domain 변환 | REST DTO와 Socket DTO 각각에 대한 변환 메서드를 분리. 예: `CoinMapper.toCoin(market, ticker)` — 마켓 정보와 시세를 결합하여 도메인 모델 생성, `CoinMapper.toCoinFromSocket(prev, socket)` — 기존 데이터에 실시간 업데이트를 병합. |
| **Repository** | `repository.ts` | 데이터 접근 추상화 | API 호출과 매핑을 조합. 예: `CoinRepository.getCoins()`는 마켓 목록 API와 시세 API를 `Promise.all`로 병렬 호출 후 매핑. |

**장점:**
- **API 변경 격리**: Upbit API 응답 형식이 변경되어도 Mapper만 수정하면 UI/비즈니스 로직에 영향 없음
- **테스트 용이성**: 각 계층을 독립적으로 단위 테스트 가능 (Repository를 모킹하면 Service를 고립 테스트)
- **일관성**: 4개 엔티티 모두 동일한 패턴을 따르므로, 새 엔티티 추가 시 학습 비용 최소화

### 2-2. 커스텀 WebSocket 라이브러리

실시간 데이터 통신을 위해 범용 WebSocket 라이브러리를 직접 설계·구현했습니다. 단순한 WebSocket 래퍼가 아닌, **연결 관리 → 메시지 배치 처리 → React 상태 동기화**까지 3계층으로 관심사를 분리한 구조입니다.

```
┌──────────────────────────────────────────────────────────────┐
│                    useWebSocket (React Hook)                  │
│  useSyncExternalStore 기반 React 상태 동기화                   │
│  URL별 싱글톤 매니저 캐싱으로 중복 연결 방지                     │
├──────────────────────────────────────────────────────────────┤
│                      SocketManager                            │
│  키(key) 기반 구독/해지 패턴 (Observer Pattern)                 │
│  updateQueue + setTimeout(0) 비동기 메시지 배치 처리             │
│  스냅샷 저장소로 최신 데이터 즉시 접근 가능                       │
│  구독자 0명 시 30초 후 자동 정리 (메모리 누수 방지)               │
├──────────────────────────────────────────────────────────────┤
│                     SocketTransport                            │
│  WebSocket 네이티브 연결 수명 주기 관리                          │
│  지수 백오프 자동 재연결 (1s → 2s → 4s → ... → 최대 30s)        │
│  연결 전 메시지 큐잉 → 연결 완료 후 자동 flush                   │
└──────────────────────────────────────────────────────────────┘
```

#### SocketTransport — 연결 관리 계층

WebSocket의 저수준 연결 관리를 담당합니다.

- **자동 재연결**: 연결이 끊어졌을 때 지수 백오프(Exponential Backoff) 전략으로 재연결을 시도합니다. 재연결 간격은 `Math.min(1000 * 2^attempt, maxReconnectDelay)`로 계산되어, 1초 → 2초 → 4초 → 8초 → ... → 최대 30초까지 점진적으로 증가합니다. 이를 통해 서버 과부하를 방지하면서도 빠른 복구를 보장합니다.
- **메시지 큐잉**: 소켓이 아직 연결되지 않은 상태(`OPEN`이 아닌 상태)에서 발송 요청된 메시지는 내부 `messageQueue`에 저장됩니다. 연결이 완료되면 `flushMessageQueue()`가 호출되어 큐에 쌓인 메시지를 순차적으로 전송합니다.
- **안전한 해제**: `disconnect()` 호출 시 재연결 타이머를 정리하고, 메시지 큐를 비우며, WebSocket을 정상 종료합니다.

#### SocketManager — 구독/배치 처리 계층

메시지 라우팅과 구독자 관리를 담당합니다.

- **키 기반 구독 (Observer Pattern)**: 컴포넌트는 특정 `key`(예: `"ticker"`, `"orderbook"`)를 기준으로 구독합니다. 같은 키를 구독하는 여러 컴포넌트가 있어도 메시지는 한 번만 수신·파싱되며, 모든 구독자에게 전달됩니다.
- **메시지 배치 처리**: 짧은 시간 내에 다수의 메시지가 도착할 경우, `updateQueue`에 쌓아두었다가 `setTimeout(0)`을 통해 마이크로태스크 큐에서 한 번에 구독자에게 전달합니다. 이를 통해 React의 불필요한 다중 리렌더링을 방지합니다.
- **스냅샷 저장**: 각 키별 최신 데이터를 스냅샷으로 보관하여, `useSyncExternalStore`의 `getSnapshot`에 즉시 반환합니다.
- **자동 정리**: 특정 키의 구독자가 0명이 된 후 30초(`cleanupDelay`)가 경과하면 해당 키의 스냅샷과 큐를 자동으로 정리하여 메모리 누수를 방지합니다.

#### useWebSocket — React 통합 계층

React 컴포넌트에서 WebSocket 데이터를 선언적으로 사용할 수 있게 합니다.

- **`useSyncExternalStore` 활용**: React 18+의 `useSyncExternalStore`를 사용하여 외부 저장소(SocketManager)의 상태를 React 렌더 사이클과 안전하게 동기화합니다. Tearing 현상 없이 Concurrent Mode에서도 일관된 상태를 보장합니다.
- **싱글톤 캐싱**: 동일한 WebSocket URL에 대해 `SocketManager` 인스턴스를 하나만 생성하고 캐싱합니다. 여러 컴포넌트가 같은 소켓에 연결해도 물리적 연결은 하나만 유지되어 리소스를 절약합니다.
- **반환 인터페이스**: `{ lastMessage, lastMessages, sendMessage, readyState }`를 반환하여 최신 메시지 조회, 메시지 전송, 연결 상태 확인을 제공합니다.

### 2-3. Upbit 소켓 통합 (UpbitSubscriptionManager)

커스텀 WebSocket 라이브러리 위에, Upbit WebSocket 프로토콜에 특화된 구독 관리 계층을 구현했습니다.

- **레퍼런스 카운팅 구독 관리**: 각 구독 타입(`ticker`, `orderbook`, `trade`, `candle.*`)별로 `Map<코인코드, 참조횟수>`를 관리합니다. 같은 코인의 ticker를 구독하는 컴포넌트가 3개면 참조 카운트가 3이 되고, 모두 언마운트되어 카운트가 0이 되었을 때만 실제 구독 해지 메시지를 전송합니다. 이를 통해 불필요한 구독/해지 요청을 최소화합니다.
- **쓰로틀 배치 전송 (20ms Window)**: 여러 컴포넌트가 거의 동시에 마운트되며 각각 구독을 요청할 때, 20ms 윈도우 내의 요청을 모아 한 번에 배치 전송합니다. 예를 들어, 코인 리스트에서 200개의 ticker를 각각 구독하는 대신, 20ms 내에 수집된 코드를 하나의 구독 메시지로 통합합니다.
- **UUID 티켓 기반 요청**: Upbit WebSocket 프로토콜에 맞게 각 요청에 UUID 티켓을 부여하여 요청-응답을 식별합니다.
- **지원 타입**: `ticker` | `orderbook` | `trade` | `candle.1m` | `candle.15m` | `candle.60m` | `candle.240m`
- **자동 수명 주기 관리**: `useUpbitSocketBase` 훅이 컴포넌트 마운트 시 구독, 언마운트 시 해지를 자동으로 처리합니다.

### 2-4. SSR/CSR 하이브리드 렌더링

Next.js 15의 App Router와 React Server Components를 활용하여, 초기 로드 성능과 실시간 인터랙션을 모두 최적화했습니다.

- **서버 컴포넌트에서 데이터 프리패칭**: `HomePage`와 `MarketPage`는 async 서버 컴포넌트로, 코인 리스트나 마켓 데이터를 서버에서 직접 패칭합니다. `getDehydratedQuery` 유틸리티를 통해 서버에서 패칭한 데이터를 React Query 캐시에 Dehydration하여 클라이언트에 전달합니다. 클라이언트에서는 추가 API 호출 없이 캐시된 데이터로 즉시 렌더링됩니다.
- **클라이언트 컴포넌트에서 실시간 처리**: 검색, 정렬, 즐겨찾기와 같은 사용자 인터랙션과 WebSocket 실시간 데이터 수신은 클라이언트 컴포넌트에서 처리합니다.
- **Hydration 불일치 방지**: 클라이언트 전용 상태(예: `useFavoriteCoinStore`의 localStorage 데이터)를 사용하는 컴포넌트는 `next/dynamic`으로 감싸 클라이언트에서만 렌더링되도록 처리하여, 서버와 클라이언트의 HTML 불일치 문제를 방지했습니다.
- **동적 라우팅**: `/market/[market]/[tab]` 구조로 코인 코드와 탭(오더북/차트)을 URL 파라미터로 관리. 잘못된 탭 파라미터에 대해서는 기본 탭으로 리다이렉트하거나 404를 반환하는 서버 사이드 검증 로직을 포함합니다.

### 2-5. UX 최적화 기능

사용자 경험을 향상시키기 위해 다양한 최적화 기법을 적용했습니다.

- **가상 스크롤 (React Virtuoso)**: 200개 이상의 KRW 마켓 코인을 가상 스크롤로 렌더링합니다. 뷰포트에 보이는 행만 실제 DOM에 마운트하여, 전체 리스트를 렌더링하는 것 대비 DOM 노드 수를 90% 이상 절감합니다.
- **디바운스 검색**: `useDebounceState` 커스텀 훅으로 사용자 입력을 디바운스 처리하여, 타이핑 중 불필요한 필터링 연산과 리렌더링을 방지합니다.
- **정렬 토글**: 테이블 헤더 클릭 시 `useSortCoins` 훅이 정렬 필드와 방향(ASC/DESC)을 토글합니다. `useMemo`로 정렬 결과를 메모이제이션하여, 정렬 기준이 변경될 때만 재계산합니다.
- **즐겨찾기 영속화**: Zustand 스토어에 `localStorage` 미들웨어를 적용하여, 즐겨찾기 상태를 브라우저에 영속화합니다. 페이지 새로고침이나 재방문 시에도 이전에 등록한 즐겨찾기가 유지됩니다.
- **캔들 차트 무한 스크롤**: TanStack React Query의 Infinite Query를 활용하여, 차트 좌측 끝에 도달하면 과거 캔들 데이터를 자동으로 로드합니다.

---

## 3. 기술적 특징

### 3-1. Feature-Sliced Design (FSD) 폴더 구조

프로젝트의 폴더 구조는 **Feature-Sliced Design** 방법론을 따릅니다. FSD는 코드를 기능(feature) 단위로 슬라이스하여 모듈 간 의존성을 단방향으로 관리하는 아키텍처 방법론입니다.

```
src/
├── app/                    # 앱 레이아웃, 글로벌 설정, 프로바이더
│   ├── ui/                 #   루트 레이아웃 컴포넌트
│   ├── style/              #   글로벌 스타일
│   └── head/               #   메타데이터 설정
│
├── page/                   # 페이지 레이어 — 화면 단위 조합
│   ├── home/               #   홈 페이지 (코인 리스트, 탭 패널, 실시간 차트)
│   │   ├── ui/             #     HomeTab, HomeTabPannes, CoinListFetcher
│   │   └── lib/            #     ListFilter, RealTimeChart
│   └── market/             #   마켓 상세 페이지 (호가, 차트, 체결)
│       ├── ui/             #     MarketPage, MarketHeader, MarketTab
│       └── lib/            #     OrderBookPanel, OrderBookList, RecentTrades
│
├── features/               # 피처 레이어 — 유스케이스 및 사용자 기능
│   └── coin/
│       ├── usecase/        #     서비스 레이어 (homeService, marketService)
│       ├── lib/            #     useSearchCoins, useSortCoins, useFavoritesCoins
│       ├── ui/             #     FavoriteCoinButton, FavoritesCoins
│       └── model/          #     CoinTabKeys, CoinSortableField, SortDirection
│
├── entities/               # 엔티티 레이어 — 도메인 비즈니스 모델
│   ├── coin/               #   코인 엔티티
│   │   ├── model/          #     type.ts(DTO), schema.ts, domain/DerivedCoin.ts
│   │   ├── mapper.ts       #     CoinMapper (REST/Socket → Domain)
│   │   └── repository.ts   #     CoinRepository (API + 매핑)
│   ├── orderbook/          #   오더북 엔티티 (동일 구조)
│   ├── trade/              #   체결 엔티티 (동일 구조)
│   └── candle/             #   캔들 엔티티 (동일 구조)
│
├── widgets/                # 위젯 레이어 — 독립적인 UI 블록
│   └── MainHeader/         #     메인 헤더 네비게이션
│
└── shared/                 # 공유 레이어 — 도메인에 의존하지 않는 범용 코드
    ├── lib/
    │   ├── api/            #     FetchBuilder (빌더 패턴 HTTP 클라이언트)
    │   ├── webSocket/      #     커스텀 WebSocket 라이브러리 (3계층)
    │   ├── upbitSocket/    #     Upbit 전용 소켓 매니저
    │   ├── reactQuery/     #     React Query 유틸리티, SSR Dehydration 헬퍼
    │   ├── hooks/          #     useDebounceState, useThrottledCallback,
    │   │                   #     useControlledState, useAutoClose, useTransitionState
    │   ├── error/          #     BaseError, HttpErrorFactory
    │   └── reactUtils/     #     createContext 유틸리티
    ├── uiKit/              #     공용 UI 컴포넌트 (Button, Input 등)
    ├── constant/           #     글로벌 상수
    └── type/               #     글로벌 타입 정의
```

**FSD의 핵심 규칙 — 단방향 의존성:**

```
shared → entities → features → widgets → page → app
(하위 레이어는 상위 레이어를 참조할 수 없음)
```

이 규칙을 통해 `entities`는 `features`를 모르고, `features`는 `page`를 모르는 단방향 의존 구조가 유지됩니다. 새로운 기능을 추가할 때 기존 코드에 대한 영향 범위가 명확히 제한됩니다.

### 3-2. 서비스 레이어 설계 — 유스케이스 패턴

클린 아키텍처의 서비스 레이어를 **Feature 레이어의 `usecase/`** 에 배치했습니다. 서비스는 Repository를 주입받아 데이터를 조합하고, 페이지 컴포넌트에 비즈니스 로직이 노출되지 않도록 합니다.

```
Page (화면 조합)  →  Feature/usecase (서비스)  →  Entity/repository (데이터 접근)
                                                         ↓
                                               Entity/mapper (DTO → Domain)
                                                         ↓
                                               Entity/model (도메인 엔티티)
```

**예시 — MarketService:**

`MarketService`는 `CoinRepository`, `OrderbookRepository`, `TradeRepository`, `CandleRepository`를 조합하여, 마켓 상세 페이지에 필요한 데이터를 일괄 조회합니다. `Promise.all`을 활용한 병렬 호출로 응답 시간을 최적화하며, 페이지 컴포넌트는 서비스 메서드만 호출하면 됩니다.

### 3-3. 적용된 설계 패턴

| 패턴 | 적용 위치 | 설명 |
|------|-----------|------|
| **Repository Pattern** | `entities/*/repository.ts` | 데이터 접근을 추상화하여 API 구현 세부사항을 캡슐화. UI 코드는 Repository 인터페이스에만 의존하므로, API 엔드포인트 변경 시 Repository만 수정하면 됨. |
| **Mapper Pattern** | `entities/*/mapper.ts` | 외부 DTO와 내부 Domain Entity 간의 변환을 전담. REST DTO와 Socket DTO가 서로 다른 필드명을 사용하지만, 동일한 Domain Entity로 통일하여 UI의 일관성 확보. |
| **Builder Pattern** | `shared/lib/api/FetchBuilder` | HTTP 요청을 Fluent API 방식으로 조립. `params()` → `httpMethod()` → `headers()` → `build()` 체이닝으로 가독성 있는 API 호출 코드 작성 가능. |
| **Observer Pattern** | `webSocket/SocketManager` | 키 기반 pub/sub 메시지 전달 시스템. 새 메시지가 도착하면 해당 키를 구독하는 모든 리스너에게 통지. 구독/해지가 자유로워 컴포넌트 수명 주기와 자연스럽게 연동. |
| **Singleton Pattern** | `useWebSocket` 매니저 캐시 | 동일 URL에 대해 SocketManager 인스턴스를 하나만 생성·캐싱하여 WebSocket 연결 중복을 방지. 여러 컴포넌트가 같은 소켓 URL을 사용해도 물리적 연결은 하나만 유지. |
| **Factory Pattern** | `shared/lib/error/HttpErrorFactory` | HTTP 상태 코드에 따라 적절한 에러 객체를 생성. 에러 처리 로직을 중앙화하여 일관된 에러 핸들링 보장. |
| **Ref Counting Pattern** | `UpbitSubscriptionManager` | 구독 참조 횟수를 추적하여, 마지막 구독자가 해지될 때만 실제 소켓 메시지를 전송. 불필요한 네트워크 요청 최소화. |

### 3-4. 커스텀 훅 라이브러리

반복적으로 사용되는 UI 패턴을 커스텀 훅으로 추상화하여 재사용성을 높였습니다.

| 훅 | 역할 | 활용 |
|----|------|------|
| **useDebounceState** | lodash `debounce`를 활용한 디바운스 상태 관리. 빠른 연속 업데이트를 지정된 시간만큼 지연시켜 불필요한 연산 방지. | 코인 검색 입력 필드에서 타이핑 중 과도한 필터링 연산 방지 |
| **useThrottledCallback** | lodash `throttle`을 활용한 쓰로틀 콜백. 지정된 간격마다 최대 1회만 실행되도록 제한. | 스크롤 이벤트, 실시간 데이터 업데이트 빈도 제어 |
| **useControlledState** | Controlled/Uncontrolled 하이브리드 패턴. 외부에서 값을 제어할 수도 있고, 내부 상태로 관리할 수도 있는 유연한 상태 관리. | UI 컴포넌트의 범용적 상태 관리 (외부 제어/자체 관리 모두 지원) |
| **useAutoClose** | 지정된 시간 후 자동으로 닫히는 상태 관리. | 알림, 토스트 메시지 등 자동 사라짐 처리 |
| **useTransitionState** | CSS 트랜지션 상태(appearing/closing)를 관리. 마운트/언마운트 시 애니메이션을 적용할 수 있도록 상태 전이를 제어. | 모달, 드롭다운 등의 진입/퇴장 애니메이션 |

### 3-5. 에러 처리 전략

도메인 에러와 인프라 에러를 분리하여 처리합니다.

- **BaseError**: 모든 커스텀 에러의 기반 클래스. `name`, `message`, `cause`를 표준화.
- **HttpErrorFactory**: HTTP 상태 코드(4xx, 5xx)에 따라 적절한 에러 객체를 생성하는 팩토리. API 응답의 에러 메시지를 파싱하여 사용자 친화적인 에러 정보를 제공.
- **Zod safeParse**: API 응답 검증 시 `parse` 대신 `safeParse`를 사용하여, 검증 실패 시 앱이 크래시하지 않고 에러를 안전하게 핸들링.

---

## 4. 페이지 라우팅

| 경로 | 렌더링 | 설명 |
|------|--------|------|
| `/` | RSC (서버) → CSR (실시간) | 코인 리스트 홈. 서버에서 초기 데이터를 패칭하고, 클라이언트에서 WebSocket으로 실시간 업데이트. 전체/즐겨찾기 탭 전환 |
| `/market/[market]` | RSC (서버) | 마켓 상세 진입점. `[market]` 파라미터를 검증하고 기본 탭(오더북)으로 리다이렉트 |
| `/market/[market]/[tab]` | RSC (서버) → CSR (실시간) | 마켓 상세 탭 뷰. 오더북·체결 내역·차트 탭 전환. 잘못된 탭 파라미터 시 404 반환 |

---

## 5. 프로젝트 실행 방법

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm run dev
```

### 프로덕션 빌드

```bash
pnpm run build
pnpm run start
```

### 코드 품질

```bash
pnpm run lint          # ESLint 검사
pnpm run eslint:fix    # ESLint 자동 수정
pnpm run prettier:fix  # Prettier 포맷팅
```