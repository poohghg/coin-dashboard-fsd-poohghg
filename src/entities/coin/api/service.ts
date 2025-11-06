import { CoinApiImpl } from '@/src/entities/coin/api/api';
import { CoinRepository, CoinRepositoryImpl } from '@/src/entities/coin/api/repository';

class CoinService {
  constructor(private repository: CoinRepository) {}

  async getCoinList() {
    return await this.repository.getCoinList();
  }
}

const coinApiImpl = new CoinApiImpl();
const coinRepositoryImpl = new CoinRepositoryImpl(coinApiImpl);
export const coinService = new CoinService(coinRepositoryImpl);
