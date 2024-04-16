/* eslint-disable react/prop-types */
import { TbCircleNumber1, TbCircleNumber2, TbCircleNumber3 } from "react-icons/tb";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdPayment, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <>
      <div className="checkout-progress d-flex justify-content-center m-10">
        <h2 className="sr-only">Steps</h2>
        <div className="after:mt-4 after:block after:h-1 after:w-full after:rounded-lg after:bg-gray-200">
          {" "}
          <ol className="grid grid-cols-3 text-sm font-medium text-gray-500">
            <li
              className={`relative flex justify-start ${
                shipping ? "text-blue-600" : "text-gray-500"
              } sm:gap-1.5`}
            >
              <span
                className="absolute -bottom-[1.75rem] start-0 rounded-full bg-white"
              >
                <TbCircleNumber1 className="h-5 w-5" />
              </span>
              <span className="hidden sm:inline"> 收件明細 </span>
              <Link to="/shipping">
                <MdLocationOn className="size-6 sm:size-5" />
              </Link>
            </li>

            <li
              className={`relative flex justify-center ${
                confirmOrder ? "text-blue-600" : "text-gray-500"
              } sm:gap-1.5`}
            >
              <span
                className="absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-white"
              >
                <TbCircleNumber2 className="h-5 w-5" />
              </span>
              <span className="hidden sm:inline"> 訂單確認 </span>
              <Link to="/confirm_order">
                <FaMoneyCheckAlt className="size-6 sm:size-5" />
              </Link>
            </li>

            <li
              className={`relative flex justify-end ${
                payment ? "text-blue-600" : "text-gray-500"
              } sm:gap-1.5`}
            >
              <span
                className="absolute -bottom-[1.75rem] end-0 rounded-full bg-white"
              >
                <TbCircleNumber3 className="h-5 w-5" />
              </span>
              <span className="hidden sm:inline"> 付款確認 </span>
              <Link to="/payment_method">
                <MdPayment className="size-6 sm:size-5" />
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default CheckoutSteps;
