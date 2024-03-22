export default function HomeBanner() {
  return (
    <>
      {" "}
      {/* TODO: 首頁輪播圖 */}
      <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
              發現味蕾的自由之旅：
              <br />
              無麩美食地圖，為你引領無限可能。
            </h2>

            <p className="hidden text-gray-500 md:mt-4 md:block">
              探索無麩美食的世界！無論您是因為健康、美味還是對新鮮體驗的渴望，我們的無麩美食地圖為您打開了無限可能。
              <br />
              從精緻的餐廳到溫馨的咖啡館，我們精心挑選了各種無麩料理，讓您輕鬆尋找到心儀的美食之地。
              <br />
              立即加入我們，探索一場無麩的美食冒險！
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
    </>
  );
}
