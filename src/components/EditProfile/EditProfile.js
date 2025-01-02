import Button3 from "@/containers/common/Button3/Button3";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function EditProfile({ info, fetchProfile, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  // console.log(info);

  const onSubmit = (data) => {
    const token = Cookies.get("ny-token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/${info?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert("Profile updated successfully");
        fetchProfile();
      } else {
        alert("Failed to update profile");
      }
    });

    toggleModal();
    reset();
  };

  return (
    <div className="">
      <p className="text-sm md:text-xl font-thin mb-4">Profile</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className=" bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">Name</h1>
          <p className="text-xs md:text-sm  text-gray-800">
            First Name: <span>{info?.firstName}</span>
          </p>
          <p className="text-xs md:text-sm  text-gray-800">
            Last Name: <span>{info?.lastName}</span>
          </p>
        </div>
        <div className=" bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">
            Email Address
          </h1>
          <p className="text-xs md:text-sm  text-gray-800">{info?.email}</p>
        </div>
        <div className=" bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">Mobile</h1>
          <p className="text-xs md:text-sm  text-gray-800">
            {info?.phone_number ?? "Not Provided"}
          </p>
        </div>
        <div className=" bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">
            Birthday
          </h1>
          <p className="text-xs md:text-sm font-semibold text-gray-800">
            {info?.birthday ?? "Not Provided"}
          </p>
        </div>
        <div className=" bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">Gender</h1>
          <p className="text-xs md:text-sm font-semibold text-gray-800">
            {info?.gender ?? "Not Provided"}
          </p>
        </div>
      </div>

      <div className="mt-5 w-full md:w-1/4 lg:w-1/6">
        <div onClick={toggleModal} className="w-full">
          <Button3
            text="EDIT PROFILE"
            borderColor="orange"
            textColor="white"
            backgroundColor="orange"
          />
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed px-3 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-sm md:max-w-md bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-900"
                onClick={toggleModal}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4">
              <div className="grid gap-4 mx-3">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-xs lg:text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                      required: "name is required",
                    })}
                    defaultValue={`${info?.firstName}`}
                    className="text-xs w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-xs lg:text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                      required: "last name is required",
                    })}
                    defaultValue={`${info?.lastName}`}
                    className="text-xs w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xs lg:text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled
                    {...register("email", { required: "Email is required" })}
                    defaultValue={`${info?.email}`}
                    className="text-xs w-full p-2 border rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-xs lg:text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    {...register("phone_number")}
                    defaultValue={`${info?.phone_number ?? ""}`}
                    className="text-xs w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="birthday"
                    className="block mb-2 text-xs lg:text-sm font-medium text-gray-700"
                  >
                    Birthday
                  </label>
                  <input
                    type="date"
                    id="birthday"
                    {...register("birthday")}
                    defaultValue={`${info?.birthday ?? ""}`}
                    className="text-xs w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-xs lg:text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register("gender")}
                    defaultValue={`${info?.gender ?? ""}`}
                    className="text-xs w-full p-2 border rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg px-4 py-2 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProfile;
