import React from "react";
import Cards from "../../components/dashboard/Cards";
import Barchart from "../../components/dashboard/Barchart";
import OverviewPieChart from "../../components/dashboard/OverviewPieChart";
import ExpenseLineChart from "../../components/dashboard/ExpenseLineChart";
import IncomeLineChart from "../../components/dashboard/IncomeLineChart";

const Dashboard = () => {
  return (
    <div>
      <Cards></Cards>
      <Barchart />
      <div className="md:flex gap-2 my-5 ">
        <IncomeLineChart></IncomeLineChart>
        <ExpenseLineChart></ExpenseLineChart>
      </div>
      <OverviewPieChart></OverviewPieChart>
    </div>
  );
};

export default Dashboard;
