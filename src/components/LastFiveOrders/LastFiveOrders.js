import axios from "axios";
import React, { useEffect, useState } from "react";

function LastFiveOrders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/last-five-orders`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div className="shadow-lg p-6 bg-white rounded-lg max-w-full overflow-x-auto">
      <h2 className="font-medium text-xl mb-4 text-center">Last 5 Orders</h2>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-4 gap-4 text-sm border-b-2 pb-3 mb-4 min-w-[600px]">
          <p className="font-thin">User ID</p>
          <p className="font-thin">Order ID</p>
          <p className="font-thin">Status</p>
          <p className="font-thin">Price</p>
        </div>
        <div className="">
          {data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 items-center bg-gray-100 p-4 rounded-lg shadow-lg mb-4 min-w-[600px]"
            >
              <p className="text-xs font-medium text-gray-700">
                {item?.userId}
              </p>
              <p className="text-xs text-gray-500">{item?.orderId}</p>
              <p className="text-xs text-gray-500">{item?.status}</p>
              <p className="text-xs font-semibold text-gray-900">
                ${item?.totalPrice}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LastFiveOrders;
