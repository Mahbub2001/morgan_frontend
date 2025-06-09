"use client";

import { categories } from "@/Data/Menu";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "@/api/imageUploadApi";
import Cookies from "js-cookie";
import AdminRoute from "@/Wrapper/AdminRoute";
import Button3 from "@/containers/common/Button3/Button3";

function AddProduct() {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  const [productInput, setProductInput] = useState("");
  const [pictures, setPictures] = useState([]);
  const [subnameInput, setSubnameInput] = useState("");

  const handleAddColor = () => {
    if (
      colorInput.trim() !== "" &&
      productInput.trim() !== "" &&
      subnameInput.trim() !== ""
    ) {
      setColors([...colors, colorInput]);
      setPictures([
        ...pictures,
        {
          color: colorInput,
          productCount: Number(productInput),
          subName: subnameInput,
          images: [],
        },
      ]);
      setColorInput("");
      setProductInput("");
      setSubnameInput("");
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const token = Cookies.get("ny-token");

  const [utilities, setUtilities] = React.useState([]);

  const onSubmit = async (data) => {
    // console.log("Form data:", data);
    try {
      setIsLoading(true);
      data.features = dataArray;

      const newUtilities = [];

      for (const picture of pictures) {
        const { color, productCount, images, subName } = picture;
        const uploadedPictures = [];

        for (const file of images) {
          try {
            const uploadResponse = await imageUpload(file);
            if (uploadResponse?.data?.url) {
              uploadedPictures.push(uploadResponse.data.url);
            } else {
              console.warn("Failed to upload image:", file.name);
            }
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }

        newUtilities.push({
          color,
          pictures: uploadedPictures,
          numberOfProducts: productCount,
          subName,
        });
      }

      setUtilities(newUtilities);
      // console.log("Utilities array:", newUtilities);

      alert("All images uploaded and data stored!");

      data.utilities = newUtilities;
      // data.date = new Date();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      alert("Product added successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error in onSubmit:", error);
      alert("Something went wrong while submitting the form.");
      setIsLoading(false);
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Add New Product
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Fill out the form below to add a new product to your inventory
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <form
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Left Column */}
              <div className="lg:col-span-7">
                {/* Category Selection Card */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 mb-8 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Category Selection
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="person"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Select Person
                      </label>
                      <select
                        id="person"
                        {...register("person", {
                          required: "Person is required",
                        })}
                        className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
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
                      {errors.person && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.person.message}
                        </p>
                      )}
                    </div>

                    <div>
                      {selectedPerson && (
                        <>
                          <label
                            htmlFor="category"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Select Category
                          </label>
                          <select
                            id="category"
                            {...register("category", {
                              required: "Category is required",
                            })}
                            className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
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
                          {errors.category && (
                            <p className="mt-1 text-red-500 text-xs">
                              {errors.category.message}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <div>
                      {selectedCategory && (
                        <>
                          <label
                            htmlFor="subCategory"
                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Select Sub-Category
                          </label>
                          <select
                            id="subCategory"
                            {...register("subCategory")}
                            className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                            value={selectedSubCategory}
                            onChange={(e) =>
                              setSelectedSubCategory(e.target.value)
                            }
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
                </div>

                {/* Product Information Card */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 mb-8 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Product Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="large-input"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Name of Your Product
                      </label>
                      <input
                        type="text"
                        id="large-input"
                        {...register("productName", {
                          required: "Product name is required",
                        })}
                        className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                      />
                      {errors.productName && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.productName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="large-input"
                          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Brand Name
                        </label>
                        <input
                          type="text"
                          id="large-input"
                          {...register("brandName", {
                            required: "Brand name is required",
                          })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                        />
                        {errors.brandName && (
                          <p className="mt-1 text-red-500 text-xs">
                            {errors.brandName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="large-input"
                          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Sub Brand If Any
                        </label>
                        <input
                          type="text"
                          id="large-input"
                          {...register("subBrand", {
                            required: "Sub brand is required",
                          })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                        />
                        {errors.subBrand && (
                          <p className="mt-1 text-red-500 text-xs">
                            {errors.subBrand.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Product Description
                        <span className="text-xs text-gray-500 ml-1">
                          (Use '/n' for new paragraphs)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        {...register("productDescription", {
                          required: "Product description is required",
                        })}
                        rows="4"
                        className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                        placeholder="Describe your product..."
                      ></textarea>
                      {errors.productDescription && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.productDescription.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Leather & Care
                        <span className="text-xs text-gray-500 ml-1">
                          (Use '/n' for new paragraphs)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        {...register("leatherCare", {
                          required: "Leather care is required",
                        })}
                        rows="4"
                        className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                        placeholder="Describe leather care instructions..."
                      ></textarea>
                      {errors.leatherCare && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.leatherCare.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dimensions Card */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 mb-8 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Dimensions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="large-input"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Height
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          id="large-input"
                          {...register("height", {
                            required: "Height is required",
                            valueAsNumber: true,
                          })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-10 transition-colors"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                          cm
                        </span>
                      </div>
                      {errors.height && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.height.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="large-input"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Width
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          id="large-input"
                          {...register("width", {
                            required: "Width is required",
                            valueAsNumber: true,
                          })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-10 transition-colors"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                          cm
                        </span>
                      </div>
                      {errors.width && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.width.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="large-input"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Depth
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          id="large-input"
                          {...register("depth", {
                            required: "Depth is required",
                            valueAsNumber: true,
                          })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-10 transition-colors"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                          cm
                        </span>
                      </div>
                      {errors.depth && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.depth.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing Card */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 mb-8 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Pricing
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="large-input"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Asking Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                          $
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          id="large-input"
                          {...register("askingPrice", {
                            required: "Asking Price is required",
                            valueAsNumber: true,
                          })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-8 transition-colors"
                        />
                      </div>
                      {errors.askingPrice && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.askingPrice.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="large-input"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Main Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                          $
                        </span>
                        <input
                          type="number"
                          step="0.01"
                          id="large-input"
                          {...register("mainPrice", {
                            required: "Main Price is required",
                            valueAsNumber: true,
                          })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 pl-8 transition-colors"
                        />
                      </div>
                      {errors.mainPrice && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.mainPrice.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="large-input"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Discount (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.01"
                          id="large-input"
                          {...register("discount", {
                            required: "Discount is required",
                            valueAsNumber: true,
                          })}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10 transition-colors"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500 text-sm">
                          %
                        </span>
                      </div>
                      {errors.discount && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors.discount.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features Card */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Features & Details
                  </h2>
                  <div>
                    <label
                      htmlFor="base-input"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Features (Sizes & Details)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        id="base-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-grow bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                        placeholder="Add a feature..."
                      />
                      <button
                        onClick={handleAdd}
                        type="button"
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {dataArray.length > 0 && (
                      <div className="mt-4 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 p-3">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Added Features:
                        </h3>
                        <ul className="space-y-1">
                          {dataArray.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-800 dark:text-gray-200 text-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-green-500 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 shadow-sm sticky top-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Color Variants & Images
                  </h2>

                  <div className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          htmlFor="color_input"
                        >
                          Color Name
                        </label>
                        <div className="relative">
                          <input
                            className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                            id="color_input"
                            type="text"
                            placeholder="e.g. Black"
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                          />
                          <div
                            className="absolute right-3 top-2.5 w-4 h-4 rounded-full border border-gray-300"
                            style={{
                              backgroundColor: colorInput.toLowerCase(),
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                          htmlFor="product_input"
                        >
                          Quantity
                        </label>
                        <input
                          className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                          id="product_input"
                          type="number"
                          placeholder="Number of products"
                          value={productInput}
                          onChange={(e) => setProductInput(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor="subname_input"
                      >
                        Color Variant Name
                      </label>
                      <input
                        className="w-full bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-colors"
                        id="subname_input"
                        type="text"
                        placeholder="e.g. Midnight Black"
                        value={subnameInput}
                        onChange={(e) => setSubnameInput(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add Color Variant
                    </button>
                  </div>

                  <div className="space-y-6">
                    {pictures.map((picture, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            <span
                              className="inline-block w-3 h-3 rounded-full mr-2"
                              style={{
                                backgroundColor: picture.color.toLowerCase(),
                              }}
                            ></span>
                            {picture.color}
                            <span className="text-gray-500 ml-2">
                              ({picture.productCount} items)
                            </span>
                          </h3>
                          {picture.subname && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {picture.subname}
                            </span>
                          )}
                        </div>

                        <div className="mb-3">
                          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
                            Upload images for {picture.color}
                          </label>
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG, GIF (MAX. 5MB each)
                              </p>
                            </div>
                            <input
                              type="file"
                              multiple
                              onChange={(e) =>
                                handleImageUpload(e, picture.color)
                              }
                              className="hidden"
                            />
                          </label>
                        </div>

                        {picture.images.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Uploaded Images:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {picture.images.map((file, fileIndex) => (
                                <div key={fileIndex} className="relative group">
                                  <div className="w-16 h-16 rounded border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-8 w-8 text-gray-400"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                  </div>
                                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      type="button"
                                      className="text-white"
                                      onClick={() => {
                                        /* Add remove functionality if needed */
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <p className="text-xs text-gray-500 truncate w-16 mt-1">
                                    {file.name}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="lg:col-span-12 mt-6">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow-md hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all"
                  disabled={isLoading}
                >
                  <div className="flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding Product...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Product
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}

export default AddProduct;
