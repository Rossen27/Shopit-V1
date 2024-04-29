import MetaData from "../layout/MetaData";
import { MdLocalPrintshop } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import Loader from "../layout/Loader";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { toPng } from 'dom-to-image';
import pdfMake from 'pdfmake/build/pdfmake';
import invoiceLogo from "../../assets/images/shopit_logo_black.png";
// import { pdfFonts } from 'pdfmake/build/vfs_fonts';

// // 設置 pdfMake 使用的字體
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Invoice = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};
  const { shippingInfo, orderItems, paymentInfo, user } = order;
  const isPaid = paymentInfo?.status === "paid" ? "已付款" : "尚未付款";
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);
  const invoiceRef = useRef(null); // 使用 useRef 創建 ref


  const handleDownload = async () => {
    const input = invoiceRef.current; // 使用 ref 取得元素

    const imgData = await toPng(input);

    const docDefinition = {
      content: [
        {
          image: imgData,
          width: 500
        }
      ]
    };

    pdfMake.createPdf(docDefinition).download(`invoice_${order?._id}.pdf`);
  };


  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"收據明細"} />
      <div className="flex h-screen w-full items-center justify-center m-8">
        <div className="w-1/2 rounded m-2 p-4 bg-gray-50 shadow-lg hover:shadow-2xl">
          <div className="flex justify-end">
            <button className="btn btn-neutral btn-sm" onClick={handleDownload}>
              <MdLocalPrintshop />
              列印發票
            </button>
          </div>
          <div id="order_invoice" ref={invoiceRef}>
            <img
              src={invoiceLogo}
              alt="Logo"
              className="mx-auto py-4 w-1/4"
            />
            <div className="flex flex-col justify-center items-center gap-2">
              <h4 className="font-semibold">INVOICE</h4>
              <p className="text-xs"># {order?._id}</p>
            </div>
            <div className="flex flex-col gap-3 border-b py-6 text-xs">
              <p className="flex justify-between">
                <span className="text-gray-400">收件人</span>
                <span>{user?.name}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">電子郵件</span>
                <span>{user?.email}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">聯絡電話:</span>
                <span>{shippingInfo?.phoneNo}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">收件地址:</span>
                <span>
                  {shippingInfo &&
                    `${shippingInfo.country}, ${shippingInfo.city}, ${shippingInfo.zipCode}, ${shippingInfo.address} `}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">訂購日期:</span>
                <span>{new Date(order?.createdAt).toLocaleString("tw")}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">付款狀態:</span>

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
              </p>
            </div>
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y-2 divide-gray-200 text-xs">
                <thead className="ltr:text-left rtl:text-right">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      ID
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      商品名稱
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      價格
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      數量
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      總價
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderItems &&
                    orderItems.map((item) => (
                      <tr key={item.product}>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {item.product}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          ${item.price}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {item.quantity}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          ${item?.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700">
                      小計
                    </th>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $ {order?.itemsPrice}
                    </td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700">
                      稅金
                    </th>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $ {order?.taxAmount}
                    </td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700">
                      運費
                    </th>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $ {order?.shippingAmount}
                    </td>
                  </tr>
                  <tr className="text-sm">
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-700"></th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      總金額
                    </th>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      $ {order?.totalAmount}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="flex border-b border border-dashed justify-end text-left"></div>
              <div className="py-4 justify-center items-center flex flex-col gap-2">
                {/* <p className="flex gap-2">
                  <MdWork /> info@example.com
                </p>
                <p className="flex gap-2">
                  <MdPhoneEnabled /> +234XXXXXXXX
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;