/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
import { useTable } from "react-table";

const MyOrders = () => {
  const { data: ordersData, isLoading, error } = useMyOrdersQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderSuccess = searchParams.get("order_success");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess) {
      dispatch(clearCart());
      navigate("/me/orders?order_success=true");
    }
  }, [error, orderSuccess]);

  const setOrders = () => {
    const orders = [];
    ordersData?.orders?.forEach((order) => {
      const paymentStatus = order?.paymentInfo?.status;
      const isPaid = paymentStatus === "paid";
      const statusText = isPaid ? "已付款" : "尚未付款";
      const statusColor = isPaid ? "text-green-500" : "text-red-500";
      orders.push({
        id: order?._id,
        amount: `$ ${order?.totalAmount}`,
        status: <span className={statusColor}>{statusText}</span>,
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <td className="flex justify-center whitespace-nowrap px-4 py-2">
              <Link
                to={`/me/order/${order?._id}`}
                className="mr-3 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <Link
                to={`/invoice/order/${order?._id}`}
                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
              >
                <i className="fa fa-print"></i>
              </Link>
            </td>
          </>
        ),
      });
    });
    return orders;
  };

  const columns = useMemo(
    () => [
      {
        Header: "訂單編號",
        accessor: "id",
        sortType: "alphanumeric",
      },
      {
        Header: "總金額",
        accessor: "amount",
        sortType: "alphanumeric",
      },
      {
        Header: "付款狀態",
        accessor: "status",
        sortType: "alphanumeric",
      },
      {
        Header: "訂單狀態",
        accessor: "orderStatus",
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

  const data = useMemo(() => setOrders(), [ordersData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"訂單明細"} />
      <div className="flex justify-center items-center">
        <div className="w-10/12 bg-white p-6 rounded-lg">
          <h1 className="text-center text-3xl font-semibold">
            {ordersData?.orders?.length} 筆歷史訂單
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
                {rows.map((row) => {
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
        </div>
      </div>
    </>
  );
};

export default MyOrders;
