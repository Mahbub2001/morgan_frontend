"use client";

import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { categories, aboutNyItems, journalItems } from "@/Data/Menu";
import { useSpring, animated } from "@react-spring/web";
import { HoverZoomImage } from "../ZoomImage/HoverZoomImage";
import Dropdown from "@/containers/common/DropDown_About/DropDownAbout";
import Dropdown2 from "@/containers/common/DropDown_Journal/DropDownJournal";
import Sidebar from "../SideBar/SideBar";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const shopRef = useRef(null);
  const aboutNyRef = useRef(null);
  const journalRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    setActiveMenu(dropdownName);
  };

  return (
    <div>
      <div className="bg-black text-white upper flex flex-col justify-center items-center">
        <p className="py-2 tracking-widest text-sm">
          BLACK WEEK- SAVE 20% ON EVERYTHING
        </p>
      </div>
      <div className="bg-gray-100 upper flex flex-col justify-center items-center">
        <p className="py-2 tracking-wider text-sm">
          Free shipping / Christmas gifts are exchanged empty 15-01-25 / Easy
          return
        </p>
      </div>
      <div className="border-b-[1px] py-8 " ref={navbarRef}>
        <div className="main-navbar">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <ul className="flex gap-8 text-[0.9rem]">
                <li
                  onClick={() => toggleDropdown("shop")}
                  className={`cursor-pointer border-b-2 ${
                    activeMenu === "shop"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Shop
                </li>
                <li
                  onClick={() => toggleDropdown("showroom")}
                  className={`cursor-pointer border-b-2 ${
                    activeMenu === "showroom"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Showroom
                </li>
                <li
                  onClick={() => toggleDropdown("aboutNy")}
                  className={`cursor-pointer border-b-2 ${
                    activeMenu === "aboutNy"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  About Ny
                </li>
                <li
                  onClick={() => toggleDropdown("journal")}
                  className={`cursor-pointer border-b-2 ${
                    activeMenu === "journal"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
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

          {activeDropdown === "shop" && (
            <animated.div
              ref={shopRef}
              style={{
                opacity: activeDropdown === "shop" ? 1 : 0,
                transform:
                  activeDropdown === "shop" ? "scaleY(1)" : "scaleY(0)",
                transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                origin: "top",
              }}
              className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5"
            >
              <div className="container mx-auto grid grid-cols-7 gap-5 justify-between">
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
                <div>
                  <p className="text-gray-700 text-sm">News!</p>
                  <ul className="space-y-2 mt-2">
                    <li className="text-[0.6rem]">
                      <div className="relative overflow-hidden">
                        <HoverZoomImage src="images/april1.jpeg" alt="news" />
                      </div>
                      <div className="">
                        <div className="relative cursor-pointer gap-2 flex mt-2">
                          <div className="w-3 h-3 bg-[#f6cda8] transition-all rounded-full block ring-[#f6cda8] hover:ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#d89d94] transition-all rounded-full block ring-[#d89d94] hover:ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#dd6b6c] transition-all rounded-full block ring-[#dd6b6c] hover:ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#875d71] transition-all rounded-full block ring-[#875d71] hover:ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#5b5b5b] transition-all rounded-full block ring-[#5b5b5b] hover:ring-2 ring-2 ring-offset-1"></div>
                        </div>
                        <div className="flex justify-between mt-3 mb-1 text-[0.7rem]">
                          <p className="text-gray-700">APRIL</p>
                          <p className="text-gray-700 line-through">
                            DKK 2,850
                          </p>
                          <p className="text-red-700">DKK 2,250</p>
                        </div>
                        <p className="text-gray-500">
                          Small Crossbody Bag-Mocha
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-gray-700 text-sm">Trending</p>
                  <ul className="space-y-2 mt-2">
                    <li className="text-[0.6rem]">
                      <div className="relative overflow-hidden">
                        <HoverZoomImage src="images/april2.jpeg" alt="news" />
                      </div>
                      <div className="">
                        <div className="relative cursor-pointer gap-2 flex mt-2">
                          <div className="w-3 h-3 bg-[#f6cda8] transition-all rounded-full block ring-[#f6cda8] hover:ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#d89d94] transition-all rounded-full block ring-[#d89d94] hover:ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#dd6b6c] transition-all rounded-full block ring-[#dd6b6c] hover:ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#875d71] transition-all rounded-full block ring-[#875d71] hover:ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#5b5b5b] transition-all rounded-full block ring-[#5b5b5b] hover:ring-2 ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#a3ee77] transition-all rounded-full block ring-[#779410] hover:ring-2 ring-offset-1"></div>
                          <div className="w-3 h-3 bg-[#bd2d2d] transition-all rounded-full block ring-[#cea1a1] hover:ring-2 ring-offset-1"></div>
                        </div>
                        <div className="flex justify-between mt-3 mb-1 text-[0.7rem]">
                          <p className="text-gray-700">APRIL</p>
                          <p className="text-gray-700 line-through">
                            DKK 2,850
                          </p>
                          <p className="text-red-700">DKK 2,250</p>
                        </div>
                        <p className="text-gray-500">
                          Small Crossbody Bag-Mocha
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </animated.div>
          )}
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
            <Dropdown2
              title="Journal"
              items={journalItems}
              isVisible={activeDropdown === "journal"}
              closeDropdown={() => setActiveDropdown(null)}
              dropdownRef={journalRef}
            />
          )}
        </div>
      </div>
      <div className="mobile-sidebar">
        <Sidebar />
      </div>
    </div>
  );
}

export default Navbar;
