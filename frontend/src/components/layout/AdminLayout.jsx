/* eslint-disable react/prop-types */
import SideMenu from "./SideMenu";

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      icon: <i className="fa-solid fa-gauge text-2xl"></i>,
      name: "儀表板",
      url: "/admin/dashboard",
    },
    {
      icon: <i className="fa-regular fa-square-plus text-2xl"></i>,
      name: "新增商品",
      url: "/admin/product/new",
    },
    {
      icon: <i className="fa-brands fa-product-hunt text-2xl"></i>,
      name: "修改商品",
      url: "/admin/products",
    },
    {
      icon: <i className="fa-solid fa-file-invoice-dollar text-2xl"></i>,
      name: "訂單查詢",
      url: "/admin/orders",
    },
    {
      icon: <i className="fa-solid fa-users-rectangle text-2xl"></i>,
      name: "會員管理",
      url: "/admin/users",
    },
    {
      icon: <i className="fa-solid fa-ranking-star text-2xl"></i>,
      name: "評論查詢",
      url: "/admin/reviews",
    },
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

export default AdminLayout;
