"use client";

import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useState, useEffect } from "react";

const PieChart = ({ title, data }) => {
  const [chartData, setChartData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Generate random colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7300'];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((item, index) => ({
        name: item._id || 'Unknown',
        value: item.count || 0,
        color: COLORS[index % COLORS.length]
      }));
      setChartData(formattedData);
    }
  }, [data]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-md">
          <p className="text-gray-800 font-medium">{`${payload[0].name}`}</p>
          <p className="text-gray-600">{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend formatter
  const renderLegend = (value, entry) => {
    const { color } = entry;
    return (
      <span style={{ color }} className="text-sm">
        {value}
      </span>
    );
  };

  if (!isMounted) {
    return (
      <div className="w-full min-h-[400px] flex justify-center items-center bg-gray-100 rounded-lg animate-pulse">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
        <div className="text-gray-500 text-center">No data available</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[400px] flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <RePieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => 
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={renderLegend}
          />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;