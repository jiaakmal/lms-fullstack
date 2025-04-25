// components/Analytics/AllInvoices.tsx
"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";

const AllInvoices = () => {
  const { data, isLoading } = useGetAllOrdersQuery({});

  const invoiceData = data?.orders?.map((order: any) => {
    const date = new Date(order.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return {
      month: `${month} ${year}`,
      amount: order.totalPrice,
    };
  }) || [];

  // Aggregate data by month
  const aggregatedData = invoiceData.reduce((acc: any, curr: any) => {
    const existing = acc.find((item: any) => item.month === curr.month);
    if (existing) {
      existing.amount += curr.amount;
    } else {
      acc.push({ month: curr.month, amount: curr.amount });
    }
    return acc;
  }, []);

  return (
    <div className="w-full h-screen p-10 rounded-2xl mt-10 dark:bg-[#171717] bg-white">
      <h2 className="text-2xl font-semibold font-Poppins mb-4 dark:text-white text-black">
        All Invoices (Monthly Revenue)
      </h2>
      <div className="w-full h-[300px]">
        {isLoading ? (
          <p className="dark:text-white text-black">Loading...</p>
        ) : (
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer>
              <AreaChart data={aggregatedData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="month" stroke="#8884d8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#8884d8" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontFamily: "Poppins",
                  }}
                  labelStyle={{ color: "#333" }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  fill="#d1fae5"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInvoices;
