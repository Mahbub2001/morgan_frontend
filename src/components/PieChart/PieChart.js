import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import axios from "axios";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieChart = ({ title, data }) => {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    setChartState((prevState) => ({
      ...prevState,
      series: data.map((item) => item.count),
      options: {
        ...prevState.options,
        labels: data.map((item) => item._id),
      },
    }));
  }, [data]);

  return (
    <div>
      <h3>{title}</h3>
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="pie"
        width={380}
        height={400}
      />
    </div>
  );
};

export default PieChart;
