// components/PriceFilter.js
"use client";
import { SettingsContext } from "@/hooks/SettingsProvider";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Range } from "react-range";

const PriceFilter = ({ min = 0, step = 1, onChange, resetFilter }) => {
  const { country, settings } = useContext(SettingsContext);

const max = useMemo(() => {
  const baseAmount = 1000;
  
  if (country === "Bangladesh") {
    return baseAmount * (settings?.conversionRateBDT || 1);
  } else if (country === "Denmark") {
    return baseAmount * (settings?.conversionRateDanish || 1);
  } else if (euroCountries.includes(country)) {
    return baseAmount * (settings?.conversionRateEuro || 1);
  } else {
    return baseAmount; 
  }
}, [country, settings?.conversionRateBDT, settings?.conversionRateDanish, settings?.conversionRateEuro]);

  const [values, setValues] = useState([min, max]);

  useEffect(() => {
    if (resetFilter) {
      setValues([min, max]);
    }
  }, [resetFilter, min, max]);

  // const handleRangeChange = (newValues) => {
  //   setValues(newValues);
  //   if (onChange) onChange(newValues);
  // };
  const handleRangeChange = (newValues) => {
    let updatedValues = newValues;

    if (country === "Bangladesh") {
      updatedValues = [
        newValues[0] / settings?.conversionRateBDT,
        newValues[1] / settings?.conversionRateBDT,
      ];
    } else if (country === "Denmark") {
      updatedValues = [
        newValues[0] / settings?.conversionRateEuro,
        newValues[1] / settings?.conversionRateEuro,
      ];
    }

    setValues(newValues);
    if (onChange) onChange(updatedValues);
  };

  return (
    <div className="px-1 mx-auto mt-5 text-xs">
      <Range
        step={step}
        min={min}
        max={max}
        values={values}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => {
          const { key, ...trackProps } = props;
          return (
            <div
              key={key}
              {...trackProps}
              className="w-full h-[2px] bg-gray-300 rounded-full"
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...thumbProps } = props;
          return (
            <div
              key={key}
              {...thumbProps}
              className="h-2 w-2 bg-black rounded-full focus:outline-none"
            />
          );
        }}
      />
      <div className="flex justify-between items-center mt-2">
        <div className="relative w-28">
          <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 text-xs">
            {country === "Bangladesh" ? "৳" : country === "Denmark" ? "€" : "$"}
          </span>
          <input
            type="number"
            className="w-full text-xs border border-gray-300 rounded-sm p-1.5 pl-6 text-right"
            value={values[0]}
            onChange={(e) => handleRangeChange([+e.target.value, values[1]])}
            min={min}
            max={values[1] - step}
          />
        </div>
        <span className="mx-2 font-medium">to</span>
        <div className="relative w-28">
          <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 text-xs">
            {country === "Bangladesh" ? "৳" : country === "Denmark" ? "€" : "$"}
          </span>
          <input
            type="number"
            className="w-full text-xs border border-gray-300 rounded-sm p-1.5 pl-6 text-right"
            value={values[1]}
            onChange={(e) => handleRangeChange([values[0], +e.target.value])}
            min={values[0] + step}
            max={max}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
