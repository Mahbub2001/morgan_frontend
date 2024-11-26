"use client";

import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { categories, aboutNyItems, journalItems } from "@/Data/Menu";

const Dropdown = ({ title, items, isVisible, closeDropdown, dropdownRef }) => {
  if (!isVisible) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5"
    >
      <div className="container mx-auto flex justify-between px-40">
        <div className="flex-1">
          <p className="text-gray-700 text-sm">{title}</p>
          <ul className="space-y-2 mt-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="text-sm font-light cursor-pointer hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const shopRef = useRef(null);
  const aboutNyRef = useRef(null);
  const journalRef = useRef(null);
  const navbarRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) 
      ) {
        setActiveDropdown(null); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="border-b-[1px] py-8 flex-c justify-center items-center" ref={navbarRef}>
      <div className="container mx-auto">
        <div className="flex justify-between md:px-32 lg:px-40 items-center">
          <ul className="flex gap-8 text-[0.9rem]">
            <li
              onClick={() => toggleDropdown("shop")}
              className="cursor-pointer border-b-2 border-transparent hover:border-black"
            >
              Shop
            </li>
            <li
              onClick={() => toggleDropdown("showroom")}
              className="cursor-pointer border-b-2 border-transparent hover:border-black"
            >
              Showroom
            </li>
            <li
              onClick={() => toggleDropdown("aboutNy")}
              className="cursor-pointer border-b-2 border-transparent hover:border-black"
            >
              About Ny
            </li>
            <li
              onClick={() => toggleDropdown("journal")}
              className="cursor-pointer border-b-2 border-transparent hover:border-black"
            >
              Journal
            </li>
          </ul>

          <h3 className="font-bold tracking-wider uppercase text-2xl font-sans cursor-pointer absolute left-1/2 transform -translate-x-1/2">
            Ny Morgen
          </h3>

          <div className="flex gap-5">
            <CiSearch className="cursor-pointer" />
            <FaShoppingBag className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Shop Dropdown */}
      {activeDropdown === "shop" && (
        <div ref={shopRef} className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5">
          <div className="container mx-auto flex justify-between px-40">
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

      {/* About Ny Dropdown */}
      {activeDropdown === "aboutNy" && (
        <Dropdown
          title="About Ny"
          items={aboutNyItems}
          isVisible={activeDropdown === "aboutNy"}
          closeDropdown={() => setActiveDropdown(null)}
          dropdownRef={aboutNyRef}
        />
      )}

      {activeDropdown === "journal" && (
        <Dropdown
          title="Journal"
          items={journalItems}
          isVisible={activeDropdown === "journal"}
          closeDropdown={() => setActiveDropdown(null)}
          dropdownRef={journalRef}
        />
      )}
    </div>
  );
}

export default Navbar;
