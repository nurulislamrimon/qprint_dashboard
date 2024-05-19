import Image from "next/image";
import React from "react";
import placeHolder from "@/assets/productPlaceholder.svg";

const DealsOfTheDaySkeleton = () => {
  return (
    <div className="flex-1 border animate-pulse  rounded-custom-10px px-5 flex items-center justify-between">
      <div className="flex flex-col gap-5">
        <div className="bg-gray-400 !rounded-md w-[77px] h-[28px] "></div>
        <div className="flex flex-col gap-2.5">
          <div className="bg-gray-400 rounded-md h-2  md:w-80"></div>
          <div className="bg-gray-400 rounded-md h-2  md:w-72"></div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="bg-gray-400 rounded-md h-2  md:w-64"></div>
          <div className="bg-gray-400 rounded-md h-2  md:w-60"></div>
        </div>

        <div className="bg-gray-400  w-[142px] h-[44px] !rounded-sm"></div>
      </div>

      <Image
        src={placeHolder}
        alt="placeholder image for deals of the day"
        className="md:w-[260px] md:h-[292px] h-[150px] w-[150px]"
      />
    </div>
  );
};

export default DealsOfTheDaySkeleton;
