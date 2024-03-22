/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
/* eslint-disable react/prop-types */
const ProductItem = ({ product, columnSize }) => {
  return (
    <li>
      <a href={`/product/${product?._id}`} className="group block overflow-hidden">
        {/* <img
          src={product?.images[0]?.url}
          alt={product?.name}
          className="rounded-bl-3xl rounded-tr-3xl h-[350px] w-full object-cover shadow-xl transition group-hover:grayscale-[50%]"
        /> */}
        <div className="relative h-[350px] sm:h-[450px]">
          <img
            src={product?.images[0]?.url}
            alt={product?.name}
            className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 rounded-t-lg"
          />

          <img
            src={product?.images[1]?.url}
            alt={product?.name}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 rounded-t-lg"
          />
        </div>

        <div className="relative bg-white pt-3 rounded-b-lg">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            <Link to={`/product/${product?._id}`}>{product?.name}</Link>
          </h3>
          <p className="mt-2">
            <span className="tracking-wider text-gray-900 ">
              {" "}
              $ {product.price} TWD{" "}
            </span>
          </p>
          <div className="ratings mt-auto d-flex">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="1px"
            />
            <span
              id="no_of_reviews"
              className="pt-2 ps-2 text-xs font-mono text-slate-600"
            >
              {" "}
              ({product?.numOfReviews})
            </span>
          </div>
          <div className="text-right">
            {" "}
            <Link
              to={`/product/${product?._id}`}
              className="relative inline-block focus:outline-none focus:ring"
            >
              <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

              <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                瞭解更多
              </span>
            </Link>
          </div>
        </div>
      </a>
    </li>
  );
}

export default ProductItem;