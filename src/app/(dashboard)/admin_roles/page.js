import Button3 from "@/containers/common/Button3/Button3";
import React from "react";

function AdminRoles() {
  return (
    <div>
      <h1 className="text-center font-thin text-xl">Some Settings</h1>
      <div className="mt-10">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div>
            <label
              htmlFor="firstTop"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Top
            </label>
            <textarea
              type="text"
              id="firstTop"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-[10rem]  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Discount Offer"
              required
            />
          </div>
          <div>
            <label
              htmlFor="firstTop"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Second Top
            </label>
            <textarea
              type="text"
              id="firstTop"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-[10rem]  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Free Shipping Offer"
              required
            />
          </div>
          <div>
            <Button3
              text="SAVE"
              textColor="white"
              backgroundColor="orange"
              borderColor="orange"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRoles;
