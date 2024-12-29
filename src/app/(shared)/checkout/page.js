"use client";
import Button3 from "@/containers/common/Button3/Button3";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function CheckOut() {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      email: "",
      "news-offers": false,
      country: "Bangladesh",
      "first-name": "",
      "last-name": "",
      address: "",
      phone_number: "",
      city: "",
      postcode: "",
      paymentMethod: "CASH ON DELIVERY",
      "card-number": "",
      "expiry-date": "",
      cvv: "",
    },
  });
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("CASH ON DELIVERY");
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");

  const validCoupons = {
    SAVE10: 10, // 10%
    SAVE20: 20, // 20%
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);

    const total = items.reduce(
      (sum, item) => sum + item.discountPrice * item.quantity,
      0
    );
    setTotalPrice(total);
    setVat(total * 0.1);
  }, []);

  const applyCoupon = () => {
    if (validCoupons[coupon]) {
      const discountPercentage = validCoupons[coupon];
      const discountValue = (totalPrice * discountPercentage) / 100;
      setDiscount(discountValue);
      setMessage(`Coupon applied! You saved ${discountPercentage}%.`);
    } else {
      setMessage("Invalid coupon code. Please try again.");
      setDiscount(0);
    }
  };

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    console.log(data);
  };

  const toggleMethod = (method) => {
    setSelectedMethod(method);
    setValue("paymentMethod", method);
  };

  return (
    <div className="container mx-auto font-futara-sans">
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-8 px-6 sm:py-14 lg:col-span-6 lg:py-24">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                      {...register("email")}
                      placeholder="john.capler@fang.com"
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
                    <h2 className="text-xl font-extralight text-gray-800">
                      Delivery
                    </h2>
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
                          htmlFor="first-name"
                          className="text-sm font-extralight text-gray-600"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          id="first-name"
                          {...register("first-name")}
                          placeholder="First name"
                          className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="last-name"
                          className="text-sm font-extralight text-gray-600"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          id="last-name"
                          {...register("last-name")}
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
                      {[
                        "paypal",
                        "debit-card",
                        "credit-card",
                        "CASH ON DELIVERY",
                      ].map((method) => (
                        <div
                          key={method}
                          className="border border-gray-300 rounded-md mt-4 overflow-hidden shadow-md transition-all duration-200"
                        >
                          <button
                            type="button"
                            onClick={() => toggleMethod(method)}
                            className="w-full flex justify-between items-center px-4 py-3 focus:outline-none text-left transition-all hover:bg-[#fab67b] hover:text-white"
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
                              {method === "paypal" && (
                                <p className="text-sm text-gray-700">
                                  Proceed with PayPal payment.
                                </p>
                              )}
                              {(method === "debit-card" ||
                                method === "credit-card") && (
                                <div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="card-number"
                                      className="block text-sm font-medium text-gray-600"
                                    >
                                      Card Number
                                    </label>
                                    <input
                                      type="text"
                                      id="card-number"
                                      {...register("card-number")}
                                      placeholder="XXXX XXXX XXXX XXXX"
                                      className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                                    />
                                  </div>
                                  <div className="mb-3 grid grid-cols-2 gap-4">
                                    <div>
                                      <label
                                        htmlFor="expiry-date"
                                        className="block text-sm font-medium text-gray-600"
                                      >
                                        Expiry Date
                                      </label>
                                      <input
                                        type="text"
                                        id="expiry-date"
                                        {...register("expiry-date")}
                                        placeholder="MM/YY"
                                        className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor="cvv"
                                        className="block text-sm font-medium text-gray-600"
                                      >
                                        CVV
                                      </label>
                                      <input
                                        type="text"
                                        id="cvv"
                                        {...register("cvv")}
                                        placeholder="XXX"
                                        className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                                      />
                                    </div>
                                  </div>
                                </div>
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
          </div>

          <div className="col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24 sticky top-24 h-[calc(100vh-5rem)] overflow-auto">
            <h2 className="sr-only pt-24 text-">Order summary</h2>
            <div>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-[#be834f] to-[#be834f] opacity-95"></div>
            </div>
            <div className="relative">
              <ul className="space-y-5">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <div className="inline-flex">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-16"
                      />
                      <div className="ml-3">
                        <p className="text-base font-extralight text-white">
                          {item.name}
                        </p>
                        <p className="text-sm font-medium text-white text-opacity-80">
                          {item.color}
                        </p>
                        <p className="text-sm font-medium text-white text-opacity-80">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-extralight text-white">
                      ${item.discountPrice * item.quantity}.00
                    </p>
                  </li>
                ))}
              </ul>
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>

              {/* Coupon Input */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="block rounded-md border border-gray-300 py-3 px-4 text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border-2 focus:border-[#be834f]"
                  />
                  <button
                    onClick={applyCoupon}
                    className="py-3 px-4 text-sm text-white bg-[#be834f] rounded hover:bg-[#aa7648]"
                  >
                    Apply
                  </button>
                </div>
                {message && (
                  <p className="text-sm text-yellow-300">{message}</p>
                )}
              </div>

              <div className="space-y-2 mt-5">
                <p className="flex justify-between text-lg font-light text-white">
                  <span>Total price:</span>
                  <span>${(totalPrice - discount).toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-sm font-medium text-white">
                  <span>Vat: 10%</span>
                  <span>${vat.toFixed(2)}</span>
                </p>
                {discount > 0 && (
                  <p className="flex justify-between text-sm font-medium text-green-400">
                    <span>Discount Applied:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-light">Support</h3>
              <p className="text-sm font-extralight">
                +01 653 235 211{" "}
                <span className="font-light">(International)</span>
              </p>
              <p className="mt-1 text-sm font-extralight">
                support@nanohair.com <span className="font-light">(Email)</span>
              </p>
              <p className="mt-2 text-xs font-medium">
                Call us now for payment related issues
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
