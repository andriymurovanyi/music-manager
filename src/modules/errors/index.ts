const DEFAULT_ERROR_CODE = 500;

export class APIError extends Error {
  public statusCode: number;

  constructor(statusCode: number = DEFAULT_ERROR_CODE, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;

    Error.captureStackTrace(this);
  }
}

export default {
  APIError
};