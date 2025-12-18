export interface IHttpCode {
  get code(): string;

  get message(): string;

  equal(httpCode: IHttpCode): boolean;
}

export class HttpCode implements IHttpCode {
  constructor(
    private readonly _code: string,
    private readonly _message: string
  ) {}

  get code(): string {
    return this._code;
  }

  get message(): string {
    return this._message;
  }

  equal(httpCode: IHttpCode): boolean {
    return this.code === httpCode.code;
  }
}

export class HttpSuccessCode extends HttpCode {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class HttpErrorCode extends HttpCode {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export const HttpSuccessCodes = {
  OK: new HttpSuccessCode('200', 'OK'),
  CREATED: new HttpSuccessCode('201', 'Created'),
  ACCEPTED: new HttpSuccessCode('202', 'Accepted'),
  NO_CONTENT: new HttpSuccessCode('204', 'No Content'),
};

export const HttpErrorCodes = {
  BAD_REQUEST: new HttpErrorCode('400', 'Bad Request'),
  UNAUTHORIZED: new HttpErrorCode('401', 'Unauthorized'),
  FORBIDDEN: new HttpErrorCode('403', 'Forbidden'),
  NOT_FOUND: new HttpErrorCode('404', 'Not Found'),
  INTERNAL_SERVER_ERROR: new HttpErrorCode('500', 'Internal Server Error'),
  NOT_IMPLEMENTED: new HttpErrorCode('501', 'Not Implemented'),
  BAD_GATEWAY: new HttpErrorCode('502', 'Bad Gateway'),
  SERVICE_UNAVAILABLE: new HttpErrorCode('503', 'Service Unavailable'),
  GATEWAY_TIMEOUT: new HttpErrorCode('504', 'Gateway Timeout'),
  HTTP_VERSION_NOT_SUPPORTED: new HttpErrorCode('505', 'HTTP Version Not Supported'),
};
