import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      // 地址
      address: {
        type: String,
        required: true,
      },
      // 城市
      city: {
        type: String,
        required: true,
      },
      // 手機號碼
      phoneNo: {
        type: String,
        required: true,
      },
      // 郵遞區號
      zipCode: {
        type: String,
        required: true,
      },
      // 國家
      country: {
        type: String,
        required: true,
      },
    },
    // 使用者
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // 訂單資料
    orderItems: [
      {
        // 商品名稱
        name: {
          type: String,
          required: true,
        },
        // 數量
        quantity: {
          type: Number,
          required: true,
        },
        // 圖片
        image: {
          type: String,
          required: true,
        },
        // 價格
        price: {
          type: Number,
          required: true,
        },
        // 商品
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    // 付款方式
    paymentMethod: {
      type: String,
      required: [true, "請選擇付款方式"],
      enum: {
        values: ["COD", "Card"],
        message: "請選擇付款方式：貨到付款(COD) 或 信用卡(Card)",
      },
    },
    // 付款資訊
    paymentInfo: {
      id: String,
      status: String,
    },
    // 付款金額(未含稅)
    itemsPrice: {
      type: Number,
      required: true,
    },
    // 稅金
    taxAmount: {
      type: Number,
      required: true,
    },
    // 運費
    shippingAmount: {
      type: Number,
      required: true,
    },
    // 總金額
    totalAmount: {
      type: Number,
      required: true,
    },
    // 訂單狀態
    orderStatus: {
      type: String,
      enum: {
        values: [
          "Processing", // 處理中
          "Shipped", // 已出貨
          "Delivered", // 已送達
          "Paid", // 已付款
          "Cancelled", // 已取消
        ],
        message: "請選擇訂單狀態",
      },
      default: "Processing", // 處理中
    },
    // 時間
    deliveredAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
