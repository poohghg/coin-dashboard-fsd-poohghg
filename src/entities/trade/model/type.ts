export type TradeSide = 'ASK' | 'BID';

export interface TradeTick {
  market: string;
  timestamp: number;
  price: number;
  volume: number;
  prevClosingPrice: number;
  changePrice: number;
  side: TradeSide;
  id: number;
  tradeDateUtc: string;
  tradeTimeUtc: string;
}
