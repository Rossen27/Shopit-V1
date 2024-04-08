/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/userApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [resetPassword, { isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("密碼已重設，請重新登入");
      navigate("/login");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("密碼不一致");
    }
    const data = { password, confirmPassword };
    resetPassword({ token: params?.token, body: data });
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-gray-600 sm:text-3xl">
            重置密碼
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            請輸入您的新密碼。
          </p>

          <form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={submitHandler}
          >
            <div>
              <label htmlFor="password_field" className="sr-only">
                Password
              </label>
              <div className="relative block overflow-hidden border-b border-gray-300 bg-transparent pt-3 focus-within:border-gray-600">
                <input
                  type={showPassword ? "text" : "password"}
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="password"
                  id="password_field"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                  新密碼
                </span>
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  {showPassword ? (
                    <LuEyeOff
                      className="text-gray-400"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  ) : (
                    <LuEye
                      className="text-gray-400"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  )}
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword _field" className="sr-only">
                Password
              </label>
              <div className="relative block overflow-hidden border-b border-gray-300 bg-transparent pt-3 focus-within:border-gray-600">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="confirmPassword _field"
                  id="confirmPassword _field"
                  name="confirmPassword _field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                  確認新密碼
                </span>
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  {showConfirmPassword ? (
                    <LuEyeOff
                      className="text-gray-400"
                      onClick={() =>
                        setShowConfirmPassword((prevState) => !prevState)
                      }
                    />
                  ) : (
                    <LuEye
                      className="text-gray-400"
                      onClick={() =>
                        setShowConfirmPassword((prevState) => !prevState)
                      }
                    />
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                id="forgot_password_button"
                type="submit"
                className="mt-5 group relative inline-block focus:outline-none focus:ring"
                disabled={isLoading}
              >
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  {isLoading ? "發 送 中..." : "重 置 密 碼"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
