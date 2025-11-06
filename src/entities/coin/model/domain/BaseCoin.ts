import { Coin } from '@/src/entities/coin/model/type';

export class BaseCoin implements Coin {
  constructor(
    private _symbol: string,
    private _name: string,
    private _image: string,
    private _price: number,
    private _change24h: number,
    private _volume24h: number,
    private _marketCap: number
  ) {}

  get symbol(): string {
    return this._symbol;
  }

  get name(): string {
    return this._name;
  }

  get image(): string {
    return this._image;
  }

  get price(): number {
    return this._price;
  }

  get change24h(): number {
    return this._change24h;
  }

  get volume24h(): number {
    return this._volume24h;
  }

  get marketCap(): number {
    return this._marketCap;
  }

  toJSON(): Coin {
    return {
      symbol: this._symbol,
      name: this._name,
      image: this._image,
      price: this._price,
      change24h: this._change24h,
      volume24h: this._volume24h,
      marketCap: this._marketCap,
    };
  }
}
