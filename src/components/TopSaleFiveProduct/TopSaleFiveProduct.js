import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function TopSaleFiveProduct() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/top-sales`)
      .then((res) => {
        setData(res?.data?.products);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  // console.log(data);
  

  return (
    <div className="shadow-md p-4 max-w-full overflow-x-auto">
      <h2 className="font-medium text-lg mb-4 text-center">Top 5 Sale Products</h2>
      <div className="flex flex-col gap-4">
        <div className="overflow-x-auto">
          <div className="flex justify-between text-sm my-2">
            <p className="font-semibold">Product Name</p>
            <p className="font-semibold">Price</p>
          </div>
          <div className="grid gap-4">
            {data.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-md w-full sm:w-auto">
                <div>
                  <Link
                    className="text-blue-500 hover:text-blue-700 font-medium"
                    href={{
                      pathname: `/singleproduct`,
                      query: { color: item?.utilities[0]?.color, id: item?._id },
                    }}
                  >
                    {item.productName}
                  </Link>
                  <p className="text-[10px] text-gray-500">ID: {item?._id}</p>
                </div>
                <p className="text-xs font-semibold">${item?.askingPrice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSaleFiveProduct;
