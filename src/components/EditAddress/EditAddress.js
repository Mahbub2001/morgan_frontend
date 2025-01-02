import Button3 from "@/containers/common/Button3/Button3";
import { AuthContext } from "@/hooks/AuthProvider";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

function EditAddress({ info, fetchProfile }) {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const token = Cookies.get("ny-token");

  // Handle form submission
  const onSubmit = async (data) => {
    // console.log(data);

    if (info?.address?.length >= 3) {
      alert("You can only have 3 addresses. Please delete one to add another.");
      return;
    }

    try {
      if (data.default) {
        info.address.forEach((address) => (address.default = false));
      }
      if (info?.address?.length === 0) {
        data.default = true;
      }
      // console.log(data);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/${info?._id}/address`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        alert("Address added successfully");
        fetchProfile();
        reset();
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  // Set an address as the default
  const handleSetDefault = async (addressId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/${info?._id}/address/default`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ addressId }),
        }
      );

      if (response.ok) {
        alert("Default address set successfully");
        fetchProfile();
      } else {
        console.error("Failed to set default address");
      }
    } catch (error) {
      console.error("Error updating default address:", error);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/${info?._id}/address/${addressId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Address deleted successfully");
        fetchProfile();
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-sm md:text-2xl font-thin mt-10 mb-6">
        Address Management
      </h1>
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Address
              </th>
              <th scope="col" className="px-4 py-3">
                Postcode
              </th>
              <th scope="col" className="px-4 py-3">
                Default Address
              </th>
              <th scope="col" className="px-4 py-3">
                Phone
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {info?.address?.map((address, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                  {address.fullName}
                </td>
                <td className="px-4 py-4">{address?.address}</td>
                <td className="px-4 py-4">{address?.postcode}</td>
                <td className="px-4 py-4">
                  {address.default ? (
                    "Yes"
                  ) : (
                    <button
                      onClick={() => handleSetDefault(address._id)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Set as Default
                    </button>
                  )}
                </td>
                <td className="px-4 py-4">{address?.phoneNumber}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => handleDelete(address._id)}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Address Form */}
      <div className="mt-8">
        <h2 className="text-xs md:text-xl font-thin mb-4">Add New Address</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <input
            {...register("fullName", { required: true })}
            placeholder="Full Name"
            className=" border border-gray-300 p-3 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className=" border border-gray-300 p-3 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            {...register("postcode", { required: true })}
            placeholder="Postcode"
            className=" border border-gray-300 p-3 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            {...register("phoneNumber", { required: true })}
            placeholder="Phone Number"
            className=" border border-gray-300 p-3 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div className="text-xs md:text-sm flex items-center space-x-4 col-span-1 md:col-span-2 lg:col-span-3">
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
          <div className="mt-5 w-full md:w-1/4 lg:w-5/12">
            <button onClick={handleSubmit(onSubmit)} className="w-full">
              <Button3
                text="ADD ADDRESS"
                borderColor="orange"
                textColor="white"
                backgroundColor="orange"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAddress;
