import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const AddedSalesChart = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      { name: "Products Added", data: [] },
      { name: "Sales", data: [] },
    ],
    options: {
      yaxis: {
        min: 0,
        max: (maxValue) => Math.ceil(maxValue * 1.1),
        labels: {
          formatter: function (value) {
            return value.toFixed(0);
          },
        },
      },

      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              width: "100%",
              height: 300,
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              width: "100%",
              height: 250,
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
              height: 200,
            },
          },
        },
      ],
    },
  });

  const [timeframe, setTimeframe] = useState("7days");

  useEffect(() => {
    fetchChartData(timeframe);
  }, [timeframe]);

  const fetchChartData = async (selectedTimeframe) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chart-data?timeframe=${selectedTimeframe}`
      );
      const { categories, series } = response.data;

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: series,
        options: {
          ...prevOptions.options,
          xaxis: {
            ...prevOptions.options.xaxis,
            categories: categories,
          },
        },
      }));
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="area"
          height={chartOptions.options.chart.height}
        />
      </div>
      <div id="html-dist"></div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handleTimeframeChange("7days")}>
          Last 7 Days
        </button>
        <button onClick={() => handleTimeframeChange("1month")}>
          Last 1 Month
        </button>
        <button onClick={() => handleTimeframeChange("6months")}>
          Last 6 Months
        </button>
      </div>
    </div>
  );
};

export default AddedSalesChart;
