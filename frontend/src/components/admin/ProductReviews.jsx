import { useState, useMemo, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
// import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useTable } from "react-table";
import { useDeleteReviewMutation, useLazyGetProductReviewsQuery } from "../../redux/api/productsApi";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const [gatProductReviews, { data: reviewsData, isLoading, error }] =
    useLazyGetProductReviewsQuery();

  const [
    deleteReview,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("評論已刪除");
    }
  }, [error, deleteError, isSuccess]);


  const submitHandler = (e) => {
    e.preventDefault();
    gatProductReviews(productId);
  };

  const deleteReviewHandler = (id) => {
    deleteReview({ productId, id });
  }

  useMemo(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const setReviews = () => {
    const reviews = [];
    reviewsData?.reviews?.forEach((review) => {
      reviews.push({
        id: review?._id,
        rating: review?.rating,
        comment: review?.comment,
        user: review?.user?.name,
        actions: (
          <>
            <td className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                className="inline-block p-3 text-gray-700 hover:bg-gray-50 hover:text-red-700 focus:relative"
                title="Delete Order"
                onClick={() => deleteReviewHandler(review?._id)}
                disabled={isDeleteLoading}
              >
                <i className="fa-regular fa-trash-alt"></i>
              </button>
            </td>
          </>
        ),
      });
    });
    return reviews;
  };

  const columns = useMemo(
    () => [
      {
        Header: "評論編號",
        accessor: "id",
        sortType: "alphanumeric", // 排序方式
      },
      {
        Header: "評分",
        accessor: "rating",
        sortType: "alphanumeric",
      },
      {
        Header: "評論",
        accessor: "comment",
        sortType: "alphanumeric",
      },
      {
        Header: "會員名稱",
        accessor: "user",
        sortType: "alphanumeric",
      },
      {
        Header: "動作",
        accessor: "actions",
        sortType: "alphanumeric",
      },
    ],
    []
  );

  const data = useMemo(() => setReviews(), [reviewsData]);

  const pageSize = 5; // 每頁顯示的資料筆數
  const [pageIndex, setPageIndex] = useState(0);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      initialState: { pageIndex }, // 初始頁面索引
      pageCount: Math.ceil(data.length / pageSize), // 計算頁面總數
    });

  const handleNextPage = () => {
    setPageIndex((prevIndex) =>
      Math.min(prevIndex + 1, Math.ceil(data.length / pageSize) - 1)
    );
  };

  const handlePrevPage = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // const deleteUserHandler = (id) => {
  //   deleteUser(id);
  // };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"評論管理"} />
      <div className="">
        <div className="">
          <div className="">
            <form onSubmit={submitHandler} className="relative">
              <label htmlFor="productId_field" className="sr-only">
                請輸入評論編號
              </label>
              <input
                type="text"
                id="productId_field"
                placeholder="請輸入產品編號"
                className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button
                  id="search_button"
                  type="submit"
                  className="text-gray-600 hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </span>
            </form>
          </div>
        </div>
        <div className="">
          {reviewsData?.reviews?.length > 0 ? 
                      (<div className="mt-5">
            <div className="overflow-x-auto">
              <table
                {...getTableProps()}
                className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm"
              >
                <thead className="ltr:text-left rtl:text-right">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          key={column.id}
                          {...column.getHeaderProps()}
                          className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="divide-y divide-gray-200"
                >
                  {rows
                    .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
                    .map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={row.id} {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                key={cell.column.id}
                                {...cell.getCellProps()}
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center"
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <ol className="flex justify-center gap-1 text-xs font-medium">
              <li>
                <a
                  href="#"
                  onClick={handlePrevPage}
                  className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                    pageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="sr-only">Prev Page</span>
                  <i className="fa-solid fa-angle-left"></i>
                </a>
              </li>
              {Array.from(Array(Math.ceil(data.length / pageSize)).keys()).map(
                (page, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={`block size-8 rounded border ${
                        pageIndex === page
                          ? "border-gray-600 bg-gray-600 text-white"
                          : "border-gray-100 bg-white"
                      } text-center leading-8 text-gray-900`}
                      onClick={() => setPageIndex(page)}
                    >
                      {page + 1}
                    </a>
                  </li>
                )
              )}
              <li>
                <a
                  href="#"
                  onClick={handleNextPage}
                  className={`inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                    pageIndex === Math.ceil(data.length / pageSize) - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="sr-only">Next Page</span>
                  <i className="fa-solid fa-angle-right"></i>
                </a>
              </li>
            </ol>
          </div>) : (
            <div className="text-center mt-5 text-2xl text-gray-500">查無資料</div>
          )
          }

        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductReviews;
