import React from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router";

const transactions = [
  {
    id: 1,
    title: "Salary",
    type: "Income",
    category: "Job",
    amount: 50000,
    date: "12 Aug 2026",
  },
  {
    id: 2,
    title: "Groceries",
    type: "Expense",
    category: "Food",
    amount: 2500,
    date: "10 Aug 2026",
  },
  {
    id: 3,
    title: "Stock Investment",
    type: "Investment",
    category: "Stock",
    amount: 10000,
    date: "08 Aug 2026",
  },
  {
    id: 4,
    title: "Emergency Savings",
    type: "Savings",
    category: "Bank",
    amount: 5000,
    date: "05 Aug 2026",
  },
];

const Transactions = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>

        <NavLink to='/dashboard/add-transaction'>
            <button className="bg-mist-600 px-5 py-3 rounded-2xl text-white cursor-pointer hover:opacity-90 transition">
                Add Transaction
            </button>
        </NavLink>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-gray-200 rounded-3xl shadow-lg">
        <table className="w-full text-left">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Category</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-300 hover:bg-gray-300 transition"
              >
                <td className="p-4 font-medium">{transaction.title}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      transaction.type === "Income"
                        ? "bg-green-200 text-green-700"
                        : transaction.type === "Expense"
                          ? "bg-red-200 text-red-700"
                          : transaction.type === "Investment"
                            ? "bg-blue-200 text-blue-700"
                            : "bg-purple-200 text-purple-700"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>

                <td className="p-4">{transaction.category}</td>

                <td className="p-4 font-semibold">৳ {transaction.amount}</td>

                <td className="p-4">{transaction.date}</td>

                <td className="flex text-xl gap-6 p-4">
                  <button className="cursor-pointer">
                    <IoEyeSharp />
                  </button>
                  <button className="cursor-pointer">
                    <FaEdit />
                  </button>
                  <button className="cursor-pointer">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gray-200 rounded-2xl p-4 shadow-lg"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">{transaction.title}</h2>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  transaction.type === "Income"
                    ? "bg-green-200 text-green-700"
                    : transaction.type === "Expense"
                      ? "bg-red-200 text-red-700"
                      : transaction.type === "Investment"
                        ? "bg-blue-200 text-blue-700"
                        : "bg-purple-200 text-purple-700"
                }`}
              >
                {transaction.type}
              </span>
            </div>

            <div className="space-y-2 text-sm flex justify-between">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Category:</span>
                  {transaction.category}
                </p>

                <p>
                  <span className="font-semibold">Amount:</span>৳{" "}
                  {transaction.amount}
                </p>

                <p>
                  <span className="font-semibold">Date:</span>
                  {transaction.date}
                </p>
              </div>

              <div className="flex flex-col text-xl gap-2 mr-5">
                <button className="cursor-pointer">
                  <IoEyeSharp />
                </button>
                <button className="cursor-pointer">
                  <FaEdit />
                </button>
                <button className="cursor-pointer">
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
