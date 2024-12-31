import React, { useState } from "react";
import { useForm } from "react-hook-form";

function EditProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    toggleModal();
    reset();
  };

  return (
    <div className="">
      <p className="text-xs font-thin mb-4">Profile</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className=" rounded-lg  bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">
            Name
          </h1>
          <p className="text-xs md:text-sm font-semibold text-gray-800">
            Username: <span>JohnDoe</span>
          </p>
        </div>
        <div className=" rounded-lg  bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">
            Email Address
          </h1>
          <p className="text-xs md:text-sm font-semibold text-gray-800">
            mahbubturza@gmail.com
          </p>
        </div>
        <div className=" rounded-lg  bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">Mobile</h1>
          <p className="text-xs md:text-sm font-semibold text-gray-800">
            1661565
          </p>
        </div>
        <div className=" rounded-lg  bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">
            Birthday
          </h1>
          <p className="text-xs md:text-sm font-semibold text-gray-800">
            1661565
          </p>
        </div>
        <div className=" rounded-lg  bg-white">
          <h1 className="font-thin text-xs md:text-sm text-gray-600">Gender</h1>
          <p className="text-xs md:text-sm font-semibold text-gray-800">Male</p>
        </div>
      </div>

      <div className="flex justify-start mt-5">
        <button
          onClick={toggleModal}
          className="text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg text-sm px-4 py-2"
        >
          Edit Profile
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed px-3 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
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
                    htmlFor="name"
                    className="block mb-2 text-xs lg:text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "name is required",
                    })}
                    defaultValue="JohnDoe"
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
                    {...register("email", { required: "Email is required" })}
                    defaultValue="mahbubturza@gmail.com"
                    className="text-xs w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobile"
                    className="block mb-2 text-xs lg:text-sm font-medium text-gray-700"
                  >
                    Mobile
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    {...register("mobile")}
                    defaultValue="1661565"
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
                    defaultValue="2000-01-01"
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
                    defaultValue="Male"
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
