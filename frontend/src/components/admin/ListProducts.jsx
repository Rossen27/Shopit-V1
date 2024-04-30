/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useTable } from "react-table";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout";

const ListProducts = () => {
  const {
    data: productsData,
    isLoading,
    error,
    refetch,
  } = useGetAdminProductsQuery();

  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("商品刪除成功");
    }
  }, [error, deleteError, isSuccess]);
  
  useMemo(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const setProducts = () => {
    const products = [];
    productsData?.products?.forEach((product) => {
      products.push({
        id: product?._id,
        name: `${product?.name?.substring(0, 40)}...`,
        stock: product?.stock,
        actions: (
          <>
            <td className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
              <Link
                to={`/admin/products/${product?._id}`}
                className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 hover:text-sky-700 focus:relative"
              >
                <i className="fa-regular fa-pen-to-square h-4 w-4"></i>
              </Link>
              <Link
                to={`/admin/products/${product?._id}/upload_images`}
                className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 hover:text-green-700 focus:relative"
              >
                <i className="fa-regular fa-image"></i>
              </Link>
              <button
                className="inline-block p-3 text-gray-700 hover:bg-gray-50 hover:text-red-700 focus:relative"
                title="Delete Product"
                onClick={() => deleteProductHandler(product?._id)}
                disabled={isDeleteLoading}
              >
                <i className="fa-regular fa-trash-alt"></i>
              </button>
            </td>
          </>
        ),
      });
    });
    return products;
  };

  const columns = useMemo(
    () => [
      {
        Header: "商品編號",
        accessor: "id",
        sortType: "alphanumeric",
      },
      {
        Header: "商品名稱",
        accessor: "name",
        sortType: "alphanumeric",
      },
      {
        Header: "庫存",
        accessor: "stock",
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

  const data = useMemo(() => setProducts(), [productsData]);

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

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"訂單明細"} />
      <div className="flex justify-center items-center m-3">
        <div className="w-10/12 bg-white p-6 rounded-lg">
          <h1 className="text-center text-3xl font-semibold">
            {productsData?.products?.length} 筆商品
          </h1>
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
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListProducts;
