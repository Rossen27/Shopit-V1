/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuEye, LuEyeOff } from "react-icons/lu";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = user;

  const navigate = useNavigate();

  const [register, { isLoading, error, data }] = useRegisterMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

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
    if (password !== confirmPassword) {
      toast.error("密碼確認不匹配");
      return;
    }
    const signUpData = {
      name,
      email,
      password,
    };

    register(signUpData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <Link to="/" className="block text-white">
                <span className="sr-only">Home</span>
                <img
                  className="h-12"
                  src="../images/shopit_logo_white.png"
                />
              </Link>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to RossenHua 🦑
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                探索無麩美食的世界！無論您是因為健康、美味還是對新鮮體驗的渴望，我們的無麩美食地圖為您打開了無限可能。
                <br />
                從精緻的餐廳到溫馨的咖啡館，我們精心挑選了各種無麩料理，讓您輕鬆尋找到心儀的美食之地。
                <br />
                立即加入我們，探索一場無麩的美食冒險！
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block lg:hidden">
                <Link
                  to="/"
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                >
                  <span className="sr-only">Home</span>
                  <img className="h-10 w-10" src="../vite.svg" />
                </Link>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to RossenHua 🦑
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  探索無麩美食的世界！無論您是因為健康、美味還是對新鮮體驗的渴望，我們的無麩美食地圖為您打開了無限可能。
                  <br />
                  從精緻的餐廳到溫馨的咖啡館，我們精心挑選了各種無麩料理，讓您輕鬆尋找到心儀的美食之地。
                  <br />
                  立即加入我們，探索一場無麩的美食冒險！
                </p>
              </div>

              <form
                className="mt-8 grid grid-cols-6 gap-6"
                onSubmit={submitHandler}
              >
                <div className="col-span-6">
                  <label
                    htmlFor="name_field"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                  >
                    <input
                      type="text"
                      id="Uname_field"
                      placeholder="Name"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      name="name"
                      value={name}
                      onChange={onChange}
                    />

                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Name
                    </span>
                  </label>
                </div>

                {/* <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="LastName"
                    name="last_name"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div> */}

                <div className="col-span-6">
                  <label
                    htmlFor="email_field"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                  >
                    <input
                      type="email"
                      id="email_field"
                      placeholder="Email"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      name="email"
                      value={email}
                      onChange={onChange}
                    />

                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Email
                    </span>
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password_field"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password_field"
                      placeholder="password"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      name="password"
                      value={password}
                      onChange={onChange}
                    />
                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      Password
                    </span>
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="passwordConfirmation_field"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      id="passwordConfirmation_field"
                      name="confirmPassword"
                      placeholder="password"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      value={confirmPassword}
                      onChange={onChange}
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                      {showPassword ? (
                        <LuEyeOff
                          className="text-gray-400"
                          onClick={() =>
                            setShowPassword((prevState) => !prevState)
                          }
                        />
                      ) : (
                        <LuEye
                          className="text-gray-400"
                          onClick={() =>
                            setShowPassword((prevState) => !prevState)
                          }
                        />
                      )}
                    </span>
                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      PasswordConfirmation
                    </span>
                  </label>
                </div>

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="checkbox size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                      我想接收有關活動、產品更新和公司公告。
                    </span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    建立帳戶即表示您同意我們的
                    <a href="#" className="text-gray-700 underline">
                      {" "}
                      條款與條件{" "}
                    </a>
                    以及
                    <a href="#" className="text-gray-700 underline">
                      隱私權政策
                    </a>
                    。
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  {/* <button
                    className="inline-block shrink-0 rounded-xl border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    id="register_button"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "註冊中..." : "立即註冊"}
                  </button> */}
                  <button
                    className="group relative inline-block focus:outline-none focus:ring"
                    id="register_button"
                    type="submit"
                    disabled={isLoading}
                  >
                    <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
                    <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                    {isLoading ? "註冊中..." : "立即註冊"}
                    </span>
                  </button>
                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    已有帳戶 ? <span> </span>
                    <Link to="/login" className="text-gray-700 underline">
                      登 入
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}

export default Register;
