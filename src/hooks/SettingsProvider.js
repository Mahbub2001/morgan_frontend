"use client";

import React, { useState, useEffect, createContext, useMemo } from "react";
export const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState("");
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const [countryRes, settingsRes] = await Promise.all([
          fetch("http://ip-api.com/json/"),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/settings`),
        ]);
        const countryData = await countryRes.json();
        const settingsData = await settingsRes.json();
        setCountry(countryData.country);
        setSettings(settingsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const settingsInfo = useMemo(
    () => ({
      country,
      // best,
      settings,
      // promote1,
      // promote2,
    }),
    [country]
  );

  return (
    <SettingsContext.Provider value={settingsInfo}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full animate-spin border-4 border-solid border-cyan-500 border-t-transparent shadow-lg"></div>
            <p className="mt-4 text-lg font-semibold text-cyan-700">
              Loading, please wait...
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
