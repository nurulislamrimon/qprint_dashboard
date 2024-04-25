"use client";
import { mainUrl } from "@/constants/mainUrl";
import Image from "next/image";
import React from "react";

const ProductCartInformation = ({ data }: any) => {
  return (
    <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between ">
      <div className="flex md:items-center md:justify-between gap-5">
        <div className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] shrink-0 relative mt-1.5 print:hidden">
          <Image
            src={`${mainUrl}${data?.data?.productPhotos[0]}`}
            alt="profile"
            objectFit="cover"
            fill
            className="w-full h-full top-0 left-0 object-cover rounded-custom-5px"
          />
        </div>
        <div className=" space-y-4 [&>strong]:text-fuchsia-600">
          <h2>{data?.data?.productName}</h2>
          <strong>{data?.data?.variants[0].sellingPrice} QR</strong>
        </div>
      </div>
      <div className=" bg-[#F3F3F3] text-center px-5 py-3 rounded-custom-10px [&>p]:text-black-opacity-50">
        <strong>
          {" "}
          {data?.data?.variants?.reduce(
            (total: number, item: any) => total + item.inStock,
            0
          )}
        </strong>
        <p>Item Available</p>
      </div>
    </div>
  );
};

export default ProductCartInformation;
