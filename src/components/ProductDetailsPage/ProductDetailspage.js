"use client";

import {
  fetchProduct,
  fetchRelatedProducts,
  fetchReviewEligibility,
} from "@/api/nyProducts";
import Button3 from "@/containers/common/Button3/Button3";
import SliderComponent from "@/containers/common/SliderProductPage/SliderComponent";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import RelatedProduct from "../RelatedProduct/RelatedProduct";
import ProductDetailFooter from "../ProductDetailFooter/ProductDetailFooter";
import CartDrawer from "@/containers/common/CartDrawer/CartDrawer";
import ProductReviews from "../ProductReviews/ProductReviews";
import { AuthContext } from "@/hooks/AuthProvider";
import { SettingsContext } from "@/hooks/SettingsProvider";
import { convertPrice, getCurrencySymbol } from "@/utils/currencyUtils";
import { X } from "lucide-react";
function ProductDetailspage({ id, color }) {
  const { country, settings } = useContext(SettingsContext);
  const [data, setData] = useState(null);
  const [pageDataI, setPageDataI] = useState(null);
  const [error, setError] = useState(null);
  const [descriptionLines, setDescriptionLines] = useState([]);
  const [leathercare, setLeatherCare] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [eligibleData, setEligibleData] = useState({
    eligible: false,
    message: "Failed to load review eligibility",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    const loadProductData = async () => {
      if (!id) {
        setError("Product ID is required");
        return;
      }

      try {
        const productData = await fetchProduct(id);
        setData(productData);

        if (productData?.utilities) {
          const matchedUtility = productData.utilities.find(
            (utility) => utility.color === color
          );

          if (matchedUtility) {
            setPageDataI({ allData: productData, utility: matchedUtility });

            if (productData?.productDescription) {
              setDescriptionLines(productData.productDescription.split("\\n"));
            }
            if (productData?.leatherCare) {
              setLeatherCare(productData.leatherCare.split("\\n"));
            }
          } else {
            setError("No matching color found in utilities");
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product data");
      }
    };

    loadProductData();
  }, [id, color]);

  useEffect(() => {
    const loadAdditionalData = async () => {
      if (!pageDataI) return;
      try {
        const relatedProductsData = await fetchRelatedProducts(
          pageDataI.allData.productName,
          pageDataI.allData.category,
          pageDataI.allData.subCategory,
          8
        );
        if (relatedProductsData) {
          setRelatedProducts(relatedProductsData);
        }
      } catch (error) {
        console.error(
          "Error fetching related products or review eligibility:",
          error
        );
        setError("Failed to load related products or review data");
      }
    };

    loadAdditionalData();
  }, [pageDataI]);
  useEffect(() => {
    const loadReviewEligibility = async () => {
      if (!pageDataI || !user) {
        return;
      }

      try {
        const reviewEligibility = await fetchReviewEligibility(user, pageDataI);
        // console.log("Review eligibility fetched:", reviewEligibility);
        setEligibleData(reviewEligibility);
      } catch (error) {
        console.error("Error fetching review eligibility:", error);
        setEligibleData({
          eligible: false,
          message: "Failed to load review eligibility",
        });
      }
    };

    loadReviewEligibility();
  }, [pageDataI, user]);

  // console.log(eligibleData);

  // useEffect(() => {
  //   if (!id) {
  //     setError("Product ID is required");
  //     return;
  //   }

  //   fetchProduct(id)
  //     .then((productData) => {
  //       setData(productData);

  //       if (productData?.utilities) {
  //         const matchedUtility = productData.utilities.find(
  //           (utility) => utility.color === color
  //         );

  //         if (matchedUtility) {
  //           setPageDataI({ allData: productData, utility: matchedUtility });

  //           if (productData?.productDescription) {
  //             const lines = productData.productDescription.split("\\n");
  //             setDescriptionLines(lines);
  //           }
  //           if (productData?.leatherCare) {
  //             const lines = productData.leatherCare.split("\\n");
  //             setLeatherCare(lines);
  //           }
  //         } else {
  //           setError("No matching color found in utilities");
  //         }
  //       }

  //       return fetchRelatedProducts(
  //         productData.productName,
  //         productData.category,
  //         productData.subCategory,
  //         8
  //       );
  //     })
  //     .then((relatedProductsData) => {
  //       if (relatedProductsData) {
  //         setRelatedProducts(relatedProductsData);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product or related products:", error);
  //       setError("Failed to load product or related product data");
  //     });
  // }, [id, color]);
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
  // Add escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedImage) {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);
  // console.log(pageDataI?.utility?.numberOfProducts);

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const maxQuantity = pageDataI?.utility?.numberOfProducts || 50;

    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity("");
    }
  };

  const increment = () => {
    const maxQuantity = pageDataI?.utility?.numberOfProducts || 50;
    setQuantity((prev) => Math.min(prev + 1, maxQuantity));
  };

  const decrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
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

  const afterDiscount =
    parseFloat(pageDataI?.allData?.askingPrice) -
    (parseFloat(pageDataI?.allData?.askingPrice) *
      parseFloat(pageDataI?.allData?.discount)) /
      100;

  if (!pageDataI) {
    return <div>Loading...</div>;
  }
  const showafterDiscount = convertPrice(afterDiscount, country, settings);
  const showaskingPrice = convertPrice(
    pageDataI?.allData?.askingPrice,
    country,
    settings
  );
  const currencySymbol = getCurrencySymbol(country);

  return (
    <div className="container mx-auto -mt-20 lg:mt-24 xl:mt-20 mb-10">
      <div className="grid grid-cols-6 lg:grid-cols-12 lg:gap-4 pt-5">
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

        <div className="hidden lg:block px-2 col-span-6 lg:col-span-6">
          <div className="flex flex-col gap-4">
            {pageDataI?.utility?.pictures?.map((image, index) => (
              <img
                className="w-full middle-image cursor-pointer hover:opacity-90 transition-opacity"
                key={index}
                data-index={index}
                src={image}
                alt={pageDataI.utility.name}
                onClick={() => openModal(image, index)}
              />
            ))}
          </div>
        </div>
        <div className="col-span-6 lg:hidden px-2">
          <SliderComponent images={pageDataI?.utility?.pictures} />
        </div>

        <div className="col-span-6 lg:col-span-5 font-sans lg:sticky top-20 lg:h-[calc(150vh-5rem)] lg:overflow-auto px-1 lg:px-0">
          <div className="relative mt-4 lg:mt-0">
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
                {pageDataI?.allData?.discount > 0 ? (
                  <span className="flex gap-3">
                    <span className="text-gold">
                      {currencySymbol}{" "}
                      {Number.isInteger(showafterDiscount)
                        ? showafterDiscount
                        : showafterDiscount.toFixed(2)}
                    </span>
                    <span className="line-through">
                      {currencySymbol} {showaskingPrice.toFixed(2)}
                    </span>
                  </span>
                ) : (
                  <>
                    {currencySymbol}{" "}
                    {Number.isInteger(showafterDiscount)
                      ? showafterDiscount
                      : showafterDiscount.toFixed(2)}
                  </>
                )}
              </p>
              <hr className="mt-8 mb-5" />
              <p className="text-2xl lg:text-3xl text-gray-700 tracking-widest mb-3">
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
                    className="font-extralight flex items-center justify-between tracking-widest mb-2 cursor-pointer"
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
                        <Link
                          href={{
                            pathname: `/singleproduct`,
                            query: {
                              color: feature?.color,
                              id: pageDataI?.allData?._id,
                            },
                          }}
                          className="text-gray-600 font-futura-sans rounded hover:text-gray-900 cursor-pointer py-1 text-sm border px-1"
                          key={index}
                          tooltip={feature?.color}
                        >
                          {feature?.color}
                        </Link>
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
              <div className="">
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
                <div
                  onClick={toggleDrawer}
                  className="w-full mt-6 cursor-pointer"
                >
                  <hr className="mt-3 pb-5" />
                  <Button3
                    text="ADD TO CARD"
                    backgroundColor="#be834f"
                    borderColor="#be834f"
                    textColor="#fff"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartDrawer
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        // toggleNote={toggleNote}
        // isNoteVisible={isNoteVisible}
        // saveNote={saveNote}
        quantity={quantity}
        afterDiscount={afterDiscount}
        pageDataI={pageDataI}
        setQuantity={setQuantity}
      />
      <hr className="mt-16" />
      <div className="mt-10">
        <p className="font-extralight tracking-widest mb-6 text-center text-2xl md:text-3xl">
          REVIEWS
        </p>
        <div>
          <div className="mt-10">
            <ProductReviews pageDataI={pageDataI} eligibleDat={eligibleData} />
          </div>
        </div>
        <hr className="mt-16" />
        {relatedProducts.length > 0 && (
          <>
            <p className="mt-10 font-extralight tracking-widest mb-6 text-center text-2xl md:text-3xl">
              RELATED PRODUCTS
            </p>
            <div>
              <div className="mt-10">
                <RelatedProduct relatedProducts={relatedProducts} />
              </div>
            </div>
          </>
        )}
        <hr className="mt-16" />
        <div className="mt-10">
          <ProductDetailFooter />
        </div>
        <hr className="mt-16" />
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-60 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <img
            src={selectedImage}
            alt={pageDataI.utility.name}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ProductDetailspage;
