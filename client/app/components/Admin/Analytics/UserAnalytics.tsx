"use client"

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'

const UserAnalytics = () => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({})
  console.log(data)
  const lastMonthData = data?.lastMonthData?.last12Months || []

  return (
    <div className="w-full h-screen p-10 rounded-2xl mt-30 dark:bg-[#171717] bg-white">
      <h2 className="text-2xl font-semibold font-Poppins mb-4 dark:text-white text-black">
        User Growth (Last 12 Months)
      </h2>
      <div className="w-full h-[300px]">
        {isLoading ? (
          <p className="dark:text-white text-black">Loading...</p>
        ) : (
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer>
              <LineChart data={lastMonthData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="month" stroke="#8884d8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#8884d8" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontFamily: 'Poppins',
                  }}
                  labelStyle={{ color: '#333' }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAnalytics
