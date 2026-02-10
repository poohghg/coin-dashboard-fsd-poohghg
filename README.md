# 📈 Coin — 실시간 암호화폐 트레이딩 대시보드

> **Upbit 퍼블릭 API & WebSocket**을 활용한 실시간 암호화폐 시세 조회 웹 애플리케이션  
> 클린 아키텍처 + Feature-Sliced Design(FSD) 기반 포트폴리오 프로젝트

---

## 🖥️ 주요 화면 및 기능

| 기능 | 설명 |
|------|------|
| **코인 리스트** | KRW 마켓 전체 코인 목록 조회, 실시간 시세 업데이트, 검색·정렬·즐겨찾기 |
| **코인 상세 — 실시간 호가** | 특정 코인의 실시간 오더북(매수/매도 호가) 및 체결 내역 |
| **코인 상세 — 차트** | 캔들스틱 차트(1분/15분/1시간/4시간/일/주/월) — TradingView Lightweight Charts |
| **실시간 데이터** | WebSocket을 통한 Ticker, Orderbook, Trade, Candle 실시간 스트리밍 |

---

## 🛠️ 기술 스택

| 분류 | 기술 | 역할 |
|------|------|------|
| **프레임워크** | Next.js 15 (App Router) | 서버 컴포넌트(RSC) 기반 SSR/CSR 하이브리드 렌더링 |
| **언어** | TypeScript | 도메인 모델 및 전체 코드베이스 타입 안정성 확보 |
| **상태 관리** | Zustand + TanStack React Query 5 | 클라이언트 상태(즐겨찾기) 영속화, 서버 상태 캐싱 및 SSR Dehydration |
| **UI/스타일** | Tailwind CSS 4 + Radix UI | 유틸리티 기반 반응형 UI 및 접근성 컴포넌트 |
| **차트** | Lightweight Charts (TradingView) | OHLC 캔들스틱 차트 렌더링 |
| **가상 스크롤** | React Virtuoso | 대량 코인 리스트 성능 최적화 |
| **유효성 검증** | Zod | API 응답 DTO 런타임 스키마 검증 |
| **패키지 매니저** | pnpm | 효율적인 의존성 관리 |

---

## 🏗️ 아키텍처 설계

### 클린 아키텍처 × Feature-Sliced Design (FSD)

본 프로젝트는 **클린 아키텍처**의 레이어 모델링과 **FSD**의 폴더 구조를 결합하여, 관심사 분리와 확장성을 동시에 달성했습니다.

```
┌─────────────────────────────────────────────────────────┐
│                      Page / Feature                     │  ← 유스케이스 (서비스 호출, 화면 조합)
├─────────────────────────────────────────────────────────┤
│                    Service (UseCase)                     │  ← 비즈니스 로직
├─────────────────────────────────────────────────────────┤
│                Repository (Data Access)                  │  ← API 호출 + Mapper(DTO → Domain Entity)
├─────────────────────────────────────────────────────────┤
│                  API / WebSocket Adapter                 │  ← 외부 데이터 소스 (Upbit REST & Socket)
└─────────────────────────────────────────────────────────┘
```

**데이터 흐름:**

```
Upbit API/Socket → DTO → Zod Schema 검증 → Mapper → Domain Entity → Service → Page/Feature UI
```

### FSD 폴더 구조

```
src/
├── app/                    # 앱 레이아웃, 글로벌 설정
├── entities/               # 도메인 엔티티 (비즈니스 개념 모델링)
│   ├── coin/               #   코인: 모델, DTO, 스키마, 매퍼, 리포지토리
│   ├── orderbook/          #   오더북: 호가 데이터 모델링
│   ├── trade/              #   체결: 거래 내역 모델링
│   └── candle/             #   캔들: OHLC 차트 데이터 모델링
├── features/               # 사용자 기능 (유스케이스)
│   └── coin/
│       ├── usecase/        #     서비스 레이어 (coinService)
│       ├── lib/            #     검색, 정렬, 즐겨찾기 훅
│       ├── ui/             #     기능 UI 컴포넌트
│       └── model/          #     피처 타입 정의
├── page/                   # 페이지 컴포넌트
│   ├── home/               #   홈 (코인 리스트, 탭, 실시간 차트)
│   └── market/             #   마켓 상세 (호가, 차트, 체결 내역)
├── widgets/                # 위젯 (MainHeader)
└── shared/                 # 공유 라이브러리 & 유틸리티
    ├── lib/
    │   ├── api/            #     FetchBuilder (HTTP 클라이언트)
    │   ├── webSocket/      #     ★ 커스텀 WebSocket 라이브러리
    │   ├── upbitSocket/    #     Upbit 전용 소켓 매니저
    │   ├── reactQuery/     #     React Query 유틸리티
    │   ├── hooks/          #     공용 훅 (디바운스, 쓰로틀 등)
    │   └── error/          #     에러 처리 (BaseError, HttpErrorFactory)
    ├── uiKit/              #     공용 UI 컴포넌트
    └── type/               #     글로벌 타입 정의
```

