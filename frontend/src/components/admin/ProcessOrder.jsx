import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import AdminLayout from "../layout/AdminLayout";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");
  const params = useParams();
  const { data, isLoading } = useOrderDetailsQuery(params.id);
  const order = data?.order || {};

  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status === "paid" ? "已付款" : "尚未付款";

  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("訂單狀態已更新");
    }
  }, [error, isSuccess]);

  const itemsPerPage = 5; // 每頁顯示的數量
  const [currentPage, setCurrentPage] = useState(1);

  // 計算總頁數
  const totalPages = orderItems
    ? Math.ceil(orderItems.length / itemsPerPage)
    : 0;

  // 根據當前頁碼和每頁顯示的數量計算要顯示的 `orderItems`
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrderItems = orderItems
    ? orderItems.slice(startIndex, endIndex)
    : [];

  const updateOrderHandler = (id) => {
    const data = { status };
    updateOrder({ id, body: data });
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"訂單處理"} />
      <p
        htmlFor="HeadlineAct"
        className="block text-2xl font-medium text-gray-900 mb-2"
      >
        訂單處理
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="rounded-lg lg:col-span-2">
          <div className="flow-root mt-4 shadow-md p-2 rounded-md">
            <span className="flex items-center">
              <span className="pr-6 block text-md font-medium text-gray-900 mb-2">
                訂單明細
              </span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">ID</dt>
                <dd className="text-gray-700 sm:col-span-2">{order?._id}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">訂單狀態</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {orderStatus && (
                    <span
                      className={
                        orderStatus === "處理中"
                          ? "text-yellow-500"
                          : orderStatus === "已送達"
                          ? "text-green-500"
                          : "text-sky-500"
                      }
                    >
                      {orderStatus}
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flow-root mt-4 shadow-md p-2 rounded-md">
            <span className="flex items-center">
              <span className="pr-6 block text-md font-medium text-gray-900 mb-2">
                客戶明細
              </span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">客戶姓名</dt>
                <dd className="text-gray-700 sm:col-span-2">{user.name}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">聯繫電話</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {shippingInfo && shippingInfo.phoneNo}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">收件地址</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {shippingInfo &&
                    `${shippingInfo.country}, ${shippingInfo.city}, ${shippingInfo.zipCode}, ${shippingInfo.address} `}
                </dd>
              </div>
            </dl>
          </div>
          <div className="flow-root mt-4 shadow-md p-2 rounded-md">
            <span className="flex items-center">
              <span className="pr-6 block text-md font-medium text-gray-900 mb-2">
                付款明細
              </span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">付款狀態</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {paymentInfo && (
                    <span
                      className={
                        paymentInfo?.status === "paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      <span>{isPaid}</span>
                    </span>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">付款方式</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {order?.paymentMethod}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">訂單編號</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {paymentInfo.id || "未提供"}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">訂單總額</dt>
                <dd className="text-gray-700 sm:col-span-2">{totalAmount}</dd>
              </div>
            </dl>
          </div>
          <div className="flow-root mt-4 shadow-md p-2 rounded-md">
            <span className="flex items-center">
              <span className="pr-6 block text-md font-medium text-gray-900 mb-2">
                購物明細
              </span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">商品</th>
                    <th className="text-left py-2">數量</th>
                    <th className="text-left py-2">價格</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrderItems.map((item) => (
                    <tr key={item.product}>
                      <td className="py-2">
                        <Link to={`/products/${item.product}`} className="flex">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover"
                          />
                          <p className="m-5">{item.name}</p>
                        </Link>
                      </td>
                      <td className="py-2">{item.quantity}</td>
                      <td className="py-2">${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* 分頁控制器 */}
            </div>
            <ol className="flex justify-center gap-1 text-xs font-medium">
              <li>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                    currentPage === 1 ? "opacity-50" : ""
                  }`}
                >
                  <span className="sr-only">Prev Page</span>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
              </li>
              {/* 根據總頁數渲染分頁按鈕 */}
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => setCurrentPage(i + 1)}
                    className={`block size-8 rounded ${
                      currentPage === i + 1
                        ? "border-gray-600 bg-gray-600 text-white"
                        : "border border-gray-100 bg-white text-center leading-8 text-gray-900"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                    currentPage === totalPages ? "opacity-50" : ""
                  }`}
                >
                  <span className="sr-only">Next Page</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </ol>
          </div>
        </div>
        <div className="rounded-lg ">
          <div>
            <label
              htmlFor="Status"
              className="block text-lg font-medium text-gray-900"
            >
              狀態變更
            </label>
            <select
              name="Status"
              id="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value="處理中">處理中</option>
              <option value="已出貨">已出貨</option>
              <option value="已送達">已送達</option>
            </select>
            <button
              className="w-full group relative inline-block focus:outline-none focus:ring text-center mt-2"
              onClick={() => updateOrderHandler(order?._id)}
            >
              <span className="w-full absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

              <span className="w-full relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                確 認 變 更
              </span>
            </button>
          </div>
          <div className="mt-3">
            <label
              htmlFor="HeadlineAct"
              className="block text-lg font-medium text-gray-900"
            >
              訂 單 列 印
            </label>
            <div className="mt-1 flex justify-center">
              <Link
                to={`/invoice/order/${order?._id}`}
                className="w-full group relative inline-block focus:outline-none focus:ring text-center"
              >
                <span className="w-full absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                <span className="w-full relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  <i className="fa-solid fa-print w-6 h-6"></i> 列 印 收 據
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-10"></div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
