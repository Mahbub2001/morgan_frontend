"use client";

import { fetchProduct } from "@/api/nyProducts";
import React, { useEffect, useRef, useState } from "react";

function ProductDetailspage({ id, color }) {
  const [data, setData] = useState(null);
  const [pageDataI, setPageDataI] = useState(null);
  const [error, setError] = useState(null);
  const [descriptionLines, setDescriptionLines] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!id) {
      setError("Product ID is required");
      return;
    }

    fetchProduct(id)
      .then((productData) => {
        setData(productData);

        if (productData?.utilities) {
          const matchedUtility = productData.utilities.find(
            (utility) => utility.color === color
          );

          if (matchedUtility) {
            setPageDataI({ allData: productData, utility: matchedUtility });
            if (productData?.productDescription) {
              const lines = productData.productDescription.split("\\n");
              setDescriptionLines(lines);
            }
          } else {
            setError("No matching color found in utilities");
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Failed to load product data");
      });
  }, [id, color]);

  useEffect(() => {
    const imageElements = document.querySelectorAll(".middle-image");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        threshold: 0.5, 
      }
    );

    imageElements.forEach((el) => observer.observe(el));

    return () => {
      imageElements.forEach((el) => observer.unobserve(el));
    };
  }, [pageDataI]);

  if (!pageDataI) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto -mt-20 lg:mt-24 xl:mt-20 mb-10">
      <div className="grid grid-cols-6 md:grid-cols-12 gap-4 pt-5">
        <div className="hidden lg:block col-span-1 sticky top-20 h-[calc(100vh-5rem)] overflow-auto">
          <div className="flex flex-col gap-2">
            {pageDataI?.utility?.pictures?.map((image, index) => (
              <img
                key={index}
                className={`h-20 w-16 cursor-pointer ${
                  activeIndex === index ? "border-2 border-blue-500" : ""
                }`}
                src={image}
                alt={pageDataI.utility.name}
                onClick={() => {
                  document
                    .querySelector(`.middle-image[data-index="${index}"]`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              />
            ))}
          </div>
        </div>

        <div className="px-2 col-span-6 lg:col-span-6">
          <div className="flex flex-col gap-4">
            {pageDataI?.utility?.pictures?.map((image, index) => (
              <img
                className="w-full middle-image"
                key={index}
                data-index={index}
                src={image}
                alt={pageDataI.utility.name}
              />
            ))}
          </div>
        </div>
        <div className="col-span-6 lg:col-span-5 font-sans px-2 pl-5 sticky top-20 h-[calc(100vh-5rem)] overflow-auto">
          <div className="relative">
            <div>
              <p className="uppercase text-gray-500 tracking-widest">
                {pageDataI?.allData?.brandName}
              </p>
              <p className="uppercase mt-5 text-2xl tracking-widest text-gray-700">
                {pageDataI?.allData?.productName} -{" "}
              </p>
              <p className="uppercase pt-1 text-2xl tracking-widest text-gray-700">
                {pageDataI?.allData?.subBrand}
              </p>
              <p className="pt-5 text-gray-500 tracking-wider">
                € {pageDataI?.allData?.askingPrice}.00
              </p>
              <hr className="mt-8 mb-8" />
              <p className="text-3xl text-gray-700 tracking-widest mb-6">
                DESCRIPTION
              </p>
              <div className="text-gray-700 text-sm">
                {descriptionLines?.map((line, index) => (
                  <p className="font-futura-sans py-2.5" key={index}>
                    {line}
                  </p>
                ))}
              </div>
              <hr className="mt-8 mb-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailspage;
