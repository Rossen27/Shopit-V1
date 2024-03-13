class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor); // 獲取錯誤堆棧
  }
}

export default ErrorHandler;
