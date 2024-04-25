// import { ITopSellingProduct } from "@/constants/topSellingProduct.constants";
import { mainUrl } from "@/constants/mainUrl";
import { IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const TopSellingProductTableRow = ({ topSelling }: any) => {
  return (
    <>
      <td className="flex items-center gap-x-2 w-[80%]">
        <div className=" [width:clamp(25px,4vw,40px)] [height:clamp(25px,4vw,40px)] shrink-0 relative mt-1.5 border p-1 rounded-custom-10px">
          <Image
            src={`${mainUrl}${topSelling?.productPhotos[0]}`}
            alt="profile"
            fill
            sizes="200px"
            className="w-full h-full top-0 left-0 rounded-custom-5px"
          />
        </div>
        <div className="flex flex-col gap-1.5 [&>:nth-child(1)]:[font-size:clamp(10px,3vw,14px)] [&>:nth-child(1)]:line-clamp-2  [&>:nth-child(2)]:[font-size:clamp(10px,4vw,12px)] [&>:nth-child(2)]:text-black-opacity-50">
          <span className="product-name">{topSelling?.productName}</span>
          <span className="brand-name">{topSelling?.brand?.brandName}</span>
        </div>
      </td>
      <td className="w-auto ">
        <div className="flex items-center justify-center gap-x-1.5 text-black-opacity-70 [&>:nth-child(1)]:text-[#fec107] [&>:nth-child(1)]:[font-size:clamp(12px,4vw,14px)]  [&>:nth-child(2)]:[font-size:clamp(12px,4vw,15px)] [&>:nth-child(3)]:text-black-opacity-50 [&>:nth-child(3)]:[font-size:clamp(10px,4vw,12px)]">
          <span>
            <IconStarFilled />
          </span>
          <span>{topSelling?.averageRating}</span>
          <span>({topSelling?.totalReview})</span>
        </div>
      </td>
      <td className="w-[12%] text-end [font-size:clamp(13px,4vw,16px)] text-red-color ">
        {topSelling?.totalSoldQuantity}
      </td>
    </>
  );
};

export default TopSellingProductTableRow;
