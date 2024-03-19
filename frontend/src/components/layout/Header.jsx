import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <header className="navbar bg-white">
        <div className="flex-1">
          <a className="bg-auto md:bg-contain">
            <img
              src="../images/shopit_logo.png"
              alt=""
              className="w-auto h-10 cursor-pointer text-gray-600"
            />
          </a>
        </div>
        <div className="bg-slate-100 p-3 rounded-full">
          <input
            type="text"
            placeholder="搜尋"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
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
                  <button className="btn btn-glass btn-block">
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
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="../images/default_avatar.png"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
