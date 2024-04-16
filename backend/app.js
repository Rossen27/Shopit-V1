import express from "express";
const app = express();
import dotenv from "dotenv"; // 引入 dotenv
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js"; // 引入資料庫連接模組
import errorMiddleware from "./middlewares/errors.js"; // 引入錯誤處理中介軟體

// 處理未處理的拒絕
process.on("uncaughtException", (err) => {
  console.log(`錯誤： ${err}`);
  console.log("關閉伺服器因為未處理的拒絕");
  process.exit(1);
});

// 設定 .env 檔案的路徑
dotenv.config({ path: "backend/config/config.env" }); // 使用 dotenv.config() 方法，並指定 .env 檔案的路徑
// 引入資料庫連接模組
connectDatabase();

app.use(
  express.json({
    limit: "5mb", // 設定限制大小為 5mb
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // 使用 req.rawBody 取得請求主體中的原始資料
    },
  })
); // 使用 express.json() 中介軟體，以解析請求主體中的 JSON 資料  (這裡是解析 req.body) 並設定限制大小為 5mb
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser()); // 使用 cookieParser() 中介軟體，以解析請求中的 cookie

// 設定路由
import productRoutes from "./routes/products.js"; // 引入產品路由
import authRoutes from "./routes/auth.js"; // 引入 authRoutes 模組
import orderRoutes from "./routes/order.js"; // 引入 orderRoutes 模組
import paymentRoutes from "./routes/payment.js"; // 引入 paymentRoutes 模組

app.use("/api/v1", productRoutes); // 使用產品路由
app.use("/api/v1", authRoutes); // 使用使用者路由
app.use("/api/v1", orderRoutes); // 使用訂單路由
app.use("/api/v1", paymentRoutes); // 使用付款路由

// 使用錯誤處理中介軟體
app.use(errorMiddleware);

// 啟動伺服器
const server = app.listen(process.env.PORT, () => {
  console.log(
    `伺服器正在連接埠號： ${process.env.PORT} 上，並以 ${process.env.NODE_ENV} 模式啟動`
  ); // 使用 process.env.PORT 取得 .env 檔案中的 PORT 變數 (這裡是 3000)
});

// 處理未處理的拒絕
process.on("unhandledRejection", (err) => {
  console.log(`錯誤： ${err}`);
  console.log("關閉伺服器因為未處理的拒絕");
  server.close(() => {
    process.exit(1);
  });
});
