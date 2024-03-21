/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layout/Loader";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination";
import { useSearchParams } from "react-router-dom";
import HomeBanner from "./layout/HomeBanner";

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

  const columnSize = keyword ? 4 : 3;

  if (isLoading) return <Loader />;
  return (
    <>
      <MetaData title={"首頁"} />
      <HomeBanner />
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
              <ProductItem
                key={product.id}
                product={product}
                columnSize={columnSize}
              />
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