---

## ⭐ 주요 개발 내역

### 1. 클린 아키텍처 기반 도메인 모델링

각 엔티티(Coin, Orderbook, Trade, Candle)마다 일관된 계층 구조를 적용했습니다:

| 계층 | 파일 | 역할 |
|------|------|------|
| **DTO** | `type.ts` | Upbit API 응답 원본 타입 정의 |
| **Schema** | `schema.ts` | Zod 스키마를 통한 런타임 검증 및 데이터 변환 |
| **Domain** | `domain/Derived*.ts` | 비즈니스 로직이 포함된 도메인 엔티티 클래스 |
| **Mapper** | `mapper.ts` | REST DTO ↔ Domain, Socket DTO ↔ Domain 변환 |
| **Repository** | `repository.ts` | 데이터 접근 추상화 (API 호출 + 매핑) |

### 2. 커스텀 WebSocket 라이브러리

실시간 데이터 통신을 위해 **3계층 WebSocket 라이브러리**를 직접 설계·구현했습니다:

```
┌───────────────────────────┐
│   useWebSocket (React)    │  ← useSyncExternalStore 기반 React 훅
├───────────────────────────┤
│    SocketManager          │  ← 키 기반 구독, 메시지 배치 처리, 스냅샷 저장
├───────────────────────────┤
│    SocketTransport        │  ← WebSocket 연결 관리, 자동 재연결, 메시지 큐
└───────────────────────────┘
```

- **SocketTransport**: WebSocket 연결 수명 주기 관리, 지수 백오프 자동 재연결, 연결 전 메시지 큐잉
- **SocketManager**: 키 기반 구독/해지 패턴, `setTimeout(0)` 비동기 큐를 통한 메시지 배치 처리, 30초 미사용 시 자동 정리
- **useWebSocket**: `useSyncExternalStore`를 활용한 React 상태 동기화, URL별 싱글톤 매니저 캐싱

### 3. Upbit 소켓 통합

- **UpbitSubscriptionManager**: 20ms 쓰로틀 윈도우로 구독 요청 배치 전송
- 지원 타입: `ticker`, `orderbook`, `trade`, `candle.1m`, `candle.15m`, `candle.60m`, `candle.240m`
- 마운트/언마운트 시 자동 구독/해지 처리
- UUID 티켓 기반 요청 관리

### 4. SSR/CSR 하이브리드 렌더링

- **서버 컴포넌트(RSC)**: 초기 코인 데이터를 서버에서 패칭, React Query Dehydration으로 클라이언트 전달
- **클라이언트 컴포넌트**: 실시간 WebSocket 데이터 수신, 사용자 인터랙션(검색/정렬/즐겨찾기) 처리
- **Hydration 불일치 방지**: `next/dynamic`을 통한 클라이언트 전용 렌더링 처리

### 5. UX 최적화

- **가상 스크롤**: React Virtuoso를 활용한 대량 코인 리스트 렌더링 최적화
- **디바운스 검색**: 입력 시 불필요한 렌더링 방지
- **정렬 토글**: 헤더 클릭으로 ASC/DESC 전환
- **즐겨찾기 영속화**: Zustand + localStorage로 새로고침 후에도 상태 유지

---

## 📂 페이지 라우팅

| 경로 | 페이지 | 설명 |
|------|--------|------|
| `/` | 홈 | 코인 리스트 (전체/즐겨찾기 탭), 실시간 시세, 차트 |
| `/market/[market]` | 마켓 상세 | 특정 코인 상세 정보 (오더북 탭으로 리다이렉트) |
| `/market/[market]/[tab]` | 마켓 탭 | 오더북·체결 내역·차트 탭 전환 |

---

## 🧩 설계 패턴

| 패턴 | 적용 위치 |
|------|-----------|
| **Repository Pattern** | 각 엔티티의 데이터 접근 추상화 |
| **Builder Pattern** | `FetchBuilder` — Fluent API 방식 HTTP 클라이언트 |
| **Factory Pattern** | `HttpErrorFactory` — HTTP 에러 객체 생성 |
| **Observer Pattern** | `SocketManager` — 리스너 기반 pub/sub 메시지 전달 |
| **Singleton Pattern** | WebSocket 매니저 URL별 싱글톤 캐싱 |
| **Mapper Pattern** | DTO → Domain Entity 변환 (REST/Socket 각각) |

---

## 🚀 프로젝트 실행 방법

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
