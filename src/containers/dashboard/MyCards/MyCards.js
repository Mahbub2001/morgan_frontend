"use client";
import Button3 from "@/containers/common/Button3/Button3";
import euroCountries from "@/Data/Countries";
import { SettingsContext } from "@/hooks/SettingsProvider";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

function MyCards() {
  const {country, settings} = useContext(SettingsContext);
  const [cards, setCards] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const [pageDataI, setPageDataI] = useState({});
  const [isNoteVisible, setIsNoteVisible] = useState(false);

   // Helper function to determine currency and conversion rate
  const getCurrencyInfo = () => {
    if (country === "Bangladesh") {
      return {
        currency: "BDT",
        rate: settings?.conversionRateBDT || 1,
        symbol: "BDT ",
      };
    } else if (country === "Denmark") {
      return {
        currency: "DKK",
        rate: settings?.conversionRateDanish || 1,
        symbol: "DKK ",
      };
    } else if (euroCountries.includes(country)) {
      return {
        currency: "EUR",
        rate: settings?.conversionRateEuro || 1,
        symbol: "€",
      };
    } else {
      return {
        currency: "USD",
        rate: 1,
        symbol: "$",
      };
    }
  };

  // Function to render price with currency conversion
  const renderPrice = (price) => {
    const { symbol, rate } = getCurrencyInfo();
    return `${symbol}${Number(price * rate).toFixed(2)}`;
  };

  const toggleNote = () => {
    setIsNoteVisible(!isNoteVisible);
  };
  const saveNote = () => {
    setIsNoteVisible(false);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    setCards(storedCartItems);
    setProductDetails(storedCartItems);
  
    // Initialize quantities from storedCartItems
    const initialQuantities = storedCartItems.reduce((acc, product) => {
      acc[product.id] = product.quantity || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, []);
  

  console.log("productDetails", productDetails);

  const updateLocalStorage = (updatedQuantities) => {
    const updatedProducts = productDetails.map((product) => ({
      ...product,
      quantity: updatedQuantities[product.id] || product.quantity,
    }));
    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
  };

  const handleChange = (e, productId) => {
    const value = parseInt(e.target.value, 10);
    const maxQuantity = pageDataI?.utility?.numberOfProducts;

    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      const newQuantities = { ...quantities, [productId]: value };
      setQuantities(newQuantities);
      updateLocalStorage(newQuantities);
    } else if (e.target.value === "") {
      const newQuantities = { ...quantities, [productId]: "" };
      setQuantities(newQuantities);
    }
  };

  const increment = (productId) => {
    const newQuantities = {
      ...quantities,
      [productId]: Math.min((quantities[productId] || 1) + 1, 50),
    };
    setQuantities(newQuantities);
    updateLocalStorage(newQuantities);
  };

  const decrement = (productId) => {
    const newQuantities = {
      ...quantities,
      [productId]: Math.max((quantities[productId] || 1) - 1, 1),
    };
    setQuantities(newQuantities);
    updateLocalStorage(newQuantities);
  };

  const handleBlur = (productId) => {
    if (quantities[productId] === "" || quantities[productId] < 1) {
      const newQuantities = { ...quantities, [productId]: 1 };
      setQuantities(newQuantities);
      updateLocalStorage(newQuantities);
    }
  };

  const handleRemove = (productId, color) => {
    const updatedProductDetails = productDetails.filter(
      (product) => !(product.id === productId && product.color === color)
    );
    setProductDetails(updatedProductDetails);

    localStorage.setItem("cartItems", JSON.stringify(updatedProductDetails));
  };

  return (
    <div>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div>
            <div className="flex flex-col gap-5 items-start  justify-center">
              {productDetails.length > 0 &&
                productDetails.map((product) => (
                  <div
                    className="flex justify-evenly gap-5 items-center"
                    key={product.id}
                  >
                    <div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-28 h-28"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <p className="text-sm font-extralight font-futura-sans">
                          {product.name}
                        </p>
                        <p className="font-futura-sans text-xs pt-1">
                           {renderPrice(product.discountPrice)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center max-w-[4rem] border border-gray-200 dark:border-gray-700 rounded-sm">
                          <button
                            type="button"
                            id="decrement-button"
                            onClick={() => decrement(product.id)}
                            className="rounded-s-lg p-1 h-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                          >
                            <svg
                              className="w-2 h-2 text-gray-900 dark:text-white"
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
                            value={quantities[product.id] || 1}
                            onChange={(e) => handleChange(e, product.id)}
                            onBlur={() => handleBlur(product.id)}
                            className="border-none focus:ring-0 focus:border-none outline-none h-8 text-center text-gray-900 text-sm block w-full py-2 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                            placeholder="999"
                            required
                          />

                          <button
                            type="button"
                            id="increment-button"
                            onClick={() => increment(product.id)}
                            className="rounded-e-lg p-1 h-6  focus:outline-none"
                          >
                            <svg
                              className="w-2 h-2 text-gray-900 dark:text-white"
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
                        <div>
                          <p
                            onClick={() =>
                              handleRemove(product.id, product.color)
                            }
                            className="font-futura-sans text-xs underline cursor-pointer"
                          >
                            Remove
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {productDetails.length === 0 && (
            <div className="text-center flex justify-center items-center align-middle justify-items-center h">
              <p className="text-xl">No items in cart</p>
            </div>
          )}
        </div>

        <div className="">
          <button
            className="text-[0.8rem] text-gray-700 w-full text-left py-2 rounded-lg"
            onClick={toggleNote}
          >
            Add order note
          </button>
          <p className="text-gray-700 text-[0.8rem] pb-3">
            Taxes and Shipping calculated at checkout
          </p>
          <Link href={productDetails < 1 ? "#" : "/checkout"}>
            <Button3
              text={
                productDetails < 1
                  ? "Add products to checkout"
                  : "PROCEED TO CHECKOUT"
              }
              backgroundColor={productDetails < 1 ? "#d3d3d3" : "#f5db8b"}
              borderColor={productDetails < 1 ? "#d3d3d3" : "#f5db8b"}
              textColor={productDetails < 1 ? "#a9a9a9" : "black"}
            />
          </Link>
        </div>

        <div
          className={`z-50 bottom-20 lg:bottom-0 absolute left-0 w-full bg-white  transition-all duration-300 ${
            isNoteVisible ? "bottom-0 h-56" : "bottom-[-12rem] h-0"
          }`}
        >
          {isNoteVisible && (
            <div className="p-4 flex flex-col h-full">
              <p className="text-xs py-2">Order note</p>
              <textarea
                className="mb-4 w-full h-full border placeholder:text-xs border-gray-300 rounded-sm p-2 !focus:outline-none !focus:border-none resize-none"
                placeholder="Write your order note here..."
              ></textarea>
              <div onClick={saveNote} className="rounded border-t">
                <Button3
                  text="SAVE NOTE"
                  backgroundColor="#f5db8b"
                  borderColor="#f5db8b"
                  textColor="black"
                ></Button3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCards;
