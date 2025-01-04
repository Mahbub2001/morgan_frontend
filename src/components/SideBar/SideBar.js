"use client";

import React, { useContext, useState } from "react";
import { categories, aboutNyItems, journalItems } from "@/Data/Menu";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiLogOut, FiSearch } from "react-icons/fi";
import { FaGreaterThan, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "@/hooks/AuthProvider";
import { GoPerson } from "react-icons/go";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const Sidebar = ({ handleCartclick }) => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuHistory, setMenuHistory] = useState(["main"]);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [subsubmenuItems, setSubsubmenuItems] = useState([]);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setMenuHistory(["main"]);
      setSubmenuItems([]);
      setSubsubmenuItems([]);
    }
  };

  const openSubmenu = (items) => {
    setMenuHistory((prev) => [...prev, "submenu"]);
    setSubmenuItems(items);
    setSubsubmenuItems([]);
  };

  const openSubsubmenu = (items) => {
    setMenuHistory((prev) => [...prev, "subsubmenu"]);
    setSubsubmenuItems(items);
  };

  const goBack = () => {
    const history = [...menuHistory];
    history.pop();
    const previousMenu = history[history.length - 1];
    setMenuHistory(history);

    if (previousMenu === "main") {
      setSubmenuItems([]);
      setSubsubmenuItems([]);
    } else if (previousMenu === "submenu") {
      setSubsubmenuItems([]);
    }
  };

  const handleLogOut = () => {
    toggleSidebar();
    logout()
      .then((result) => {})
      .catch((error) => {});
  };

  const handleProfileClick = async () => {
    if (!user) {
      router.push("/login");
      toggleSidebar();
      return;
    }
    router.push("/dash");
    toggleSidebar();
  };

  const Cartclick = () => {
    handleCartclick();
    toggleSidebar();
  };

  const sidebarVariants = {
    hidden: {
      x: "-100%",
      transition: {
        duration: 0.2, 
      },
    },
    visible: {
      x: "0%",
      transition: {
        duration: 0.2, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50 flex items-center justify-between px-4 md:px-8">
        <button
          className="text-2xl focus:outline-none"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
        <Link href="/" className="text-lg font-semibold">
          Ny Morgen
        </Link>
        <button className="text-2xl focus:outline-none">
          <FiSearch />
        </button>
      </header>

      <motion.div
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-72 bg-white shadow-lg z-40 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        variants={sidebarVariants}
        initial="hidden"
        animate={isSidebarOpen ? "visible" : "hidden"}
      >
        <div className="absolute top-0 left-0 w-full h-full p-6">
          {menuHistory[menuHistory.length - 1] === "main" && (
            <motion.ul initial="hidden" animate="visible" className="space-y-4">
              <p>Shop</p>
              {categories.map((category, index) => (
                <motion.div key={index}>
                  <div
                    onClick={() => openSubmenu(category.items || [])}
                    className="cursor-pointer hover:text-blue-600 flex justify-between items-center font-thin"
                  >
                    <li className="">{category.name}</li>
                    <FaGreaterThan className="inline-block text-[0.6rem]" />
                  </div>
                  <hr className="my-3" />
                </motion.div>
              ))}
              <motion.li
                className="cursor-pointer hover:text-blue-600 font-medium text-sm"
                onClick={() => openSubmenu(aboutNyItems)}
                variants={itemVariants}
                transition={{ delay: categories.length * 0.05 }}
              >
                About Ny Morgen
              </motion.li>
              <motion.li
                className="cursor-pointer hover:text-blue-600 font-medium text-sm"
                onClick={() => openSubmenu(journalItems)}
                variants={itemVariants}
                transition={{ delay: (categories.length + 1) * 0.05 }}
              >
                Journal
              </motion.li>
            </motion.ul>
          )}

          {menuHistory[menuHistory.length - 1] === "submenu" && (
            <>
              <button
                className="text-sm mb-5 hover:text-blue-600 flex items-center space-x-2"
                onClick={goBack}
                aria-label="Go Back"
              >
                <span>&larr; Back</span>
              </button>
              <motion.ul
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {submenuItems.map((item, index) => (
                  <motion.div
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                    key={index}
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer hover:text-blue-600 font-thin text-sm"
                      onClick={() =>
                        Array.isArray(item.items) && openSubsubmenu(item.items)
                      }
                    >
                      {item.name ? (
                        <Link onClick={toggleSidebar} href={item.link}>
                          <li className="hover:underline">{item.name}</li>
                        </Link>
                      ) : (
                        <li>{item.category}</li>
                      )}
                      <FaGreaterThan className="inline-block text-[0.6rem]" />
                    </div>
                    <hr className="my-2" />
                  </motion.div>
                ))}
              </motion.ul>
            </>
          )}

          {menuHistory[menuHistory.length - 1] === "subsubmenu" && (
            <>
              <button
                className="text-sm mb-5 hover:text-blue-600 flex items-center space-x-2"
                onClick={goBack}
                aria-label="Go Back"
              >
                <span>&larr; Back</span>
              </button>
              <motion.ul
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {subsubmenuItems.map((item, index) => (
                  <motion.li
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                    key={index}
                    className="hover:text-blue-600 text-sm"
                  >
                    <Link
                      onClick={toggleSidebar}
                      href={{
                        pathname: "/allproducts",
                        query: { take: item?.link },
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}
          <div className="flex gap-5 mt-10 ">
            <CiSearch className="cursor-pointer" />
            <FaShoppingBag onClick={Cartclick} className="cursor-pointer" />
            <button onClick={handleProfileClick} className="cursor-pointer">
              <GoPerson />
            </button>
            {user && (
              <FiLogOut className="cursor-pointer" onClick={handleLogOut} />
            )}
          </div>
        </div>
      </motion.div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
