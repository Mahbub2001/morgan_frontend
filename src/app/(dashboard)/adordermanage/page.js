"use client";
import React, { useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import Cookies from "js-cookie";

function AdminOrderManagement() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newToOld");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (page = 1) => {
    setLoading(true);
    try {
      const token = Cookies.get("ny-token");
      const sort = sortOrder === "newToOld" ? "createdAt" : "createdAt";
      const order = sortOrder === "newToOld" ? "desc" : "asc";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders?page=${page}&search=${searchTerm}&sort=${sort}&order=${order}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      setOrders(data.orders);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [searchTerm, sortOrder, currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setOpen(false);
  };

  const toggleOrderSelection = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(orders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  loading && <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-center mb-8">Order Management</h1>
      <div>
        <div className="md:flex gap-2 items-center mb-4">
          <div className="pb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
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
                placeholder="Search for items"
              />
            </div>
          </div>
          <div className="pb-4 relative inline-block text-left">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-600 flex items-center border font-medium rounded-lg text-sm px-5 py-2"
            >
              Sort
              <svg
                className="w-2.5 h-2.5 ms-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {open && (
              <div className="absolute z-10 mt-2 w-32 bg-white rounded-lg shadow">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <button
                      onClick={() => handleSort("newToOld")}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      New to Old
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSort("oldToNew")}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Old to New
                    </button>
                  </li>
                </ul>
              </div>
            )}
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
                      checked={selectedOrders.length === orders.length}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Products
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleOrderSelection(order.id)}
                    />
                  </td>
                  <td className="px-6 py-4">{order?.orderId}</td>
                  <td className="px-6 py-4">{order?.customer_firstName}</td>
                  <td className="px-6 py-4">{order?.email}</td>
                  <td className="px-6 py-4">{order?.userId}</td>
                  <td className="px-6 py-4">Product details</td>
                  <td className="px-6 py-4">{order?.totalPrice}</td>
                  <td className="px-6 py-4">
                    <p>{order?.status}</p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order?.status || "pending"}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className="border text-xs border-gray-300 rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-transit">In-Transit</option>
                      <option value="received">Received</option>
                      <option value="canceled">Canceled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
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
  );
}

export default AdminOrderManagement;
