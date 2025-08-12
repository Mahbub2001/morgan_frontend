"use client";
import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "flowbite-react";
import Cookies from "js-cookie";
import Button3 from "@/containers/common/Button3/Button3";
import AdminRoute from "@/Wrapper/AdminRoute";

function AdminOrderManagement() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newToOld");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [editedOrders, setEditedOrders] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
  const handleStatusChange = (orderId, newStatus) => {
    setEditedOrders((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const saveChanges = async () => {
    const updates = Object.keys(editedOrders).map((id) => ({
      id,
      status: editedOrders[id],
      tran_id: orders.find((order) => order._id === id).tran_id,
      products: orders.find((order) => order._id === id).products,
    }));

    // console.log("updates", updates);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orders/bulk-update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("ny-token")}`,
          },
          body: JSON.stringify({ updates }),
        }
      );

      if (response.ok) {
        alert("Statuses updated successfully!");
        setEditedOrders({});
        fetchOrders();
      } else {
        alert("Failed to update statuses.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const renderPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
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
                    <td className="px-6 py-4">{order?.customer_email}</td>
                    <td className="px-6 py-4">{order?.userId}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOpenModal(order)}
                        className="text-blue-600 hover:underline"
                      >
                        Product details
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <p>{order?.status}</p>
                    </td>
                    <td className="px-6 py-4">{order?.totalPrice}</td>
                    <td className="px-6 py-4">
                      <select
                        value={editedOrders[order._id] || order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
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
          {Object.keys(editedOrders).length > 0 && (
            <div onClick={saveChanges} className="flex justify-end mt-4">
              <Button3
                text="SAVE CHANGE"
                textColor="white"
                backgroundColor="orange"
                borderColor="orange"
              />
            </div>
          )}
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              {/* Modal Header */}
              <div className="flex items-start justify-between">
                <h3 className="text-lg text-center text-gray-900 dark:text-white">
                  Order Details
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="ml-auto text-gray-400 hover:text-gray-900 hover:bg-gray-200 p-1.5 rounded-lg dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Close modal</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/* Modal Body */}
              <div className="mt-4">
                {selectedOrder ? (
                  <div>
                    <p className="text-xs flex justify-between text-gray-700 dark:text-gray-300">
                      <span>
                        <strong>Order ID:</strong> {selectedOrder?.orderId}
                      </span>
                      <span>
                        <strong>Date:</strong>{" "}
                        {new Date(selectedOrder?.createdAt).toLocaleString()}{" "}
                      </span>
                    </p>
                    <div>
                      {selectedOrder?.products.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 py-2"
                        >
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 dark:text-white">
                              {item?.name} - {item?.size} - {item?.color}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {renderPrice(item?.discountPrice)} x{" "}
                              {item?.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                      <strong>Status:</strong> {selectedOrder?.status}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Total:</strong>{" "}
                      {renderPrice(selectedOrder?.totalPrice)}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No order details available.
                  </p>
                )}
              </div>
              {/* Modal Footer */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminRoute>
  );
}

export default AdminOrderManagement;
