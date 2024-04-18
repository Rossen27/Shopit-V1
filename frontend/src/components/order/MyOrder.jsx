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
      navigate("/me/orders");
    }
  }, [error, orderSuccess]);

  const setOrders = () => {
    const orders = [];
    ordersData?.orders?.forEach((order) => {
      orders.push({
        id: order?._id,
        amount: `$ ${order?.totalAmount}`,
        status: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <div className="flex justify-center">
              <Link
                to={`/me/order/${order?._id}`}
                className="btn btn-primary rounded-full mr-2"
              >
                <i className="fa fa-eye"></i>
              </Link>
              <Link
                to={`/invoice/order/${order?._id}`}
                className="btn btn-accent rounded-full"
              >
                <i className="fa fa-print"></i>
              </Link>
            </div>
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
    <div className="overflow-x-auto">
      <MetaData title={"訂單明細"} />

      <h1 className="m-5">{ordersData?.orders?.length} 筆歷史訂單</h1>
      <div className="">
        <table
          {...getTableProps()}
          className="table-auto min-w-full max-w-3xl divide-y-2 divide-gray-200 bg-white text-sm"
        >
          <thead className="ltr:text-left rtl:text-right">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps()}
                    className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                  >
                    {column.render("Header")}
                  </th>
                ))}
                <th className="px-4 py-2"></th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        key={cell.column.id}
                        {...cell.getCellProps()}
                        className="whitespace-nowrap px-4 py-2 text-gray-700"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                  <td className="whitespace-nowrap px-4 py-2"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
