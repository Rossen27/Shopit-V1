/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { caluclateOrderCost } from "../../helpers/helpers";
import {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
} from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");

  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [createNewOrder, { error, isSuccess }] = useCreateNewOrderMutation();

  const [
    stripeCheckoutSession,
    { data: checkoutData, error: checkoutError, isLoading },
  ] = useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      window.location.href = checkoutData?.url;
    }
    if (checkoutError) {
      toast.error(checkoutError?.data?.message);
    }
  }, [checkoutData, checkoutError]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      caluclateOrderCost(cartItems);

    if (method === "貨到付款") {
      // 建立一個現金訂單
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        taxAmount: taxPrice,
        shippingAmount: shippingPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "尚未付款",
        },
        paymentMethod: "貨到付款",
      };
      createNewOrder(orderData);
    }

    if (method === "Card") {
      // 導向Stripe
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };

      stripeCheckoutSession(orderData);
    }
  };

  return (
    <>
      <MetaData title={"付款確認"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="flex justify-center">
        <div className="flex flex-col gap-4 w-full max-w-md p-4 border border-gray-100 rounded-lg shadow-md m-5">
          <h2 className="text-lg font-semibold text-gray-800">付款方式</h2>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="codradio"
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">貨到付款</p>
                <input
                  type="radio"
                  value="貨到付款"
                  name="payment_mode"
                  id="codradio"
                  className="sr-only"
                  onChange={(e) => setMethod("貨到付款")}
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="cardradio"
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <p className="text-gray-700">信用卡</p>
                <p className="text-gray-500">VISA, MasterCard, JCB</p>
                <input
                  className="sr-only"
                  type="radio"
                  name="payment_mode"
                  id="cardradio"
                  value="Card"
                  onChange={(e) => setMethod("Card")}
                />
              </label>
            </div>
            <div className="flex justify-center">
              <button
                className="group relative inline-block focus:outline-none focus:ring"
                type="submit"
                id="shipping_btn"
                disabled={isLoading}
              >
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  送 出
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
