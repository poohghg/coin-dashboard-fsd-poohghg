// market
// string
// required
// 페어(거래쌍)의 코드
//
//   [예시] "KRW-BTC"
//
// korean_name
// string
// required
// 해당 디지털 자산의 한글명
//
// english_name
// string
// required
// 해당 디지털 자산의 영문명
//
// market_event
// object
// 종목 경보 정보
//
//
// market_event object
// warning
// boolean
// 유의 종목 여부.
//   업비트의 시장경보 시스템에 따라 해당 페어가 유의 종목으로 지정되었는지 여부를 나타냅니다.
// ※ 자세한 사항은 관련 공지사항 참고 바랍니다.
//
//   caution
// object
// 주의 종목 여부.
//   주의 종목으로 지정된 경우, 아래의 세부 경보 유형 중 하나 이상에 해당될 수 있습니다.
// ※ 자세한 사항은 관련 공지사항 참고 바랍니다.
//
//
//   caution object
// PRICE_FLUCTUATIONS
// boolean
// 가격 급등락 경보
//
// TRADING_VOLUME_SOARING
// boolean
// 거래량 급증 경보
//
// DEPOSIT_AMOUNT_SOARING
// boolean
// 입금량 급증 경보
//
// GLOBAL_PRICE_DIFFERENCES
// boolean
// 국내외 가격 차이 경보
//
// CONCENTRATION_OF_SMALL_ACCOUNTS
// boolean
// 소수 계정 집중 거래 경보

export interface CoinMarketDTO {
  market: string;
  korean_name: string;
  english_name: string;
  market_event: {
    warning: boolean;
    caution: {
      PRICE_FLUCTUATIONS: boolean;
      TRADING_VOLUME_SOARING: boolean;
      DEPOSIT_AMOUNT_SOARING: boolean;
      GLOBAL_PRICE_DIFFERENCES: boolean;
      CONCENTRATION_OF_SMALL_ACCOUNTS: boolean;
    };
  };
}

export interface CoinPriceDTO {
  market: string;
  trade_date: string;
  trade_time: string;
  trade_date_kst: string;
  trade_time_kst: string;
  trade_timestamp: number;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  change: 'EVEN' | 'RISE' | 'FALL';
  change_price: number;
  change_rate: number;
  signed_change_price: number;
  signed_change_rate: number;
  trade_volume: number;
  acc_trade_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume: number;
  acc_trade_volume_24h: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  timestamp: number;
}

export interface CoinDTO {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}
