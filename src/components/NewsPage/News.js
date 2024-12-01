import React from "react";
import { HoverZoomImage } from "../ZoomImage/HoverZoomImage";

function News() {
  return (
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
              <p className="text-gray-700 line-through">DKK 2,850</p>
              <p className="text-red-700">DKK 2,250</p>
            </div>
            <p className="text-gray-500">Small Crossbody Bag-Mocha</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default News;
