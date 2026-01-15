export type CoinChangeType = 'RISE' | 'FALL' | 'EVEN';

export interface MarketEvent {
  warning: boolean;
  caution: {
    PRICE_FLUCTUATIONS: boolean; // 급등락
    TRADING_VOLUME_SOARING: boolean; // 거래량 급증
    DEPOSIT_AMOUNT_SOARING: boolean; // 입금액 급증
    GLOBAL_PRICE_DIFFERENCES: boolean; // 글로벌 시세 차이
    CONCENTRATION_OF_SMALL_ACCOUNTS: boolean; // 소액 계좌 집중
  };
}

export interface Coin {
  market: string;
  korean_name: string;
  english_name: string;
  trade_price: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  change_price: number;
  change_rate: number; // 24시간 변동률
  signed_change_rate: number; // 24시간 변동률 부호있는 값
  trade_volume: number; // 최근 거래 수량
  acc_trade_price_24h: number; //24시간 누적 거래 금액(거래 대금)
  change_type: CoinChangeType;
  isWarning: boolean;
  isCautionPriceFluctuations: boolean;
  isCautionTradingVolumeSoaring: boolean;
  isCautionDepositAmountSoaring: boolean;
  isCautionGlobalPriceDifferences: boolean;
}

export interface CoinDetail extends Coin {
  opening_price: number;
  high_price: number;
  low_price: number;
  prev_closing_price: number;

  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;

  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
}
