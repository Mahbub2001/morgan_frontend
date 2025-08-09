"use client";
import { fetchProduct } from "@/api/nyProducts";
import Button3 from "@/containers/common/Button3/Button3";
import { categories } from "@/Data/Menu";
import AdminRoute from "@/Wrapper/AdminRoute";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function AdminProductEdit() {
//   const { id } = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [person, setPerson] = useState(product?.person || "");
  const [category, setCategory] = useState(product?.category || "");
  const [subCategory, setSubCategory] = useState(product?.subCategory || "");
  const [features, setFeatures] = useState(product?.features || [""]);
  const [utilities, setUtilities] = useState(product?.utilities || []);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [askingPrice, setAskingPrice] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");

  useEffect(() => {
    fetchProduct(id).then((data) => {
      setProduct(data);
      setPerson(data?.person || "");
      setCategory(data?.category || "");
      setSubCategory(data?.subCategory || "");
      setFeatures(data?.features || [""]);
      setUtilities(data?.utilities || []);
      setProductName(data?.productName || "");
      setProductDescription(data?.productDescription || "");
      setAskingPrice(data?.askingPrice || "");
      setHeight(data?.height || "");
      setWidth(data?.width || "");
      setDepth(data?.depth || "");
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "productName":
        setProductName(value);
        break;
      case "productDescription":
        setProductDescription(value);
        break;
      case "askingPrice":
        setAskingPrice(value === "" ? "" : parseFloat(value));
        break;
      case "height":
        setHeight(value === "" ? "" : parseFloat(value));
        break;
      case "width":
        setWidth(value === "" ? "" : parseFloat(value));
        break;
      case "depth":
        setDepth(value === "" ? "" : parseFloat(value));
        break;
      default:
        break;
    }
  };

  const handlePersonChange = (e) => {
    setPerson(e.target.value);
    setCategory("");
    setSubCategory("");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory("");
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = value;
    setFeatures(updatedFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleUtilityChange = (index, key, value) => {
    const updatedUtilities = [...utilities];
    updatedUtilities[index][key] = value;
    setUtilities(updatedUtilities);
  };

  const handlePictureChange = (utilityIndex, file) => {
    const updatedUtilities = [...utilities];
    const pictures = updatedUtilities[utilityIndex].pictures || [];
    pictures.push(file);
    updatedUtilities[utilityIndex].pictures = pictures;
    setUtilities(updatedUtilities);
  };

  const removePicture = (utilityIndex, pictureIndex) => {
    const updatedUtilities = [...utilities];
    updatedUtilities[utilityIndex].pictures.splice(pictureIndex, 1);
    setUtilities(updatedUtilities);
  };

  const addUtility = () => {
    setUtilities([
      ...utilities,
      { color: "", numberOfProducts: 0, subName: "", pictures: [] },
    ]);
  };

  const removeUtility = (index) => {
    setUtilities(utilities.filter((_, i) => i !== index));
  };
  const handleUpdate = async () => {
    try {
      const updatedUtilities = await Promise.all(
        utilities.map(async (utility) => {
          const uploadedPictures = await Promise.all(
            utility.pictures.map(async (picture) => {
              if (typeof picture === "object") {
                const formData = new FormData();
                formData.append("image", picture);

                const response = await axios.post(
                  `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                  formData
                );
                return response.data?.data?.url || null;
              }
              return picture;
            })
          );
          return { ...utility, pictures: uploadedPictures.filter(Boolean) };
        })
      );
      const finalData = {
        person,
        category,
        subCategory,
        productName,
        productDescription,
        askingPrice,
        height,
        width,
        depth,
        features,
        utilities: updatedUtilities,
      };

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/product-details/${product?._id}`,
        finalData
      );

      if (response.status === 200) {
        // console.log("Product updated successfully:", response.data);
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting product details:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  // console.log("data", product);

  return (
    <AdminRoute>
      <div>
        <div className="container mx-auto p-4 font-futara-sans text-sm">
          <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="max-w-sm space-y-4">
                  {/* Person Select */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Person
                    </label>
                    <select
                      value={person}
                      onChange={handlePersonChange}
                      className="text-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="" disabled>
                        Select Person
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.name} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Select */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={handleCategoryChange}
                      disabled={!person}
                      className={`mt-1 text-sm block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        !person && "bg-gray-100"
                      }`}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories
                        .find((cat) => cat.name === person)
                        ?.items.map((item) => (
                          <option key={item.category} value={item.category}>
                            {item.category}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* SubCategory Select */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      SubCategory
                    </label>
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      disabled={!category}
                      className={`text-sm mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                        !category && "bg-gray-100"
                      }`}
                    >
                      <option value="" disabled>
                        Select SubCategory
                      </option>
                      {categories
                        .find((cat) => cat.name === person)
                        ?.items.find((item) => item.category === category)
                        ?.items.map((subItem) => (
                          <option key={subItem.name} value={subItem.name}>
                            {subItem.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Display Selected Options */}
                  <div className="mt-6">
                    <h2 className="text-lg font-bold">Selected Options:</h2>
                    <p>
                      <strong>Person:</strong> {person || "None"}
                    </p>
                    <p>
                      <strong>Category:</strong> {category || "None"}
                    </p>
                    <p>
                      <strong>SubCategory:</strong> {subCategory || "None"}
                    </p>
                  </div>
                </div>
                <div className="max-w-xs space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={productName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Product Description
                    </label>
                    <textarea
                      name="productDescription"
                      value={productDescription}
                      onChange={handleInputChange}
                      className="mt-1 block h-44 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      name="askingPrice"
                      value={askingPrice}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Height
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={height}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Width
                      </label>
                      <input
                        type="number"
                        name="width"
                        value={width}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Depth
                      </label>
                      <input
                        type="number"
                        name="depth"
                        value={depth}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="max-w-md space-y-4">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Features
                    </label>
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) =>
                            handleFeatureChange(index, e.target.value)
                          }
                          placeholder={`Feature ${index + 1}`}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
                    >
                      Add Feature
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Utilities
                  </label>
                  {utilities.map((utility, utilityIndex) => (
                    <div
                      key={utilityIndex}
                      className="border p-4 rounded-md mb-4 bg-gray-50"
                    >
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Color
                        </label>
                        <input
                          type="text"
                          value={utility.color}
                          onChange={(e) =>
                            handleUtilityChange(
                              utilityIndex,
                              "color",
                              e.target.value
                            )
                          }
                          placeholder="Color"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Number of Products
                        </label>
                        <input
                          type="number"
                          value={utility.numberOfProducts}
                          onChange={(e) =>
                            handleUtilityChange(
                              utilityIndex,
                              "numberOfProducts",
                              e.target.value
                            )
                          }
                          placeholder="Number of Products"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          SubName
                        </label>
                        <input
                          type="text"
                          value={utility.subName}
                          onChange={(e) =>
                            handleUtilityChange(
                              utilityIndex,
                              "subName",
                              e.target.value
                            )
                          }
                          placeholder="SubName"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Pictures
                        </label>
                        {utility.pictures.map((picture, pictureIndex) => (
                          <div
                            key={pictureIndex}
                            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 items-center gap-4 mb-2"
                          >
                            <img
                              src={
                                typeof picture === "string"
                                  ? picture
                                  : URL.createObjectURL(picture)
                              }
                              alt={`Preview ${pictureIndex + 1}`}
                              className="w-12 h-12 object-cover rounded shadow-md"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                removePicture(utilityIndex, pictureIndex)
                              }
                              className="px-2 py-1 bg-red-500 text-sm text-white rounded shadow hover:bg-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Add Picture
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handlePictureChange(
                                utilityIndex,
                                e.target.files[0]
                              )
                            }
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeUtility(utilityIndex)}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                      >
                        Remove Utility
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addUtility}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
                  >
                    Add Utility
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleUpdate}
              className="flex  mx-auto"
            >
              <div className="">
                <Button3
                  text="UPDATE PRODUCT"
                  borderColor="orange"
                  backgroundColor="orange"
                  textColor="white"
                />
              </div>
            </button>
          </form>
        </div>
      </div>
    </AdminRoute>
  );
}

export default AdminProductEdit;
