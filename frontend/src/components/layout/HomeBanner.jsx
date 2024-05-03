import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
export default function HomeBanner() {
  return (
    <>
      {" "}
      {/* TODO: 首頁輪播圖 */}
      <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
              探索無限可能性的購物體驗！
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
              在這裡，您將發現前所未有的購物體驗。
              <br />
              從時尚服飾到家居裝飾，從科技產品到美妝保健，我們提供的產品範圍廣泛，滿足各種喜好和需求。
              <br />
              無論您是在尋找新的時尚靈感，或是為您的家居添加一絲個性，我們都有您所需的一切。
              <br />
              透過我們直觀的網站界面和方便的購物流程，您可以輕鬆地探索各種商品，並享受無壓力的購物體驗。
              <br />
              立即瀏覽我們的網站，開始您的購物之旅吧！
            </p>

            <div className="mt-4 md:mt-8">
              <Link to="/">
                <Button
                  radius="full"
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                >
                  立 即 探 索
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <img
          alt=""
          src="https://picsum.photos/1920/1080"
          className="h-auto w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
        />
      </section>
    </>
  );
}
