"use client";

import React, { useState } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { categories, aboutNyItems, journalItems } from "@/Data/Menu";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaGreaterThan } from "react-icons/fa";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuHistory, setMenuHistory] = useState(["main"]);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [subsubmenuItems, setSubsubmenuItems] = useState([]);

  const sidebarSpring = useSpring({
    transform: isSidebarOpen ? "translateX(0%)" : "translateX(-100%)",
    config: { tension: 280, friction: 30 },
  });

  const menuTransition = useTransition(menuHistory[menuHistory.length - 1], {
    from: { opacity: 0, transform: "translateX(100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-100%)" },
    config: { tension: 220, friction: 30 },
  });

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

        <h1 className="text-lg font-semibold">Ny Morgen</h1>
        <button className="text-2xl focus:outline-none">
          <FiSearch />
        </button>
      </header>
      <div className="bg-black text-white  flex flex-col justify-center items-center">
        <p className="py-2 tracking-widest text-xs">
          BLACK WEEK- SAVE 20% ON EVERYTHING
        </p>
      </div>
      <div className="bg-gray-100 text-center flex flex-col justify-center items-center">
        <p className="py-2 tracking-wider text-xs">
          Free shipping / Christmas gifts are exchanged empty 15-01-25 / Easy
          return
        </p>
      </div>
      <animated.div
        style={sidebarSpring}
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-72 bg-white shadow-lg z-40`}
      >
        {menuTransition((styles, currentMenu) => (
          <animated.div
            style={styles}
            className="absolute top-0 left-0 w-full h-full p-6"
          >
            {currentMenu === "main" && (
              <ul className="space-y-4">
                <li className="font-medium text-sm text-black">
                  <span className="">Shop</span>
                  <ul className="mt-5 space-y-4 text-gray-600">
                    {categories.map((category, index) => (
                      <div key={index}>
                        <div
                          onClick={() => openSubsubmenu(category.items || [])}
                          className="cursor-pointer hover:text-blue-600 flex justify-between items-center font-thin"
                        >
                          <li className="">{category.name || category}</li>
                          <FaGreaterThan className="inline-block text-[0.6rem]" />
                        </div>
                        <hr className="my-3" />
                      </div>
                    ))}
                  </ul>
                </li>
                <li
                  className="cursor-pointer hover:text-blue-600 font-medium text-sm"
                  onClick={() => openSubmenu(aboutNyItems)}
                >
                  About Ny
                </li>

                <li
                  className="cursor-pointer hover:text-blue-600 font-medium text-sm"
                  onClick={() => openSubmenu(journalItems)}
                >
                  Journal
                </li>
              </ul>
            )}

            {currentMenu === "submenu" && (
              <>
                <button
                  className="text-sm mb-5 hover:text-blue-600 flex items-center space-x-2"
                  onClick={goBack}
                  aria-label="Go Back"
                >
                  <span>&larr; Back</span>
                </button>
                <ul className="space-y-4">
                  {Array.isArray(submenuItems) &&
                    submenuItems.map((item, index) => (
                      <div key={index}>
                        <div
                          className="flex items-center justify-between cursor-pointer hover:text-blue-600 font-thin text-sm"
                          onClick={() =>
                            Array.isArray(item.items) &&
                            openSubsubmenu(item.items)
                          }
                        >
                          <li>{item.name || item}</li>
                          <FaGreaterThan className="inline-block text-[0.6rem]" />
                        </div>
                        <hr className="my-2" />
                      </div>
                    ))}
                </ul>
              </>
            )}

            {currentMenu === "subsubmenu" && (
              <>
                <button
                  className="text-sm mb-5 hover:text-blue-600 flex items-center space-x-2"
                  onClick={goBack}
                  aria-label="Go Back"
                >
                  <span>&larr; Back</span>
                </button>
                <ul className="space-y-4">
                  {Array.isArray(subsubmenuItems) &&
                    subsubmenuItems.map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between cursor-pointer hover:text-blue-600 font-thin text-sm">
                          <li className="">{item}</li>
                          <FaGreaterThan className="inline-block text-[0.6rem]" />
                        </div>
                        <hr className="my-2" />
                      </div>
                    ))}
                </ul>
              </>
            )}
          </animated.div>
        ))}
      </animated.div>
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
