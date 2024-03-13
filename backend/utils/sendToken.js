// 建立 Token 並保存於客戶端的 Cookie
export default (user, statusCode, res) => {
  // 建立 JWT Token
  const token = user.getJwtToken();

  // cookie 選項設定
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // "token"是cookie的名稱，token是一個變數，通常包含了用戶的身份識別信息，options是一個物件
  res.status(statusCode).cookie("token", token, options).json({
    token,
  })
};
