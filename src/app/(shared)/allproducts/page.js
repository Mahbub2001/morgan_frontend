"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { HiMiniBars4 } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";
import Button3 from "@/containers/common/Button3/Button3";
import { fetchProducts } from "@/api/nyProducts";
import Products1 from "@/components/Products/Products1";
import Products2 from "@/components/Products/Products2";
import Products3 from "@/components/Products/Products3";
import FilterDrawer from "@/containers/common/FilterDrawer/FilterDrawer";
import SortByDrawer from "@/containers/common/SortByDrawer/SortByDrawer";
import { useRouter, useSearchParams } from "next/navigation";

function AllProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sidebarRef = useRef(null);
  const sortRef = useRef(null);

  const [isOpenSort, setIsOpenSort] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [layout, setLayout] = useState("list");
  const [products, setProducts] = useState([]);
  const [reset, setReset] = useState(false);
  const taking = searchParams.get("take");
  const [filterParams, setFilterParams] = useState({
    availability: [],
    color: [],
    price: null,
    size: [],
    typeOfProducts: {},
  });

  const handleLayoutChange = useCallback((newLayout) => {
    setLayout(newLayout);
  }, []);

  const toggleSortDropdown = useCallback(() => {
    setIsOpenSort((prev) => !prev);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsOpenSidebar((prev) => !prev);
  }, []);

  const handleResetFilter = useCallback(() => {
    setFilterParams({
      availability: [],
      color: [],
      price: null,
      size: [],
      typeOfProducts: {},
    });
    setReset((prev) => !prev);
  }, []);

  
  const fetchFilteredProducts = async () => {
    console.log("filterParams", filterParams);
    const filteredProducts = await fetchProducts(filterParams);
    setProducts(filteredProducts);
  };

  useEffect(() => {
    const fetchInitialProducts = async () => {
      if (taking && taking.startsWith("/")) {
        const [gender, category, subCategory] = taking.slice(1).split("/");
        const newFilterParams = {
          availability: [],
          color: [],
          price: null,
          size: [],
          typeOfProducts: {
            [gender]: {
              [category]: {
                [subCategory]: true,
              },
            },
          },
        };
  
        setFilterParams(newFilterParams);
  
        const filteredProducts = await fetchProducts(newFilterParams);
        setProducts(filteredProducts); 
      } else {
        const allProducts = await fetchProducts({});
        setProducts(allProducts);
      }
    };
  
    fetchInitialProducts();
  }, [taking]);
  
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (!taking) {
        const filteredProducts = await fetchProducts(filterParams);
        setProducts(filteredProducts);
      }
    };
  
    fetchFilteredProducts();
  }, [filterParams]);
  
  useEffect(() => {
    if (!isOpenSidebar && !isOpenSort) return;

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isOpenSidebar
      ) {
        setIsOpenSidebar(false);
      }
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target) &&
        isOpenSort
      ) {
        setIsOpenSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenSidebar, isOpenSort]);

  const layoutComponent = useMemo(() => {
    switch (layout) {
      case "grid":
        return <Products3 products={products} />;
      case "menu":
        return <Products2 products={products} />;
      case "list":
        return <Products1 products={products} />;
      default:
        return <Products1 products={products} />;
    }
  }, [layout, products]);

  return (
    <div className="-mt-20 lg:mt-24 xl:mt-20">
      <h1 className="text-center tracking-widest font-sans font-light text-2xl pt-8">
        All | CURRENT COLLECTION
      </h1>
      <div className="mt-8 container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center border-b border-t border-gray-300 p-1 font-extralight">
          {/* Layout Controls */}
          <div className="flex items-center space-x-1 mb-4">
            {["grid", "menu", "list"].map((type) => (
              <button
                key={type}
                onClick={() => handleLayoutChange(type)}
                className="px-1 mt-3 text-gray-600 hover:text-black border border-none rounded"
              >
                {type === "grid" ? (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <rect x="2" y="2" width="6" height="6" />
                    <rect x="12" y="2" width="6" height="6" />
                    <rect x="2" y="12" width="6" height="6" />
                    <rect x="12" y="12" width="6" height="6" />
                  </svg>
                ) : type === "menu" ? (
                  <CgMenuGridR className="w-5 h-5" />
                ) : (
                  <HiMiniBars4 className="w-5 h-5" />
                )}
              </button>
            ))}
          </div>
          <div className="hidden md:block text-center text-gray-700 text-xs">
            {products.length} PRODUCTS
          </div>
          <div className="flex justify-end items-center space-x-1 text-xs">
            <div className="relative">
              <button
                className="inline-flex justify-center px-4 py-2 text-xs leading-5 transition font-thin rounded-sm text-gray-500 hover:text-black"
                ref={sortRef}
                onClick={toggleSortDropdown}
              >
                SORT BY
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isOpenSort && (
                <div className="absolute top-full mt-1 z-30 w-40">
                  <SortByDrawer setSortingParams={setFilterParams} />
                </div>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="px-4 py-2 rounded bg-white text-gray-500 hover:text-black"
            >
              FILTER
            </button>
            <div
              ref={sidebarRef}
              className={`fixed z-50 top-0 right-0 h-full w-80 bg-gray-50 shadow-lg border-l border-gray-300 p-6 transition-transform ${
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
                <FilterDrawer
                  setFilterParams={setFilterParams}
                  filterParams={filterParams}
                  resetFilter={reset}
                />
                <div onClick={handleResetFilter} className="w-full pb-10">
                  <hr className="mt-3 pb-5" />
                  <Button3
                    text="RESET FILTER"
                    backgroundColor="#f5db8b"
                    borderColor="#f5db8b"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">{layoutComponent}</div>
      </div>
    </div>
  );
}

export default AllProducts;
