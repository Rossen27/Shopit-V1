import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from "../../firebase";
import { useDispatch } from 'react-redux';
import { userSlice } from '../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { useGoogleLoginMutation }  from "../../redux/api/authApi";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [googleLoginMutation] = useGoogleLoginMutation(); // 使用 useGoogleLoginMutation hook

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // 使用 useGoogleLoginMutation hook 發起 Google 登入請求
      const { data } = await googleLoginMutation({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });

      // 更新用户状态
      dispatch(userSlice(data));
      navigate('/');
    } catch (error) {
      console.log("無法使用 Google 登入", error);
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
