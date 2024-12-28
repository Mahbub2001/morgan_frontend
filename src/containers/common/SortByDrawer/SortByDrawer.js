import React, { useState } from "react";

function SortByDrawer({setSortingParams}) {

  const handleSortOption = (sortOption) => {
    setSortingParams(sortOption);
  };

  return (
    <div
      className="absolute right-0 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
      role="menu"
    >
      <div className="!text-xs">
        <div className="py-1">
          <li
            className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2"
            role="menuitem"
            onClick={() => handleSortOption("featured")}
          >
            Featured
          </li>
          <li
            className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2"
            role="menuitem"
            onClick={() => handleSortOption("bestSelling")}
          >
            Best selling
          </li>
          <li
            className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2"
            role="menuitem"
            onClick={() => handleSortOption("alphabeticallyAZ")}
          >
            Alphabetically, A-Z
          </li>
          <li
            className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2"
            role="menuitem"
            onClick={() => handleSortOption("alphabeticallyZA")}
          >
            Alphabetically, Z-A
          </li>
          <li
            className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2"
            role="menuitem"
            onClick={() => handleSortOption("priceLowToHigh")}
          >
            Price, low to high
          </li>
          <li
            className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2"
            role="menuitem"
            onClick={() => handleSortOption("priceHighToLow")}
          >
            Price, high to low
          </li>
          <li
            className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2"
            role="menuitem"
            onClick={() => handleSortOption("dateOldToNew")}
          >
            Date, old to new
          </li>
          <li
            className="cursor-pointer text-gray-700 hover:text-black block px-4 py-2"
            role="menuitem"
            onClick={() => handleSortOption("dateNewToOld")}
          >
            Date, new to old
          </li>
        </div>
      </div>
    </div>
  );
}

export default SortByDrawer;
