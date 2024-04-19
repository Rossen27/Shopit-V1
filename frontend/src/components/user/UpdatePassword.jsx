/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import UserLayout from "../layout/UserLayout";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import MetaData from "../layout/MetaData";

const UpdatePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const navigate = useNavigate();
  const [logout] = useLazyLogoutQuery();

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.promise(
        // 使用 toast.promise() 顯示一個 Promise，以便在用户點擊時顯示不同的狀態
        new Promise((resolve) => {
          resolve();
        }),
        {
          loading: "密碼更新中...", // 顯示加載狀態
          success: "密碼已更新成功，請重新登入。", // 顯示成功狀態
          error: "發生錯誤", // 顯示錯誤狀態
        }
      );
      setTimeout(() => {
        // 等待 2 秒後重新導向到登出頁面
        logout();
        navigate(0);
      }, 2000);
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== checkNewPassword) {
      toast.error("密碼確認不匹配");
      return;
    }
    if (password === "" || password.length < 6 || password.length > 20 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      toast.error("密碼必須是 7 到 20 個字符，並包含至少一個大寫字母和一個小寫字母");
      return;
    }
    const userData = {
      oldPassword,
      password,
      checkNewPassword,
    };

    updatePassword(userData);
  };

  return (
    <UserLayout>
      <MetaData title="變更密碼" />
      <div className="mx-auto max-w-screen-md px-4 py-16 mt-6 rounded-lg  shadow-lg bg-white">
        <div className="mx-auto max-w-lg text-center ">
          <h1 className="text-2xl font-bold sm:text-3xl text-gray-500">密碼變更</h1>
          {/* <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet consectetur
          </p> */}
        </div>

        <form
          action="#"
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          onSubmit={submitHandler}
        >
          <div>
            <label htmlFor="old_password_field" className="sr-only">
              Old Password
            </label>

            <div className="relative block overflow-hidden border-b border-gray-300 bg-transparent pt-3 focus-within:border-gray-600">
              <input
                type={showOldPassword ? "text" : "password"}
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="舊密碼"
                id="old_password_field"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                Old Password
              </span>
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {showOldPassword ? (
                  <LuEyeOff
                    className="text-gray-400"
                    onClick={() =>
                      setShowOldPassword((prevState) => !prevState)
                    }
                  />
                ) : (
                  <LuEye
                    className="text-gray-400"
                    onClick={() =>
                      setShowOldPassword((prevState) => !prevState)
                    }
                  />
                )}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg> */}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="new_password_field" className="sr-only">
              New Password
            </label>

            <div className="relative block overflow-hidden border-b border-gray-300 bg-transparent pt-3 focus-within:border-gray-600">
              <input
                type={showNewPassword ? "text" : "password"}
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="新密碼"
                id="new_password_field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                New Password
              </span>
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {/* {showNewPassword ? (
                  <LuEyeOff
                    className="text-gray-400"
                    onClick={() =>
                      setShowNewPassword((prevState) => !prevState)
                    }
                  />
                ) : (
                  <LuEye
                    className="text-gray-400"
                    onClick={() =>
                      setShowNewPassword((prevState) => !prevState)
                    }
                  />
                )} */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg> */}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="check_new_password_field" className="sr-only">
              Check New Password
            </label>

            <div className="relative block overflow-hidden border-b border-gray-300 bg-transparent pt-3 focus-within:border-gray-600">
              <input
                type={showNewPassword ? "text" : "password"}
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="確認新密碼"
                id="check_new_password_field"
                value={checkNewPassword}
                onChange={(e) => setCheckNewPassword(e.target.value)}
              />
              <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                Check New Password
              </span>
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                {showNewPassword ? (
                  <LuEyeOff
                    className="text-gray-400"
                    onClick={() =>
                      setShowNewPassword((prevState) => !prevState)
                    }
                  />
                ) : (
                  <LuEye
                    className="text-gray-400"
                    onClick={() =>
                      setShowNewPassword((prevState) => !prevState)
                    }
                  />
                )}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg> */}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 group relative inline-block focus:outline-none focus:ring"
            >
              <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

              <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                {isLoading ? "變 更 中..." : "確 認 變 更"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;
