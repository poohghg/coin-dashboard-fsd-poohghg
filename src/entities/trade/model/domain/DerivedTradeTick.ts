import { TradeSide, TradeTick } from '../type';

interface DerivedTradeTickProps {
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

export class DerivedTradeTick implements TradeTick {
  constructor(private readonly props: DerivedTradeTickProps) {}

  get market() {
    return this.props.market;
  }

  get timestamp() {
    return this.props.timestamp;
  }

  get price() {
    return this.props.price;
  }

  get volume() {
    return this.props.volume;
  }

  get prevClosingPrice() {
    return this.props.prevClosingPrice;
  }

  get changePrice() {
    return this.props.changePrice;
  }

  get side() {
    return this.props.side;
  }

  get id() {
    return this.props.id;
  }

  get tradeDateUtc() {
    return this.props.tradeDateUtc;
  }

  get tradeTimeUtc() {
    return this.props.tradeTimeUtc;
  }

  toJSON(): TradeTick {
    return { ...this.props };
  }
}
