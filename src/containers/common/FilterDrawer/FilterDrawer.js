import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import PriceFilter from "@/components/PriceFilter/PriceFilter";
import { categories } from "@/Data/Menu";

function FilterDrawer({ setFilterParams, filterParams, resetFilter }) {
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderClick = (gender) => {
    setSelectedGender(gender === selectedGender ? null : gender);
  };

  const toggleSection = (section) => {
    // console.log("section", section);

    setExpandedSections((prev) => {
      const newState = { ...prev };
      if (
        section === "Accessories" ||
        section === "Bags" ||
        section === "Small Leather Goods"
      ) {
        newState["Accessories"] = false;
        newState["Bags"] = false;
        newState["Small Leather Goods"] = false;
      }

      newState[section] = !prev[section];

      return newState;
    });
  };

  const handleAvailabilityChange = (value) => {
    setFilterParams((prev) => ({
      ...prev,
      availability: prev.availability.includes(value)
        ? prev.availability.filter((item) => item !== value)
        : [...prev.availability, value],
    }));
  };

  const handleColorChange = (color) => {
    setFilterParams((prev) => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter((item) => item !== color)
        : [...prev.color, color],
    }));
  };

  const handlePriceChange = (range) => {
    setFilterParams((prev) => ({
      ...prev,
      price: range,
    }));
  };

  const handleSizeChange = (size) => {
    setFilterParams((prev) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((item) => item !== size)
        : [...prev.size, size],
    }));
  };

  const handleSubCategoryChange = (gender, category, subCategory) => {
    setFilterParams((prev) => ({
      ...prev,
      typeOfProducts: {
        ...prev.typeOfProducts,
        [gender]: {
          ...(prev.typeOfProducts[gender] || {}),
          [category]: {
            ...(prev.typeOfProducts[gender]?.[category] || {}),
            [subCategory]:
              !prev.typeOfProducts[gender]?.[category]?.[subCategory],
          },
        },
      },
    }));
  };

  useEffect(() => {
    if (resetFilter) {
      setExpandedSections({});
      setSelectedGender(null);
      setFilterParams({
        availability: [],
        color: [],
        price: null,
        size: [],
        typeOfProducts: {},
      });
    }
  }, [resetFilter, setFilterParams]);

  return (
    <div className="pt-1 text-xs mt-8">
      <div className="mb-2">
        <h3
          className="font-extralight flex items-center justify-between tracking-widest mb-2 cursor-pointer"
          onClick={() => toggleSection("availability")}
        >
          <span>AVAILABILITY</span>
          <FaAngleDown
            className={`transition-all duration-700 ease-in-out ${
              expandedSections.availability ? "rotate-180" : ""
            }`}
          />
        </h3>
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            expandedSections.availability ? "max-h-40" : "max-h-0"
          }`}
        >
          {["In Stock", "Pre Order"].map((item, index) => (
            <label key={index} className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                className="rounded text-black"
                onChange={() => handleAvailabilityChange(item)}
                checked={filterParams?.availability?.includes(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
      <hr className="w-full " />

      <div className="mb-2 mt-3">
        <h3
          className="flex tracking-widest justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection("color")}
        >
          <span>COLOR</span>
          <FaAngleDown
            className={`transition-all duration-700 ease-in-out ${
              expandedSections.color ? "rotate-180" : ""
            }`}
          />
        </h3>
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            expandedSections.color ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="flex flex-wrap gap-1 mt-2">
            {[
              "black",
              "gray",
              "red",
              "brown",
              "green",
              "orange",
              "purple",
              "Dark Chocolate",
            ].map((color, index) => (
              <div
                key={index}
                className={`${
                  filterParams?.color?.includes(color)
                    ? "border-2 border-blue-500"
                    : ""
                } px-2 py-1 cursor-pointer  text-gray-900 rounded transform transition-transform duration-300 ease-in-out`}
                onClick={() => handleColorChange(color)}
              >
                <span className="">{color}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="mt-3" />

      <div className="mb-2 mt-3">
        <h3
          className="flex justify-between items-center tracking-widest mb-2 cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <span>PRICE</span>
          <FaAngleDown
            className={`transition-all duration-700 ease-in-out ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </h3>
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            expandedSections.price ? "max-h-40" : "max-h-0"
          }`}
        >
          <PriceFilter min={0} max={420} onChange={handlePriceChange} resetFilter={resetFilter} />
        </div>
      </div>
      <hr className="mt-3" />

      <div className="mb-2 mt-3">
        <h3
          className="flex justify-between items-center tracking-widest mb-2 cursor-pointer"
          onClick={() => toggleSection("size")}
        >
          <span>SIZE</span>
          <FaAngleDown
            className={`transition-all duration-700 ease-in-out ${
              expandedSections.size ? "rotate-180" : ""
            }`}
          />
        </h3>
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            expandedSections.size ? "max-h-40" : "max-h-0"
          }`}
        >
          {["L-XL (9)", "S-M (9)"].map((size, index) => (
            <label key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                className="rounded text-black"
                onChange={() => handleSizeChange(size)}
                checked={filterParams?.size?.includes(size)}
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="mt-3" />

      <div className="mb-2 mt-3">
        <h3
          className="flex justify-between items-center tracking-widest mb-2 cursor-pointer"
          onClick={() => toggleSection("typeOfProducts")}
        >
          <span>TYPE OF PRODUCTS</span>
          <FaAngleDown
            className={`transition-all duration-700 ease-in-out ${
              expandedSections.typeOfProducts ? "rotate-180" : ""
            }`}
          />
        </h3>
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out pt-2 ${
            expandedSections.typeOfProducts ? "max-h-96" : "max-h-0"
          }`}
        >
          {categories.map((gender) => (
            <div key={gender.name} className="mb-4">
              <h3
                className="flex justify-between items-center tracking-widest cursor-pointer"
                onClick={() => handleGenderClick(gender.name)}
              >
                <span>{gender.name.toUpperCase()}</span>
                <FaAngleDown
                  className={`transition-all duration-700 ease-in-out ${
                    selectedGender === gender.name ? "rotate-180" : ""
                  }`}
                />
              </h3>

              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  selectedGender === gender.name ? "max-h-96" : "max-h-0"
                }`}
              >
                {selectedGender === gender.name && (
                  <div className="ml-4 pt-2">
                    {gender.items.map((category) => (
                      <div key={category.category} className="mb-4">
                        <h4
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleSection(category.category)}
                        >
                          <span>{category.category}</span>
                          <FaAngleDown
                            className={`transition-all duration-700 ease-in-out ${
                              expandedSections[category.category]
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </h4>
                        <div
                          className={`overflow-hidden transition-all duration-700 ease-in-out ${
                            expandedSections[category.category]
                              ? "max-h-96"
                              : "max-h-0"
                          }`}
                        >
                          <div className="ml-4 mt-2">
                            {category.items.map((subCategory, index) => (
                              <label
                                key={index}
                                className="flex items-center space-x-2 mt-2"
                              >
                                <input
                                  type="checkbox"
                                  className="rounded text-black"
                                  checked={
                                    !!filterParams?.typeOfProducts?.[
                                      gender.name
                                    ]?.[category.category]?.[subCategory.name]
                                  }
                                  onChange={() =>
                                    handleSubCategoryChange(
                                      gender.name,
                                      category.category,
                                      subCategory.name
                                    )
                                  }
                                />
                                <span>{subCategory.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterDrawer;
