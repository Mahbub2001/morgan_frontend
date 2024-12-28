"use client";

import { categories } from "@/Data/Menu";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { imageUpload } from "@/api/imageUploadApi";
import Cookies from "js-cookie";

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

  const mutation = useMutation({
    mutationFn: async (productData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      return response.json();
    },
    onSuccess: () => {
      alert("Product added successfully!");
    },
    onError: (error) => {
      console.error(error);
      alert("Error adding product");
    },
  });
  const [utilities, setUtilities] = React.useState([]);

  const onSubmit = async (data) => {
    // console.log("Form data:", data);

    try {
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
      data.date = new Date();

      mutation.mutate(data);
    } catch (error) {
      console.error("Error in onSubmit:", error);
      alert("Something went wrong while submitting the form.");
    }
  };

  return (
    <div className="container mx-auto  min-h-screen ">
      <h1 className="text-lg font-bold mb-4">Add Product</h1>
      <div className="max-w-[30rem] ">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("person", { required: "Person is required" })}
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
              {errors.person && (
                <p className="text-red-500 text-xs">{errors.person.message}</p>
              )}
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
                    {...register("category", {
                      required: "Category is required",
                    })}
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
                  {errors.category && (
                    <p className="text-red-500 text-xs">
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
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Sub-Category
                  </label>
                  <select
                    id="subCategory"
                    {...register("subCategory")}
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
                {...register("productName", {
                  required: "Product name is required",
                })}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.productName && (
                <p className="text-red-500 text-xs">
                  {errors.productName.message}
                </p>
              )}
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
                {...register("brandName", {
                  required: "Brand name is required",
                })}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.brandName && (
                <p className="text-red-500 text-xs">
                  {errors.brandName.message}
                </p>
              )}
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
                {...register("subBrand", { required: "Sub brand is required" })}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.subBrand && (
                <p className="text-red-500 text-xs">
                  {errors.subBrand.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Description(Use '/n' for determine new paragraph)
              </label>
              <textarea
                id="message"
                {...register("productDescription", {
                  required: "Product description is required",
                })}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write Here..."
              ></textarea>
              {errors.productDescription && (
                <p className="text-red-500 text-xs">
                  {errors.productDescription.message}
                </p>
              )}
            </div>
            <div className="mt-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Leather & Care(Use '/n' for determine new paragraph)
              </label>
              <textarea
                id="message"
                {...register("leatherCare", {
                  required: "Leather care is required",
                })}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write Here..."
              ></textarea>
              {errors.leatherCare && (
                <p className="text-red-500 text-xs">
                  {errors.leatherCare.message}
                </p>
              )}
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
                step="0.01"
                id="large-input"
                {...register("height", {
                  required: "Height is required",
                  valueAsNumber: true,
                })}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.height && (
                <p className="text-red-500 text-xs">{errors.height.message}</p>
              )}
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
                step="0.01"
                id="large-input"
                {...register("width", {
                  required: "Width is required",
                  valueAsNumber: true,
                })}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.width && (
                <p className="text-red-500 text-xs">{errors.width.message}</p>
              )}
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
                step="0.01"
                id="large-input"
                {...register("depth", {
                  required: "Depth is required",
                  valueAsNumber: true,
                })}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.depth && (
                <p className="text-red-500 text-xs">{errors.depth.message}</p>
              )}
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
                step="0.01"
                id="large-input"
                {...register("askingPrice", {
                  required: "Asking Price is required",
                  valueAsNumber: true,
                })}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.askingPrice && (
                <p className="text-red-500 text-xs">
                  {errors.askingPrice.message}
                </p>
              )}
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
                step="0.01"
                id="large-input"
                {...register("mainPrice", {
                  required: "Main Price is required",
                  valueAsNumber: true,
                })}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.mainPrice && (
                <p className="text-red-500 text-xs">
                  {errors.mainPrice.message}
                </p>
              )}
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
                step="0.01"
                id="large-input"
                {...register("discount", {
                  required: "Discount is required",
                  valueAsNumber: true,
                })}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.discount && (
                <p className="text-red-500 text-xs">
                  {errors.discount.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Features(Sizes & Details)
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
                  type="button"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
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
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="product_input"
                  >
                    Enter Number of Products
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="product_input"
                    type="number"
                    placeholder="Number of products"
                    value={productInput}
                    onChange={(e) => setProductInput(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="subname_input"
                  >
                    Subname of Product(Which will define the product color)
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="subname_input"
                    type="text"
                    placeholder="Sub Name"
                    value={subnameInput}
                    onChange={(e) => setSubnameInput(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddColor}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Add Color
              </button>
            </div>
            {pictures.map((picture, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {picture.color} - {picture.productCount} Product(s)
                </h3>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageUpload(e, picture.color)}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </div>
                {/* Displaying uploaded images */}
                {picture.images.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Uploaded Images for {picture.color}:
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
          <div className="mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
