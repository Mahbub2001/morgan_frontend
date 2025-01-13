"use client";

import Button2 from "@/containers/common/Button2/Button2";
import { accessories } from "@/Data/ProductData";
import Link from "next/link";
import React, { useState } from "react";

function Accessories({ promote2, settings }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="px-6 py-8 container mx-auto mt-20">
      <h2 className="text-2xl font-thin mb-6">
        {" "}
        Selected {settings?.promote2?.subCategory} for{" "}
        {settings?.promote2?.person}
      </h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {promote2.map((product, index) => {
            let validUtility = product?.utilities.find(
              (utility) => utility?.numberOfProducts > 0
            );
            const isSoldOut = !validUtility;
            if (isSoldOut) {
              validUtility = product?.utilities[0];
            }
            // console.log(validUtility);

            return (
              <Link
                href={{
                  pathname: `/singleproduct`,
                  query: { color: validUtility.color, id: product._id },
                }}
                key={index}
                className="md:w-72 p-6"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full h-72">
                  <img
                    src={validUtility?.pictures[0]}
                    alt={validUtility?.productName}
                    className={`w-full h-full object-cover rounded-t-md transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <img
                    src={validUtility?.pictures[1]}
                    alt={`${validUtility?.productName} hover`}
                    className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-md transition-opacity duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                <div className="mt-2 space-x-2 flex my-2">
                  {product?.utilities?.map((util, idx) => (
                    <div
                      key={idx}
                      className="border rounded-md cursor-pointer hover:border-gray-300 hover:scale-105 transition transform duration-200"
                    >
                      <span
                        className="text-xs text-gray-500 p-0.5"
                        // className="block h-3 w-3 rounded-full"
                        // style={{ backgroundColor: color }}
                      >
                        {util?.color}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-1">
                  <div className="flex justify-between items-center py-1">
                    <h1 className="text-1xl font-thin text-gray-700">
                      {product?.productName}
                    </h1>
                    <p className="text-xs">$ {product?.askingPrice}</p>
                  </div>
                  {product?.sales > 5 && (
                    <p className="text-xs mt-1 text-gray-700">
                      Total Sales: {product?.sales}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-6 text-center flex justify-center items-center">
        <Link
          href={{
            pathname: "/allproducts",
            query: {
              take: `/${settings?.promote2?.person}/${settings?.promote2?.category}/${settings?.promote2?.subCategory}`,
            },
          }}
        >
          <Button2 text="See More" />
        </Link>
      </div>
    </div>
  );
}

export default Accessories;
