"use client";
import React from "react";
import TotalSelsSummary from "../shared/analytices/TotalSelsSummary";
import TotalSoldAmoutIcon from "@/assets/TotalSoldAmountIcon.svg";
import ProductSoldIcon from "@/assets/ProductSoldIcon.svg";
import Customer from "@/assets/AnalyticesCustomerIcon.svg";
import { IconTrendingUp } from "@tabler/icons-react";
import {
  useGetAllUsersQuery,
  useGetLast30DaysTotalSoldAmountQuery,
  useGetProductSoldQuery,
  useGetTotalSoldAmountQuery,
} from "@/store/features/analytics/totalSelsSummarys/totalSelsSummarysApi";
import { useAppSelector } from "@/store/hook";
import { calculatePercentageDifference } from "@/utils/parcentageCalculationFn/parcentageCalculationFn";

const TotalSelsSummarys = () => {
  const { data: totalSoldAmount } = useGetTotalSoldAmountQuery("");
  const { data: totalProductSold } = useGetProductSoldQuery(
    "orderStatus.status=Delivered"
  );
  const { data: allUsers } = useGetAllUsersQuery("");

  const { last30Days, last60Days, currentDate } = useAppSelector(
    (state) => state.allOrderReportDetails
  );
  // total Amount start

  const { data: dataLast30Days } = useGetLast30DaysTotalSoldAmountQuery(
    `orderStatus.status=Delivered${
      last30Days && currentDate
        ? `&createdAt[gte]=${last30Days}&createdAt[lte]=${currentDate}`
        : ""
    }`
  );

  // Fetch data for the last 60 days
  const { data: dataLast60Days } = useGetLast30DaysTotalSoldAmountQuery(
    `orderStatus.status=Delivered${
      last60Days && currentDate
        ? `&createdAt[gte]=${last60Days}&createdAt[lte]=${currentDate}`
        : ""
    }`
  );

  const { percentage: parcentageNumber, icon: trendingIcon } =
    calculatePercentageDifference(
      dataLast30Days?.data?.map((data: any) => data.totalAmount),
      dataLast60Days?.data?.map((data: any) => data.totalAmount)
    );
  // total Amount end

  // total Amount sold product

  const { data: dataLast30Day } = useGetProductSoldQuery(
    `orderStatus.status=Delivered${
      last30Days && currentDate
        ? `&createdAt[gte]=${last30Days}&createdAt[lte]=${currentDate}`
        : ""
    }`
  );

  // Fetch data for the last 60 days
  const { data: dataLast60Day } = useGetProductSoldQuery(
    `orderStatus.status=Delivered${
      last60Days && currentDate
        ? `&createdAt[gte]=${last60Days}&createdAt[lte]=${currentDate}`
        : ""
    }`
  );

  const { percentage: parcentageProductSold, icon: trendingIconsProductSold } =
    calculatePercentageDifference(
      dataLast30Day?.data?.map((data: any) => data.totalAmount),
      dataLast60Day?.data?.map((data: any) => data.totalAmount)
    );
  // total sold Product end

  // All User query parcenatage Start

  const { data: Last30Day } = useGetProductSoldQuery(
    `orderStatus.status=Delivered${
      last30Days && currentDate
        ? `&createdAt[gte]=${last30Days}&createdAt[lte]=${currentDate}`
        : ""
    }`
  );
  // Fetch data for the last 60 days
  const { data: Last60Day } = useGetProductSoldQuery(
    `orderStatus.status=Delivered${
      last60Days && currentDate
        ? `&createdAt[gte]=${last60Days}&createdAt[lte]=${currentDate}`
        : ""
    }`
  );

  const {
    percentage: parcentageTotalCustomer,
    icon: trendingIconsTotalCustomer,
  } = calculatePercentageDifference(
    Last30Day?.data?.map((data: any) => data.totalAmount),
    Last60Day?.data?.map((data: any) => data.totalAmount)
  );

  // All User  query parcantage end

  return (
    <div className="w-full h-[522px]  md:w-[35%] flex justify-between flex-col gap-5 overflow-auto">
      <TotalSelsSummary
        totalSelsSummaryMainClass="hover:border-fuchsia-600"
        totalSelsSummaryIconClass="bg-[#EFFFED]"
        totalSelsSummaryIcon={TotalSoldAmoutIcon}
        altName=""
        imageClassName=""
        totalSelsSummaryTitle="Total Sold Amount"
        totalSelsSummaryPrice={
          totalSoldAmount
            ? totalSoldAmount?.data?.map((data: any) => data?.totalAmount)
            : "0.00"
        }
        tendingIcon={trendingIcon}
        tendingIconClass={
          parcentageNumber >= 0 ? "text-[#FF0000]" : "text-green-600"
        }
        percentage={parcentageNumber ? parcentageNumber.toFixed(0) : 0}
        QR="QR"
        TotalSelsSummarySubtitle={
          parcentageNumber >= 0 ? "decrease" : " increase"
        }
      />
      {/* Product Sold */}
      <TotalSelsSummary
        totalSelsSummaryMainClass="hover:border-fuchsia-600"
        totalSelsSummaryIconClass="bg-[#FFF7F1]"
        totalSelsSummaryIcon={ProductSoldIcon}
        altName=""
        imageClassName=""
        totalSelsSummaryTitle="Product Sold"
        totalSelsSummaryPrice={
          totalProductSold
            ? totalProductSold?.data?.map((data: any) => data?.totalAmount)
            : "0.00"
        }
        tendingIcon={trendingIconsProductSold}
        tendingIconClass={
          parcentageProductSold >= 0 ? "text-[#FF0000]" : "text-green-600"
        }
        percentage={
          parcentageProductSold ? Math.abs(parcentageProductSold).toFixed(0) : 0
        }
        TotalSelsSummarySubtitle={
          parcentageProductSold >= 0 ? "decrease" : " increase"
        }
      />
      {/* Customer */}
      <TotalSelsSummary
        totalSelsSummaryMainClass="hover:border-fuchsia-600"
        totalSelsSummaryIconClass="bg-[#F2EBFF]"
        totalSelsSummaryIcon={Customer}
        altName=""
        imageClassName=""
        totalSelsSummaryTitle="Custommer"
        totalSelsSummaryPrice={allUsers ? allUsers?.meta?.total : "0.00"}
        tendingIcon={trendingIconsTotalCustomer}
        tendingIconClass={
          parcentageTotalCustomer >= 0 ? "text-[#FF0000]" : "text-green-600"
        }
        percentage={
          parcentageTotalCustomer
            ? Math.abs(parcentageTotalCustomer).toFixed(0)
            : 0
        }
        TotalSelsSummarySubtitle={
          parcentageTotalCustomer >= 0 ? "decrease" : " increase"
        }
      />
    </div>
  );
};

export default TotalSelsSummarys;
