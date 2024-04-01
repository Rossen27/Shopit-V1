import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <UserLayout>
      <MetaData title="個人資料管理" />
      <div className="h-auto bg-white shadow-md rounded-lg hover:shadow-xl">
        <dl className="mt-4 mx-4 -my-3 divide-y divide-gray-100 text-sm ">
          <div className="p-4 flex justify-center">
            <img
              src={
                user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
              }
              alt={user?.name}
              className="rounded-full w-32 h-32"
            />
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
              facilis debitis explicabo doloremque impedit nesciunt dolorem
              facere, dolor quasi veritatis quia fugit aperiam aspernatur neque
              molestiae labore aliquam soluta architecto?
            </dd>
          </div> */}
        </dl>
      </div>
    </UserLayout>
  );
}
