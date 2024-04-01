/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaRegUser, FaRegEnvelope } from "react-icons/fa6";
import UserLayout from "../layout/UserLayout";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [updateProfile, { isLoading, error, isSuccess }] =
    useUpdateProfileMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }
    if (error) {
      toast.error(error?.data);
    }
    if (isSuccess) {
      toast.success("用戶資料更新成功");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
    };
    updateProfile(userData);
  };

  return (
    <UserLayout>
      <div className="mx-auto max-w-screen-xl max-h-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-gray-600 sm:text-3xl">
            變更個人資料
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            變更您的個人資料
          </p>

          <form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={submitHandler}
          >
            {/* <p className="text-center text-lg font-medium">
              Sign in to your account
            </p> */}

            <div>
              <label htmlFor="email_name" className="sr-only">
                Name
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
                  <FaRegUser className="size-4 text-gray-400" />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="email_field" className="sr-only">
                Email
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
                  <FaRegEnvelope className="size-4 text-gray-400" />
                </span>
              </div>
            </div>
            {isLoading ? (
              <button
                type="submit"
                disabled={isLoading}
                className="block w-full rounded-full bg-gray-600 px-5 py-3 text-sm font-medium text-white"
              >
                <span className="loading loading-spinner"></span>
                更新資料中...
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="block w-full rounded-full bg-gray-600 px-5 py-3 text-sm font-medium text-white"
              >
                更新資料
              </button>
            )}

            {/* <p className="text-center text-sm text-gray-500">
              No account?
              <a className="underline" href="#">
                Sign up
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateProfile;
