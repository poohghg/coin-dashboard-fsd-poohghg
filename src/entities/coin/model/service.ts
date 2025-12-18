import { CoinRepository, CoinRepositoryImpl } from '@/src/entities/coin/model/repository';

// 어디에서 사용해야 하지? 서비스 레이어는 비즈니스 로직을 처리하는 곳이므로,
// 컨트롤러나 핸들러에서 호출하여 데이터를 처리하고 반환하는 역할을 함.

interface CoinUseCase {
  getCoinList(): Promise<any>;
}

class CoinService {
  // 여러개의 레포지토리가 들어올 수 있음.
  constructor(private repository: CoinRepository) {}

  async getCoinList() {
    return await this.repository.getCoinList();
  }
}

export const coinService = new CoinService(new CoinRepositoryImpl());
