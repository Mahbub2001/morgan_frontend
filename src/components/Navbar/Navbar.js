"use client";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import categories from "@/Data/Menu";

function Navbar() {
  const [drop_vis, set_drop] = useState(false);

  const toggleDropdown = () => {
    set_drop(!drop_vis);
  };

  return (
    <div className="border-b-[1px] py-8 flex-c justify-center items-center">
      <div className="container mx-auto">
        <div className="flex justify-between px-40 items-center">
          <ul className="flex gap-8 text-[0.9rem]">
            <li
              onClick={toggleDropdown}
              className="cursor-pointer border-b-2 border-transparent hover:border-black"
            >
              Shop
            </li>
            <li className="cursor-pointer border-b-2 border-transparent hover:border-black">
              Showroom
            </li>
            <li className="cursor-pointer border-b-2 border-transparent hover:border-black">
              About Ny
            </li>
            <li className="cursor-pointer border-b-2 border-transparent hover:border-black">
              Journal
            </li>
          </ul>
          <h3 className="font-bold tracking-wider uppercase text-2xl font-sans cursor-pointer absolute left-1/2 transform -translate-x-1/2">
            Ny Morgan
          </h3>
          <div className="flex gap-5">
            <CiSearch className="cursor-pointer" />
            <FaShoppingBag className="cursor-pointer" />
          </div>
        </div>
      </div>
      {drop_vis && (
        <div className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5">
          <div className="container mx-auto flex justify-between px-40 ">
            {categories.map((category) => (
              <div key={category.name} className="flex-1">
                <p className="text-gray-700 text-sm">{category.name}</p>
                <ul className="space-y-2 mt-2">
                  {category.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm font-light cursor-pointer hover:bg-gray-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
