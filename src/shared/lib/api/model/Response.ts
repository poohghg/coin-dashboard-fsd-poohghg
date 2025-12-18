import { cloneDeep } from 'lodash';

interface IFetchResponse<T> {
  readonly status: number;
  readonly data: T;
  readonly ok: boolean;

  toModelMap<U>(fn: (data: T) => U): IFetchResponse<U>;
}

export interface ISuccessResponse<T> extends IFetchResponse<T> {
  readonly ok: true;
  toModelMap<U>(fn: (data: T) => U): ISuccessResponse<U>;
}

export interface IErrorResponse<T> extends IFetchResponse<T> {
  readonly ok: false;
  toModelMap<U>(fn: (data: T) => U): IErrorResponse<U>;
}

abstract class FetchResponse<T> implements IFetchResponse<T> {
  protected constructor(
    private readonly _status: number,
    private readonly _data: T,
    private readonly _ok: boolean
  ) {}

  get status(): number {
    return this._status;
  }

  get data(): T {
    return cloneDeep(this._data);
  }

  get ok(): boolean {
    return this._ok;
  }

  abstract toModelMap<U>(fn: (data: T) => U): IFetchResponse<U>;
}

export class FetchSuccessResponse<S> extends FetchResponse<S> implements ISuccessResponse<S> {
  constructor(status: number, body: S) {
    super(status, body, true);
  }

  get ok(): true {
    return true;
  }

  toModelMap<U>(fn: (data: S) => U): ISuccessResponse<U> {
    return FetchFactory.success(this.status, fn(this.data));
  }
}

export class FetchErrorResponse<F> extends FetchResponse<F> implements IErrorResponse<F> {
  // status === error 객체의 name 역할을 함
  // body === error 객체의 message 역할을 함
  constructor(status: number, body: F) {
    super(status, body, false);
  }

  get ok(): false {
    return false;
  }

  toModelMap<U>(fn: (data: F) => U): IErrorResponse<U> {
    return FetchFactory.error(this.status, fn(this.data));
  }
}

export class FetchFactory {
  static success<S>(status: number, body: S): ISuccessResponse<S> {
    return new FetchSuccessResponse(status, body);
  }

  static error<F>(status: number, body: F): IErrorResponse<F> {
    return new FetchErrorResponse(status, body);
  }
}
