"use client";
import { useGetEarningChartAllAmountQuery } from "@/store/features/dashboard/earningStatisticsChart/earningStatisticsChartApi";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DateRangePicker from "../shared/DateRangePicker";

const AnalyticesSellingChart = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data } = useGetEarningChartAllAmountQuery(
    `createdAt[lte]=${endDate}&createdAt[gte]=${startDate}`
  );

  useEffect(() => {
    const today = new Date();
    const lastSevenDays = new Date(today);
    lastSevenDays.setDate(today.getDate() - 7); // Subtract 6 to include today

    // Format dates to match the format of your data's 'createdAt' field (YYYY-MM-DD)
    const formattedStartDate = lastSevenDays.toISOString().split("T")[0];
    const formattedEndDate = today.toISOString().split("T")[0];

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  }, []);
  // const { data: fi, isError, isLoading } = useGetEarningChartAllAmountQuery("");
  const handleDateRangeChange = (range: {
    startDate: string;
    endDate: string;
  }) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };

  const formatYAxisTick = (tick: any) => {
    if (tick >= 1000) {
      return `${tick / 1000}k QR`;
    }
    return `${tick} QR`;
  };

  return (
    <div className=" md:border rounded-custom-10px md:p-4">
      <div className="flex items-center justify-between pb-5  px-4 md:px-0">
        <span className="[font-size:clamp(14px,3vw,18px)] font-medium whitespace-nowrap">
          Earning Statistics
        </span>
        <div>
          <DateRangePicker onChange={handleDateRangeChange} />
        </div>
      </div>
      <div className="w-full [height:clamp(300px,50vw,400px)] mx-auto pr-2.5 sm:pl-3.5 lg:pl-0">
        <ResponsiveContainer className={"[height:clamp(300px,50vw,400px)]"}>
          <AreaChart
            data={data?.data}
            margin={{
              top: 22,
              right: 0,
              left: 30,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="55%" stopColor="#7f35cd80" stopOpacity={1} />
                <stop offset="96%" stopColor="#fff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              // vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="createdAt"
              className="[font-size:clamp(12px,2vw,14px)]"
            />

            <YAxis
              tickFormatter={formatYAxisTick}
              // domain={[0, "dataMax"]}
              className="[font-size:clamp(12px,2vw,15px)]"
              tickMargin={10}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="totalAmount"
              stroke="#7f35cdcc"
              fill="url(#colorUv)"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticesSellingChart;
