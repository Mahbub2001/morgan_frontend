"use client";
import { getUserProfile } from "@/api/user";
import CheckOrderUserPagination from "@/components/CheckUserOrderFilter/CheckOrderUserPagin";
import CheckUserOrderFilter from "@/components/CheckUserOrderFilter/CheckUserOrderFil";
import { AuthContext } from "@/hooks/AuthProvider";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

function CheckOrders() {
  const [myorders, setMyorders] = useState([]);
  const { user } = useContext(AuthContext);
  const [me, setMe] = useState(null);
  const [orderType, setOrderType] = useState("all-orders");
  const [duration, setDuration] = useState("this-week");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("ny-token");
        const userProfile = await getUserProfile(user?.email);
        setMe(userProfile);

        if (userProfile?._id) {
          const ordersResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/${userProfile._id}?page=${currentPage}&limit=${limit}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!ordersResponse.ok) {
            throw new Error("Failed to fetch orders");
          }

          const { data, pagination } = await ordersResponse.json();
          setMyorders(data);
          setTotalPages(pagination.totalPages);
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
  }, [user?.email, , currentPage, limit]);
  // console.log(myorders);

  return (
    <div className="container mx-auto px-4">
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>
            {/* <CheckUserOrderFilter
              setOrderType={setOrderType}
              setDuration={setDuration}
              duration={duration}
              orderType={orderType}
            /> */}
          </div>
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="flex flex-col gap-4 py-6">
                {myorders?.map((order, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap items-center gap-y-4 py-6"
                  >
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Order ID:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        <a href="#" className="hover:underline">
                          {order?.orderId}
                        </a>
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Date:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {new Date(order?.createdAt).toLocaleDateString()}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Price:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        ${order?.totalPrice}
                      </dd>
                    </dl>
                    {order?.status === "pending" && (
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                          <svg
                            className="me-1 h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                            />
                          </svg>
                          Pending
                        </dd>
                      </dl>
                    )}
                    {order?.status === "in-transit" && (
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          <svg
                            className="me-1 h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                            />
                          </svg>
                          In transit
                        </dd>
                      </dl>
                    )}
                    {order?.status === "confirmed" && (
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                          <svg
                            className="me-1 h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 11.917 9.724 16.5 19 7.5"
                            />
                          </svg>
                          Confirmed
                        </dd>
                      </dl>
                    )}
                    {order?.status === "cancelled" && (
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                          <svg
                            className="me-1 h-3 w-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18 17.94 6M18 18 6.06 6"
                            />
                          </svg>
                          Cancelled
                        </dd>
                      </dl>
                    )}

                    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                      <button
                        type="button"
                        className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto"
                      >
                        Order again
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleViewDetails(order);
                        }}
                        className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CheckOrderUserPagination
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
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
              <h3 className="text-lg font-medium text-center text-gray-900 dark:text-white">
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
                      {" "}
                      <strong>Date:</strong>{" "}
                      {new Date(selectedOrder?.createdAt).toLocaleString()}{" "}
                    </span>
                  </p>
                  <div>
                    {selectedOrder?.products.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 py-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.name} - {item.size} - {item.color}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {item.price} x {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
                    <strong>Status:</strong> {selectedOrder?.status}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Total:</strong> ${selectedOrder?.totalPrice}
                  </p>
                  {/* <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Total:</strong> ${selectedOrder.total}
                  </p> */}
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
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOrders;
