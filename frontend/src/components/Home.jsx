import React from 'react';

export default function Home() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: 'url(https://picsum.photos/1920/1080)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-2xl font-bold">
              {' '}
              發現味蕾的自由之旅：
              <span className="sm:block">
                {' '}
                無麩美食地圖，為你引領無限可能。{' '}
              </span>
            </h1>
            <p className="mb-5">
              探索無麩美食的世界！無論您是因為健康、美味還是對新鮮體驗的渴望，我們的無麩美食地圖為您打開了無限可能。從精緻的餐廳到溫馨的咖啡館，我們精心挑選了各種無麩料理，讓您輕鬆尋找到心儀的美食之地。立即加入我們，探索一場無麩的美食冒險！
            </p>
            <button className="btn glass">Get Started</button>
          </div>
        </div>
      </div>
      {/* <section className="relative bg-[url(https://picsum.photos/1920/1080/?blur=3)] bg-cover bg-center bg-no-repeat">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              發現味蕾的自由之旅：
              <span className="sm:block">
                {" "}
                無麩美食地圖，為你引領無限可能。{" "}
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-slate-300">
              探索無麩美食的世界！無論您是因為健康、美味還是對新鮮體驗的渴望，我們的無麩美食地圖為您打開了無限可能。從精緻的餐廳到溫馨的咖啡館，我們精心挑選了各種無麩料理，讓您輕鬆尋找到心儀的美食之地。立即加入我們，探索一場無麩的美食冒險！
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a className="btn glass" href="#">
                立即探索
              </a>
              <a className="btn btn-ghost text-slate-400" href="#">
                瞭解更多
              </a>
            </div>
          </div>
        </div>
      </section> */}
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
            <li>
              <a href="#" className="group block overflow-hidden">
                <img
                  src="https://picsum.photos/300"
                  alt=""
                  className="rounded-bl-3xl rounded-tr-3xl h-[350px] w-full object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="relative bg-white pt-3 ">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    永和美食
                  </h3>
                  <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>

                    <span className="tracking-wider text-gray-900 ">
                      {' '}
                      $ 124.00 TWD{' '}
                    </span>
                  </p>
                  <div className="text-right">
                    {' '}
                    <button className="relative inline-block focus:outline-none focus:ring">
                      <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                      <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                        瞭解更多
                      </span>
                    </button>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="group block overflow-hidden">
                <img
                  src="https://picsum.photos/300"
                  alt=""
                  className="rounded-bl-3xl rounded-tr-3xl h-[350px] w-full object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="relative bg-white pt-3 ">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    永和美食
                  </h3>
                  <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>

                    <span className="tracking-wider text-gray-900 ">
                      {' '}
                      $ 124.00 TWD{' '}
                    </span>
                  </p>
                  <div className="text-right">
                    {' '}
                    <button className="relative inline-block focus:outline-none focus:ring">
                      <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                      <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                        瞭解更多
                      </span>
                    </button>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="group block overflow-hidden">
                <img
                  src="https://picsum.photos/300"
                  alt=""
                  className="rounded-bl-3xl rounded-tr-3xl h-[350px] w-full object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="relative bg-white pt-3 ">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    永和美食
                  </h3>
                  <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>

                    <span className="tracking-wider text-gray-900 ">
                      {' '}
                      $ 124.00 TWD{' '}
                    </span>
                  </p>
                  <div className="text-right">
                    {' '}
                    <button className="relative inline-block focus:outline-none focus:ring">
                      <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                      <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                        瞭解更多
                      </span>
                    </button>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" className="group block overflow-hidden">
                <img
                  src="https://picsum.photos/300"
                  alt=""
                  className="rounded-bl-3xl rounded-tr-3xl h-[350px] w-full object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="relative bg-white pt-3 ">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    永和美食
                  </h3>
                  <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>

                    <span className="tracking-wider text-gray-900 ">
                      {' '}
                      $ 124.00 TWD{' '}
                    </span>
                  </p>
                  <div className="text-right">
                    {' '}
                    <button className="relative inline-block focus:outline-none focus:ring">
                      <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                      <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                        瞭解更多
                      </span>
                    </button>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
