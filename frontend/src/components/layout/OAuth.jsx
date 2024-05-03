import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import { useGoogleLoginMutation } from "../../redux/api/authApi";
import { Button } from "@nextui-org/react";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLogin] = useGoogleLoginMutation();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // 將登入資料傳送給後端
      const { data } = await googleLogin({
        // 呼叫後端的 Google 登入 API
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("無法使用 Google 登入", error);
    }
  };

  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      className="w-full"
      variant="ghost"
      color="success"
      startContent={<FcGoogle />}
    >
      Google 登入
    </Button>
  );
}
