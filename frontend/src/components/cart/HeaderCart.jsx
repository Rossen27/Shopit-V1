/* eslint-disable react/jsx-key */
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeCartItem } from "../../redux/features/cartSlice";

const HeaderCart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };
  return (
    <>
      {cartItems?.length === 0 ? (
        <h3 className="text-sm text-gray-900">您 的 購 物 車 無 任 何 商 品</h3>
      ) : (
        <div className="card-body">
          <div
            className="relative w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8  shadow"
            aria-modal="true"
            role="dialog"
            tabIndex="-1"
          >
            <div className="mt-4 space-y-6">
              <ul className="space-y-4">
                {cartItems?.map((item) => (
                  <li  key={item.product}  className="flex items-center gap-4">
                    <img
                      src={item?.image}
                      alt=""
                      className="size-16 rounded object-cover"
                    />
                    <div>
                      <Link
                        to={`/products/${item?.product}`}
                        className="text-sm text-gray-900"
                      >
                        {item?.name}
                      </Link>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">售價：</dt>
                          <dd className="inline">{item?.price}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label htmlFor="Line1Qty" className="sr-only">
                          {" "}
                          Quantity{" "}
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={item?.quantity}
                          id="Line1Qty"
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </form>

                      <button className="text-gray-600 transition hover:text-red-600">
                        <span className="sr-only">Remove item</span>

                        <FaRegTrashAlt
                          className="h-4 w-4"
                          id="delete_cart_item"
                          onClick={() => removeCartItemHandler(item?.product)}
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-4 text-center">
                <span className="flex items-center">
                  <span className="h-px flex-1 bg-black"></span>
                  <span className="pl-6">
                    購物車內，共有 {cartItems?.length} 品項
                  </span>
                </span>

                <Link
                  to="/cart"
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  查 看 購 物 車
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderCart;
