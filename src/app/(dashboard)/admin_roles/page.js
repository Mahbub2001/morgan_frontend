"use client";
import React, { useEffect, useState } from "react";
import Button3 from "@/containers/common/Button3/Button3";
import Cookies from "js-cookie";
import withProtectedRoute from "@/Wrapper/protectedRoute";
import AdminRoute from "@/Wrapper/AdminRoute";
import { toast } from "react-toastify";

function AdminRoles() {
  const [settings, setSettings] = useState({
    firstTop: "",
    firstTopVisible: false,
    secondTop: "",
    secondTopVisible: false,
    shippingCharge: "",
    shippingStatus: "OFF",
    conversionRateBDT: 0,
    conversionRateEuro: 0,
    conversionRateDanish: 0,
  });

  useEffect(() => {
    const token = Cookies.get("ny-token");
    const fetchSettings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/settings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setSettings({
          firstTop: data.firstTop || "",
          firstTopVisible: data.firstTopVisible || false,
          secondTop: data.secondTop || "",
          secondTopVisible: data.secondTopVisible || false,
          shippingCharge: data.shippingCharge || "",
          shippingStatus: data.shippingStatus || "OFF",
          conversionRateBDT: data.conversionRateBDT || 0,
          conversionRateEuro: data.conversionRateEuro || 0,
          conversionRateDanish: data.conversionRateDanish || 0,
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]:
        type === "checkbox"
          ? checked
          : [
              "shippingCharge",
              "conversionRateBDT",
              "conversionRateEuro",
              "conversionRateDanish",
            ].includes(id)
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSave = async () => {
    const token = Cookies.get("ny-token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings.", error);
    }
  };

  return (
    <AdminRoute>
      <div className="p-5 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-2xl mb-8 text-gray-800 dark:text-white">
          Admin Settings
        </h1>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="firstTop"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Top
                </label>
                <div className="flex items-center">
                  <label
                    htmlFor="firstTopVisible"
                    className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Visible
                  </label>
                  <input
                    id="firstTopVisible"
                    type="checkbox"
                    checked={settings.firstTopVisible}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <textarea
                id="firstTop"
                value={settings.firstTop}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Discount Offer"
                required
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="secondTop"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Second Top
                </label>
                <div className="flex items-center">
                  <label
                    htmlFor="secondTopVisible"
                    className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Visible
                  </label>
                  <input
                    id="secondTopVisible"
                    type="checkbox"
                    checked={settings.secondTopVisible}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <textarea
                id="secondTop"
                value={settings.secondTop}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 h-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Free Shipping Offer"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="w-full">
              <label
                htmlFor="shippingCharge"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Shipping Charge
              </label>
              <input
                type="text"
                id="shippingCharge"
                value={settings.shippingCharge}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter Shipping Charge"
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Shipping Status
              </label>
              <div className="flex space-x-5">
                <div className="flex items-center">
                  <input
                    id="shippingStatusOn"
                    type="radio"
                    value="ON"
                    checked={settings.shippingStatus === "ON"}
                    onChange={() =>
                      setSettings((prevSettings) => ({
                        ...prevSettings,
                        shippingStatus: "ON",
                      }))
                    }
                    name="shippingStatus"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="shippingStatusOn"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    ON
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="shippingStatusOff"
                    type="radio"
                    value="OFF"
                    checked={settings.shippingStatus === "OFF"}
                    onChange={() =>
                      setSettings((prevSettings) => ({
                        ...prevSettings,
                        shippingStatus: "OFF",
                      }))
                    }
                    name="shippingStatus"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="shippingStatusOff"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    OFF
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="w-full">
              <label
                htmlFor="usdToBdt"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                USD to BDT Conversion Rate
              </label>
              <input
                type="number"
                id="conversionRateBDT"
                value={settings.conversionRateBDT}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter rate"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="usdToEur"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                USD to EUR Conversion Rate
              </label>
              <input
                type="number"
                id="conversionRateEuro"
                value={settings.conversionRateEuro}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter rate"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="usdToEur"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                USD to Danish Krone Conversion Rate
              </label>
              <input
                type="number"
                id="conversionRateDanish"
                value={settings.conversionRateDanish}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter rate"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <div onClick={handleSave}>
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
    </AdminRoute>
  );
}

export default withProtectedRoute(AdminRoles);
