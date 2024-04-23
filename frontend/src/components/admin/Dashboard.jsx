/* eslint-disable react-hooks/exhaustive-deps */
import AdminLayout from "../layout/AdminLayout";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import "dayjs/locale/zh-cn"; // 引入中文語言包
import SalesChart from "../charts/SalesChart";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

dayjs.locale("zh-cn");

const Dashboard = () => {
  const [startDate, setStartDate] = useState(null); // 初始值改為空值
  const [endDate, setEndDate] = useState(null); // 初始值改為空值

  const [getDashboardSales, { isLoading, error, data }] =
    useLazyGetDashboardSalesQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (startDate && endDate && !data) {
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [error]);

  const handleSearch = () => {
    // 在這裡處理搜尋邏輯，使用 startDate 和 endDate 的值
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  const handleClear = () => {
    // 清除開始日期和結束日期的值
    setStartDate(null);
    setEndDate(null);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <AdminLayout>
        <MetaData title={"銷售額與訂單數"} />
        <div className="flex flex-col md:flex-row justify-center items-center m-3">
          <div className="px-8">
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="zh-CN">
              <DemoContainer
                components={["DatePicker", "DatePicker", "DateRangePicker"]}
              >
                <DateRangePicker
                  slotProps={{ calendarHeader: { format: "YYYY/MM/DD" } }}
                  localeText={{ start: "開始日期", end: "結束日期" }}
                  value={[startDate, endDate]}
                  onChange={(newDates) => {
                    setStartDate(newDates[0]);
                    setEndDate(newDates[1]);
                  }}
                />
                {/* <DatePicker
                label="開始日期"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
              <DatePicker
                label="結束日期"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              /> */}
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="mt-1">
            <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
              <button
                className="inline-block border-e p-3 text-gray-700 hover:bg-gray-100 focus:relative"
                title="Search"
                onClick={handleSearch}
              >
                <i className="fa-solid fa-magnifying-glass w-4 h-4"></i>
              </button>

              <button
                className="inline-block p-3 text-gray-700 hover:bg-gray-100 focus:relative"
                title="Delete"
                onClick={handleClear}
              >
                <i className="fa-regular fa-trash-can h-4 w-4"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          {/* TODO 銷售額 */}
          <div className="h-32 rounded-lg">
            <article className="flex items-end justify-between rounded-lg border border-gray-100 bg-gray-100 p-6">
              <div className="flex items-center gap-4">
                <span className="hidden rounded-full bg-sky-600 p-2 text-gray-100 sm:block">
                  <i className="fa-solid fa-money-bills"></i>
                </span>

                <div>
                  <p className="text-2xl text-gray-800">銷售額</p>

                  <p className="text-2xl font-medium text-gray-900">
                    $ {data?.totalSales?.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
                <i className="fa-solid fa-arrow-trend-up"></i>

                <span className="text-xs font-medium"> 67.81% </span>
              </div> */}
            </article>
          </div>
          {/* TODO 訂單量 */}
          <div className="h-32 rounded-lg">
            <article className="flex items-end justify-between rounded-lg border border-gray-100 bg-gray-100 p-6">
              <div className="flex items-center gap-4">
                <span className="hidden rounded-full bg-rose-600  p-2 text-gray-100 sm:block">
                  <i className="fa-solid fa-comments-dollar"></i>
                </span>

                <div>
                  <p className="text-2xl text-gray-800">訂單量</p>

                  <p className="text-2xl font-medium text-gray-900">
                    共 {data?.totalNumOrders} 筆
                  </p>
                </div>
              </div>

              {/* <div className="inline-flex gap-2 rounded bg-red-100 p-1 text-red-600">
                <i className="fa-solid fa-arrow-trend-down"></i>
                <span className="text-xs font-medium"> 67.81% </span>
              </div> */}
            </article>
          </div>
        </div>
        <div className="flex justify-center w-auto h-1/2">
          <SalesChart salesData={data?.sales} className="" />
        </div>
      </AdminLayout>
    </>
  );
};

export default Dashboard;
