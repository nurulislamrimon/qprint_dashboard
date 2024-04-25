import Image from "next/image";
import React from "react";
interface TotalSelsSummaryProps {
  totalSelsSummaryMainClass?: string;
  totalSelsSummaryIconClass?: string;
  totalSelsSummaryIcon?: string | any;
  totalSelsSummaryTitle?: string;
  totalSelsSummaryPrice?: any;
  tendingIcon?: string | any;
  percentage?: number | number;
  TotalSelsSummarySubtitle?: string;
  altName?: string;
  imageClassName?: string;
  tendingIconClass?: string;
  QR?: string;
}

const TotalSelsSummary = ({
  totalSelsSummaryMainClass,
  totalSelsSummaryIconClass,
  totalSelsSummaryIcon,
  totalSelsSummaryTitle,
  totalSelsSummaryPrice,
  tendingIcon,
  percentage,
  TotalSelsSummarySubtitle,
  altName,
  imageClassName,
  tendingIconClass,
  QR,
}: TotalSelsSummaryProps) => {
  return (
    <div
      className={`${totalSelsSummaryMainClass} flex items-start justify-between flex-col gap-4 border rounded-custom-10px py-[22px] pl-6  `}
    >
      <span className="flex">
        <span
          className={`${totalSelsSummaryIconClass} text-base p-1 rounded-full mr-2`}
        >
          <Image
            src={totalSelsSummaryIcon}
            alt={`${altName}`}
            className={`${imageClassName}`}
          />
        </span>
        {totalSelsSummaryTitle}
      </span>
      <strong className="font-semibold [font-size:clamp(18px,4vw,23px)] flex items-center gap-1">
        {totalSelsSummaryPrice} {QR}
      </strong>
      <span className="text- [font-size:clamp(14px,4vw,16px)] md:text-base flex">
        <span
          className={`${tendingIconClass} font-medium mr-1.5 flex items-center gap-1.5 text-[#83AD7D]`}
        >
          {tendingIcon} {percentage} %
        </span>
        <span className="text-[#ABABAB]">{TotalSelsSummarySubtitle}</span>
      </span>
    </div>
  );
};

export default TotalSelsSummary;
