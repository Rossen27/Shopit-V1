import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { caluclateOrderCost } from "../../helpers/helpers";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);
  
  const proceedToPaymentHandler = () => {
    navigate("/payment_method");
  }
  return (
    <>
      <MetaData title={"確認訂單"} />
      <CheckoutSteps shipping confirmOrder/>
      <div className="m-5 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="m-5 w-full lg:col-span-2">
          {/* TODO : 個資明細 */}
          <div className="flow-root">
            <span className="flex items-center">
              <span className="pr-6">收件人明細</span>
              <span className="h-px flex-1 bg-black"></span>
            </span>
            <dl className="mt-1 -my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">姓名</dt>
                <dd className="text-gray-700 sm:col-span-2">{user?.name}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">聯絡電話</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {shippingInfo?.phoneNo}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">收件地址</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  {shippingInfo?.country},{shippingInfo?.city},
                  {shippingInfo?.zipCode},{shippingInfo?.address}
                </dd>
              </div>
            </dl>
          </div>
          <span className="mt-5 flex items-center">
            <span className="pr-6">購物明細</span>
            <span className="h-px flex-1 bg-black"></span>
          </span>
          {/* TODO : 商品明細 */}

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>商品樣式</th>
                  <th>商品名稱</th>
                  <th>總金額</th>
                  <th></th>
                </tr>
              </thead>
              {cartItems?.map((item) => (
                <>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item?.image} alt={item?.name} />
                            </div>
                          </div>
                          {/* <div>
                        <div className="font-bold">Hart </div>
                        <div className="text-sm opacity-50">United States</div>
                      </div> */}
                        </div>
                      </td>
                      <td>
                        <Link to={`/products/${item?.product}`}>
                          {" "}
                          {item?.name}
                        </Link>
                        <br />
                        {/* <span className="badge badge-ghost badge-sm">
                          Desktop Support Technician
                        </span> */}
                      </td>
                      <td>
                        {item?.quantity} x $ {item?.price} = ${" "}
                        {(item?.quantity * item.price).toFixed(0)}
                      </td>
                      {/* <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th> */}
                    </tr>
                  </tbody>
                  {/* foot */}
                  {/* <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                  <th></th>
                </tr>
              </tfoot> */}
                </>
              ))}
            </table>
          </div>
        </div>
        {/* TODO: 付款明細 */}
        <div className="relative m-1 w-full rounded-lg border border-gray-100shadow-xl">
          <div className="px-6 py-5">
            <p className="font-medium text-center ">金額明細</p>
            <div className="mt-4 space-y-2">
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">小計</dt>
                    <dd className="text-gray-700 sm:col-span-2">＄ {itemsPrice}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">稅金</dt>
                    <dd className="text-gray-700 sm:col-span-2">＄ {taxPrice}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">運費</dt>
                    <dd className="text-gray-700 sm:col-span-2">＄ {shippingPrice}</dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">總金額</dt>
                    <dd className="text-gray-700 sm:col-span-2">＄ {totalPrice}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-1 text-xs font-medium">
              <button
                className="group relative inline-block focus:outline-none focus:ring"
                onClick={proceedToPaymentHandler}
              >
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  繼 續 付 款
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
