// entities/candle/type/repository.ts

import { CandleQuery } from '@/src/entities/candle/api/params';
import { UpbitCandleApi, UpbitCandleApiImpl } from '../api/upbitCandleApi';
import { CandleMapper } from './mapper';
import { Candle } from './type';

export interface CandleRepository {
  getCandles(query: CandleQuery): Promise<Candle[]>;
}

export class CandleRepositoryImpl implements CandleRepository {
  private api: UpbitCandleApi;

  constructor() {
    this.api = new UpbitCandleApiImpl();
  }

  async getCandles(query: CandleQuery) {
    const res = await this.api.fetchCandles(query);
    return res.data.map(CandleMapper.toCandle);
  }
}
