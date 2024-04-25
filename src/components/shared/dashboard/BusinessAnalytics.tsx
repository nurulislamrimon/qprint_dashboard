import React, { Key } from "react";
import Image from "next/image";
interface BusinessAnalyticsProps {
  icon?: any;
  businessAnalyticsCardClass?: string;
  businessAnalyticsIconBg?: string;
  statusName?: string;
  itemQuantity?: number;
  altName?: string;
}

const BusinessAnalytics = ({
  icon,
  statusName,
  businessAnalyticsCardClass,
  itemQuantity,
  businessAnalyticsIconBg,
  altName = "",
}: BusinessAnalyticsProps) => {
  return (
    <div
      className={`flex items-center w-full px-4 border rounded-[5px]  hover:duration-300 cursor-pointer  ${businessAnalyticsCardClass}`}
    >
      <div className="py-6 pl-5 flex items-center gap-x-5">
        <Image
          className={`rounded-full p-3 w-auto ${businessAnalyticsIconBg}`}
          src={icon}
          alt={altName || ""}
        />
        <div className="flex flex-col gapy-y-[6px]">
          <span className="text-[#00000099] text-base [font-size:clamp(15px,3vw,16px)] whitespace-nowrap">
            {statusName}
          </span>
          <strong className="text-[22px]">{itemQuantity}</strong>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalytics;
