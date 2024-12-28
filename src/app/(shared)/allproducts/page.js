"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiMiniBars4 } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";
import Button3 from "@/containers/common/Button3/Button3";
import { fetchProducts } from "@/api/nyProducts";
import Products1 from "@/components/Products/Products1";
import Products2 from "@/components/Products/Products2";
import Products3 from "@/components/Products/Products3";
import FilterDrawer from "@/containers/common/FilterDrawer/FilterDrawer";
import SortByDrawer from "@/containers/common/SortByDrawer/SortByDrawer";

function AllProducts() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const sortRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [layout, setLayout] = useState("list");
  const [sortingParams, setSortingParams] = useState("");
  const [filterParams, setFilterParams] = useState({
    availability: [],
    color: [],
    price: null,
    size: [],
    typeOfProducts: {},
  });

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const filteredProducts = await fetchProducts(filterParams);
      setProducts(filteredProducts);
    };

    fetchFilteredProducts();

    if (isOpenSidebar) {
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
    }
  }, [filterParams, isOpenSidebar]);

  // console.log("filterParams", filterParams);

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
                <div className="z-50 relative inline-block text-left">
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
                      <SortByDrawer setSortingParams={setSortingParams} />
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

                <div className="flex flex-col justify-between h-full space-y-4">
                  <div>
                    <FilterDrawer
                      setFilterParams={setFilterParams}
                      filterParams={filterParams}
                    />
                  </div>
                  <div className="w-full pb-10">
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
