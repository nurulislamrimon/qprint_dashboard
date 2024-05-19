import Image from "next/image";
import React from "react";
import imagePlaceHolder from "@/assets/productPlaceholder.svg";

const SliderSkeleton = () => {
  return (
    <div className="animate-pulse border rounded-md pr-1 pl-5 py-8">
      <div className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <div className="bg-gray-200 rounded-full h-2 w-14"></div>
            <div className="bg-gray-200 rounded-full h-2 w-20"></div>
          </div>
          <div className="bg-gray-200 rounded-full h-3 md:w-40 w-20"></div>
          <div className="flex flex-col gap-1">
            <div className="bg-gray-200 rounded-full h-2 w-48"></div>
            <div className="bg-gray-200 rounded-full h-2 w-48"></div>
          </div>
          <div className="bg-gray-200 rounded-md h-10 w-32"></div>
        </div>
        <div>
          <Image
            src={imagePlaceHolder}
            alt="loading-image"
            className="md:w-[200px] w-[150px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderSkeleton;
