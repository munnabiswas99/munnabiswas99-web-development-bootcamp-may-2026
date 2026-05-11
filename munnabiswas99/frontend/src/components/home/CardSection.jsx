import React from "react";
import income from "../../assets/banner/income.jpg";
import { NavLink } from "react-router";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const CardSection = () => {
  return (
    <div className="my-10">
      <h1 className="text-xl md:text-5xl md:font-bold text-center mt-20 md:mt-30">
        From budgeting to investing <br /> everthing you need to <br />{" "}
        understand and optimize.
      </h1>
      <motion.div
        initial={{ opacity: 0, x:-100 }}
        transition={{duration: 2 }}
        whileInView={{opacity:1, x:0}}
        viewport={{ once: true}}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 mb-10">
        <div className="bg-blue-600 rounded-3xl p-6 shadow-2xl hover:scale-104 transition duration-400">
          <h1 className="text-2xl font-semibold text-white">Monthly Income</h1>

          <img
            className="rounded-2xl my-5 w-full h-52 object-cover"
            src={income}
            alt=""
          />

          <h1 className="text-2xl font-bold text-white mb-2">
            Understand Net Worth
          </h1>

          <p className="text-gray-200">
            View your assets and liabilities in one place.
          </p>
        </div>

        <div className="bg-[#56279c] rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-400">
          <h1 className="text-2xl font-semibold text-white">
            Recent Transaction
          </h1>

          <img
            className="rounded-2xl my-5 w-full h-52 object-cover"
            src={income}
            alt=""
          />

          <h1 className="text-2xl font-bold text-white mb-2">Track Spending</h1>

          <p className="text-gray-200">
            See where your money goes every month.
          </p>
        </div>

        <div className="bg-[#017c53] rounded-3xl p-6 shadow-2xl hover:scale-105 transition duration-300">
          <h1 className="text-2xl font-semibold text-white">Monthly Expense</h1>

          <img
            className="rounded-2xl my-5 w-full h-52 object-cover"
            src={income}
            alt=""
          />

          <h1 className="text-2xl font-bold text-white mb-2">Review Expense</h1>

          <p className="text-gray-200">
            Keep track of monthly expenses and identify opportunities to save
            more effectively.
          </p>
        </div>
      </motion.div>
      <NavLink
        to="/register"
        className="bg-primary-text text-black px-6 py-3 rounded flex gap-2 items-center w-56 font-semibold mx-auto"
      >
        Get started for free
        <FaArrowRight />
      </NavLink>
    </div>
  );
};

export default CardSection;
