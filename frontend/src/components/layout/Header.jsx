import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { FiShoppingCart } from "react-icons/fi";
import HeaderCart from "../cart/HeaderCart";

export default function Header() {
  const navigate = useNavigate();

  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };
  return (
    <>
      <header className="navbar bg-white flex justify-between">
        <div className="flex">
          <Link to="/" className="bg-auto md:bg-contain">
            <img
              src="../../images/shopit_logo.png"
              alt=""
              className="w-auto h-10 cursor-pointer text-gray-600"
            />
          </Link>
        </div>
        <div className="flex">
          <Search />
        </div>
        <div className="flex">
          <div className="dropdown dropdown-end px-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <FiShoppingCart className="h-7 w-7" />
                <span className="badge badge-sm indicator-item">
                  {cartItems?.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content"
            >
              <HeaderCart />
            </div>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full avatar avatar-nav">
                {user ? (
                  <img src={user.avatar} className="rounded-circle" />
                ) : (
                  <img
                    src="/images/default_avatar.jpg"
                    className="rounded-circle"
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 "
            >
              <li>
                <Link to="/me/profile" className="justify-between">
                  個人資料管理
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/me/orders">訂單管理</Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link to="/admin/dashboard">後台管理</Link>
                </li>
              )}
              {user ? (
                !isLoading && (
                  <li>
                    <Link to="/" onClick={logoutHandler}>
                      登出
                    </Link>
                  </li>
                )
              ) : (
                <li>
                  <Link to="/login">登入</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
