// components/PriceFilter.js
"use client";
import React, { useEffect, useState } from "react";
import { Range } from "react-range";

const PriceFilter = ({
  min = 0,
  max = 500,
  step = 1,
  onChange,
  resetFilter,
}) => {
  const [values, setValues] = useState([min, max]);

  useEffect(() => {
    if (resetFilter) {
      setValues([min, max]);
    }
  }, [resetFilter, min, max]);

  const handleRangeChange = (newValues) => {
    setValues(newValues);
    if (onChange) onChange(newValues);
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
            £
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
            £
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
