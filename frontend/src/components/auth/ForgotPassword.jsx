/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("郵件已寄出，請檢查您的收件匣");
    }
  }, [error, isAuthenticated, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword({ email });
  };

  return (
    <>
    <MetaData title={"忘記密碼"} />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-gray-600 sm:text-3xl">
            忘記密碼
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            請輸入您的電子郵件地址，我們將向您發送一個重設密碼的連結至您的收件匣。
          </p>

          <form
            onSubmit={submitHandler}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <div>
              <label htmlFor="email_field" className="sr-only">
                Email
              </label>
              <div className="relative block overflow-hidden border-b border-gray-300 bg-transparent pt-3 focus-within:border-gray-600">
                <input
                  type="email"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="電子郵件"
                  id="email_field"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                  Email
                </span>
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <MdAlternateEmail />
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
                  {isLoading ? "發 送 中..." : "發 送 重 置 密 碼"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
