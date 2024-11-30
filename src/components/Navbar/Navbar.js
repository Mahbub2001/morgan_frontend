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
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
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
    <div>
      {/* Announcement Bars */}
      <div className="bg-black text-white upper flex flex-col justify-center items-center">
        <p className="py-2 tracking-widest text-sm">
          BLACK WEEK - SAVE 20% ON EVERYTHING
        </p>
      </div>
      <div className="bg-gray-100 upper flex flex-col justify-center items-center">
        <p className="py-2 tracking-wider text-sm">
          Free shipping / Christmas gifts are exchanged until 15-01-25 / Easy
          returns
        </p>
      </div>

      <div className="border-b-[1px] py-8" ref={navbarRef}>
        <div className="main-navbar">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <ul className="flex gap-8 text-[0.9rem]">
                <li
                  onClick={() => toggleDropdown("men")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "men"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Men
                </li>
                <li
                  onClick={() => toggleDropdown("women")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "women"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Women
                </li>
                <li
                  onClick={() => toggleDropdown("kids")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "kids"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Kids
                </li>
                <li
                  onClick={() => toggleDropdown("showroom")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "showroom"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Showroom
                </li>
                <li
                  onClick={() => toggleDropdown("aboutNy")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "aboutNy"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  About Ny
                </li>
                <li
                  onClick={() => toggleDropdown("journal")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "journal"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Journal
                </li>
              </ul>

              {/* Logo */}
              <h3 className="font-bold tracking-wider uppercase text-2xl font-sans cursor-pointer absolute left-1/2 transform -translate-x-1/2">
                Ny Morgen
              </h3>

              <div className="flex gap-5">
                <CiSearch className="cursor-pointer" />
                <FaShoppingBag className="cursor-pointer" />
              </div>
            </div>
          </div>

          {activeDropdown === "men" && (
            <animated.div className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5">
              <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-8">
                    <div className="grid grid-cols-3 gap-5">
                      {categories[1].items.map((category) => (
                        <div key={category.category}>
                          <p className="text-gray-700 text-sm font-semibold">
                            {category.category}
                          </p>
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
                  <div className="col-span-2">
                    <p className="text-gray-700 text-sm font-semibold">News!</p>
                    <ul className="space-y-2 mt-2">
                      <li className="text-[0.6rem]">
                        <div className="relative overflow-hidden">
                          <HoverZoomImage src="images/april1.jpeg" alt="news" />
                        </div>
                        <div className="mt-2">
                          <div className="relative cursor-pointer gap-2 flex">
                            <div className="w-3 h-3 bg-[#f6cda8] rounded-full ring-[#f6cda8] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#d89d94] rounded-full ring-[#d89d94] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#dd6b6c] rounded-full ring-[#dd6b6c] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#875d71] rounded-full ring-[#875d71] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#5b5b5b] rounded-full ring-[#5b5b5b] hover:ring-2 ring-offset-1 transition-all"></div>
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

                  <div className="col-span-2">
                    <p className="text-gray-700 text-sm font-semibold">
                      Trending
                    </p>
                    <ul className="space-y-2 mt-2">
                      <li className="text-[0.6rem]">
                        <div className="relative overflow-hidden">
                          <HoverZoomImage
                            src="images/april2.jpeg"
                            alt="trending"
                          />
                        </div>
                        <div className="mt-2">
                          <div className="relative cursor-pointer gap-2 flex">
                            <div className="w-3 h-3 bg-[#f6cda8] rounded-full ring-[#f6cda8] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#d89d94] rounded-full ring-[#d89d94] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#dd6b6c] rounded-full ring-[#dd6b6c] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#875d71] rounded-full ring-[#875d71] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#5b5b5b] rounded-full ring-[#5b5b5b] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#a3ee77] rounded-full ring-[#779410] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#bd2d2d] rounded-full ring-[#cea1a1] hover:ring-2 ring-offset-1 transition-all"></div>
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
              </div>
            </animated.div>
          )}

          {activeDropdown === "women" && (
            <animated.div className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5">
              <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-8">
                    <div className="grid grid-cols-3 gap-5">
                      {categories[0].items.map((category) => (
                        <div key={category.category}>
                          <p className="text-gray-700 text-sm font-semibold">
                            {category.category}
                          </p>
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
                  {/* News Section - Takes 3/12 width */}
                  <div className="col-span-2">
                    <p className="text-gray-700 text-sm font-semibold">News!</p>
                    <ul className="space-y-2 mt-2">
                      <li className="text-[0.6rem]">
                        <div className="relative overflow-hidden">
                          <HoverZoomImage src="images/april1.jpeg" alt="news" />
                        </div>
                        <div className="mt-2">
                          <div className="relative cursor-pointer gap-2 flex">
                            <div className="w-3 h-3 bg-[#f6cda8] rounded-full ring-[#f6cda8] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#d89d94] rounded-full ring-[#d89d94] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#dd6b6c] rounded-full ring-[#dd6b6c] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#875d71] rounded-full ring-[#875d71] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#5b5b5b] rounded-full ring-[#5b5b5b] hover:ring-2 ring-offset-1 transition-all"></div>
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

                  {/* Trending Section - Takes 3/12 width */}
                  <div className="col-span-2">
                    <p className="text-gray-700 text-sm font-semibold">
                      Trending
                    </p>
                    <ul className="space-y-2 mt-2">
                      <li className="text-[0.6rem]">
                        <div className="relative overflow-hidden">
                          <HoverZoomImage
                            src="images/april2.jpeg"
                            alt="trending"
                          />
                        </div>
                        <div className="mt-2">
                          <div className="relative cursor-pointer gap-2 flex">
                            <div className="w-3 h-3 bg-[#f6cda8] rounded-full ring-[#f6cda8] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#d89d94] rounded-full ring-[#d89d94] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#dd6b6c] rounded-full ring-[#dd6b6c] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#875d71] rounded-full ring-[#875d71] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#5b5b5b] rounded-full ring-[#5b5b5b] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#a3ee77] rounded-full ring-[#779410] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#bd2d2d] rounded-full ring-[#cea1a1] hover:ring-2 ring-offset-1 transition-all"></div>
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
              </div>
            </animated.div>
          )}

          {activeDropdown === "kids" && (
            <animated.div className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5">
              <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-8">
                    <div className="grid grid-cols-3 gap-5">
                      {categories[2].items.map((category) => (
                        <div key={category.category}>
                          <p className="text-gray-700 text-sm font-semibold">
                            {category.category}
                          </p>
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
                  <div className="col-span-2">
                    <p className="text-gray-700 text-sm font-semibold">News!</p>
                    <ul className="space-y-2 mt-2">
                      <li className="text-[0.6rem]">
                        <div className="relative overflow-hidden">
                          <HoverZoomImage src="images/april1.jpeg" alt="news" />
                        </div>
                        <div className="mt-2">
                          <div className="relative cursor-pointer gap-2 flex">
                            <div className="w-3 h-3 bg-[#f6cda8] rounded-full ring-[#f6cda8] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#d89d94] rounded-full ring-[#d89d94] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#dd6b6c] rounded-full ring-[#dd6b6c] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#875d71] rounded-full ring-[#875d71] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#5b5b5b] rounded-full ring-[#5b5b5b] hover:ring-2 ring-offset-1 transition-all"></div>
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
                  <div className="col-span-2">
                    <p className="text-gray-700 text-sm font-semibold">
                      Trending
                    </p>
                    <ul className="space-y-2 mt-2">
                      <li className="text-[0.6rem]">
                        <div className="relative overflow-hidden">
                          <HoverZoomImage
                            src="images/april2.jpeg"
                            alt="trending"
                          />
                        </div>
                        <div className="mt-2">
                          <div className="relative cursor-pointer gap-2 flex">
                            <div className="w-3 h-3 bg-[#f6cda8] rounded-full ring-[#f6cda8] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#d89d94] rounded-full ring-[#d89d94] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#dd6b6c] rounded-full ring-[#dd6b6c] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#875d71] rounded-full ring-[#875d71] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#5b5b5b] rounded-full ring-[#5b5b5b] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#a3ee77] rounded-full ring-[#779410] hover:ring-2 ring-offset-1 transition-all"></div>
                            <div className="w-3 h-3 bg-[#bd2d2d] rounded-full ring-[#cea1a1] hover:ring-2 ring-offset-1 transition-all"></div>
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
              </div>
            </animated.div>
          )}

          {activeDropdown === "aboutNy" && (
            <Dropdown
              title="About Ny"
              items={aboutNyItems}
              isVisible={activeDropdown === "aboutNy"}
              closeDropdown={() => setActiveDropdown(null)}
            />
          )}

          {activeDropdown === "journal" && (
            <Dropdown2
              title="Journal"
              items={journalItems}
              isVisible={activeDropdown === "journal"}
              closeDropdown={() => setActiveDropdown(null)}
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
