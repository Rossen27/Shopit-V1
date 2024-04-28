import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "請輸入商品名稱"],
      maxLength: [200, "商品名稱不得超過 200 個字元"],
    },
    price: {
      type: Number,
      required: [true, "請輸入商品價格"],
      maxLength: [5, "商品價格不得超過 5 位數"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "請輸入商品描述"],
    },
    ratings: {
      type: Number,
      default: 0, // 評分，預設為 0
    },
    // imageUrls: {
    //   type: Array,
    //   required: true,
    // }, // 圖片網址，陣列型態
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ], // 圖片網址，陣列型態
    category: {
      type: String,
      required: [true, "請選擇商品分類"],
      enum: {
        values: ["電子產品", "衣物", "鞋子", "書籍", "食品", "相機", "耳機", "配件", "筆記型電腦","其他"],
        message: "請選擇正確的商品分類",
      },
    },
    seller: {
      type: String,
      required: [true, "請輸入賣家名稱"],
    },
    stock: {
      type: Number,
      required: [true, "請輸入商品庫存"],
    },
    numOfReviews: {
      type: Number,
      default: 0, // 評論數量，預設為 0
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId, // 使用者 ID
          ref: "User", // 使用者模型
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        }, // 評分
        comment: {
          type: String,
          required: true,
        }, // 評論
      },
    ], // 評論，陣列型態
    user: {
      type: mongoose.Schema.Types.ObjectId, // 使用者 ID
      ref: "User", // 使用者模型
      required: true, // 測試時先設為 false
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // }, // 建立時間
  },
  { timestamps: true } // 使用 timestamps 選項，自動加入 createdAt 和 updatedAt 欄位
);

export default mongoose.model("Product", productSchema); // 匯出模型