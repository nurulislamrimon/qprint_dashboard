"use client";
import { topCustomer } from "@/constants/analyticesTopCustomer.constants";
import React from "react";
import AllTopCustomer from "./AllTopCustomer";
import { useGetEarningStatisticsQuery } from "@/store/features/analytics/earningStatistics/earningStatisticsApi";
import UserCardSkeleton from "../shared/skeleton/UserCardSkeleton";

const TopCustomers = () => {
  const { data, isLoading } = useGetEarningStatisticsQuery("");
  return (
    <div className="w-full md:w-[65%] h-[522px] border rounded-custom-10px  overflow-hidden">
      <div className="flex items-center justify-between pb-5 border-b  w-full px-7 py-6 mx-auto">
        <span className="text-black-rgba-80 [font-size:clamp(16px,3vw,19px)] font-medium">
          Top Customers
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 overflow-auto h-full px-7 pb-[20%] mx-auto">
        {isLoading
          ? [...Array(6)].map((_, index) => {
              return <UserCardSkeleton key={index} />;
            })
          : data?.data?.map((topCustomer: any, index: number) => (
              <AllTopCustomer
                key={index}
                topCustomer={topCustomer}
                index={index}
                isLoading={isLoading}
              />
            ))}
      </div>
    </div>
  );
};

export default TopCustomers;
