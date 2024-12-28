import React, { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import Button3 from "../Button3/Button3";

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
  const [isNoteVisible, setIsNoteVisible] = useState(false);

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
          quantity: quantity,
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
      } else {
        const storedCartItems =
          JSON.parse(localStorage.getItem("cartItems")) || [];
        console.log("Fetching cart items from localStorage:", storedCartItems);
        setProductDetails(storedCartItems);
        const initialQuantities = storedCartItems.reduce((acc, product) => {
          acc[product.id] = product.quantity || 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
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
    const maxQuantity = 50;

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

  return (
    <div
      className={`!z-50 font-futara-sans fixed rounded-lg top-0 lg:top-0 right-0 h-full w-96 bg-white shadow-2xl border transition-transform duration-300 ${
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
          <div>
            {productDetails.length > 0 ? (
              productDetails.map((product) => (
                <div
                  className="flex justify-evenly items-center"
                  key={product.id}
                >
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-extralight font-futura-sans">
                      {product.name}
                    </p>
                    <p className="text-xs">{product.price}</p>
                    <p className="text-xs">{product.discountPrice}</p>
                  </div>
                  <div>
                    <div>
                      <div className="relative flex items-center max-w-[8rem] border border-gray-200 dark:border-gray-700 rounded-sm">
                        <button
                          type="button"
                          id="decrement-button"
                          onClick={() => decrement(product.id)}
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
                          value={quantities[product.id] || 1}
                          onChange={(e) => handleChange(e, product.id)}
                          onBlur={() => handleBlur(product.id)}
                          className="border-none focus:ring-0 focus:border-none outline-none h-11 text-center text-gray-900 text-sm block w-full py-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                          placeholder="999"
                          required
                        />

                        <button
                          type="button"
                          id="increment-button"
                          onClick={() => increment(product.id)}
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
              ))
            ) : (
              <p>NO DATA FOUND</p>
            )}
          </div>
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
          <Button3
            text="PROCEED TO CHECKOUT"
            backgroundColor="#f5db8b"
            borderColor="#f5db8b"
            textColor="black"
          ></Button3>
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