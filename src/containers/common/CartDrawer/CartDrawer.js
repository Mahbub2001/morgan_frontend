import React, { useState, useEffect, useContext } from "react";
import { CgClose } from "react-icons/cg";
import Button3 from "../Button3/Button3";
import Link from "next/link";
import { AuthContext } from "@/hooks/AuthProvider";
import { SettingsContext } from "@/hooks/SettingsProvider";
import { convertPrice, getCurrencySymbol } from "@/utils/currencyUtils";

function CartDrawer({
  isDrawerOpen,
  toggleDrawer,
  // toggleNote,
  // isNoteVisible,
  // saveNote,
  quantity,
  afterDiscount,
  pageDataI,
  setQuantity,
}) {
  const [productDetails, setProductDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [maxQuantity, setMaxQuantity] = useState({});
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const { user } = useContext(AuthContext);
  const { country, settings } = useContext(SettingsContext);

  const toggleNote = () => {
    setIsNoteVisible(!isNoteVisible);
  };
  const saveNote = () => {
    setIsNoteVisible(false);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      if (quantity === 0 && pageDataI.allData._id) {
        setQuantity((prev) => Math.min(prev + 1, 50));
      }

      if (pageDataI) {
        const newProductDetails = {
          id: pageDataI?.allData?._id,
          name: pageDataI?.allData?.productName,
          image: pageDataI?.utility?.pictures[0],
          price: pageDataI?.allData?.price,
          color: pageDataI?.utility?.color,
          maxQuantity: pageDataI?.utility?.numberOfProducts,
          quantity: quantity,
          askingPrice: pageDataI?.allData?.askingPrice,
          discountPrice: afterDiscount,
        };

        const storedCartItems =
          JSON.parse(localStorage.getItem("cartItems")) || [];

        const existingProductIndex = storedCartItems.findIndex(
          (item) =>
            item.id === newProductDetails.id &&
            item.color === newProductDetails.color
        );

        if (existingProductIndex !== -1) {
          storedCartItems[existingProductIndex].quantity +=
            newProductDetails.quantity;
        } else {
          storedCartItems.push(newProductDetails);
        }
        localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
        setProductDetails(storedCartItems);

        const initialQuantities = storedCartItems.reduce((acc, product) => {
          acc[product.id] = product.quantity || 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);

        const initialMaxQuantities = storedCartItems.reduce((acc, product) => {
          acc[product.id] = product.maxQuantity || 1;
          return acc;
        }, {});
        setMaxQuantity(initialMaxQuantities);
      } else {
        const storedCartItems =
          JSON.parse(localStorage.getItem("cartItems")) || [];
        setProductDetails(storedCartItems);
        const initialQuantities = storedCartItems.reduce((acc, product) => {
          acc[product.id] = product.quantity || 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
        const initialMaxQuantities = storedCartItems.reduce((acc, product) => {
          acc[product.id] = product.maxQuantity || 1;
          return acc;
        }, {});
        setMaxQuantity(initialMaxQuantities);
      }
    }
  }, [isDrawerOpen, pageDataI, quantity, afterDiscount, setQuantity]);

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
      [productId]: Math.min(
        (quantities[productId] || 1) + 1,
        maxQuantity[productId]
      ),
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
    <div
      className={`!z-50 font-futara-sans fixed rounded-lg top-16 lg:top-0 right-0 h-full w-80 bg-white shadow-2xl border transition-transform duration-300 ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 relative h-full flex flex-col justify-between">
        <div>
          <div>
            <div className="flex justify-between">
              <p className="tracking-widest font-extralight">CART</p>
              <CgClose className="cursor-pointer" onClick={toggleDrawer} />
            </div>
            <hr className="my-2 mt-4" />
            <p className="text-center text-xs tracking-widest">
              You are eligible for shipping
            </p>
          </div>
          <hr className="my-2" />
          <div className="overflow-auto max-h-[60vh]">
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
                          {getCurrencySymbol(country)}{" "}
                          {convertPrice(
                            product.discountPrice,
                            country,
                            settings
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center max-w-[6rem] border border-gray-200 dark:border-gray-700 rounded-sm">
                          <button
                            type="button"
                            id="decrement-button"
                            onClick={() => decrement(product.id)}
                            className="rounded-s-lg p-2 h-8 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
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
                            className="rounded-e-lg p-2 h-8  focus:outline-none"
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
            <div className="text-center flex justify-center mt-[50%] items-center align-middle justify-items-center h">
              <p className="text-xl">No items in cart</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-20 lg:bottom-0 left-0 w-full p-4 bg-white border-t z-40">
          <button
            className="text-[0.8rem] text-gray-700 w-full text-left py-2 rounded-lg"
            onClick={toggleNote}
          >
            Add order note
          </button>
          <p className="text-gray-700 text-[0.8rem] pb-3">
            Taxes and Shipping calculated at checkout
          </p>
          <Link
            onClick={toggleDrawer}
            href={productDetails < 1 ? "#" : "/checkout"}
          >
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
          className={`z-50 bottom-20 lg:bottom-0 absolute left-0 w-full bg-white border-t transition-all duration-300 ${
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

export default CartDrawer;
