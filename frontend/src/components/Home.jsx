import MetaData from "./layout/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
/* eslint-disable react/prop-types */
export default function Home() {
  const { data, isLoading } = useGetProductsQuery(); // 使用 getProducts endpoint 的 hook
  console.log(data, isLoading);
  return (
    <>
      <MetaData title={"首頁"} />
      {/* TODO: 首頁輪播圖 */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://picsum.photos/1920/1080)",
        }}
      >
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
              {" "}
              發現味蕾的自由之旅：
              <span className="sm:block">
                {" "}
                無麩美食地圖，為你引領無限可能。{" "}
              </span>
            </h1>
            <p className="mb-5 text-slate-700">
              探索無麩美食的世界！無論您是因為健康、美味還是對新鮮體驗的渴望，我們的無麩美食地圖為您打開了無限可能。從精緻的餐廳到溫馨的咖啡館，我們精心挑選了各種無麩料理，讓您輕鬆尋找到心儀的美食之地。立即加入我們，探索一場無麩的美食冒險！
            </p>
            <button className="btn glass">Get Started</button>
          </div>
        </div>
      </div>
      {/* TODO:首頁卡片 */}
      <section>
        <div className="rounded-lg mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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
        </div>
      </section>
    </>
  );
}
