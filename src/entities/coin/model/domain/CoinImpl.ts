import { Coin, CoinChangeType, MarketEvent } from '@/src/entities/coin/model/type';

// 코인명,현재가,전일대비(가격, 퍼센트),거래대금
// 구조 변경이 필요? -> BaseCoin, DerivedCoin?
export class CoinImpl implements Coin {
  constructor(
    public readonly market: string,
    public readonly korean_name: string,
    public readonly english_name: string,
    public readonly trade_price: number,
    public readonly opening_price: number,
    public readonly high_price: number,
    public readonly low_price: number,
    public readonly change_price: number,
    public readonly change_rate: number,
    public readonly signed_change_rate: number,
    public readonly trade_volume: number,
    public readonly acc_trade_price_24h: number,
    public readonly change_type: CoinChangeType,
    public readonly market_event: MarketEvent
  ) {}

  get isWarning(): boolean {
    return this.market_event.warning;
  }

  get isCautionPriceFluctuations(): boolean {
    return this.market_event.caution.PRICE_FLUCTUATIONS;
  }

  get isCautionTradingVolumeSoaring(): boolean {
    return this.market_event.caution.TRADING_VOLUME_SOARING;
  }

  get isCautionDepositAmountSoaring(): boolean {
    return this.market_event.caution.DEPOSIT_AMOUNT_SOARING;
  }

  get isCautionGlobalPriceDifferences(): boolean {
    return this.market_event.caution.GLOBAL_PRICE_DIFFERENCES;
  }

  toJSON(): Coin {
    return {
      market: this.market,
      korean_name: this.korean_name,
      english_name: this.english_name,
      trade_price: this.trade_price,
      opening_price: this.opening_price,
      high_price: this.high_price,
      low_price: this.low_price,
      change_price: this.change_price,
      change_rate: this.change_rate,
      signed_change_rate: this.signed_change_rate,
      trade_volume: this.trade_volume,
      acc_trade_price_24h: this.acc_trade_price_24h,
      change_type: this.change_type,
      isWarning: this.isWarning,
      isCautionPriceFluctuations: this.isCautionPriceFluctuations,
      isCautionTradingVolumeSoaring: this.isCautionTradingVolumeSoaring,
      isCautionDepositAmountSoaring: this.isCautionDepositAmountSoaring,
      isCautionGlobalPriceDifferences: this.isCautionGlobalPriceDifferences,
    };
  }
}
