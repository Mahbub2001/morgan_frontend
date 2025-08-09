"use client";

import React, { useEffect, useState } from "react";
import AdminRoute from "@/Wrapper/AdminRoute";
import { adminGetProducts } from "@/api/adminfetching";
import Button3 from "@/containers/common/Button3/Button3";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
function Promote2() {
  const [data, setData] = useState([]);
  const [np, setNp] = useState(false);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 8,
  });
  const [filters, setFilters] = useState({
    search: "",
    person: "",
    category: "",
    subCategory: "",
  });

  const fetchData = async (page = 1) => {
    const params = {
      page,
      limit: pagination.pageSize,
      ...filters,
    };
    const response = await adminGetProducts(params);
    if (response.success) {
      setData(response.products);
      setPagination({
        totalItems: response.pagination.totalItems,
        totalPages: response.pagination.totalPages,
        currentPage: response.pagination.currentPage,
        pageSize: response.pagination.pageSize,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [np]);

  useEffect(() => {
    fetchData(1);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handlePageChange = (newPage) => {
    fetchData(newPage);
  };
  const handleCheckboxChange = (id, key, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, [key]: value, isEdited: true } : item
      )
    );
  };

  const [cat, setCat] = useState({
    person: "",
    category: "",
    subCategory: "",
  });

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setCat((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = Cookies.get("ny-token");

    const settings = {
      promote2: {
        person: cat.person,
        category: cat.category,
        subCategory: cat.subCategory,
        checkedId: data.filter((item) => item.promote).map((item) => item._id),
      },
    };
    if (!settings.promote2.category || !settings.promote2.subCategory) {
      toast.error(
        "Please select the person/categories/sub-categories for promotion."
      );
      return;
    }
    if (
      settings.promote2.checkedId.length < 4 ||
      settings.promote2.checkedId.length > 4
    ) {
      toast.error("Please select exactly 4 products for promotion.");
      return;
    }
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
          // console.log(data);
        });
      toast.success("Settings saved successfully!");
    } catch (error) {
      //   console.error("Error saving settings:", error);
      toast.error("Failed to save settings.");
    }
  };

  //   console.log(data);

  return (
    <AdminRoute>
      <div className="container mx-auto">
        <div className="p-4">
          <div className="w-2/3 mb-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="w-full md:w-auto">
              <input
                type="text"
                className="text-xs border px-2 py-1 rounded w-2/3"
                placeholder="Search products"
                onChange={(e) => handleFilterChange("search", e.target.value)}
                value={filters.search}
              />
            </div>
            <div className="w-full md:w-auto">
              <select
                className="border text-xs px-2 py-1 rounded"
                onChange={(e) => handleFilterChange("person", e.target.value)}
                value={filters.person}
              >
                <option value="">All Persons</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kid">Kid</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <select
                className="border px-2 py-1 rounded text-xs w-full"
                onChange={(e) => handleFilterChange("category", e.target.value)}
                value={filters.category}
              >
                <option value="">All Categories</option>
                {Array.from(new Set(data.map((item) => item.category))).map(
                  (category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="w-full md:w-auto mt-2 md:mt-0">
              <select
                className="border px-2 py-1 rounded text-xs w-full"
                onChange={(e) =>
                  handleFilterChange("subCategory", e.target.value)
                }
                value={filters.subCategory}
              >
                <option value="">All Subcategories</option>
                {Array.from(new Set(data.map((item) => item.subCategory))).map(
                  (subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <p className="my-5">
            Select the Person & Category & subCategory For Promote Section 1
          </p>
          <div className="flex flex-col md:flex-row gap-5 w-full mt-2 md:mt-0 mb-10">
            <div className="w-full md:w-auto">
              <select
                name="person"
                className="border px-2 py-1 rounded text-xs w-full"
                value={cat.person}
                onChange={handleSelectChange}
              >
                <option value="">All Persons</option>
                {Array.from(new Set(data.map((item) => item.person))).map(
                  (person) => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <select
                name="category"
                className="border px-2 py-1 rounded text-xs w-full"
                value={cat.category}
                onChange={handleSelectChange}
              >
                <option value="">All Categories</option>
                {Array.from(new Set(data.map((item) => item.category))).map(
                  (subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <select
                name="subCategory"
                className="border px-2 py-1 rounded text-xs w-full"
                value={cat.subCategory}
                onChange={handleSelectChange}
              >
                <option value="">All Subcategories</option>
                {Array.from(new Set(data.map((item) => item.subCategory))).map(
                  (subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Available
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sales
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Promote for Section1
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {item?._id}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={item?.utilities[0]?.pictures[0]}
                        alt="Product"
                        className="w-10 h-10 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4">{item?.productName}</td>
                    <td className="px-6 py-4">
                      ${item?.askingPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 flex text-xs flex-col">
                      {item?.utilities.map((utility, index) => (
                        <p key={index}>
                          {utility?.color} : {utility?.numberOfProducts}
                        </p>
                      ))}
                    </td>
                    <td className="px-6 py-4">
                      {item?.sales ? item.sales : 0}
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={!!item?.promote}
                        onChange={(e) =>
                          handleCheckboxChange(
                            item._id,
                            "promote",
                            e.target.checked
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  pagination.currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-4 items-center">
            <div onClick={handleSave} className="w-1/6">
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

export default Promote2;
