"use client";

import { adminGetProducts } from "@/api/adminfetching";
import Button3 from "@/containers/common/Button3/Button3";
import AdminRoute from "@/Wrapper/AdminRoute";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AdminProductList() {
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

  const handleCheckboxChange = (id, key, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, [key]: value, isEdited: true } : item
      )
    );
  };

  const handleDiscountChange = (id, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === id ? { ...item, discount: value, isEdited: true } : item
      )
    );
  };

  const handleSave = async () => {
    const updatedProducts = data.filter((item) => item.isEdited);
    // console.log(updatedProducts);
    // return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/update-products`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: updatedProducts }),
      }
    );
    const result = await response.json();
    if (result.success) {
      alert("Changes saved successfully!");
      fetchData();
    } else {
      alert("Failed to save changes. Try again.");
    }
  };

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
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Show
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Featured
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sales
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Promote
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
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
                      <input
                        type="number"
                        className="border px-2 py-1 rounded w-16"
                        value={item?.discount ?? 0}
                        onChange={(e) =>
                          handleDiscountChange(
                            item._id,
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={!!item.show}
                        onChange={(e) =>
                          handleCheckboxChange(
                            item._id,
                            "show",
                            e.target.checked
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={!!item?.featured}
                        onChange={(e) =>
                          handleCheckboxChange(
                            item._id,
                            "featured",
                            e.target.checked
                          )
                        }
                      />
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
                    <td className="px-6 py-4 space-x-2 flex items-center justify-start">
                      <a
                        href={`/adminproductlist/${item?._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </a>
                      <button className="text-red-600 hover:underline">
                        Delete
                      </button>
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

export default AdminProductList;
