import { Coin, CoinChangeType, MarketEvent } from '@/src/entities/coin/model/type';

export interface DerivedCoinProps {
  market: string;
  korean_name: string;
  english_name: string;
  trade_price: number;
  signed_change_price: number;
  signed_change_rate: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  change_type: CoinChangeType;
  market_event: MarketEvent;
  timestamp: number;
}

export class DerivedCoin implements Coin {
  constructor(private readonly props: DerivedCoinProps) {}

  get market() {
    return this.props.market;
  }

  get korean_name() {
    return this.props.korean_name;
  }

  get english_name() {
    return this.props.english_name;
  }

  get trade_price() {
    return this.props.trade_price;
  }

  get signed_change_price() {
    return this.props.signed_change_price;
  }

  get signed_change_rate() {
    return this.props.signed_change_rate;
  }

  get acc_trade_price() {
    return this.props.acc_trade_price;
  }

  get acc_trade_price_24h() {
    return this.props.acc_trade_price_24h;
  }

  get change_type() {
    return this.props.change_type;
  }

  get market_event() {
    return this.props.market_event;
  }

  get timestamp() {
    return this.props.timestamp;
  }

  get symbol(): string {
    return this.props.market.split('-')[1];
  }

  get isWarning(): boolean {
    return this.props.market_event.warning;
  }

  get isCautionPriceFluctuations(): boolean {
    return this.props.market_event.caution.PRICE_FLUCTUATIONS;
  }

  get isCautionTradingVolumeSoaring(): boolean {
    return this.props.market_event.caution.TRADING_VOLUME_SOARING;
  }

  get isCautionDepositAmountSoaring(): boolean {
    return this.props.market_event.caution.DEPOSIT_AMOUNT_SOARING;
  }

  get isCautionGlobalPriceDifferences(): boolean {
    return this.props.market_event.caution.GLOBAL_PRICE_DIFFERENCES;
  }

  get isCautionConcentrationOfSmallAccounts(): boolean {
    return this.props.market_event.caution.CONCENTRATION_OF_SMALL_ACCOUNTS;
  }

  toJSON(): Coin {
    return {
      symbol: this.symbol,
      market: this.market,
      korean_name: this.korean_name,
      english_name: this.english_name,
      trade_price: this.trade_price,
      signed_change_price: this.signed_change_price,
      signed_change_rate: this.signed_change_rate,
      acc_trade_price: this.acc_trade_price,
      acc_trade_price_24h: this.acc_trade_price_24h,
      change_type: this.change_type,
      isWarning: this.isWarning,
      isCautionPriceFluctuations: this.isCautionPriceFluctuations,
      isCautionTradingVolumeSoaring: this.isCautionTradingVolumeSoaring,
      isCautionDepositAmountSoaring: this.isCautionDepositAmountSoaring,
      isCautionGlobalPriceDifferences: this.isCautionGlobalPriceDifferences,
      isCautionConcentrationOfSmallAccounts: this.isCautionConcentrationOfSmallAccounts,
      timestamp: this.timestamp,
    };
  }
}
