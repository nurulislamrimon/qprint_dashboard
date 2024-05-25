"use client";
import { useGetOrderReportQuery } from "@/store/features/analytics/orderReportChart/orderReportChartApi";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
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
  // Utility function to format date to 'YYYY-MM-DD'
  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  useEffect(() => {
    const today = new Date();
    const lastSevenDays = new Date();
    lastSevenDays.setDate(today.getDate() - 7);

    setStartDate(formatDate(lastSevenDays));
    setEndDate(formatDate(today));
  }, []);

  const handleDateRangeChange = (range: any) => {
    const { startDate, endDate } = range;
    setStartDate(formatDate(new Date(startDate)));
    setEndDate(formatDate(new Date(endDate)));
  };

  return (
    <div className="w-full h-full md:h-[480px] md:w-[65%] md:border rounded-custom-10px md:px-4 md:pt-4">
      <div className="flex items-center justify-between  mb-3">
        <span className="[font-size:clamp(14px,4vw,18px)] font-medium whitespace-nowrap px-3 md:px-7">
          Order Report
        </span>
        <DateRangePicker
          selectedDateRange={{ startDate, endDate }}
          onChange={handleDateRangeChange}
        />
      </div>
      <div className="w-full h-full md:h-[375px] mx-auto pr-2.5 md:pr-0">
        {isLoading ? (
          <OrderReportChartSkaleton />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.data} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                className="[font-size:clamp(13.5px,2vw,16px)]"
              />
              <YAxis className="[font-size:clamp(13.5px,2vw,16px)]" />
              <Tooltip />
              <Bar
                dataKey="Delivered"
                radius={[20, 20, 0, 0]}
                barSize={15}
                fill="rgba(3, 166, 9, 1)"
              />
              <Bar
                dataKey="Returned"
                radius={[20, 20, 0, 0]}
                barSize={15}
                fill="#FF7500"
              />
              <Bar
                dataKey="Shipping"
                radius={[20, 20, 0, 0]}
                barSize={15}
                fill="#7758B5"
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
