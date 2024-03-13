import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    // 使用者名稱
    name: {
      type: String,
      required: [true, "請輸入姓名"],
      maxLength: [50, "姓名不能超過 50 個字元"],
    },
    // 電子郵件
    email: {
      type: String,
      required: [true, "請輸入電子郵件"],
      unique: true, // 電子郵件必須是唯一的
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "請輸入有效的電子郵件",
      ],
    },
    // 密碼
    password: {
      type: String,
      required: [true, "請輸入密碼"],
      minLength: [6, "密碼不能少於 6 個字元"],
      select: false, // 預設不顯示密碼
    },
    // 頭像
    avatar: {
      public_id: String,
      url: String,
    },
    // // 地址
    // address: [
    //   {
    //     city: {
    //       type: String,
    //       required: [true, "請輸入城市"],
    //     },
    //     postalCode: {
    //       type: String,
    //       required: [true, "請輸入郵遞區號"],
    //     },
    //     street: {
    //       type: String,
    //       required: [true, "請輸入街道"],
    //     },
    //   },
    // ],
    // 角色
    role: {
      type: String,
      default: "user",
    },
    // 重置密碼的 token
    resetPasswordToken: String,
    // 重置密碼的 token 過期時間
    resetPasswordExpire: Date,
  },
  { timestamps: true } // 記錄建立和更新的時間
);
// 加密密碼
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10); // 加密密碼 (10 是 salt 值)
});
// 設定 JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME, // 過期時間
  });
};
// 比對密碼
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 重置密碼的 token
userSchema.methods.getResetPasswordToken = function () {
  // 產生 token
  const resetToken = crypto.randomBytes(20).toString("hex"); // 20 bytes -> 40 hex 字元
  // 將生成的重置密碼的 token 進行加密並存儲到資料庫
  this.resetPasswordToken = crypto
    .createHash("sha256") // 使用 sha256 加密
    .update(resetToken) // 更新 token
    .digest("hex"); // 輸出 16 進位的字串
  // 設定 token 過期時間
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 分鐘後過期
  return resetToken;
};

export default mongoose.model("User", userSchema);
