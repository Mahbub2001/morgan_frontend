"use client";
import React, { useEffect, useState } from "react";
import Button3 from "@/containers/common/Button3/Button3";
import Cookies from "js-cookie";

function AdminRoles() {
  const [settings, setSettings] = useState({
    firstTop: "",
    secondTop: "",
    shippingCharge: "",
    shippingStatus: "OFF",
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
        setSettings(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    // console.log("settings", settings);
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
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    }
  };

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
              id="firstTop"
              value={settings?.firstTop}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-[10rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Discount Offer"
              required
            />
          </div>
          <div>
            <label
              htmlFor="secondTop"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Second Top
            </label>
            <textarea
              id="secondTop"
              value={settings?.secondTop}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-[10rem] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Free Shipping Offer"
              required
            />
          </div>
        </div>
        <div>
          <div className="mt-5">
            <div>
              <label
                htmlFor="shippingCharge"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Shipping Charge on/off
              </label>
              <div className="flex flex-col md:flex-row items-center gap-5">
                <input
                  type="text"
                  id="shippingCharge"
                  value={settings?.shippingCharge}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Free Shipping %"
                  required
                />
                <div className="flex flex-row md:flex-col gap-5">
                  <div className="flex items-center">
                    <input
                      id="shippingStatusOn"
                      type="radio"
                      value="ON"
                      checked={settings?.shippingStatus === "ON"}
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
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      ON
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="shippingStatusOff"
                      type="radio"
                      value="OFF"
                      checked={settings?.shippingStatus === "OFF"}
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
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      OFF
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-start mt-10" onClick={handleSave}>
          <Button3
            text="SAVE"
            textColor="white"
            backgroundColor="orange"
            borderColor="orange"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminRoles;
