"use client";
import React from "react";
import Image from "next/image";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import { mainUrl } from "@/constants/mainUrl";

const WidgetPreview = (data: any) => {
  return (
    <div className="[width:clamp(300px,40vw,180px)]  h-[500px] bg-[#134231]  rounded-lg relative overflow-hidden ">
      <div className="h-[60%] w-full bg-[#3d7c65] opacity-65 blur-2xl rounded-full  absolute  border border-red-600 "></div>
      <div className="items-center justify-between h-full p-4 relative flex flex-col  ">
        <div className="flex md:justify-center justify-start flex-col text-white gap-2 md:items-center py-5 text-center ">
          <small>{data?.data?.tag}</small>
          <h2 className="[font-size:_clamp(1em,5vw,1.8em)] font-bold">
            {data?.data?.title}
          </h2>
          <p>{data?.data?.description}</p>
          <ButtonPrimary buttonText={data?.data?.buttonText} type="reset" />
        </div>
        <div className="w-36 h-36">
          <Image
            src={`${mainUrl}${data?.data?.productPhoto}`}
            alt="Discounted product image"
            width={250}
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default WidgetPreview;
