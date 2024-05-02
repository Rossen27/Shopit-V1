import { LuParkingCircle } from "react-icons/lu";
import { FaChair } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import MetaData from "../layout/MetaData";
import NewReview from "../reviews/NewReview";
import ListReviews from "../reviews/ListReviews";
import { MdError } from "react-icons/md";
import NotFound from "../layout/NotFound";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    setActiveImg(
      product?.images[0]
        ? product?.images[0]?.url
        : "/images/default_product.png"
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  // 設定購買數量
  const increseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product?.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  // 加入購物車設定
  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };
    dispatch(setCartItem(cartItem));
    toast.success("已加入購物車");
  };

  if(error && error?.status === 404) return <NotFound/>;

  if (isLoading) return <Loader />;
  // eslint-disable-next-line react/jsx-key
  return (
    <>
      <MetaData title={product?.name} />
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              src={activeImg}
              alt={product?.name}
              className="lg:w-1/3 w-full h-full object-center border border-gray-200 rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                產品編號：＃{product?._id}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product?.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <StarRatings
                    rating={product?.ratings}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="1px"
                  />
                  <span className="text-gray-600 ml-3 text-sm">
                    {product?.numOfReviews} 則評論
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <LuParkingCircle className="w-5 h-5" />
                  </a>
                  <a className="ml-2 text-gray-500">
                    <FaChair className="w-5 h-5" />
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <div className="flex flex-wrap -m-2">
                {product?.images?.map((img, index) => (
                  <div className="col-2 ms-4 mt-2" key={index}>
                    <div role="button">
                      <img
                        className={`d-block border rounded p-3 cursor-pointer ${
                          img.url === activeImg ? "border-warning" : ""
                        } `}
                        height="100"
                        width="100"
                        src={img?.url}
                        alt={img?.url}
                        onClick={() => setActiveImg(img.url)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed mt-4">{product?.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3 mt-3">數量：</span>
                  <div className="flex items-center rounded border border-gray-200">
                    <button
                      type="button"
                      className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                      onClick={decreseQty}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="Quantity"
                      defaultValue={quantity}
                      className="h-10 w-16 count border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                      onClick={increseQty}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex ml-6 items-center">
                  <p id="product_seller mb-3">
                    來源： <strong>{product?.seller}</strong>
                  </p>
                </div>
                <div className="flex ml-6 items-center">
                  <p id="product_seller mb-3">
                    庫存：{" "}
                    <span
                      className={
                        product?.stock > 0 ? "text-green-700" : "text-red-700"
                      }
                    >
                      {product?.stock > 0 ? "尚有庫存" : "補貨中"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  $ {product?.price} TWD
                </span>
                <button
                  className="flex ml-auto"
                  onClick={setItemToCart}
                  disabled={product.stock <= 0}
                >
                  <div className="group relative inline-block focus:outline-none focus:ring">
                    <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                    <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                      加入購物車
                    </span>
                  </div>
                </button>

                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              <div className="m-4">
                {isAuthenticated ? (
                  <NewReview productId={product?._id} />
                ) : (
                  <div
                    role="alert"
                    className="rounded border-s-4 border-red-500 bg-red-50 p-4"
                  >
                    <div className="flex items-center gap-2 text-red-800">
                      <MdError />
                      <strong className="block font-medium"> 請先登入 </strong>
                    </div>

                    <p className="mt-2 text-sm text-red-700">
                      需登入後才可留下評價
                    </p>
                  </div>
                )}
              </div>
            </div>{" "}
            {product?.reviews?.length > 0 && (
              <ListReviews reviews={product?.reviews} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;