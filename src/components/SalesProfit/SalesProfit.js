import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function SalesProfit() {
  const [data, setData] = useState(null);
  const [salesState, setSalesState] = useState(null);

  useEffect(() => {
    const token = Cookies.get("ny-token");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/total-sales`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch total sales data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching total sales data:", error);
      }
    };

    const fetchSales = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order-stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order states data");
        }
        const data = await response.json();
        setSalesState(data);
      } catch (error) {
        console.error("Error fetching order states data:", error);
      }
    };

    fetchData();
    fetchSales();
  }, []);

  console.log(data);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-5">Sales & Profit</h2>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-sm font-bold text-gray-900">
            {salesState
              ? `$${(salesState?.totalPrice).toFixed(2)}`
              : "Loading..."}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Total Profit</p>
          <p className="text-sm font-bold text-gray-900">
            {salesState ? `$${(salesState?.profit).toFixed(2)}` : "Loading..."}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-sm font-bold text-gray-900">
            {data ? data?.totalSales : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SalesProfit;
