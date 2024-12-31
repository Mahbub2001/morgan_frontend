import Button3 from "@/containers/common/Button3/Button3";
import React from "react";
import { useForm } from "react-hook-form";

function EditAddress() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("New Address Submitted:", data);
    reset();
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-thin mb-4">Address Management</h1>
      {/* Address List */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Postcode
              </th>
              <th scope="col" className="px-6 py-3">
                Default Address
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add New Address Form */}
      <div className="mt-6">
        <h2 className="text-sm font-medium mb-4">Add New Address</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <input
            {...register("fullName", { required: true })}
            placeholder="Full Name"
            className="border border-gray-300 p-2 rounded-lg text-sm"
          />
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="border border-gray-300 p-2 rounded-lg text-sm"
          />
          <input
            {...register("postcode", { required: true })}
            placeholder="Postcode"
            className="border border-gray-300 p-2 rounded-lg text-sm"
          />
          <input
            {...register("phoneNumber", { required: true })}
            placeholder="Phone Number"
            className="border border-gray-300 p-2 rounded-lg text-sm"
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                {...register("label")}
                type="radio"
                value="HOME"
                className="accent-red-500"
              />
              <span>Home</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                {...register("label")}
                type="radio"
                value="OFFICE"
                className="accent-blue-500"
              />
              <span>Office</span>
            </label>
          </div>
          <button
            type="submit"
            className="text-white py-2 rounded-lg col-span-1 sm:col-span-2 flex justify-start"
          >
            <Button3
              text="ADD ADDRESS"
              borderColor="orange"
              textColor="white"
              backgroundColor="orange"
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAddress;
