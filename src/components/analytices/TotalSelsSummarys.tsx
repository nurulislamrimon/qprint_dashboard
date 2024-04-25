"use client";
import React from "react";
import TotalSelsSummary from "../shared/analytices/TotalSelsSummary";
import TotalSoldAmoutIcon from "@/assets/TotalSoldAmountIcon.svg";
import ProductSoldIcon from "@/assets/ProductSoldIcon.svg";
import Customer from "@/assets/AnalyticesCustomerIcon.svg";
import { IconTrendingUp } from "@tabler/icons-react";
import {
  useGetAllUsersQuery,
  useGetProductSoldQuery,
  useGetTotalSoldAmountQuery,
} from "@/store/features/analytics/totalSelsSummarys/totalSelsSummarysApi";

const TotalSelsSummarys = () => {
  const { data: totalSoldAmount } = useGetTotalSoldAmountQuery("");
  const { data: totalProductSold } = useGetProductSoldQuery(
    "orderStatus.status=Delivered"
  );
  const { data: allUsers } = useGetAllUsersQuery("");

  return (
    <div className="w-full h md:w-[35%] flex justify-between flex-col gap-5">
      <TotalSelsSummary
        totalSelsSummaryMainClass="hover:border-fuchsia-600"
        totalSelsSummaryIconClass="bg-[#EFFFED]"
        totalSelsSummaryIcon={TotalSoldAmoutIcon}
        altName=""
        imageClassName=""
        totalSelsSummaryTitle="Total Sold Amount"
        totalSelsSummaryPrice={totalSoldAmount?.data?.map(
          (data: any) => data?.totalAmount
        )}
        tendingIcon={<IconTrendingUp />}
        tendingIconClass=""
        percentage={10}
        QR="QR"
        TotalSelsSummarySubtitle="in the last 1 month"
      />
      {/* Product Sold */}
      <TotalSelsSummary
        totalSelsSummaryMainClass="hover:border-fuchsia-600"
        totalSelsSummaryIconClass="bg-[#FFF7F1]"
        totalSelsSummaryIcon={ProductSoldIcon}
        altName=""
        imageClassName=""
        totalSelsSummaryTitle="Product Sold"
        totalSelsSummaryPrice={totalProductSold?.data?.map(
          (data: any) => data?.totalAmount
        )}
        tendingIcon={<IconTrendingUp />}
        tendingIconClass=""
        percentage={10}
        TotalSelsSummarySubtitle="in the last 1 month"
      />
      {/* Customer */}
      <TotalSelsSummary
        totalSelsSummaryMainClass="hover:border-fuchsia-600"
        totalSelsSummaryIconClass="bg-[#F2EBFF]"
        totalSelsSummaryIcon={Customer}
        altName=""
        imageClassName=""
        totalSelsSummaryTitle="Custommer"
        totalSelsSummaryPrice={allUsers?.meta?.total}
        tendingIcon={<IconTrendingUp />}
        tendingIconClass="text-[#ff7d7d]"
        percentage={10}
        TotalSelsSummarySubtitle="in the last 1 month"
      />
    </div>
  );
};

export default TotalSelsSummarys;
