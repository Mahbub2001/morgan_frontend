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
import Dropdown from "@/containers/common/DropDown_About/DropDownAbout";
import Dropdown2 from "@/containers/common/DropDown_Journal/DropDownJournal";
import Sidebar from "../SideBar/SideBar";
import Announcement from "../Announcement/Announcement";
import News from "../NewsPage/News";
import Latest from "../LatestPage/Latest";
import Link from "next/link";
import { AuthContext } from "@/hooks/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import CartDrawer from "@/containers/common/CartDrawer/CartDrawer";
import { SettingsContext } from "@/hooks/SettingsProvider";

function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const [cartDrawer, setCartDrawer] = useState(false);
  const [role, setRole] = useState(null);
  const { settings } = useContext(SettingsContext);
  // console.log("settings", settings);

  const navbarRef = useRef(null);

  if (user) {
    // console.log(user);
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
        // console.log(error);
      });
  };
  const router = useRouter();
  const handleProfileClick = async () => {

    if (!user) {
      router.push("/login");
      return;
    }
    router.push("/dash");
  };

  const handleCartclick = () => {
    setCartDrawer(!cartDrawer);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2 } },
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white text-white shadow-sm back">
        <Announcement settings={settings} />
        <div className="border-b-[1px] py-8" ref={navbarRef}>
          <div className="main-navbar ">
            <div className="container mx-auto">
              <div className="flex justify-between items-center">
                <ul className="flex gap-4 text-[0.9rem] items-center">
                  <li className="-pt-5">
                    <Link href="/">
                      <img
                        className=" h-12 w-16 "
                        src="/white_icon.png"
                        alt="logo"
                      />
                    </Link>
                  </li>
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
                  {/* <li
                    onClick={() => toggleDropdown("journal")}
                    className={`cursor-pointer border-b-2 ${
                      activeDropdown === "journal"
                        ? "border-black"
                        : "border-transparent"
                    } hover:border-black`}
                  >
                    Journal
                  </li> */}
                  {/* <li
                    onClick={() => toggleDropdown("inspiration")}
                    className={`cursor-pointer border-b-2 ${
                      activeDropdown === "inspiration"
                        ? "border-black"
                        : "border-transparent"
                    } hover:border-black`}
                  >
                    New Inspiration
                  </li> */}
                </ul>
                {/* Logo */}
                <Link
                  href="/"
                  className="font-bold tracking-wider uppercase text-2xl font-sans cursor-pointer absolute left-1/2 transform -translate-x-1/2"
                >
                  Ny Morgen
                </Link>

                <div className="flex gap-5">
                  {/* <motion.div
                    className="cursor-pointer"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <CiSearch />
                  </motion.div> */}
                  <motion.button
                    className="cursor-pointer"
                    onClick={handleCartclick}
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <FaShoppingBag />
                  </motion.button>
                  <motion.button
                    onClick={handleProfileClick}
                    className="cursor-pointer"
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <GoPerson />
                  </motion.button>
                  {user && (
                    <motion.div
                      className="cursor-pointer"
                      onClick={handleLogOut}
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <FiLogOut />
                    </motion.div>
                  )}
                  {/* <CiSearch className="cursor-pointer" /> */}
                  {/* <button className="cursor-pointer" onClick={handleCartclick}>
                    <FaShoppingBag />
                  </button>
                  <button
                    onClick={handleProfileClick}
                    className="cursor-pointer"
                  >
                    <GoPerson />
                  </button>
                  {user && (
                    <FiLogOut
                      className="cursor-pointer"
                      onClick={handleLogOut}
                    />
                  )} */}
                </div>
              </div>
            </div>
            <AnimatePresence>
              {(activeDropdown === "Shop" ||
                activeDropdown === "women" ||
                activeDropdown === "men" ||
                activeDropdown === "kids") && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="container mx-auto"
                >
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
                  <motion.div className="absolute left-0 right-0 mt-2 back border-b-[1px] py-3">
                    <div className="container mx-auto">
                      <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-8">
                          <div className="grid grid-cols-3 gap-5">
                            {categories[0].items.map((category) => (
                              <div key={category.category}>
                                <p className="text-white text-sm font-semibold">
                                  {category?.category}
                                </p>
                                <ul className="space-y-2 mt-1">
                                  {category?.items.map((item, index) => (
                                    <li
                                      key={index}
                                      className="text-sm font-light cursor-pointe"
                                    >
                                      <Link
                                        onClick={() => setActiveDropdown(null)}
                                        className="!font-futara-sans !text-xs text-white hover:text-blue-300"
                                        href={{
                                          pathname: "/allproducts",
                                          query: { take: item?.link },
                                        }}
                                      >
                                        {item?.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* <News />
                        <Latest /> */}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            {activeDropdown === "women" && (
              <div className="absolute left-0 right-0 mt-2 back border-b-[1px] py-3">
                <div className="container mx-auto">
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-8">
                      <div className="grid grid-cols-3 gap-5">
                        {categories[0].items.map((category) => (
                          <div key={category.category}>
                            <p className="text-white text-sm font-semibold">
                              {category?.category}
                            </p>
                            <ul className="space-y-2 mt-1">
                              {category.items.map((item, index) => (
                                <li
                                  key={index}
                                  className="text-sm font-light cursor-pointer"
                                >
                                  <Link
                                    onClick={() => setActiveDropdown(null)}
                                    className="!font-futara-sans !text-xs text-white hover:text-blue-300"
                                    href={{
                                      pathname: "/allproducts",
                                      query: { take: item?.link },
                                    }}
                                  >
                                    {item?.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* <News />
                    <Latest /> */}
                  </div>
                </div>
              </div>
            )}

            {activeDropdown === "men" && (
              <div className="absolute left-0 right-0 mt-2 back border-b-[1px] py-3">
                <div className="container mx-auto">
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-8">
                      <div className="grid grid-cols-3 gap-5">
                        {categories[1].items.map((category) => (
                          <div key={category.category}>
                            <p className="text-white text-sm font-semibold">
                              {category.category}
                            </p>
                            <ul className="space-y-2 mt-1">
                              {category.items.map((item, index) => (
                                <li
                                  key={index}
                                  className="text-sm font-light cursor-pointer"
                                >
                                  <Link
                                    onClick={() => setActiveDropdown(null)}
                                    className="!font-futara-sans !text-xs text-white hover:text-blue-300"
                                    href={{
                                      pathname: "/allproducts",
                                      query: { take: item?.link },
                                    }}
                                  >
                                    {item?.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* <News />
                    <Latest /> */}
                  </div>
                </div>
              </div>
            )}

            {activeDropdown === "kids" && (
              <div className="absolute left-0 right-0 mt-2 back border-b-[1px] py-16">
                <div className="container mx-auto">
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-8">
                      <div className="grid grid-cols-3 gap-5">
                        {categories[2].items.map((category) => (
                          <div key={category.category}>
                            <p className="text-white text-sm font-semibold">
                              {category?.category}
                            </p>
                            <ul className="space-y-2 mt-1">
                              {category.items.map((item, index) => (
                                <li
                                  key={index}
                                  className="text-sm font-light cursor-pointer"
                                >
                                  <Link
                                    onClick={() => setActiveDropdown(null)}
                                    className="!font-futara-sans !text-xs text-white hover:text-blue-300"
                                    href={{
                                      pathname: "/allproducts",
                                      query: { take: item?.link },
                                    }}
                                  >
                                    {item?.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* <News />
                    <Latest /> */}
                  </div>
                </div>
              </div>
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
          <Sidebar settings={settings} handleCartclick={handleCartclick} />
        </div>
      </div>

      {cartDrawer && (
        <CartDrawer isDrawerOpen={cartDrawer} toggleDrawer={handleCartclick} />
      )}
    </>
  );
}

export default Navbar;
