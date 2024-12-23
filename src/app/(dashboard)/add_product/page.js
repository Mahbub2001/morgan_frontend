"use client";

import { categories } from "@/Data/Menu";
import React, { useState } from "react";
function AddProduct() {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handlePersonChange = (e) => {
    setSelectedPerson(e.target.value);
    setSelectedCategory("");
    setSelectedSubCategory("");
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
  };

  const selectedPersonData = categories.find(
    (category) => category.name === selectedPerson
  );

  const selectedCategoryData = selectedPersonData?.items.find(
    (item) => item.category === selectedCategory
  );

  const [inputValue, setInputValue] = useState("");
  const [dataArray, setDataArray] = useState([]);

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setDataArray((prevArray) => [...prevArray, inputValue]);
      setInputValue("");
    }
  };

  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [pictures, setPictures] = useState([]);

  const handleAddColor = () => {
    if (colorInput.trim() !== "") {
      setColors([...colors, colorInput]);
      setPictures([...pictures, { color: colorInput, images: [] }]);
      setColorInput("");
    }
  };

  const handleImageUpload = (e, color) => {
    const files = Array.from(e.target.files);
    const updatedPictures = pictures.map((picture) => {
      if (picture.color === color) {
        return { ...picture, images: [...picture.images, ...files] };
      }
      return picture;
    });
    setPictures(updatedPictures);
  };

  return (
    <div className="container mx-auto  min-h-screen ">
      <h1 className="text-lg font-bold mb-4">Add Product</h1>
      <div className="max-w-[30rem] ">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="person"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Person
              </label>
              <select
                id="person"
                className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedPerson}
                onChange={handlePersonChange}
              >
                <option value="">-- Select --</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {selectedPerson && (
                <>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Category
                  </label>
                  <select
                    id="category"
                    className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">-- Select --</option>
                    {selectedPersonData?.items.map((item) => (
                      <option key={item.category} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
            <div>
              {selectedCategory && (
                <>
                  <label
                    htmlFor="subCategory"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Sub-Category
                  </label>
                  <select
                    id="subCategory"
                    className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {selectedCategoryData?.items.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
          <div className="mt-5">
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name of Your Product
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sub Brand If Any
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Description
              </label>
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write Here..."
              ></textarea>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Height
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Width
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Depth
              </label>
              <input
                type="text"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Asking Price
              </label>
              <input
                type="number"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Main Price
              </label>
              <input
                type="number"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="large-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Discount(%)
              </label>
              <input
                type="number"
                id="large-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Features
              </label>
              <div className="flex items-center justify-center gap-2">
                <input
                  type="text"
                  id="base-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  onClick={handleAdd}
                  className=" px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-medium">Added Data:</h2>
                <ul className="list-disc ml-5">
                  {dataArray.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-800 dark:text-gray-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="color_input"
              >
                Enter Color
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="color_input"
                type="text"
                placeholder="Enter color"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Add Color
              </button>
            </div>
            {colors.map((color, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Upload images for {color}
                </h3>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(e, color)}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </div>
                {pictures
                  .filter((picture) => picture.color === color)
                  .map((picture) => (
                    <div key={color} className="mt-2">
                      {picture.images.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Uploaded Images for {color}:
                          </h4>
                          <ul>
                            {picture.images.map((file, fileIndex) => (
                              <li
                                key={fileIndex}
                                className="text-sm text-gray-600 dark:text-gray-400"
                              >
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
