"use client";
import AdminRoute from "@/Wrapper/AdminRoute";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch2 = (event) => {
    setSearchTerm2(event.target.value);
  };

  const fetchCustomers = async (page = 1) => {
    setLoading(true);
    try {
      const token = Cookies.get("ny-token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/customers?page=${page}&name=${searchTerm}&id=${searchTerm2}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Check if response is JSON
      const data = await response.json();

      setCustomers(data.customers);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [searchTerm, searchTerm2, currentPage]);

  const toggleCustomersSelection = (orderId) => {
    if (selectedCustomers.includes(orderId)) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== orderId));
    } else {
      setSelectedCustomers([...selectedCustomers, orderId]);
    }
  };

  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedCustomers(customers.map((order) => order.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  loading && <p>Loading...</p>;
  return (
    <AdminRoute>
      <div className="container mx-auto">
        <h1 className="text-center mb-8">Order Management</h1>
        <div>
          <div className="md:flex gap-2 items-center mb-4">
            <div className="pb-4 bg-white dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">
                Search By name
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="block w-full max-w-lg pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:max-w-full sm:w-auto"
                  placeholder="Search By Name"
                />
              </div>
            </div>
            <div className="pb-4 bg-white dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">
                Search By ID
              </label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  value={searchTerm2}
                  onChange={handleSearch2}
                  className="block w-full max-w-lg pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:max-w-full sm:w-auto"
                  placeholder="Search By USER ID"
                />
              </div>
            </div>
          </div>
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        checked={selectedCustomers.length === customers.length}
                        onChange={(e) => toggleSelectAll(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CUSTOMER ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CUSTOMER FIRST NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CUSTOMER LAST NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CUSTOMER EMAIL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ROLE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GENDER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NUMBER OF ORDER RECEIVED
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => toggleCustomersSelection(customer.id)}
                      />
                    </td>
                    <td className="px-6 py-4">{customer?._id}</td>
                    <td className="px-6 py-4">{customer?.firstName}</td>
                    <td className="px-6 py-4">{customer?.lastName}</td>
                    <td className="px-6 py-4">{customer?.email}</td>
                    <td className="px-6 py-4">{customer?.role}</td>
                    <td className="px-6 py-4">
                      {customer?.gender ? customer.gender : ""}
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      {customer?.order_received
                        ? customer?.order_received
                        : 0}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}

export default Customers;
