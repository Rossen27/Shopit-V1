import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });
// 1) 設定 cloudinary 的設定檔
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2) 上傳圖片到 cloudinary
export const upload_file = (file, folder) => {
  return new Promise((resolve, reject) => {
    // 這裡的 cloudinary.uploader.upload 也可以使用 cloudinary.v2.uploader.upload
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "auto", // 上傳的資源類型，auto 會自動判斷
        folder, // 上傳到 cloudinary 的資料夾
      }
    );
  });
};

// 3) 刪除 cloudinary 上的圖片
export const delete_file = async (file) => {
  const res = await cloudinary.uploader.destroy(file);
  // 如果刪除成功，cloudinary 會回傳 { result: "ok" }
  if (res?.result === "ok") return true;
};
