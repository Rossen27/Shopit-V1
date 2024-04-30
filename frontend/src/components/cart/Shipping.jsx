import { useEffect, useState } from "react";
import { countries } from "countries-list";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const countriesList = Object.values(countries);

  const { shippingInfo } = useSelector((state) => state.cart);

  useEffect(() => {
    if (shippingInfo) {
      setName(shippingInfo?.name);
      setAddress(shippingInfo?.address);
      setCity(shippingInfo?.city);
      setPhoneNo(shippingInfo?.phoneNo);
      setCountry(shippingInfo?.country);
      setZipCode(shippingInfo?.zipCode);
    }
  }, [shippingInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, zipCode, country }));
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title={"收件資料"} />
      <CheckoutSteps shipping />
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <h1 className="text-4xl font-medium">Contact us</h1>
            {/* <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-lg">
                在這裡，我們為您帶來一系列精選的無麩質美食，讓您可以享受美味的飲食體驗，同時不用擔心麩質對您的身體健康造成的影響。
                <br />
                無麩質飲食在當今的健康生活中越來越受到重視，因為它有助於減少腸道不適和提升整體健康。無麩質飲食並不意味著放棄美食享受，而是尋找更多美味、更健康的選擇。
                <br />
                我們的網站精心挑選了各種無麩質美食，包括早餐、午餐、晚餐、點心和甜點，讓您在各個時段都能找到合適的選擇。無論您是素食者、葷食愛好者還是對美食有著高要求的人，我們都有適合您口味的美食推薦。
              </p>

              <div className="mt-8">
                <a href="#" className="text-2xl font-bold text-pink-600">
                  {" "}
                  0151 475 4450{" "}
                </a>

                <address className="mt-2 not-italic">
                  282 Kevin Brook, CA 58517
                </address>
              </div>
            </div> */}

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={submitHandler} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name_field"
                      className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                    >
                      <input
                        type="text"
                        id="name_field"
                        placeholder="name_field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        required
                      />

                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        收件人
                      </span>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="phone_field"
                      className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                    >
                      <input
                        type="tel"
                        id="phone_field"
                        placeholder="phone_field"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        required
                      />

                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        聯絡電話
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="country_field"
                      className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                    >
                      <select
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        id="country_field"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      >
                        {countriesList.map((country) => (
                          <option key={country?.name} value={country?.name}>
                            {country?.name}
                          </option>
                        ))}
                      </select>
                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        國家
                      </span>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="city_field"
                      className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                    >
                      <input
                        type="text"
                        id="city_field"
                        placeholder="city_field"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />

                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        城市
                      </span>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="zip_code_field"
                      className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                    >
                      <input
                        type="number"
                        id="zip_code_field"
                        placeholder="zip_code_field"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                      />

                      <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        郵遞區號
                      </span>
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address_field"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-gray-600"
                  >
                    <input
                      type="text"
                      id="address_field"
                      name="address"
                      placeholder="Email"
                      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />

                    <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                      地址
                    </span>
                  </label>
                </div>
                {/* <div>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>

                  <textarea
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Message"
                    rows="8"
                    id="message"
                  ></textarea>
                </div> */}

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="group relative inline-block focus:outline-none focus:ring"
                  >
                    <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

                    <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                      送 出
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shipping;
