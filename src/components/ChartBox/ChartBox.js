"use client";

import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartBox({ title, number, percentage, chartData, dataKey, color }) {
  return (
    <div className="bg-white md:w-[20em] shadow-md rounded-lg p-4 flex flex-col gap-4 max-w-sm">
      <div>
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-gray-400 text-xs">Last 7 days</p>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{number}</h1>
        <span
          className={`text-sm font-medium ${
            percentage > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {percentage > 0 ? "↑" : "↓"} {Math.abs(percentage)}%
        </span>
      </div>

      <div className="h-20 ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <XAxis dataKey="name" hide />
            <YAxis hide />

            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor={color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill="url(#colorGradient)"
              strokeWidth={2}
              dot={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "none",
                padding: "8px",
              }}
              labelStyle={{ color: "#333", fontWeight: "bold" }}
              formatter={(value) => [`${value}`, "User"]}
              labelFormatter={(label) => `Day: ${label}`}
              position={{ x: 120, y: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartBox;
