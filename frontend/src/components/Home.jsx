import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Home() {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params = { page, keyword };

  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);

  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  // const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"首頁"} />
      {/* TODO: 首頁輪播圖 */}
      <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
              發現味蕾的自由之旅：無麩美食地圖，為你引領無限可能。
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
              探索無麩美食的世界！無論您是因為健康、美味還是對新鮮體驗的渴望，我們的無麩美食地圖為您打開了無限可能。
              <br />
              從精緻的餐廳到溫馨的咖啡館，我們精心挑選了各種無麩料理，讓您輕鬆尋找到心儀的美食之地。
              <br />
              立即加入我們，探索一場無麩的美食冒！
            </p>

            <div className="mt-4 md:mt-8">
              <a
                className="group relative inline-block focus:outline-none focus:ring"
                href="#"
              >
                <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  了解更多
                </span>
              </a>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://picsum.photos/1920/1080"
          className="h-auto w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
      </section>
      {/* TODO:首頁卡片 */}
      <section>
        <div className="mx-auto max-w-screen-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              無麩美食地圖
            </h2>
            <p className="mt-4  text-gray-500">
              「無麩美食地圖」網頁是一個旨在幫助無麩質飲食者尋找合適餐廳和食品的資源。
            </p>
          </header>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data?.products?.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ul>
          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </section>
    </>
  );
}
