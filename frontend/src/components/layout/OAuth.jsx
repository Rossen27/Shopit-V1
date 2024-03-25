import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// signInSuccess
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Google 登入
      const auth = getAuth(app); // Firebase 認證
      const result = await signInWithPopup(auth, provider); // 開啟 Google 登入視窗
      const res = await fetch("/api/v1/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json(); // 取得用戶資料
      dispatch(signInSuccess(data)); // 登入成功
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message); // 登入失敗
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="w-full btn btn-md text-slate-500 hover:text-slate-800"
    >
      <FcGoogle className="text-2xl rounded-full mr-2" /> Google 登入
    </button>
  );
}
