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
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={() => handleTimeframeChange("7days")}
          className="px-6 py-2 bg-blue-500 text-white font-thin rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        >
          Last 7 Days
        </button>
        <button
          onClick={() => handleTimeframeChange("1month")}
          className="px-6 py-2 bg-green-500 text-white font-thin rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
        >
          Last 1 Month
        </button>
        <button
          onClick={() => handleTimeframeChange("6months")}
          className="px-6 py-2 bg-purple-500 text-white font-thin rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-300"
        >
          Last 6 Months
        </button>
      </div>
    </div>
  );
};

export default AddedSalesChart;
