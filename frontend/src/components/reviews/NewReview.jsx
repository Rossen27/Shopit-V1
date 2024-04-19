import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { FaRegHeart } from 'react-icons/fa6';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineRateReview } from "react-icons/md";
import { useSubmitReviewMutation } from '../../redux/api/productsApi';
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";
import PropTypes from 'prop-types';

const NewReview = ({ productId }) => {


NewReview.propTypes = {
  productId: PropTypes.string.isRequired,
};
const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false); // 新增顯示評論模態視窗的狀態

  const [submitReview, { isLoading, error, isSuccess }] =
    useSubmitReviewMutation(); // 使用 submitReview endpoint 的 hook

  useEffect(() => {
    if(error) {
      toast.error(error?.data?.message);
    }
    if(isSuccess) {
      toast.success("評價已成功提交！");
    }
  }, [error, isSuccess]);

  const submitHandler = () => {
    const reviewData = { rating, comment, productId };
    submitReview(reviewData); // 提交評論資料
    setShowReviewModal(false);
  };

  const clearHandler = () => {
    // 清除評論資料
    setRating(0);
    setComment("");
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <div className="">
        <button
          className="w-full group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
          onClick={() => setShowReviewModal(true)} // 點擊時設置顯示評論模態視窗為真
          type="button"
        >
          <span className="flex justify-center rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
            <FaRegHeart className="h-4 w-4 mx-1" />評 價
          </span>
        </button>
        {/* 顯示評論模態視窗的內容 */}
        {showReviewModal && (
          <div
            role="alert"
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
          >
            <div className="rounded-xl border border-gray-100 bg-white p-4 lg:size-1/4">
              <div className="flex items-start gap-4">
                <span className="text-green-600">
                  <MdOutlineRateReview className="h-6 w-6" />
                </span>

                <div className="flex-1">
                  <strong className="block font-medium text-gray-900">
                    留 下 評 價
                  </strong>

                  <p className="mt-1 text-sm text-gray-700">
                    <StarRatings
                      rating={rating}
                      starRatedColor="#FFD700"
                      numberOfStars={5}
                      name="rating"
                      changeRating={(e) => setRating(e)}
                      starDimension="20px"
                      starSpacing="1px"
                    />
                  </p>
                  <div>
                    <div className="overflow-hidden">
                      <textarea
                        id="OrderNotes"
                        className="w-full resize-none border-x-0 border-t-0 border-gray-200 px-0 align-top sm:text-sm"
                        rows="4"
                        placeholder="分享更多關於此商品的評價以幫助其他買家。"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>

                      <div className="flex items-center justify-end gap-2 py-3">
                        <button
                          type="button"
                          className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                          onClick={clearHandler} // 點擊時清除資料但不關閉評論視窗
                        >
                          清 除
                        </button>

                        <button
                          type="button"
                          className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                          onClick={submitHandler}
                        >
                          送 出 評 價
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-gray-500 transition hover:text-gray-600"
                  onClick={() => setShowReviewModal(false)} // 點擊時設置顯示評論模態視窗為假
                >
                  <span className="sr-only">Dismiss popup</span>
                  <IoCloseOutline className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NewReview;
