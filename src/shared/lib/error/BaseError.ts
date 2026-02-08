export abstract class AppError extends Error {
  abstract readonly kind: string;

  protected constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export abstract class HttpError extends AppError {
  readonly kind = 'HTTP';

  protected constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
  }

  equal(other: HttpError): boolean {
    return this.statusCode === other.statusCode && this.message === other.message;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad request') {
    super(400, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized access') {
    super(401, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message = 'Too many requests') {
    super(429, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Internal server error') {
    super(500, message);
  }
}

export class UnknownHttpError extends HttpError {
  constructor(statusCode: number, message = 'Unknown HTTP error') {
    super(statusCode, message);
  }
}

export interface HttpErrorPayload {
  status: number;
  message?: string;
  resource?: string;
}

type HttpErrorCreator = (payload: HttpErrorPayload) => HttpError;

const httpErrorRegistry: Record<number, HttpErrorCreator> = {
  400: ({ message }) => new BadRequestError(message),
  401: ({ message }) => new UnauthorizedError(message),
  404: ({ message }) => new NotFoundError(message),
  429: ({ message }) => new TooManyRequestsError(message),
  500: ({ message }) => new InternalServerError(message),
};

export class HttpErrorFactory {
  static create(payload: HttpErrorPayload): HttpError {
    const creator = httpErrorRegistry[payload.status];
    return creator ? creator(payload) : new UnknownHttpError(payload.status, payload.message);
  }
}
