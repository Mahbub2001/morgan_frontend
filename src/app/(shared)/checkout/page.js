"use client";
import CheckOutForm from "@/components/CheckOutForm/CheckOutForm";
import Button3 from "@/containers/common/Button3/Button3";
import { AuthContext } from "@/hooks/AuthProvider";
import withProtectedRoute from "@/Wrapper/protectedRoute";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
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
      userid: "",
    },
  });
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("CASH ON DELIVERY");
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [validCoupons, setValidCoupons] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  let token = Cookies.get("ny-token");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupons`)
      .then((res) => res.json())
      .then((data) => setValidCoupons(data));
  }, []);

  // console.log(validCoupons);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(items);

      const total = items.reduce(
        (sum, item) => sum + item.discountPrice * item.quantity,
        0
      );
      setTotalPrice(total);
      setVat(total * 0.1);
    }
  }, []);
  console.log(token);

  const applyCoupon = () => {
    let percentageDiscount = 0,
      amountDiscount = 0;
    validCoupons.forEach((coup) => {
      // console.log(coupon);
      // console.log(coup.code);
      if (coup.code === coupon) {
        if (coup.percentageDiscount) {
          percentageDiscount = coup.percentageDiscount;
        } else if (coup.amountDiscount) {
          amountDiscount = coup.amountDiscount;
        }
      }
    });
    if (percentageDiscount || amountDiscount) {
      if (percentageDiscount) {
        const discountValue = (totalPrice * percentageDiscount) / 100;
        setDiscount(discountValue);
        setMessage(`Coupon applied! You saved ${percentageDiscount}%.`);
      } else if (amountDiscount) {
        const discountValue = amountDiscount;
        setDiscount(discountValue);
        setMessage(`Coupon applied! You saved $${discountValue}.`);
      }
    } else {
      setMessage("Invalid coupon code. Please try again.");
      setDiscount(0);
    }
  };

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    // return;
    if (selectedMethod === "CASH ON DELIVERY") {
      data.payment = "pending";
      data.status = "pending";
      if (coupon !== "") {
        data.coupon = coupon;
      }
      data.products = cartItems;
      console.log(data);
      // return;
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          if (res.success) {
            alert("Order placed successfully!");
            localStorage.removeItem("cartItems");
            // window.location.replace("/order-confirmation");
          }
          // console.log(res);
        });
    }
  };

  const toggleMethod = (method) => {
    setSelectedMethod(method);
    setValue("paymentMethod", method);
  };

  const handlePayment = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/create-payment`, {
        amount: totalPrice,
        currency: "USD",
        // payment_method: paymentMethod,
      })
      .then((response) => {
        console.log(response);

        const redirectUrl = response.data.paymentUrl;

        if (redirectUrl) {
          window.location.replace(redirectUrl);
        }
      });
  };

  return (
    <div className="container mx-auto font-futara-sans">
      <div className="relative mx-auto w-full bg-white">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-8 px-6 sm:py-14 lg:col-span-6 lg:py-24">
            <CheckOutForm
              register={register}
              handleSubmit={handleSubmit(onSubmit)}
              selectedMethod={selectedMethod}
              toggleMethod={toggleMethod}
              user={user}
              setValue={setValue}
            />
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

export default withProtectedRoute(CheckOut);
