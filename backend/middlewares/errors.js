import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500, // 如果有 statusCode，就使用 statusCode；否則使用 500
    message: err?.message || "內部伺服器錯誤", // 如果有 message，就使用 message；否則使用 "內部伺服器錯誤"
  };

    // 處理無效的 MongoDB 物件 ID 錯誤
    if (err.name === "CastError") {
      const message = `查無資料，無效的 ${err?.path}`;
      error = new ErrorHandler(message, 404);
    }
  
    // 處理驗證錯誤
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

      // 處理重複的 MongoDB ID 錯誤
  if (err.code === 11000) {
    const message = `此${Object.keys(err.keyValue)}已重複註冊，請輸入其他${Object.keys(err.keyValue)}`;
    error = new ErrorHandler(message, 400);
  }

  // 處理錯誤的 JSON Web Token
  if (err.name === "JsonWebTokenError") {
    const message = "無效的 JSON Web Token，請重新登入";
    error = new ErrorHandler(message, 400);
  }

  // 處理過期的 JSON Web Token
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token 已過期，請重新登入";
    error = new ErrorHandler(message, 400);
  }

  // 如果是開發模式，就在控制台中打印錯誤 (例如：錯誤訊息的格式化、錯誤訊息的記錄、錯誤訊息的發送等等
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(error.statusCode).json({
      message: error.message,
      error: err, 
      stack: err?.stack,
    });
  }

  // 如果是生產模式，就在控制台中打印錯誤訊息 (例如：錯誤訊息的格式化、錯誤訊息的記錄、錯誤訊息的發送等等
  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
