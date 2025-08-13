"use client";
import { getUserProfile } from "@/api/user";
import CheckOrderUserPagination from "@/components/CheckUserOrderFilter/CheckOrderUserPagin";
import CheckUserOrderFilter from "@/components/CheckUserOrderFilter/CheckUserOrderFil";
import MyCards from "@/containers/dashboard/MyCards/MyCards";
import { AuthContext } from "@/hooks/AuthProvider";
import withProtectedRoute from "@/Wrapper/protectedRoute";
import Cookies from "js-cookie";
import { FaGetPocket } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import GiveReview from "@/components/GiveReview/GiveReview";
import { SettingsContext } from "@/hooks/SettingsProvider";
import euroCountries from "@/Data/Countries";

function CheckOrders() {
  const { country, settings } = useContext(SettingsContext);
  const [myorders, setMyorders] = useState([]);
  const { user } = useContext(AuthContext);
  const [me, setMe] = useState(null);
  const [orderType, setOrderType] = useState("all-orders");
  const [duration, setDuration] = useState("this-week");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [ft, setFt] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedCancelOrder, setSelectedCancelOrder] = useState(null);

  // Helper function to determine currency and conversion rate
  const getCurrencyInfo = () => {
    if (country === "Bangladesh") {
      return {
        currency: "BDT",
        rate: settings?.conversionRateBDT || 1,
        symbol: "BDT ",
      };
    } else if (country === "Denmark") {
      return {
        currency: "DKK",
        rate: settings?.conversionRateDanish || 1,
        symbol: "DKK ",
      };
    } else if (euroCountries.includes(country)) {
      return {
        currency: "EUR",
        rate: settings?.conversionRateEuro || 1,
        symbol: "€",
      };
    } else {
      return {
        currency: "USD",
        rate: 1,
        symbol: "USD ",
      };
    }
  };
  const renderPrice = (price) => {
    const { symbol, rate } = getCurrencyInfo();
    return `${symbol}${Number(price * rate).toFixed(2)}`;
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const fetchOrders = async (me, token) => {
    if (me?._id) {
      try {
        const ordersResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${me._id}?page=${currentPage}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!ordersResponse.ok) {
          const errorData = await ordersResponse.json();
          // throw new Error(errorData.message || "Failed to fetch orders");
        }

        const { data, pagination } = await ordersResponse.json();
        setMyorders(data);
        setTotalPages(pagination.totalPages);
      } catch (error) {
        // console.error("Fetch orders error:", error);
        setMyorders([]);
        setTotalPages(1);
        // Optionally show a user-friendly error message
      }
    }
  };

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = Cookies.get("ny-token");
      if (user?.email) {
        const userData = await getUserProfile(user.email);
        // console.log("User data:", userData);
        setMe(userData);
        await fetchOrders(userData, token);
      }
    } catch (error) {
      // console.error("Error in fetchData:", error); // More detailed error
    }
  };

  fetchData();
}, [user?.email, currentPage, limit, ft]);

  const handleCancelOrder = async (order) => {
    setSelectedCancelOrder(order);
    setIsCancelModalOpen(true);
  };
  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
    setSelectedCancelOrder(null);
  };
  const confirmCancel = async () => {
    if (!selectedCancelOrder) {
      return;
    }
    // console.log(selectedCancelOrder);
    try {
      const token = Cookies.get("ny-token");

      setMyorders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedCancelOrder._id
            ? { ...order, status: "cancelled" }
            : order
        )
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${selectedCancelOrder._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "cancelled",
            products: selectedCancelOrder.products,
          }),
        }
      );
      if (!response.success) {
        alert("Failed to cancel order");
      } else {
        alert("Order cancelled successfully");
        setFt(!ft);
        fetchOrders(me, token);
      }
    } catch (error) {
      alert(error.message);
    }
    closeCancelModal();
  };
  // console.log(selectedOrder);
  

  return (
    <section className="container mx-auto px-4">
      <div className="md:grid md:grid-cols-12 md:gap-10">
        <div className="md:sticky md:top-0 md:h-screen md:col-span-6 lg:col-span-5 border-gray-200 dark:border-gray-700">
          <h2 className="pl-2 py-8 md:py-16 text-sm md:text-xl text-gray-900 dark:text-white">
            My Cards
          </h2>
          <div className=" relative">
            <MyCards />
          </div>
        </div>
        <div className="md:col-span-6  md:border-l md:pl-2 lg:col-span-7">
          <div className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="">
              <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                <h2 className="text-sm md:text-xl text-gray-900 dark:text-white">
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
                        className="flex flex-wrap items-center gap-y-4 py-2"
                      >
                        <dl className="w-full sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-sm  text-gray-500 dark:text-gray-400">
                            Order ID:
                          </dt>
                          <dd className="mt-1.5 text-xs text-gray-900 dark:text-white">
                            <a href="#" className="hover:underline">
                              {order?.orderId}
                            </a>
                          </dd>
                        </dl>

                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-sm  text-gray-500 dark:text-gray-400">
                            Date:
                          </dt>
                          <dd className="mt-1.5  text-xs text-gray-900 dark:text-white">
                            {new Date(order?.createdAt).toLocaleDateString()}
                          </dd>
                        </dl>

                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-sm  text-gray-500 dark:text-gray-400">
                            Price:
                          </dt>
                          <dd className="mt-1.5 text-xs text-gray-900 dark:text-white">
                            {renderPrice(order?.totalPrice)}
                          </dd>
                        </dl>
                        {order?.status === "pending" && (
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-sm  text-gray-500 dark:text-gray-400">
                              Status:
                            </dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs  text-primary-800 dark:bg-primary-900 dark:text-primary-300">
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
                            <dt className="text-sm  text-gray-500 dark:text-gray-400">
                              Status:
                            </dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs  text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
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
                            <dt className="text-sm  text-gray-500 dark:text-gray-400">
                              Status:
                            </dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs  text-green-800 dark:bg-green-900 dark:text-green-300">
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
                            <dt className="text-sm  text-gray-500 dark:text-gray-400">
                              Status:
                            </dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs  text-red-800 dark:bg-red-900 dark:text-red-300">
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
                        {order?.status === "received" && (
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-sm  text-gray-500 dark:text-gray-400">
                              Status:
                            </dt>
                            <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-blue-100 px-2.5 py-0.5 text-xs  text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              <FaGetPocket className="me-1" />
                              Received
                            </dd>
                          </dl>
                        )}
                        <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-44 lg:items-center lg:justify-end gap-4">
                          {order?.status === "received" && (
                            <GiveReview order={order} />
                          )}
                          {order?.status !== "received" && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleCancelOrder(order);
                              }}
                              disabled={order?.status === "cancelled"}
                              type="button"
                              className={`${
                                order?.status === "cancelled"
                                  ? "bg-gray-200 text-gray-400"
                                  : "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
                              } w-full rounded-lg px-3 py-2 text-xs  focus:outline-none  lg:w-auto`}
                            >
                              Cancel
                            </button>
                          )}

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleViewDetails(order);
                            }}
                            className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-1 py-2 text-xs  text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                          >
                            View details
                          </button>
                        </div>
                        <hr className="w-full my-4 border-gray-200 dark:border-gray-700" />
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
                  <h3 className="text-lg  text-center text-gray-900 dark:text-white">
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
                              <p className="text-sm  text-gray-900 dark:text-white">
                                {item?.name} - {item?.size} - {item?.color}
                              </p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {renderPrice(item?.discountPrice)} x {item?.quantity}
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
                    className="px-4 py-2 text-sm  text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          {isCancelModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg  text-gray-900 mb-4">
                  Are you sure you want to cancel the order?
                </h3>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeCancelModal}
                    className="px-4 py-2 text-sm  text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    No
                  </button>
                  <button
                    onClick={confirmCancel}
                    className="px-4 py-2 text-sm  text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default withProtectedRoute(CheckOrders);
