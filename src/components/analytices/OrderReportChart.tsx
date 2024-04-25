"use client";
import { useGetOrderReportQuery } from "@/store/features/analytics/orderReportChart/orderReportChartApi";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DateRangePicker from "../shared/DateRangePicker";
import OrderReportChartSkaleton from "../shared/skeleton/OrderReportChartSkaleton";

const OrderReportChart = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data, isLoading } = useGetOrderReportQuery(
    `createdAt[gte]=${startDate}&createdAt[lt]=${endDate}`
  );

  useEffect(() => {
    const today = new Date();
    const lastSevenDays = new Date(today);
    lastSevenDays.setDate(today.getDate() - 6); // Subtract 6 to include today

    // Format dates to match the format of your data's 'createdAt' field (YYYY-MM-DD)
    const formattedStartDate = lastSevenDays.toISOString().split("T")[0];
    const formattedEndDate = today.toISOString().split("T")[0];

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  }, []);

  const handleDateRangeChange = (range: {
    startDate: string;
    endDate: string;
  }) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };

  return (
    <div className="w-full md:w-[65%] md:border rounded-custom-10px md:p-4">
      <div className="flex items-center justify-between pb-5 px-4 md:px-7">
        <span className="[font-size:clamp(14px,4vw,18px)] font-medium whitespace-nowrap">
          Order Report
        </span>
        <div>
          <DateRangePicker
            // selectedDateRange={selectedDateRange}
            onChange={handleDateRangeChange}
          />
        </div>
      </div>
      <div className="w-full h-[267px] md:h-[400px] mx-auto pr-2.5 md:pr-0">
        {isLoading ? (
          <div className="flex items-end justify-end ml-8 mb-3 ">
            <OrderReportChartSkaleton />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="date"
                scale="point"
                className="[font-size:clamp(13.5px,2vw,16px)]"
              />
              <YAxis className="[font-size:clamp(13.5px,2vw,16px)]" />
              <Tooltip />
              {/* <Legend /> */}
              <Bar
                dataKey="Delivered"
                radius={[20, 20, 0, 0]}
                barSize={15}
                fill="rgba(3, 166, 9, 1)"
              />
              <Bar
                dataKey="Returned"
                //   radius={20}
                radius={[20, 20, 0, 0]}
                barSize={15}
                fill="#FF7500"
              />
              <Bar
                radius={[20, 20, 0, 0]}
                dataKey="Shipping"
                fill="#7758B5"
                barSize={15}
              />
              <Bar
                dataKey="Cancelled"
                radius={[20, 20, 0, 0]}
                barSize={15}
                fill="rgba(0, 0, 0, 0.5)"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default OrderReportChart;
