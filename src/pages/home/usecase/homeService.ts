import { Coin, CoinRepositoryImpl } from '@/src/entities/coin';
import { CoinRepository } from '@/src/entities/coin/model/repository';

/**
 * Repository	서버 통신 및 로우 데이터 반환	데이터 소스 변경에 유연함
 * Service	도메인 규칙 적용 및 검증	순수 로직 테스트가 용이함
 */

/**
 * 서비스 성격에 맞는 에러 UI가 독립적일수 있다?
 * 서비스 레이어는 비즈니스 로직을 처리하는 곳이므로,
 * 컨트롤러나 핸들러에서 호출하여 데이터를 처리하고 반환하는 역할을 함.
 */

/**
 * ① 서비스 레이어의 독립성 (UI-Agnostic)
 * Service는 데이터가 어디서 오는지(Repository), 어떻게 보여지는지(UI)에 관심이 없어야 합니다. 오직 비즈니스 규칙만 처리합니다.
 * 예: "코인 목록이 비어있으면 에러인가, 아니면 빈 배열인가?", "특정 등급 이상의 코인만 필터링해야 하는가?"
 *
 * ② 에러의 성격 분리
 * 비즈니스 에러 (Service 담당): "잔액 부족", "이미 존재하는 코인" 등 도메인과 관련된 에러.
 * 인프라 에러 (Repository/Fetcher 담당): "429 Rate Limit", "500 Server Error", "Network Timeout" 등 기술적 에러.
 *
 * ③ 독립적인 에러 UI (Component-level)
 * "코인 리스트" 섹션이 에러가 났다고 해서 "네비게이션 바"나 "푸터"까지 안 보일 필요는 없습니다. 각 도메인(서비스) 성격에 맞는 전용 에러 UI를 보여줌으로써 사용자 경험을 크게 향상시킬 수 있습니다.
 */

/**
 * ❌ Service에서 하면 안 되는 것
 *
 * React 상태 관리
 * UI 상태 (loading, error)
 * Toast, Alert
 * Query Cache 제어
 */

interface HomeUseCase {
  getCoinList(): Promise<Coin[]>;
}

class HomeService implements HomeUseCase {
  private coinRepository: CoinRepository;

  constructor(coinRepository: CoinRepository) {
    this.coinRepository = coinRepository;
  }

  getCoinList = async () => {
    return await this.coinRepository.getCoins();
  };
}

const coinRepository = new CoinRepositoryImpl();
export const homeUseCase = new HomeService(coinRepository);
