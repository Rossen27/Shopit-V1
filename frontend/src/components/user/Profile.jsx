/* eslint-disable react-hooks/exhaustive-deps */
import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(""); // 將大頭照的狀態設為空字串
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
  );
  const navigate = useNavigate();
  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data);
    }
    if (isSuccess) {
      toast.success("用戶頭像更新成功");
      navigate("/me/profile");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault(); // 防止表單提交
    const userData = {
      avatar,
    };
    uploadAvatar(userData);
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <UserLayout>
      <MetaData title="個人資料管理" />
      <div className="mx-auto max-w-screen-md px-4 py-16 mt-6 rounded-lg  shadow-lg bg-white">
        <dl className="mt-4 mx-4 -my-3 divide-y divide-gray-100 text-sm ">
          <div className="p-4 flex justify-center">
            <form className="flex flex-col" onSubmit={submitHandler}>
              <input
                className="rounded-full w-32 h-32"
                type="file"
                name="avatar"
                hidden
                id="customFile"
                accept="images/*"
                onChange={onChange}
              />
              {/* 大頭照 */}
              <img
                onClick={() => document.getElementById("customFile").click()}
                className="rounded-full w-32 h-32"
                alt="avatar"
                src={avatarPreview || user.avatar}
              />
              <button
                className="mt-2 btn glass btn-sm text-slate-600 hover:text-slate-800"
                id="register_button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "更新中..." : "更 新 頭 像"}
              </button>
            </form>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">使用者名稱</dt>
            <dd className="text-gray-700 sm:col-span-2">{user?.name}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">電子郵件</dt>
            <dd className="text-gray-700 sm:col-span-2">{user?.email}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">管理權限</dt>
            <dd className="text-gray-700 sm:col-span-2">{user?.role}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">資料建立日期</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {user?.createdAt?.substring(0, 19)}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">資料更新日期</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {user?.updatedAt?.substring(0, 19)}
            </dd>
          </div>

          {/* <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Salary</dt>
            <dd className="text-gray-700 sm:col-span-2">$1,000,000+</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Bio</dt>
            <dd className="text-gray-700 sm:col-span-2">
              Lorem 
            </dd>
          </div> */}
        </dl>
      </div>
    </UserLayout>
  );
}
