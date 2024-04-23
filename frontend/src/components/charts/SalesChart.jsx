/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function SalesChart({ salesData }) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "銷售額與訂單量數據",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = salesData?.map((data) => data?.date);

  const data = {
    labels,
    datasets: [
      {
        label: "銷售額",
        data: salesData?.map((data) => data?.sales),
        borderColor: "rgb(2, 132, 199)",
        backgroundColor: "rgba(2, 132, 199, 0.5)",
        yAxisID: "y",
      },
      {
        label: "訂單量",
        data: salesData?.map((data) => data?.numOrders),
        borderColor: "rgb(225, 29, 72)",
        backgroundColor: "rgba(225, 29, 72, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
