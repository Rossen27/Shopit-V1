/* eslint-disable react/jsx-key */
import { FaRegTrashAlt } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increseQty = (item, quantity) => {
    const newQty = quantity + 1;

    if (newQty > item?.stock) return;

    setItemToCart(item, newQty);
  };

  const decreseQty = (item, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItem(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <MetaData title={"購物車"} />
      {cartItems?.length === 0 ? (
        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
          您 的 購 物 車 無 任 何 商 品
        </h1>
      ) : (
        <>
          <div className="flex justify-center mt-12" data-key="product1">
            <section>
              <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl">
                  <header className="text-center">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                      您 的 購 物 車 共 有 {cartItems?.length} 項 商 品
                    </h1>
                  </header>

                  <div className="mt-8">
                    <ul className="space-y-4">
                      {cartItems?.map((item) => (
                        <li  key={item.product}  className="flex items-center gap-4">
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="size-16 rounded object-cover"
                          />

                          <div>
                            <Link
                              to={`/product/${item.product}`}
                              className="text-sm text-gray-900"
                            >
                              {item?.name}
                            </Link>

                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">售價：</dt>
                                <dd className="inline" id="card_item_price">
                                  {item?.price}
                                </dd>
                              </div>

                              {/* <div>
                              <dt className="inline">Color:</dt>
                              <dd className="inline">White</dd>
                            </div> */}
                            </dl>
                          </div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <form>
                              <label htmlFor="Line1Qty" className="sr-only">
                                {" "}
                                Quantity{" "}
                              </label>
                              <div className="flex items-center rounded border border-gray-200">
                                <button
                                  type="button"
                                  className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                                  onClick={() =>
                                    decreseQty(item, item.quantity)
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={item?.quantity}
                                  className="h-10 w-16 count border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                />
                                <button
                                  type="button"
                                  className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                                  onClick={() =>
                                    increseQty(item, item.quantity)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </form>

                            <button className="text-gray-600 transition hover:text-red-600">
                              <span className="sr-only">Remove item</span>
                              <FaRegTrashAlt
                                className="h-4 w-4"
                                id="delete_cart_item"
                                onClick={() =>
                                  removeCartItemHandler(item?.product)
                                }
                              />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                      <div className="w-screen max-w-lg space-y-4">
                        <dl className="space-y-0.5 text-sm text-gray-700">
                          <div className="flex justify-between">
                            <dt>數量</dt>
                            <dd>
                              {cartItems?.reduce(
                                (acc, item) => acc + item?.quantity,
                                0
                              )}{" "}
                              項商品
                            </dd>
                          </div>

                          {/* <div className="flex justify-between">
                            <dt>小計</dt>
                            <dd>
                              ${" "}
                              {cartItems
                                ?.reduce(
                                  (acc, item) =>
                                    acc + item?.quantity * item.price,
                                  0
                                )
                                .toFixed(2)}
                            </dd>
                          </div>

                          <div className="flex justify-between">
                            <dt>折扣</dt>
                            <dd>-£20</dd>
                          </div> */}

                          <div className="flex justify-between !text-base font-medium">
                            <dt>總金額</dt>
                            <dd>
                              ${" "}
                              {cartItems
                                ?.reduce(
                                  (acc, item) =>
                                    acc + item?.quantity * item.price,
                                  0
                                )
                                .toFixed(0)}
                            </dd>
                          </div>
                        </dl>

                        {/* <div className="flex justify-end">
                          <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="-ms-1 me-1.5 h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                              />
                            </svg>

                            <p className="whitespace-nowrap text-xs">
                              2 Discounts Applied
                            </p>
                          </span>
                        </div> */}

                        <div className="flex justify-end">
                          <button
                            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                            onClick={checkoutHandler}
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
