"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { FaShoppingBag } from "react-icons/fa";
import {
  categories,
  aboutNyItems,
  journalItems,
  Inspiration,
} from "@/Data/Menu";
import { useSpring, animated } from "@react-spring/web";
import Dropdown from "@/containers/common/DropDown_About/DropDownAbout";
import Dropdown2 from "@/containers/common/DropDown_Journal/DropDownJournal";
import Sidebar from "../SideBar/SideBar";
import Announcement from "../Announcement/Announcement";
import News from "../NewsPage/News";
import Latest from "../LatestPage/Latest";
import Link from "next/link";
import { AuthContext } from "@/hooks/AuthProvider";
import { FiLogOut } from "react-icons/fi";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navbarRef = useRef(null);

  const { user, logout } = useContext(AuthContext);

  if (user) {
    console.log(user);
  }

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

  const handleLogOut = () => {
    logout()
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
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
                <Link
                  onClick={() => toggleDropdown("contact")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "contact"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                  href="/contact"
                >
                  Contact
                </Link>
                <li
                  onClick={() => toggleDropdown("discover")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "discover"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  Discover
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
                <li
                  onClick={() => toggleDropdown("inspiration")}
                  className={`cursor-pointer border-b-2 ${
                    activeDropdown === "inspiration"
                      ? "border-black"
                      : "border-transparent"
                  } hover:border-black`}
                >
                  New Inspiration
                </li>
              </ul>
              {/* Logo */}
              <Link
                href="/"
                className="font-bold tracking-wider uppercase text-2xl font-sans cursor-pointer absolute left-1/2 transform -translate-x-1/2"
              >
                Ny Morgen
              </Link>

              <div className="flex gap-5">
                <CiSearch className="cursor-pointer" />
                <FaShoppingBag className="cursor-pointer" />
                <Link href="/login" className="cursor-pointer">
                  <GoPerson />
                </Link>
                {user && (
                  <FiLogOut className="cursor-pointer" onClick={handleLogOut} />
                )}
              </div>
            </div>
          </div>

          {(activeDropdown === "Shop" ||
            activeDropdown === "women" ||
            activeDropdown === "men" ||
            activeDropdown === "kids") && (
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
              <animated.div className="absolute left-0 right-0 mt-2 bg-white border-b-[1px] py-5">
                <div className="container mx-auto">
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-8">
                      <div className="grid grid-cols-3 gap-5">
                        {categories[0].items.map((category) => (
                          <div key={category.category}>
                            <p className="text-gray-700 text-sm font-semibold">
                              {category?.category?.name}
                            </p>
                            <ul className="space-y-2 mt-2">
                              {category?.items.map((item, index) => (
                                <li
                                  key={index}
                                  className="text-sm font-light cursor-pointer hover:bg-gray-200"
                                >
                                  {item?.name}
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
                            {category?.category?.name}
                          </p>
                          <ul className="space-y-2 mt-2">
                            {category.items.map((item, index) => (
                              <li
                                key={index}
                                className="text-sm font-light cursor-pointer hover:bg-gray-200"
                              >
                                {item?.name}
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
                            {category.category?.name}
                          </p>
                          <ul className="space-y-2 mt-2">
                            {category.items.map((item, index) => (
                              <li
                                key={index}
                                className="text-sm font-light cursor-pointer hover:bg-gray-200"
                              >
                                {item?.name}
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
                            {category?.category?.name}
                          </p>
                          <ul className="space-y-2 mt-2">
                            {category.items.map((item, index) => (
                              <li
                                key={index}
                                className="text-sm font-light cursor-pointer hover:bg-gray-200"
                              >
                                {item?.name}
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

          {activeDropdown === "discover" && (
            <Dropdown
              title="Discover"
              items={aboutNyItems}
              isVisible={activeDropdown === "discover"}
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
          {activeDropdown === "inspiration" && (
            <Dropdown2
              title="Inspiration"
              items={Inspiration}
              isVisible={activeDropdown === "inspiration"}
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
