import React from "react";
import { CgClose } from "react-icons/cg";
import Button3 from "../Button3/Button3";

function CartDrawer({
  isDrawerOpen,
  toggleDrawer,
  toggleNote,
  isNoteVisible,
  saveNote,
  quantity,
  afterDiscount,
  pageDataI,
  setQuantity,
}) {
  console.log(pageDataI);

  return (
    <div
      className={`!z-50 fixed rounded-lg top-0 lg:top-0 right-0 h-full  w-96 bg-white shadow-2xl border transition-transform duration-300 ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 relative h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
            <p className="tracking-widest font-extralight">CART</p>
            <CgClose className="cursor-pointer" onClick={toggleDrawer} />
          </div>
          <hr className="my-2 mt-4" />
          <p className="text-center text-xs tracking-widest">
            You are eligible for shipping
          </p>
          <hr className="my-2" />
        </div>

        <div className="flex-grow overflow-y-auto"></div>
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
