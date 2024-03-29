import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();

  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);

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
              src="../images/shopit_logo.png"
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
                <span className="badge badge-sm indicator-item">7</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">7 Items</span>
                <span className="text-slate-500">總金額: $ 999</span>
                <div className="card-actions">
                  <button className="btn btn-glass btn-block rounded-full btn-sm">
                    查看購物車
                  </button>
                </div>
              </div>
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/me/profile" className="justify-between">
                  產品
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/me/orders">設定</Link>
              </li>
              <li>
                <Link to="/admin/dashboard">管理</Link>
              </li>
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
