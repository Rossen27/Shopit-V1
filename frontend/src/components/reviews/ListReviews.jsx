/* eslint-disable react/prop-types */
import StarRatings from "react-star-ratings";
import avatar from "../../assets/images/default_avatar.jpg";
const ListReviews = ({ reviews }) => {
  console.log(reviews);
  return (
    <>
      <div className="h-96 w-full overflow-auto">
        <h2 className="text-2xl font-bold text-gray-900">商品評論：</h2>
        {reviews?.map((review) => (
          <article
            key={review?._id}
            className="mt-2 rounded-xl border-2 border-gray-100 bg-white hover:shadow-lg"
          >
            <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
              <div className="block shrink-0">
                <img
                  alt={review.user?.name}
                  src={review?.user?.avatar ? review?.user?.avatar?.url
                    : avatar}
                  className="size-14 rounded-lg object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium sm:text-lg">
                  <div className="hover:underline">
                    <StarRatings
                      rating={review?.rating}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      name="rating"
                      starDimension="24px"
                      starSpacing="1px"
                    />
                  </div>
                </h3>

                <p className="line-clamp-2 text-sm text-gray-700">
                  {review?.comment}
                </p>

                <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                  {/* <div className="flex items-center gap-1 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>

                    <p className="text-xs">14 comments</p>
                  </div> */}

                  {/* <span className="hidden sm:block" aria-hidden="true">
                    &middot;
                  </span> */}

                  <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                    評論來自：{" "}
                    <a
                      href="#"
                      className="font-medium underline hover:text-gray-700"
                    >
                      {review.user?.name}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              {/* <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>

                <span className="text-[10px] font-medium sm:text-xs">
                  Solved!
                </span>
              </strong> */}
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default ListReviews;
