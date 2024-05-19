"use client";
import { useGetOnlineOrderQuery } from "@/store/features/order/onlineOrderApi";
import { useAppSelector } from "@/store/hook";
import { calculatePercentageDifference } from "@/utils/parcentageCalculationFn/parcentageCalculationFn";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface OrderReportDetailsProps {
  icon?: string | any;
  altName?: string;
  orderReportTitle?: string;
  tendingIcon?: string | any;

  firstCircleClassName?: string;
  secondCircleClassName?: string;
  imageClassName?: string;
  percentage?: number;
  tendingIConClassName?: string;
  orderReportCardMainClass?: string;
  initialProgress: number;
  status: string;
}

const OrderReportDetail = ({
  status,
  icon,
  altName,
  orderReportTitle,
  // tendingIcon,

  imageClassName,
  firstCircleClassName,
  secondCircleClassName,
  tendingIConClassName,
  orderReportCardMainClass,
  initialProgress = 0,
}: OrderReportDetailsProps) => {
  const [progress, setProgress] = useState(initialProgress);
  // build time problem solved
  const isBrowser = () => typeof window !== "undefined";

  useEffect(() => {
    setProgress(initialProgress); // Update progress when initialProgress changes
    const updateProgress = (value: number) => {
      if (!isBrowser) return;
      const progressCircle = document
        .getElementById(`progressGroup-${initialProgress}`)
        ?.querySelector("circle");
      if (!isBrowser) return;
      const progressText = document.getElementById(
        `progressText-${initialProgress}`
      );

      if (!progressCircle || !progressText || isNaN(value)) return;

      const dashArray = 100;
      const dashOffset = dashArray - (value * dashArray) / 100;

      progressCircle.setAttribute("stroke-dashoffset", dashOffset.toString());

      progressText.textContent = isNaN(value) ? "0" : value.toString();
    };

    updateProgress(progress); // Trigger progress update when progress changes
  }, [progress, initialProgress]);

  //==================== handle it later ====================//

  const { last30Days, last60Days, currentDate } = useAppSelector(
    (state) => state.allOrderReportDetails
  );

  // Fetch data for the last 30 days
  const { data: dataLast30Days } = useGetOnlineOrderQuery(
    `orderStatus.status=${status}${
      last30Days && currentDate
        ? `&createdAt[gte]=${last30Days}&createdAt[lte]=${currentDate}`
        : ""
    }`
  );

  // Fetch data for the last 60 days
  const { data: dataLast60Days } = useGetOnlineOrderQuery(
    `orderStatus.status=${status}${
      last60Days && currentDate
        ? `&createdAt[gte]=${last60Days}&createdAt[lte]=${currentDate}`
        : ""
    }`
  );

  // get percentage
  // const calculatePercentageDifference = (
  //   last30days: number,
  //   last60days: number
  // ) => {
  //   if (last30days === 0) {
  //     return last60days > 0 ? 100 : 0;
  //   }

  //   const firstMonth = last60days - last30days;
  //   const decreasePercentage = ((firstMonth - last30days) / firstMonth) * 100;

  //   return decreasePercentage;
  // };

  // const calculatePercentageDifference = (
  //   last30days: number,
  //   last60days: number
  // ): { percentage: number; icon: React.ReactNode } => {
  //   let percentage = 0;
  //   let icon: React.ReactNode = null;

  //   if (last30days === 0) {
  //     percentage = last60days > 0 ? 100 : 0;
  //     if (percentage > 0) {
  //       icon = <IconTrendingUp style={{ color: "green" }} />;
  //     }
  //   } else {
  //     const firstMonth = last60days - last30days;
  //     percentage = ((firstMonth - last30days) / firstMonth) * 100;

  //     if (percentage <= 0) {
  //       icon = <IconTrendingUp style={{ color: "green" }} />;
  //     } else if (percentage >= 0) {
  //       icon = <IconTrendingDown style={{ color: "red" }} />;
  //     }
  //   }

  //   return { percentage, icon };
  // };

  const { percentage: parcentageNumber, icon: trendingIcon } =
    calculatePercentageDifference(
      dataLast30Days?.meta?.total,
      dataLast60Days?.meta?.total
    );
  return (
    <div
      className={` ${orderReportCardMainClass} w-full px-1 py-[20px] md:py-0 border rounded-md hover:duration-300 flex items-center justify-between`}
    >
      <div className="pl-1 flex items-center gap-x-2 w-[80%]">
        <div className="flex items-center justify-center w-[50px] shrink-0">
          <Image
            src={icon}
            alt={`${altName}`}
            className={`${imageClassName}`}
          />
        </div>

        <div className="flex flex-col gap-y-3.5">
          <span className="text-base text-black-opacity-60 [font-size:clamp(10px,20vw,16px)]">
            {orderReportTitle}
          </span>
          <div
            className={`${tendingIConClassName}  [font-size:clamp(10px,10vw,16px)] flex items-center gap-x-1.5`}
          >
            {trendingIcon}
            <span
              className={`${
                parcentageNumber >= 0 ? "text-[#FF0000]" : "text-green-600"
              }`}
            >
              {/* {parcentageNumberColor} */}
              {Math.abs(parcentageNumber).toFixed(0)}%
            </span>
            <span className="[font-size:clamp(8px,70vw,13px)] whitespace-nowrap text-gray-400/70 line-clamp-1">
              {parcentageNumber >= 0 ? "Drop" : " Raise"} last 1 month
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-[58px] h-[58px]">
        <svg className="h-full w-full" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={`stroke-current ${firstCircleClassName}`}
            strokeWidth="2"
          ></circle>
          <g
            id={`progressGroup-${initialProgress}`}
            className="origin-center -rotate-90 transform"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className={`${secondCircleClassName} stroke-current text-green-colors`}
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset="75"
            ></circle>
          </g>
        </svg>
        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center text-sm text-black-only">
          <span id={`progressText-${initialProgress}`}>
            {progress.toString()}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderReportDetail;
