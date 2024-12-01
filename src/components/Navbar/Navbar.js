'use client'

import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { categories, aboutNyItems, journalItems } from "@/Data/Menu";
import { useSpring, animated } from "@react-spring/web";
import Dropdown from "@/containers/common/DropDown_About/DropDownAbout";
import Dropdown2 from "@/containers/common/DropDown_Journal/DropDownJournal";
import Sidebar from "../SideBar/SideBar";
import Announcement from "../Announcement/Announcement";
import News from "../NewsPage/News";
import Latest from "../LatestPage/Latest";

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
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null); 
    } else {
      setActiveDropdown(dropdownName); 
    }
  };

  return (
    <div>
      <Announcement />
      <div className="border-b-[1px] py-8" ref={navbarRef}>
        <div className="main-navbar">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <ul className="flex gap-4 text-[0.9rem]">
                <li
                  onClick={() => toggleDropdown("Shop")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "Shop" ||
                    activeDropdown === "women" ||
                    activeDropdown === "men" ||
                    activeDropdown === "kids"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Shop
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

          {(activeDropdown === "Shop" || activeDropdown === "women" || activeDropdown === "men" || activeDropdown === "kids") && (
            <div className="container mx-auto">
              <div className="flex gap-10 mt-5 font-thin text-sm">
                <li
                  onClick={() => toggleDropdown("women")}
                  className={`list-none cursor-pointer border-b-2 ${
                    activeDropdown === "women"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Women
                </li>
                <li
                  onClick={() => toggleDropdown("men")}
                  className={`list-none cursor-pointer border-b-2 ${
                    activeDropdown === "men"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Men
                </li>
                <li
                  onClick={() => toggleDropdown("kids")}
                  className={`list-none cursor-pointer border-b-2 ${
                    activeDropdown === "kids"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Kids
                </li>
              </div>
            </div>
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
                  <News />
                  <Latest />
                </div>
              </div>
            </animated.div>
          )}

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
                  <News />
                  <Latest />
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
                  <News />
                  <Latest />
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
