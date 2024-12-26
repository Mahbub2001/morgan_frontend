"use client";

import { fetchProduct } from "@/api/nyProducts";
import React, { useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";

function ProductDetailspage({ id, color }) {
  const [data, setData] = useState(null);
  const [pageDataI, setPageDataI] = useState(null);
  const [error, setError] = useState(null);
  const [descriptionLines, setDescriptionLines] = useState([]);
  const [leathercare, setLeatherCare] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});

  const [quantity, setQuantity] = useState(0);

  // Handle increment
  const increment = () => {
    setQuantity((prev) => Math.min(prev + 1, 50));
  };

  // Handle decrement
  const decrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 50) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(""); // Allow empty input for user edits
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) setQuantity(1);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
            if (productData?.leatherCare) {
              const lines = productData.leatherCare.split("\\n");
              setLeatherCare(lines);
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
        <div className="col-span-6 lg:col-span-5 font-sans px-2 pl-5 sticky top-20 h-[calc(150vh-5rem)] overflow-auto">
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
              <hr className="mt-8 mb-5" />
              <p className="text-3xl text-gray-700 tracking-widest mb-3">
                DESCRIPTION
              </p>
              <div className="text-gray-700 text-sm">
                {descriptionLines?.map((line, index) => (
                  <p className="font-futura-sans py-2.5" key={index}>
                    {line}
                  </p>
                ))}
              </div>
              <hr className="mt-4 mb-4" />
              <div>
                <div className="mb-2">
                  <h3
                    className="font-extralight flex items-center justify-between tracking-widest  mb-2 cursor-pointer"
                    onClick={() => toggleSection("size_details")}
                  >
                    <span className="text-sm">SIZE & DETAILS</span>
                    {expandedSections.size_details ? (
                      <RiSubtractFill className="rotate-180 transition-all duration-700 ease-in-out" />
                    ) : (
                      <IoMdAdd className="transition-all rotate-180 duration-700 ease-in-out" />
                    )}
                  </h3>
                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${
                      expandedSections.size_details
                        ? "max-h-44 overflow-auto overflow-y-scroll dynamic-scrollbar"
                        : "max-h-0"
                    }`}
                    style={{
                      "--scrollbar-width": expandedSections.leather_care
                        ? "1px"
                        : "0px",
                    }}
                  >
                    <div>
                      {pageDataI?.allData?.features?.map((feature, index) => (
                        <li className="text-gray-700 text-sm" key={index}>
                          {feature}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
                <hr className="mt-2 mb-4" />
                <div className="mb-2">
                  <h3
                    className="font-extralight flex items-center justify-between tracking-widest  mb-2 cursor-pointer"
                    onClick={() => toggleSection("clr")}
                  >
                    <span className="text-sm">COLOR</span>
                    {expandedSections.clr ? (
                      <RiSubtractFill className="rotate-180 transition-all duration-700 ease-in-out" />
                    ) : (
                      <IoMdAdd className="transition-all rotate-180 duration-700 ease-in-out" />
                    )}
                  </h3>
                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${
                      expandedSections.clr ? "max-h-44" : "max-h-0"
                    }`}
                  >
                    <div className="flex gap-2 py-2">
                      {pageDataI?.allData?.utilities?.map((feature, index) => (
                        <p
                          className="text-gray-600 font-futura-sans rounded hover:text-gray-900 cursor-pointer py-1 text-sm border px-1"
                          key={index}
                          tooltip={feature?.color}
                        >
                          {feature?.color}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <hr className="mt-2 mb-4" />
                <div className="mb-2">
                  <h3
                    className="font-extralight flex items-center justify-between tracking-widest  mb-2 cursor-pointer"
                    onClick={() => toggleSection("leather_care")}
                  >
                    <span className="text-sm">LEATHER & CARE</span>
                    {expandedSections.leather_care ? (
                      <RiSubtractFill className="rotate-180 transition-all duration-700 ease-in-out" />
                    ) : (
                      <IoMdAdd className="transition-all rotate-180 duration-700 ease-in-out" />
                    )}
                  </h3>
                  <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out ${
                      expandedSections.leather_care
                        ? "max-h-44 overflow-y-scroll dynamic-scrollbar"
                        : "max-h-0"
                    }`}
                    style={{
                      "--scrollbar-width": expandedSections.leather_care
                        ? "1px"
                        : "0px",
                    }}
                  >
                    <div>
                      {leathercare?.map((feature, index) => (
                        <p
                          className="text-gray-700 font-futura-sans py-2.5 text-sm"
                          key={index}
                        >
                          {feature}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <hr className="mt-2 mb-4" />
              </div>
              <div>
                <div className="">
                  <div className="relative flex items-center max-w-[8rem] border border-gray-200 dark:border-gray-700 rounded-sm">
                    <button
                      type="button"
                      id="decrement-button"
                      onClick={decrement}
                      className="rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="quantity-input"
                      value={quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="border-none focus:ring-0 focus:border-none outline-none h-11 text-center text-gray-900 text-sm block w-full py-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                      placeholder="999"
                      required
                    />

                    <button
                      type="button"
                      id="increment-button"
                      onClick={increment}
                      className="rounded-e-lg p-3 h-11  focus:outline-none"
                    >
                      <svg
                        className="w-3 h-3 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailspage;
