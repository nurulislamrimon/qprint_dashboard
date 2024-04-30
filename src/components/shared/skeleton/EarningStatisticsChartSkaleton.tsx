import Image from "next/image";
import React from "react";
import earnignStatisticsSkaleton from "@/assets/DashboardEarningStaticsSkaleton.png";

const EarningStatisticsChartSkeleton = () => {
  return (
    <div className="animate-pulse w-full h-full">
      <Image
        src={earnignStatisticsSkaleton}
        alt=""
        priority={true}
        className="w-full h-full"
      />
    </div>
  );
};

export default EarningStatisticsChartSkeleton;
