"use client";
import React, { useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaTicketAlt } from "react-icons/fa";
import { GoListOrdered, GoPerson } from "react-icons/go";
import { MdCategory, MdDashboard, MdOutlineAddBox } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { LuBox } from "react-icons/lu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

const DashboardSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  // const [theme, setTheme] = useState("light");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // const toggleTheme = (newTheme) => {
  //   setTheme(newTheme);
  //   document.documentElement.classList.toggle("dark", newTheme === "dark");
  // };

  return (
    <div
    // className={`${theme === "dark" ? "dark" : ""}`}
    >
      <div className="relative">
        <aside
          className={`w-60 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-48"
          } fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B]`}
        >
          <div className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 rounded-full h-12">
            <div className="flex pl-4 items-center space-x-2">
              <div
                onClick={() => toggleTheme("dark")}
                className={`moon text-white hover:text-blue-500 dark:hover:text-[#38BDF8]`}
                // ${theme === "dark" ? "hidden" : "block"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              </div>
              <div
                onClick={() => toggleTheme("light")}
                className={`sun text-white hover:text-blue-500 dark:hover:text-[#38BDF8]`}

                //  ${ theme === "dark" ? "block" : "hidden"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500 pl-10 pr-2 py-1 rounded-full text-white">
              <div className="transform ease-in-out duration-300 mr-12">
                NERVE
              </div>
            </div>
          </div>
          <div className="pt-5">
            {isSidebarOpen && (
              <span className="absolute right-12 font-medium text-sm ml-2 text-white">
                NY Morgen
              </span>
            )}
          </div>
          <div
            onClick={toggleSidebar}
            className={`-right-6 transition transform ease-in-out duration-500 flex items-center border-4 border-white white:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full hover:rotate-45 text-white`}
          >
            <div className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className={`w-4 h-4 transition-transform ease-in-out duration-300 ${
                  isSidebarOpen ? "" : "hover:rotate-45"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </div>
          </div>

          <div
            className={`${
              isSidebarOpen ? "max" : "mini"
            } mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]`}
          >
            <SidebarItem
              icon="dashboard"
              label="Dashboard"
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon="order"
              label="Order Management"
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon="cusomers"
              label="Customers"
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon="coupon"
              label="Coupon Code"
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon="categories"
              label="Categories"
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon="transactions"
              label="Transaction"
              isOpen={isSidebarOpen}
            />
            <SidebarItem icon="brand" label="Brand" isOpen={isSidebarOpen} />
            <SidebarItem
              icon="add_products"
              label="Add Product"
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon="product_list"
              label="Product List"
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon="manage_admins"
              label="Manage Admin"
              isOpen={isSidebarOpen}
            />
            <SidebarItem
              icon="admin_roles"
              label="Admin Roles"
              isOpen={isSidebarOpen}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isOpen }) => {
  return (
    <div
      className={`hover:ml-4 ${
        isOpen ? "pl-8" : "justify-end pr-5"
      } text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex ${
        isOpen ? "flex-row items-center space-x-3" : "justify-end"
      }`}
    >
      {icon == "dashboard" && <MdDashboard />}
      {icon == "order" && <GoListOrdered />}
      {icon == "cusomers" && <GoPerson />}
      {icon == "coupon" && <FaTicketAlt />}
      {icon == "transactions" && <AiOutlineTransaction />}
      {icon == "brand" && <SiBrandfolder />}
      {icon == "categories" && <MdCategory />}
      {icon == "add_products" && <MdOutlineAddBox />}
      {icon == "product_list" && <LuBox />}
      {icon == "manage_admins" && <IoPersonCircleOutline />}
      {icon == "admin_roles" && <IoSettingsOutline />}
      {isOpen && <div>{label}</div>}
    </div>
  );
};

export default DashboardSidebar;
