"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiMiniBars4 } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa6";
import PriceFilter from "@/components/PriceFilter/PriceFilter";
import Button3 from "@/containers/common/Button3/Button3";
import { fetchProducts } from "@/api/nyProducts";
import Products1 from "@/components/Products/Products1";
import Products2 from "@/components/Products/Products2";
import Products3 from "@/components/Products/Products3";

function AllProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const sortRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [layout, setLayout] = useState("list");

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (range) => {
    console.log("Selected Price Range: ", range);
  };

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpenSidebar(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="-mt-20 lg:mt-24 xl:mt-20">
      <h1 className="text-center tracking-widest font-sans font-light  text-2xl pt-8">
        All | CURRENT COLLECTION
      </h1>
      <div className="mt-8 container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center border-b border-t border-gray-300 p-1 font-extralight">
          <div className="flex items-center space-x-1 mb-4">
            <button
              onClick={() => handleLayoutChange("grid")}
              className="px-1 mt-3 text-gray-600 hover:text-black  border border-none rounded"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <rect x="2" y="2" width="6" height="6" />
                <rect x="12" y="2" width="6" height="6" />
                <rect x="2" y="12" width="6" height="6" />
                <rect x="12" y="12" width="6" height="6" />
              </svg>
            </button>
            <button
              onClick={() => handleLayoutChange("menu")}
              className="px-1 mt-3 text-gray-600 hover:text-black border border-none rounded"
            >
              <CgMenuGridR className="w-5 h-5 hover:font-bold" />
            </button>
            <button
              onClick={() => handleLayoutChange("list")}
              className="px-1 mt-3 text-gray-600 hover:text-black border border-none rounded"
            >
              <HiMiniBars4 className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden md:block text-center text-gray-700 text-xs">
            {products.length} PRODUCTS
          </div>
          <div className="flex justify-end items-center space-x-1 text-xs">
            <div>
              <div className="flex items-center justify-center ">
                <div className="relative inline-block text-left">
                  <span className="">
                    <button
                      className="inline-flex justify-center w-full px-4 py-2 text-xs  leading-5  transition duration-150 ease-in-out font-thin rounded-sm text-gray-500 hover:text-black focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      type="button"
                      ref={sortRef}
                      onClick={toggleDropdown}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                    >
                      <span>SORT BY</span>
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
                FILTER
              </button>
              <div
                ref={sidebarRef}
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
                <hr />

                <div className="grid grid-cols-1 justify-between h-full">
                  <div className="pt-3 text-xs mt-8">
                    <div className="mb-2">
                      <h3
                        className="font-extralight flex items-center justify-between tracking-widest  mb-2 cursor-pointer"
                        onClick={() => toggleSection("availability")}
                      >
                        <span className="">AVAILABILITY</span>
                        {expandedSections.availability ? (
                          <FaAngleDown className="rotate-180 transition-all duration-700 ease-in-out" />
                        ) : (
                          <FaAngleDown className="transition-all duration-700 ease-in-out" />
                        )}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-700 ease-in-out ${
                          expandedSections.availability ? "max-h-40" : "max-h-0"
                        }`}
                      >
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="rounded text-black"
                          />
                          <span>In Stock (65)</span>
                        </label>
                        <label className="flex items-center space-x-2 mt-2 pb-2">
                          <input
                            type="checkbox"
                            className="rounded text-black"
                          />
                          <span>Pre Order (1)</span>
                        </label>
                      </div>
                    </div>
                    <hr className="w-full " />

                    <div className="mb-2 mt-3">
                      <h3
                        className="flex tracking-widest justify-between items-center mb-2 cursor-pointer"
                        onClick={() => toggleSection("colour")}
                      >
                        <span>COLOR</span>
                        {expandedSections.colour ? (
                          <FaAngleDown className="rotate-180 transition-all duration-700 ease-in-out" />
                        ) : (
                          <FaAngleDown className="transition-all duration-700 ease-in-out" />
                        )}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-700 ease-in-out ${
                          expandedSections.colour ? "max-h-40" : "max-h-0"
                        }`}
                      >
                        <div className="flex flex-wrap gap-2 mt-2">
                          {[
                            "black",
                            "gray",
                            "red",
                            "brown",
                            "green",
                            "orange",
                            "purple",
                          ].map((color, index) => (
                            <div
                              key={index}
                              className="px-2 py-1 cursor-pointer bg-gray-200 text-gray-900 rounded border border-gray-300 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-gray-300"
                            >
                              {color}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <hr className="mt-3" />

                    <div className="mb-2 mt-3">
                      <h3
                        className="flex justify-between items-center tracking-widest mb-2 cursor-pointer"
                        onClick={() => toggleSection("price")}
                      >
                        <span>PRICE</span>
                        {expandedSections.price ? (
                          <FaAngleDown className="rotate-180 transition-all duration-700 ease-in-out" />
                        ) : (
                          <FaAngleDown className="transition-all duration-700 ease-in-out" />
                        )}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-700 ease-in-out ${
                          expandedSections.price ? "max-h-40" : "max-h-0"
                        }`}
                      >
                        <div>
                          <PriceFilter
                            min={0}
                            max={420}
                            onChange={handlePriceChange}
                          />
                        </div>
                      </div>
                    </div>
                    <hr className="mt-3" />

                    <div className="mb-2 mt-3">
                      <h3
                        className=" flex justify-between items-center tracking-widest  mb-2 cursor-pointer"
                        onClick={() => toggleSection("size")}
                      >
                        <span>SIZE</span>
                        {expandedSections.size ? (
                          <FaAngleDown className="rotate-180 transition-all duration-700 ease-in-out" />
                        ) : (
                          <FaAngleDown className="transition-all duration-700 ease-in-out" />
                        )}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-700 ease-in-out ${
                          expandedSections.size ? "max-h-40" : "max-h-0"
                        }`}
                      >
                        <div className="mt-2">
                          {["L-XL (9)", "S-M (9)"].map((size, index) => (
                            <label
                              key={index}
                              className="flex items-center space-x-2 mt-2"
                            >
                              <input
                                type="checkbox"
                                className="rounded text-black"
                              />
                              <span>{size}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <hr className="mt-3" />

                    <div className="mb-2 mt-3">
                      <h3
                        className=" mb-2 flex justify-between items-center tracking-widest cursor-pointer"
                        onClick={() => toggleSection("typeOfStrap")}
                      >
                        <span>TYPE OF STRAP</span>
                        {expandedSections.typeOfStrap ? (
                          <FaAngleDown className="rotate-180 transition-all duration-700 ease-in-out" />
                        ) : (
                          <FaAngleDown className="transition-all duration-700 ease-in-out" />
                        )}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-700 ease-in-out ${
                          expandedSections.typeOfStrap ? "max-h-40" : "max-h-0"
                        }`}
                      >
                        <div className="mt-2">
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
                              <input
                                type="checkbox"
                                className="rounded text-black"
                              />
                              <span>{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>

                  <div className="w-full mt-6 cursor-pointer">
                    <hr className="mt-3 pb-5" />
                    <Button3
                      text="View Results"
                      backgroundColor="#f5db8b"
                      borderColor="#f5db8b"
                    />
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="mt-10">
          {layout === "grid" && <Products3 products={products} />}
          {layout === "menu" && <Products2 products={products} />}
          {layout === "list" && <Products1 products={products} />}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
