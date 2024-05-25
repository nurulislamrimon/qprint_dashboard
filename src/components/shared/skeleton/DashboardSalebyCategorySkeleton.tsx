import Image from "next/image";
import React from "react";
import dashboardSalebyCategorySkeleton from "@/assets/dashboardSalebyCategorySkeleton.png";

const DashboardSalebyCategorySkeleton = () => {
  return (
    <div className="animate-pulse w-full h-full flex items-center justify-center">
      <Image
        src={dashboardSalebyCategorySkeleton}
        alt=""
        priority={true}
        className="w-[150px] md:w-[200px]  h-[150px] md:h-[200px] "
      />
    </div>
  );
};

export default DashboardSalebyCategorySkeleton;
