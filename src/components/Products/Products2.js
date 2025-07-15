"use client";

import euroCountries from "@/Data/Countries";
import { SettingsContext } from "@/hooks/SettingsProvider";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { IoAdd } from "react-icons/io5";

function Products2({ products }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { country, settings } = useContext(SettingsContext);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="font-sans font-extralight mb-10">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5 lg:px-0">
        {products.map((product, index) => {
          let validUtility = product?.utilities.find(
            (utility) => utility?.numberOfProducts > 0
          );
          const isSoldOut = !validUtility;
          isSoldOut ? (validUtility = product?.utilities[0]) : validUtility;

          return (
            <Link
              href={{
                pathname: `/singleproduct`,
                query: { color: validUtility.color, id: product._id },
              }}
              key={index}
              // key={product._id}
              className="group relative cursor-pointer"
            >
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <img
                  alt={validUtility?.productName || product?.productName}
                  src={
                    hoveredIndex === index && validUtility?.pictures?.[1]
                      ? validUtility?.pictures[1]
                      : validUtility?.pictures?.[0]
                  }
                  className="w-full h-full object-cover rounded-md group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:scale-105"
                />

                {isSoldOut && (
                  <div className="absolute top-2 left-2 bg-gray-200 text-black px-1 text-[10px] py-1 rounded-md">
                    SOLD OUT
                  </div>
                )}
                {!isSoldOut && hoveredIndex === index && (
                  <div className="absolute bottom-2 right-2 bg-white text-black px-1.5 text-[10px] py-1.5 rounded-sm">
                    <IoAdd className="text-sm text-red-400 transition-transform duration-300 ease-in-out transform hover:rotate-90" />
                  </div>
                )}
              </div>
              <p className="pt-5 text-center text-xs">
                {validUtility?.productName || product?.productName} -{" "}
                {validUtility?.subName}
              </p>
              <p className="pt-1 text-center text-xs">
                {country === "Bangladesh" && (
                  <span>
                    BDT{" "}
                    {Math.round(
                      product?.askingPrice * settings?.conversionRateBDT
                    )}
                  </span>
                )}
                {country === "Denmark" && (
                  <span>
                    kr.{" "}
                    {Math.round(
                      product?.askingPrice * settings?.conversionRateDanish
                    )}
                  </span>
                )}
                {euroCountries.includes(country) && (
                  <span>
                    €{" "}
                    {Math.round(
                      product?.askingPrice * settings?.conversionRateEuro
                    )}
                  </span>
                )}
                {country !== "Bangladesh" &&
                  country !== "Denmark" &&
                  !euroCountries.includes(country) && (
                    <span>$ {product?.askingPrice}</span>
                  )}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Products2;
