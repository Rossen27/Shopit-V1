/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import avatar from "../../assets/images/default_avatar.jpg";

const SideMenu = ({ menuItems }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };
  return (
    <>
      <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
        <div className="">
          <div className="inline-flex size-16 items-center justify-center">
            <span className="grid size-10 place-content-center bg-gray-100">
              {user ? (
                <img src={user.avatar} className="rounded-md" />
              ) : (
                <img
                  src={avatar}
                  className="rounded-md"
                />
              )}
            </span>
          </div>

          <div className="border-t border-gray-100">
            <div className="px-2">
              {/* <div className="py-4">
                <a
                  href="#"
                  className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <FaAddressBook />

                  <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                    個人資料
                  </span>
                </a>
              </div> */}

              <ul className="space-y-1 border-t border-gray-100 pt-4">
                {/* <li>
                  <a
                    href="#"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <FaAddressCard />
                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      個人資料
                    </span>
                  </a>
                </li> */}
                <li>
                  {menuItems?.map((menuItem, index) => (
                    <Link
                      key={index}
                      to={menuItem.url}
                      className={`group relative flex justify-center rounded px-3 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-700 ${
                        activeMenuItem.includes(menuItem.url) ? "active" : ""
                      }`}
                      onClick={() => handleMenuItemClick(menuItem.url)}
                      aria-current={
                        activeMenuItem.includes(menuItem.url) ? "true" : "false"
                      }
                    >
                      {menuItem.icon}
                      <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                        {menuItem.name}
                      </span>
                    </Link>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <form action="#">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Logout
              </span>
            </button>
          </form>
        </div> */}
      </div>
    </>
  );
};

export default SideMenu;
