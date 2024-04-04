/* eslint-disable react/prop-types */
import SideMenu from "./SideMenu";
import { FaUserGear, FaFileImage, FaKey, FaAddressBook } from "react-icons/fa6";

const UserLayout = ({ children }) => {
  const menuItems = [
    {
      icon: <FaAddressBook className="text-2xl" />,
      name: "個人資料",
      url: "/me/profile",
    },
    {
      icon: <FaUserGear className="text-2xl" />,
      name: "更新個人資料",
      url: "/me/update_profile",
    },
    {
      icon: <FaKey className="text-2xl" />,
      name: "更改密碼",
      url: "/me/update_password",
    },
    // {
    //   icon: <FaFileImage className="text-2xl" />,
    //   name: "更改頭像",
    //   url: "/me/upload_avatar",
    // },
  ];

  return (
    <div className="">
      <div className="flex">
        <div className="flex w-16 ">
          <SideMenu menuItems={menuItems} />
        </div>
        <div className="w-full p-4">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
