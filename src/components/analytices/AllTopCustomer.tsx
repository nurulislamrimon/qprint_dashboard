import { mainUrl } from "@/constants/mainUrl";
import Image from "next/image";
import React from "react";
import personPlaceHolder from "@/assets/personPlaceholder.png";
// interface AllTopCustomerProps {
//   customerName?: string;
//   profileImage?: string;
//   ranking?: string;
//   totalOrder?: number;
// }

const AllTopCustomer = ({ topCustomer, index, isLoading }: any) => {
  // const { customerName, profileImage, ranking, totalOrder } = topCustomer;
  return (
    <div className="border rounded-custom-5px flex flex-col items-center gap-3.5 justify-center py-3.5 w-full mt-5">
      <div className="flex flex-col gap-1.5 items-center justify-center">
        <span className="text-sm md:text-base font-medium text-black">
          Top {index + 1}
        </span>
        <div className="w-[28px] h-[28px] md:w-[50px] md:h-[50px] shrink-0 relative ">
          {isLoading ? (
            <Image
              src={personPlaceHolder}
              alt="this top customer profile image"
              fill
              sizes="200px"
              // objectFit="cover"
              className="rounded-full [width:clamp(45px,4vw,60px)] [height:clamp(45px,4vw,60px)] animate-pulse"
            />
          ) : (
            <Image
              quality={70}
              src={
                topCustomer?.profilePhoto
                  ? `${mainUrl}${topCustomer?.profilePhoto}`
                  : personPlaceHolder
              }
              alt="this top customer profile image"
              fill
              sizes="200px"
              // objectFit="cover"
              className="rounded-full [width:clamp(45px,4vw,60px)] [height:clamp(45px,4vw,60px)]"
            />
          )}
        </div>
      </div>
      <span className=" [font-size:clamp(12px,3vw,16px)] font-medium text-black whitespace-nowrap">
        {topCustomer?.fullName}
      </span>
      <button className="bg-main-bg-color text-white border rounded text-xs md:text-sm text-center py-1.5 md:w-24 w-20  font-medium px-3.4">
        Orders: {topCustomer?.orders}
      </button>
    </div>
  );
};

export default AllTopCustomer;
