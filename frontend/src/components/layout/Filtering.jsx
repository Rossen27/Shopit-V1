/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers.js";
import { PRODUCT_CATEGORIES } from "../constants/constants.js";
import StarRatings from "react-star-ratings";

function Filtering() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, []);

  // 處理類別和評級過濾器
  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      // 從查詢中刪除過濾器
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      // 如果已有過濾器值，則設定新的過濾器值
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        // 新增過濾器
        searchParams.append(checkbox.name, checkbox.value);
      }

      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  // 處理價格過濾器
  const handleButtonClick = (e) => {
    e.preventDefault();

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);
    if (checkboxValue === value) return true;
    return false;
  };

  return (
    <>
      <div className="hidden space-y-4 lg:block">
        <div>
          <p className="block text-xs font-medium text-gray-700">搜尋條件</p>
          <div className="mt-1 space-y-2">
            <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium">
                  星級評等(包含星級與其他類評等){" "}
                </span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-gray-200 bg-white">
                <ul className="space-y-1 border-t border-gray-200 p-4">
                  <li>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div className="form-check" key={rating}>
                        <label
                          htmlFor="FilterInStock"
                          className="inline-flex items-center gap-2"
                        >
                          {" "}
                          {/* deepcode ignore ReactControlledUncontrolledFormElement: <please specify a reason of ignoring this> */}
                          <input
                            type="checkbox"
                            name="ratings"
                            id="check7"
                            value={rating}
                            defaultChecked={defaultCheckHandler(
                              "ratings",
                              rating?.toString()
                            )}
                            onClick={(e) => handleClick(e.target)}
                            className="size-5 rounded border-gray-300"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            <StarRatings
                              rating={rating}
                              starRatedColor="#ffb829"
                              numberOfStars={5}
                              name="rating"
                              starDimension="21px"
                              starSpacing="1px"
                            />
                          </span>
                        </label>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
            </details>
            <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium"> 價位 </span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>
              <form
                className="border-t border-gray-200 bg-white"
                onSubmit={handleButtonClick}
              >
                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between gap-4">
                    <label
                      htmlFor="FilterPriceFrom"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">$</span>
                      <input
                        type="text"
                        placeholder="最低($)"
                        name="min"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      />
                    </label>
                    <span className="text-gray-600 mt-1">～</span>
                    <label
                      htmlFor="FilterPriceTo"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">$</span>
                      <input
                        type="text"
                        placeholder="最高 ($)"
                        name="max"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                      />
                    </label>
                    <label>
                      <button
                        type="submit"
                        className="text-xs text-gray-900 underline underline-offset-4"
                      >
                        GO
                      </button>
                    </label>
                  </div>
                </div>
              </form>
            </details>
            {/* TODO 分類 */}

            <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium"> 商品類別 </span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-gray-200 bg-white">
                <ul className="space-y-1 border-t border-gray-200 p-4">
                  {PRODUCT_CATEGORIES?.map((category) => (
                    <li>
                      <label
                        htmlFor="FilterRed"
                        className="inline-flex items-center gap-2"
                      >
                        {/* deepcode ignore ReactControlledUncontrolledFormElement: <please specify a reason of ignoring this> */}
                        <input
                          type="checkbox"
                          name="category"
                          id="check4"
                          value={category}
                          defaultChecked={defaultCheckHandler(
                            "category",
                            category
                          )}
                          onClick={(e) => handleClick(e.target)}
                          className="size-5 rounded border-gray-300"
                        />

                        <span className="text-sm font-medium text-gray-700">
                          {" "}
                          {category}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filtering;
