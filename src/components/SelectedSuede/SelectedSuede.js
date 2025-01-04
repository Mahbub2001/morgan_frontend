"use client";

import Button2 from "@/containers/common/Button2/Button2";
import { productData } from "@/Data/ProductData";
import Link from "next/link";
import React, { useState } from "react";

function SelectedSuede() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="px-6 py-8 container mx-auto mt-20">
      <h2 className="text-2xl font-thin mb-6">Selected Suede Bags</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {productData.map((product, index) => (
            <div
              key={index}
              className="md:w-72 p-6"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-72">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className={`w-full h-full object-cover rounded-t-md transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-0" : "opacity-100"
                  }`}
                />
                <img
                  src={product?.imageHover}
                  alt={`${product?.title} hover`}
                  className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-md transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              <div className="mt-2 space-x-2 flex my-2">
                {product?.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="border-2 rounded-full cursor-pointer hover:border-gray-300 hover:scale-105 transition transform duration-200"
                  >
                    <span
                      className="block h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    ></span>
                  </div>
                ))}
              </div>

              <div className="mt-1">
                <div className="flex justify-between items-center py-2">
                  <h1 className="text-1xl font-thin text-gray-700">
                    {product?.title}
                  </h1>
                  <p className="text-xs">{product?.price}</p>
                </div>
                <p className="text-xs mt-1 text-gray-700">
                  {product?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center flex justify-center items-center">
        <Link
          href={{
            pathname: "/allproducts",
            query: { take: "/Women/Bags/Suede" },
          }}
        >
          <Button2 text="See More" />
        </Link>
      </div>
    </div>
  );
}

export default SelectedSuede;
