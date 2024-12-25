"use client";
import React, { useState } from "react";
import { HiMiniBars4 } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";

function AllProducts() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <div className="-mt-20 lg:mt-24 xl:mt-20">
      <h1 className="text-center tracking-widest font-sans font-light  text-2xl pt-8">
        All | CURRENT COLLECTION
      </h1>
      <div className="mt-8 ">
        <div className="grid  grid-cols-2 md:grid-cols-3 items-center border border-gray-300 p-1 font-extralight">
          <div className="flex items-center space-x-1">
            <button className="p-1 border border-none rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <rect x="2" y="2" width="6" height="6" />
                <rect x="12" y="2" width="6" height="6" />
                <rect x="2" y="12" width="6" height="6" />
                <rect x="12" y="12" width="6" height="6" />
              </svg>
            </button>
            <button className="p-1 border border-none rounded">
              <CgMenuGridR className="border-none outline-none w-5 h-5 hover:font-bold" />
            </button>
            <button className="p-1 border border-none rounded">
              <HiMiniBars4 className="border-none outline-none w-5 h-5" />
            </button>
          </div>
          <div className="hidden md:block text-center text-gray-700 text-xs">
            66 PRODUCTS
          </div>
          <div className="flex justify-end items-center space-x-1 text-xs">
            <div>
              <div className="flex items-center justify-center ">
                <div className="relative inline-block text-left">
                  <span className="">
                    <button
                      className="inline-flex justify-center w-full px-4 py-2 text-xs  leading-5  transition duration-150 ease-in-out font-thin rounded-sm text-gray-500 hover:text-black focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      type="button"
                      onClick={toggleDropdown}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                    >
                      <span>Sort By</span>
                      <svg
                        className="w-5 h-5 ml-2 -mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </span>
                  {isOpen && (
                    <div className="dropdown-menu transition-all duration-300 transform origin-top-right">
                      <div
                        className="absolute right-0 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                        role="menu"
                      >
                        <div className="!text-xs">
                          <div className="py-1">
                            <li
                              href="#"
                              className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2 "
                              role="menuitem"
                            >
                              Featured
                            </li>
                            <li
                              href="#"
                              className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2 "
                              role="menuitem"
                            >
                              Best selling
                            </li>
                            <li
                              href="#"
                              className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2 "
                              role="menuitem"
                            >
                              Alphabetically, A-Z
                            </li>
                            <li
                              href="#"
                              className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2 "
                              role="menuitem"
                            >
                              Alphabetically, Z-A
                            </li>
                            <li
                              href="#"
                              className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2 "
                              role="menuitem"
                            >
                              Price, low to high
                            </li>
                            <li
                              href="#"
                              className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2 "
                              role="menuitem"
                            >
                              Price, high to low
                            </li>
                            <li
                              href="#"
                              className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2 "
                              role="menuitem"
                            >
                              Date, old to new
                            </li>
                            <li
                              href="#"
                              className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2 "
                              role="menuitem"
                            >
                              Date, new to old
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <>
              <button
                onClick={toggleSidebar}
                className="px-4 py-2 rounded bg-white text-gray-500 hover:text-black"
              >
                Filter
              </button>
              <div
                className={`fixed z-50 top-0 right-0 h-full w-80 bg-gray-50 shadow-lg border-l border-gray-300 p-6 transition-transform duration-300 ease-in-out ${
                  isOpenSidebar ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <button
                  className="absolute top-8 right-4 text-gray-500 hover:text-gray-800"
                  onClick={toggleSidebar}
                >
                  Close ✖
                </button>
                <h2 className="text-lg font-extralight tracking-widest mb-4">
                  FILTER
                </h2>
                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Availability</h3>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-black" />
                      <span>In Stock (65)</span>
                    </label>
                    <label className="flex items-center space-x-2 mt-2">
                      <input type="checkbox" className="rounded text-black" />
                      <span>Pre Order (1)</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Colour</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "black",
                      "gray-800",
                      "red-500",
                      "brown-500",
                      "green-500",
                      "orange-400",
                      "purple-400",
                    ].map((color, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full bg-${color} border border-gray-300 cursor-pointer`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Price</h3>
                  <div className="space-y-2">
                    <input type="range" min="0" max="420" className="w-full" />
                    <input type="range" min="0" max="420" className="w-full" />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-md font-medium mb-2">Size</h3>
                  <div>
                    {["L-XL (9)", "S-M (9)"].map((size, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 mt-2"
                      >
                        <input type="checkbox" className="rounded text-black" />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-2">Type of Strap</h3>
                  <div>
                    {[
                      "Crossbody (37)",
                      "Grab Handles (8)",
                      "Shoulder (21)",
                      "Waist Strap (9)",
                    ].map((type, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 mt-2"
                      >
                        <input type="checkbox" className="rounded text-black" />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* View Results Button */}
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded mt-6">
                  View Results
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
