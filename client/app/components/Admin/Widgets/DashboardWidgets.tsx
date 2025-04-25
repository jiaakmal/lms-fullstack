// components/DashboardWidgets.tsx
"use client";

import React from "react";
import { FaUsers, FaDollarSign } from "react-icons/fa";
import UserAnalytics from "../Analytics/UserAnalytics";
import AllInvoices from "../Orders/AllInvoices";

const widgetData = [
  {
    title: "Total Sales",
    value: "$10,500",
    icon: <FaDollarSign className="text-green-500 w-5 h-5" />, 
  },
  {
    title: "New Users",
    value: 245,
    icon: <FaUsers className="text-blue-500 w-5 h-5" />,
  },
];

const DashboardWidgets = () => {
  return (
    <div className="mt-8 px-4">
      <div className="bg-white dark:bg-[#171717] shadow-md rounded-2xl p-6 flex flex-col lg:flex-row gap-4 items-start min-h-[300px]">
        {/* Left Section - User Analytics */}
        <div className="w-full lg:w-3/4 h-full">
          <UserAnalytics />
        </div>

        {/* Right Section - Two stacked widgets */}
        <div className="w-full lg:w-1/4 flex flex-col  gap-40 mt-30">
          {widgetData.map((widget, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1f1f1f] shadow-md rounded-xl p-3 flex items-center gap-3"
            >
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                {widget.icon}
              </div>
              <div>
                <h3 className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {widget.title}
                </h3>
                <p className="text-lg font-semibold text-black dark:text-white">
                  {widget.value}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      <div className="flex flex-col gap-4">
          <AllInvoices/>

      </div>

    </div>
  );
};

export default DashboardWidgets;
