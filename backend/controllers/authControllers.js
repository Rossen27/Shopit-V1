import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// 註冊新用戶 =>  /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body; // 從前端傳來的資料
  const user = await User.create({
    name,
    email,
    password,
  }); // 創建新用戶

  // 回傳成功訊息
  sendToken(user, 201, res);
});

// 登入 =>  /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body; // 從前端傳來的資料

  // 確認是否有輸入電子郵件和密碼
  if (!email || !password) {
    return next(new ErrorHandler("請輸入電子郵件和密碼", 400));
  }

  // 從資料庫中找尋用戶
  const user = await User.findOne({ email }).select("+password"); // 選擇性顯示密碼
  if (!user) {
    return next(new ErrorHandler("電子郵件或密碼輸入錯誤", 401));
  }

  // 確認密碼是否正確
  const isPasswordMatched = await user.comparePassword(password); // 比對密碼
  if (!isPasswordMatched) {
    return next(new ErrorHandler("電子郵件或密碼輸入錯誤", 401));
  }

  // 回傳成功訊息
  sendToken(user, 200, res);
});

// Google 登入
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // 比對使用者是否相符
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // 根據 MongoDB 的 ID 產生 token
      const { password: pass, ...rest } = user._doc; // 將密碼從資料庫中移除
      res
        // file deepcode ignore WebCookieSecureDisabledByDefault: <please specify a reason of ignoring this>
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24小時 * 1小時 * 1分鐘 * 1000天 1 天後過期
        }) // 將 token 存入 cookie
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); // 產生16位元亂數密碼
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10); // 設定密碼加密
      const newUser = new User({
        username:
          // file deepcode ignore HTTPSourceWithUncheckedType: <please specify a reason of ignoring this>
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      }); // 紀錄新的使用者
      await newUser.save(); // 保存新使用者紀錄
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET); // 根據 MongoDB 的 ID 產生 token
      const { password: pass, ...rest } = newUser._doc; // 將密碼從資料庫中移除
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24小時 * 1小時 * 1分鐘 * 1000天 1 天後過期
        }) // 將 token 存入 cookie
        .status(200)
        .json(rest);
    }
  } catch (error) {
    return next(new ErrorHandler(`此 Google 帳戶無法使用`, 400));
  }
};


// 登出 =>  /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  // file deepcode ignore WebCookieSecureDisabledExplicitly: <已進行修正>
  res.cookie("token", null, {
    expires: new Date(Date.now()), // 過期時間
    httpOnly: true, // 防止XSS攻擊
    secure: process.env.NODE_ENV === "production" ? true : false, // 只在生產環境使用
  });

  res.status(200).json({
    message: "登出成功",
  });
});

// 忘記密碼 =>  /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // 1) 從資料庫中找尋用戶
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("未找到使用此電子郵件的用戶", 404));
  }

  // 2)重新設定密碼的 token
  const resetToken = user.getResetPasswordToken(); // 取得重新設定密碼的 token
  await user.save(); // 保存到資料庫

  // 3) 重新設定密碼的 URL，若有前端畫面/api/v1需刪除
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`; // 重新設定密碼的 URL

  // 4) 重新設定密碼的訊息
  const message = getResetPasswordTemplate(user?.name, resetUrl); // 取得重新設定密碼的訊息

  // 5) 發送郵件
  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });

    res.status(200).json({
      message: `新密碼已寄至: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined; // 清除重新設定密碼的 token
    user.resetPasswordExpire = undefined; // 清除重新設定密碼的過期時間

    await user.save(); // 保存到資料庫
    return next(new ErrorHandler(error?.message, 500));
  }
});

// 重新設定密碼 =>  /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // 1) 取得重新設定密碼的 token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token) // 從網址取得 token
    .digest("hex");

  // 2) 從資料庫中找尋用戶
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, // 過期時間大於現在時間
  });
  if (!user) {
    return next(new ErrorHandler("重設密碼連結無效或已過期", 400));
  }

  // 3) 重新設定密碼
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("密碼不一致", 400));
  }

  // 4) 設定新密碼
  user.password = req.body.password; // 設定新密碼
  user.resetPasswordToken = undefined; // 清除重新設定密碼的 token
  user.resetPasswordExpire = undefined; // 清除重新設定密碼的過期時間
  await user.save(); // 保存到資料庫
  sendToken(user, 200, res);
});

// 取得目前登入的用戶資料 =>  /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.user?._id); // 從資料庫中找尋用戶
  res.status(200).json({
    user,
  });
});

// 更新密碼 =>  /api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  // 1) 從資料庫中找尋用戶
  const user = await User.findById(req?.user?._id).select("+password"); 

  // 2) 確認舊密碼是否正確
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("原密碼輸入錯誤", 400));
  }

  // 3) 更新密碼
  user.password = req.body.password;
  user.save(); // 保存到資料庫

  res.status(200).json({
    success: true,
    message: "密碼更新成功",
  });
});

// 更新用戶資料 =>  /api/v1/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  // 1) 取得新用戶資料
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // 2) 更新用戶資料
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
  });
  res.status(200).json({
    user,
  });
});

// 管理員功能 => 取得所有用戶 =>  /api/v1/admin/users
export const allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find(); // 取得所有用戶
  res.status(200).json({
    users,
  });
});

// 管理員功能 => 取得單一用戶詳細資料 =>  /api/v1/admin/users/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id); // 取得單一用戶詳細資料
  if (!user) {
    return next(new ErrorHandler(`找不到ID為${req.params.id}的用戶`, 404));
  }
  res.status(200).json({
    user,
  });
});

// 管理員功能 => 更新單一用戶詳細資料 =>  /api/v1/admin/users/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });
  res.status(200).json({
    user,
  });
});

// 管理員功能 => 刪除單一用戶 =>  /api/v1/admin/users/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id); // 取得單一用戶
  if (!user) {
    return next(new ErrorHandler(`找不到ID為 ${req.params.id} 的用戶`, 404));
  }
  // 刪除用戶圖片

  await user.deleteOne(); // 刪除單一用戶

  res.status(200).json({
    message: `帳號為 ${req.params.id} 的用戶已刪除`,
  });
});