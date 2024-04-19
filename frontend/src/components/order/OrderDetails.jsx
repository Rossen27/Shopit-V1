import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";

const OrderDetails = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params.id);
  const order = data?.order || {};

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
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"訂單明細"} />
      <div className="flex justify-center items-center m-6">
        <div className="w-10/12 bg-white p-6 rounded-lg">
          <h1 className="text-center text-3xl font-semibold">訂 單 明 細</h1>
          <h4 className="text-xl font-semibold mt-6">訂單資訊</h4>
          <div className="mt-4 flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">訂單編號</dt>
                <dd className="text-gray-700 sm:col-span-2">{order._id}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">訂購日期</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {new Date(order?.createdAt).toLocaleString("tw")}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">訂單狀態</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {orderStatus && (
                    <span
                      className={
                        orderStatus === "處理中"
                          ? "text-yellow-500"
                          : orderStatus === "已付款" ||
                            orderStatus === "已完成" ||
                            orderStatus === "已送達"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {orderStatus}
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
          <h4 className="text-xl font-semibold mt-6">運送資訊</h4>
          <div className="mt-4 flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">姓名</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {user && user.name}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">電話</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {shippingInfo && shippingInfo.phoneNo}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">地址</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {shippingInfo &&
                    `${shippingInfo.country}, ${shippingInfo.city}, ${shippingInfo.zipCode}, ${shippingInfo.address} `}
                </dd>
              </div>
            </dl>
          </div>
          <h4 className="text-xl font-semibold mt-6">付款資訊</h4>
          <div className="mt-4 flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">支付狀態</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  
                  {paymentInfo && (
                    <span
                    className={paymentInfo?.status === "paid" ? "text-green-500" : "text-red-500"}
                    >
                      <span>{isPaid}</span>
                    </span>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">付款方式</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {order?.paymentMethod}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">付款編號</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {paymentInfo.id || "未提供"}
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">付款金額</dt>
                <dd className="text-gray-700 sm:col-span-2">$ {totalAmount}</dd>
              </div>
            </dl>
          </div>
          <h4 className="text-xl font-semibold mt-6">訂單商品</h4>
          <div className="mt-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">商品</th>
                  <th className="text-left py-2">數量</th>
                  <th className="text-left py-2">價格</th>
                </tr>
              </thead>
              <tbody>
                {orderItems &&
                  orderItems.map((item) => (
                    <tr key={item.product}>
                      <td className="py-2">
                        <Link to={`/product/${item.product}`} className="flex">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
