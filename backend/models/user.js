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
      // type: String, // 必須為字串
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", // 預設值為網路圖片
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
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10); 
// });
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    // 生成鹽值(salt)亂數，原理是使用 bcrypt 中的 genSalt 產生10個字元的鹽值加強密碼的安全性
    const salt = await bcrypt.genSalt(10);
    // 使用生成的鹽值(salt)亂數來加密密碼
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
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
