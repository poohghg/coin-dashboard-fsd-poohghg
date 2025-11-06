import { API_URL, IS_NODE, MOCK_API_URL, USE_MOCK } from '@/src/shared/constant';
import { HEADER_CONTENT } from '@/src/shared/lib/api/constant/header';
import { FetchFactory, IErrorResponse, ISuccessResponse } from '@/src/shared/lib/api/model/Response';
import { HeaderContentKey, HttpMethod, Params } from '@/src/shared/lib/api/model/type';

class Fetch {
  private readonly url: string;
  private readonly init: RequestInit;

  constructor(url: string, init: RequestInit) {
    this.url = url;
    this.init = init;
  }

  public async request<S, F = null>(): Promise<ISuccessResponse<S> | IErrorResponse<F>> {
    try {
      const res = await fetch(this.url, this.init);
      const body = await res.clone().json();
      const status = res.status;

      if (res.ok) {
        const hasBodyData = body && typeof body === 'object' && body.data != null;
        const finalData = hasBodyData ? body.data : body;
        return FetchFactory.success<S>(status, finalData);
      } else {
        return FetchFactory.error<F>(status, body);
      }
    } catch (err) {
      return FetchFactory.error<F>((err instanceof Error && (err as any).status) || 500, {
        code: err instanceof Error ? (err as any)?.code : 'UNKNOWN',
        message: err instanceof Error ? err.message : 'Unknown error',
      } as F);
    }
  }
}

export default class FetchBuilder {
  private readonly _url: string;

  private _useMock = false;

  private _method: HttpMethod = 'GET';

  private _params: Params = {};

  private _init: RequestInit = {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  private _contentType: HeaderContentKey = 'json';

  constructor(url: string) {
    this._url = url;
  }

  public params(params: Params) {
    this._params = params;
    return this;
  }

  public httpMethod(method: HttpMethod) {
    this._method = method;
    return this;
  }

  public initConfig(config: RequestInit) {
    this._init = {
      ...this._init,
      ...config,
    };
    return this;
  }

  public headers(headers: Record<string, string>) {
    this._init.headers = { ...this._init.headers, ...headers };
    return this;
  }

  public headersContent(key: HeaderContentKey) {
    this._init.headers = {
      ...this._init.headers,
      'Content-Type': HEADER_CONTENT[key],
    };
    this._contentType = key;
    return this;
  }

  public useMock(isMock: boolean) {
    this._useMock = isMock;
    return this;
  }

  public build() {
    const fullUrl = this.buildUrl();
    const body = this._method === 'GET' ? null : this.buildBody();

    return new Fetch(fullUrl, {
      ...this._init,
      method: this._method,
      body,
    });
  }

  private buildUrl(): string {
    const domain = this.getDomain();
    const url = `${domain}${this._url}`;

    return this._method === 'GET' ? this.buildUrlWithParams(url) : `${url}`;
  }

  private buildUrlWithParams(url: string): string {
    const queryString = new URLSearchParams(this._params).toString();
    return `${url}?${queryString}`;
  }

  private buildBody(): BodyInit | null {
    switch (this._contentType) {
      case 'form': {
        const formData = new FormData();
        Object.keys(this._params).forEach(key => formData.append(key, this._params[key]));
        return formData;
      }
      case 'xForm': {
        const xForm = new URLSearchParams();
        Object.keys(this._params).forEach(key => xForm.append(key, this._params[key]));
        return xForm.toString();
      }
      case 'json':
      default:
        return JSON.stringify(this._params);
    }
  }

  private getDomain() {
    if (IS_NODE) {
      return this._useMock && USE_MOCK ? MOCK_API_URL : API_URL;
    }
    return '';
  }
}
