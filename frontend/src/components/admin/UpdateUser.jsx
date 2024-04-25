/* eslint-disable react-hooks/exhaustive-deps */
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const { data } = useGetUserDetailsQuery(params?.id);

  const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("用戶資料已更新");
      navigate("/admin/users");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      role,
    };
    updateUser({ id: params?.id, body: userData });
  };

  return (
    <AdminLayout>
      <MetaData title="更新帳戶" />
      <div className="mx-auto max-w-screen-xl max-h-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-white">
          <h1 className="text-center text-2xl font-bold text-gray-600 sm:text-3xl">
            變更用戶資料
          </h1>

          <form
            className="mb-0 mt-6 space-y-4 p-4 sm:p-6 lg:p-8"
            onSubmit={submitHandler}
          >
            <div>
              <label htmlFor="email_name" className="block text-sm font-medium text-gray-900">
                用戶名稱
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="name_field"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <i className="fa-regular fa-user"></i>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="email_field" className="block text-sm font-medium text-gray-900">
                電子郵件
              </label>

              <div className="relative">
                <input
                  type="email"
                  id="email_field"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <i className="fa-regular fa-envelope"></i>
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="role_field"
                className="block text-sm font-medium text-gray-900"
              >
                帳號權限
              </label>

              <div className="relative">
                <select
                  id="role_field"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                >
                  <option value="">請選擇</option>
                  <option value="admin">管理員</option>
                  <option value="user">一般用戶</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              {isLoading ? (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative inline-block focus:outline-none focus:ring"
                >
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                  <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                    <span className="loading loading-spinner"></span>
                    更新資料中...
                  </span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative inline-block focus:outline-none focus:ring"
                >
                  <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                  <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                    更新資料
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;
