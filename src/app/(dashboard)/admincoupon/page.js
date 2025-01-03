"use client";
import AdminRoute from "@/Wrapper/AdminRoute";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Add_Coupon() {
  const [couponCode, setCouponCode] = useState("");
  const [percentageDiscount, setPercentageDiscount] = useState("");
  const [amountDiscount, setAmountDiscount] = useState("");
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/coupons`
      );
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const addCoupon = async () => {
    if (!couponCode) return alert("Enter a valid coupon code!");
    if (!percentageDiscount && !amountDiscount)
      return alert("Enter a discount value (percentage or amount)!");
    if (percentageDiscount && amountDiscount)
      return alert("Provide only one type of discount!");

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/coupons`, {
        code: couponCode,
        percentageDiscount: percentageDiscount ? Number(percentageDiscount) : 0,
        amountDiscount: amountDiscount ? Number(amountDiscount) : 0,
      });
      setCouponCode("");
      setPercentageDiscount("");
      setAmountDiscount("");
      fetchCoupons();
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  const removeCoupon = async (code) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/coupons/${code}`);
      fetchCoupons();
    } catch (error) {
      console.error("Error removing coupon:", error);
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto p-4">
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Manage Coupons</h1>

          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="border border-gray-300 rounded-lg p-2 flex-1"
            />
            <input
              type="number"
              value={percentageDiscount}
              onChange={(e) => setPercentageDiscount(e.target.value)}
              placeholder="Enter percentage discount"
              className="border border-gray-300 rounded-lg p-2 flex-1"
            />
            <input
              type="number"
              value={amountDiscount}
              onChange={(e) => setAmountDiscount(e.target.value)}
              placeholder="Enter discount amount"
              className="border border-gray-300 rounded-lg p-2 flex-1"
            />
            <button
              onClick={addCoupon}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Coupon
            </button>
          </div>

          <ul className="space-y-2">
            {coupons.map((coupon) => (
              <li
                key={coupon.code}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  <span className="font-semibold">{coupon.code}</span>
                  <span>
                    {coupon.percentageDiscount > 0
                      ? `Percentage: ${coupon.percentageDiscount}%`
                      : `Amount: $${coupon.amountDiscount}`}
                  </span>
                </div>
                <button
                  onClick={() => removeCoupon(coupon.code)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminRoute>
  );
}

export default Add_Coupon;
