import React from "react";

function LastTransaction({ transactions }) {
  return (
    <div className="max-w-4xl  bg-white p-6 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Last Transactions</h2>
        <a href="#view-all" className="text-blue-500 hover:underline text-sm">
          View All
        </a>
      </div>
      <div className="overflow-x-auto ">
        <table className="table-auto w-full border-collapse ">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                ID
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Issued Date
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Total
              </th>
              <th className="text-left px-4 py-2 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{transaction.id}</td>
                <td className="px-4 py-2 text-sm">{transaction.date}</td>
                <td className="px-4 py-2 text-sm">{transaction.total}</td>
                <td className="px-4 py-2 text-sm">
                  <a
                    href="#view-detail"
                    className="text-blue-500 hover:underline"
                  >
                    View Detail
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LastTransaction;
