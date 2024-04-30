"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface OrderReportDetailsProps {
  icon?: string | any;
  altName?: string;
  orderReportTitle?: string;
  tendingIcon?: string | any;
  parcentageNumber?: string | number;
  firstCircleClassName?: string;
  secondCircleClassName?: string;
  imageClassName?: string;
  percentage?: number;
  tendingIConClassName?: string;
  orderReportCardMainClass?: string;
  initialProgress: number;
}

const OrderReportDetail = ({
  icon,
  altName,
  orderReportTitle,
  tendingIcon,
  parcentageNumber,
  imageClassName,
  firstCircleClassName,
  secondCircleClassName,
  tendingIConClassName,
  orderReportCardMainClass,
  initialProgress = 0,
}: OrderReportDetailsProps) => {
  const [progress, setProgress] = useState(initialProgress);
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

  return (
    <div
      className={` ${orderReportCardMainClass} w-full px-4 border rounded-custom-5px hover:duration-300 flex items-center justify-between`}
    >
      <div className="py-6 pl-5 flex items-center gap-x-5">
        <Image src={icon} alt={`${altName}`} className={`${imageClassName}`} />
        <div className="flex flex-col gap-y-3.5">
          <span className="text-base text-black-opacity-60">
            {orderReportTitle}
          </span>
          <span
            className={`${tendingIConClassName} text-base flex items-center gap-x-1.5 `}
          >
            {tendingIcon}
            <span>{parcentageNumber}</span>
          </span>
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
