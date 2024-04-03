// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { deleteObject } from "firebase/storage";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Get Firebase Storage service

// 上傳至 Firebase
export const uploadFile = (file, folder) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // 監聽上傳進度
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`上傳進度: ${progress}%`);
      },
      (error) => {
        // 上傳失敗
        reject(error);
      },
      () => {
        // 上傳完成處理
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve({
              url: downloadURL,
            });
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};

// 從 Firebase 刪除文件
export const deleteFile = async (file) => {
  const storageRef = ref(storage, file);
  try {
    await deleteObject(storageRef);
    return true; // 刪除成功
  } catch (error) {
    console.error("Deletion failed:", error);
    return false; // 刪除失敗
  }
};