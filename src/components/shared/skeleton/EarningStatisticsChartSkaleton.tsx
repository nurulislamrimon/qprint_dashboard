import React from "react";

const EarningStatisticsChartSkeleton = () => {
  return (
    <div className="border rounded-md p-4">
      {/* Title */}
      <h2 className="text-black-rgba-80 text-base md:text-custom18px font-medium mb-5">
        Earning Statistics
      </h2>

      {/* Date Range Picker */}
      <div className="flex items-center justify-between mb-5">
        {/* Skeleton for date range picker */}
        <div className="bg-gray-200 h-8 w-1/4 rounded-md"></div>
        {/* Skeleton for date range picker */}
        <div className="bg-gray-200 h-8 w-1/4 rounded-md"></div>
      </div>

      {/* Skeleton for chart */}
      <div className="h-64 border border-gray-300 rounded-md flex items-center justify-center">
        {/* Loading animation */}
        <div className="animate-pulse rounded-md bg-gray-200 h-3/4 w-3/4"></div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between mt-2">
        {/* Skeleton for X-axis labels */}
        <div className="w-1/4 h-4 bg-gray-200 rounded-md"></div>
        {/* Skeleton for X-axis labels */}
        <div className="w-1/4 h-4 bg-gray-200 rounded-md"></div>
        {/* Skeleton for X-axis labels */}
        <div className="w-1/4 h-4 bg-gray-200 rounded-md"></div>
        {/* Skeleton for X-axis labels */}
        <div className="w-1/4 h-4 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default EarningStatisticsChartSkeleton;
