/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import OAuth from "../layout/OAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/authApi";
import { Link } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import MetaData from "../layout/MetaData";
import { Button } from "@nextui-org/react";
import Loader from "../layout/Loader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading, error, data }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state) => state.auth); // 從 Redux store 中取得 isAuthenticated 狀態

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    login(loginData);
  };
  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"登入"} />
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>
          </div>

          <form
            onSubmit={submitHandler}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="電子郵件"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="user-email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
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
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="密碼"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />

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

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                沒有帳號？ &nbsp;
                <Link to="/register" className="underline" href="#">
                  快速註冊
                </Link>
              </p>
              <Button type="submit" variant="bordered" disabled={isLoading}>
                {isLoading ? "登入中..." : "登入"}
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              <Link to="/password/forgot" className="underline" href="#">
                忘記密碼
              </Link>
            </p>
            <span className="flex items-center">
              <span className="h-px flex-1 bg-black"></span>
              <span className="shrink-0 px-6">OR</span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
            <div className="relative w-full">
              <OAuth />
            </div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://picsum.photos/500/600"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </>
  );
};

export default Login;
