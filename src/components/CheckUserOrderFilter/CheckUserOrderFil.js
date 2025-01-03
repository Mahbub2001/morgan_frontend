import React from "react";

function CheckUserOrderFilter({ setOrderType, setDuration, orderType, duration }) {
  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };
  return (
    <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
      <div>
        <label
          htmlFor="order-type"
          className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Select order type
        </label>
        <select
          id="order-type"
          value={orderType}
          onChange={handleOrderTypeChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        >
          <option value="all-orders">All orders</option>
          <option value="pre-order">Pending</option>
          <option value="transit">In transit</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <span className="inline-block text-gray-500 dark:text-gray-400">
        from
      </span>

      <div>
        <label
          htmlFor="duration"
          className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Select duration
        </label>
        <select
          id="duration"
          value={duration}
          onChange={handleDurationChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
        >
          <option value="this-week">this week</option>
          <option value="this-month">this month</option>
          <option value="last-3-months">the last 3 months</option>
          <option value="last-6-months">the last 6 months</option>
          <option value="this-year">this year</option>
        </select>
      </div>
    </div>
  );
}

export default CheckUserOrderFilter;
