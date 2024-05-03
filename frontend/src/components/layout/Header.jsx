import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import avatar from "../../assets/images/default_avatar.jpg";
import headerLogo from "../../assets/images/shopit_logo.png";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";

const Header = () => {
  const [isInvisible] = useState(false); //購物車

  const navigate = useNavigate();

  const { isLoading } = useGetMeQuery();
  const [logout] = useLazyLogoutQuery();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    logout();
    navigate(0);
  };
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <>
      <Navbar isBordered>
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="center">
          <Search />
        </NavbarContent>

        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <Link to="/" className="hidden sm:block font-bold text-inherit">
              <img src={headerLogo} alt="" className="w-auto h-10" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarContent className="hidden sm:flex gap-3">
            <NavbarItem>
              <Link color="foreground" href="#">
                ABOUT
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page" color="secondary">
                BLOG
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                CONTACT
              </Link>
            </NavbarItem>
          </NavbarContent>
          <Search />
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarContent as="div" className="items-center" justify="end">
          <Dropdown placement="bottom-end">
            <Link to="/cart">
              <Badge
                content={cartItems?.length}
                isInvisible={isInvisible}
                shape="circle"
                color="danger"
              >
                <Button
                  radius="full"
                  isIconOnly
                  aria-label="more than 99 notifications"
                  variant="light"
                >
                  <FiShoppingCart size={24} />
                </Button>
              </Badge>
            </Link>
          </Dropdown>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="default"
                size="sm"
                src={user?.avatar ? user?.avatar?.url : avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem className="h-14 gap-2" key="user">
                {user ? (
                  <>
                    <p className="font-semibold">{!isLoading && user?.name}</p>
                    <p className="font-semibold">{user?.email}</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">User Name</p>
                    <p className="font-semibold">User Email</p>
                  </>
                )}
              </DropdownItem>
              <DropdownItem
                key="profile"
                startContent={<i className="fa-solid fa-user-gear"></i>}
              >
                <Link to="/me/profile" className="justify-between">
                  個人資料管理
                </Link>
              </DropdownItem>
              <DropdownItem
                key="orders"
                startContent={
                  <i className="fa-solid fa-money-check-dollar"></i>
                }
              >
                <Link to="/me/orders">訂單管理</Link>
              </DropdownItem>
              {user?.role === "admin" && (
                <DropdownItem
                  key="admin"
                  startContent={
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  }
                >
                  <Link to="/admin/dashboard">後台管理</Link>
                </DropdownItem>
              )}
              {user ? (
                !isLoading && (
                  <DropdownItem
                    key="logout"
                    startContent={<i className="fa-solid fa-gauge-high"></i>}
                    color="danger"
                  >
                    <Link to="/" onClick={logoutHandler}>
                      登 出
                    </Link>
                  </DropdownItem>
                )
              ) : (
                <DropdownItem
                  key="login"
                  startContent={
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  }
                  color="success"
                >
                  <Link to="/login">登入</Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Header;
