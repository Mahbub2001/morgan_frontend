import { getUserProfile } from "@/api/user";
import Button3 from "@/containers/common/Button3/Button3";
import React, { useEffect, useState } from "react";

function CheckOutForm({
  register,
  handleSubmit,
  selectedMethod,
  toggleMethod,
  user,
  setValue,
}) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    getUserProfile(user.email).then((data) => {
      setInfo(data);
      setValue("email", data?.email);
      setValue("userid", data?._id);
      setValue("firstName", data?.firstName);
      setValue("lastName", data?.lastName);
      const defaultAddress = data?.address?.find(
        (element) => element.default === true
      );
      if (defaultAddress) {
        setValue("address", defaultAddress.address);
        setValue("city", defaultAddress.city);
        setValue("postcode", defaultAddress.postcode);
      }
      setValue("phone_number", data?.phone_number);
    });
  }, [user]);

  if (!info) return <p>Loading...</p>;

  console.log(info);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="relative text-3xl font-light text-gray-800 sm:text-4xl">
          Confirm Your Order
          <span className="mt-2 block h-1 w-12 bg-[#be834f] sm:w-24"></span>
        </h1>
        <div className="mt-10 flex flex-col space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-extralight text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={info?.email}
              required
              {...register("email")}
              //   placeholder="john.capler@fang.com"
              className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
            />
          </div>

          <div>
            <input
              type="checkbox"
              {...register("news-offers")}
              id="news-offers"
              className="mr-2 accent-teal-500"
            />
            <label
              htmlFor="news-offers"
              className="text-sm font-medium text-gray-600"
            >
              Email me with news and offers
            </label>
          </div>

          {/* Delivery Section */}
          <div>
            <h2 className="text-xl font-extralight text-gray-800">Delivery</h2>
            <div className="mt-4">
              <label
                htmlFor="country"
                className="text-sm font-extralight text-gray-600"
              >
                Country/Region
              </label>
              <select
                id="country"
                {...register("country")}
                className="mt-2 text-sm block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-600 placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
              >
                <option value="Bangladesh">Bangladesh</option>
                <option value="Denmark">Denmark</option>
                <option value="USA">United States Of America</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="text-sm font-extralight text-gray-600"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  placeholder="First name"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="text-sm font-extralight text-gray-600"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Last name"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-4">
              <label
                htmlFor="address"
                className="text-sm font-extralight text-gray-600"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                required
                {...register("address")}
                placeholder="Address"
                className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="phone_number"
                className="text-sm font-extralight text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                required
                {...register("phone_number")}
                placeholder="Phone"
                className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="city"
                  className="text-sm font-extralight text-gray-600"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  {...register("city")}
                  placeholder="City"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                />
              </div>
              <div>
                <label
                  htmlFor="postcode"
                  className="text-sm font-extralight text-gray-600"
                >
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  required
                  {...register("postcode")}
                  placeholder="Postcode"
                  className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h2 className="text-xl font-extralight text-gray-800">
              Payment Method
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose a payment method and provide the required details.
            </p>
            <div>
              {["PAY NOW", "CASH ON DELIVERY"].map((method) => (
                <div
                  key={method}
                  className={`border border-gray-300 rounded-md mt-4 overflow-hidden shadow-md transition-all duration-200 ${
                    method === "PAY NOW" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => method !== "PAY NOW" && toggleMethod(method)}
                    className="w-full flex justify-between items-center px-4 py-3 focus:outline-none text-left transition-all hover:bg-[#fab67b] hover:text-white"
                    disabled={method === "PAY NOW"}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 ${
                          selectedMethod === method
                            ? "bg-[#fab67b]"
                            : "border-gray-300"
                        }`}
                      ></div>
                      <span className="text-base font-medium text-gray-700 capitalize">
                        {method.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xl">
                      {selectedMethod === method ? "-" : "+"}
                    </span>
                  </button>

                  {selectedMethod === method && (
                    <div className="px-4 py-3">
                      {method === "PAY NOW" && (
                        <p className="text-sm text-gray-700">
                          Currently not available.
                        </p>
                      )}
                      {method === "CASH ON DELIVERY" && (
                        <p className="text-sm text-gray-700">
                          Pay in cash upon delivery of your order.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <p className="mt-10 text-center text-sm font-medium text-gray-500">
          By placing this order you agree to the
          <a
            href="#"
            className="text-teal-500 underline ml-1 hover:text-teal-700"
          >
            Terms and Conditions
          </a>
          .
        </p>
        <div className="mt-6 text-center">
          <button type="submit" className="w-full">
            <Button3
              text="CONFIRM ORDER"
              backgroundColor="#be834f"
              borderColor="#be834f"
              textColor="white"
            />
          </button>
        </div>
      </div>
    </form>
  );
}

export default CheckOutForm;
