import React from "react";
import Image from "next/image";
import { mainUrl } from "@/constants/mainUrl";
import StarRating from "../shared/StarRating";

const BestDealProduct = ({ productData }: any) => {
  return (
    <div>
      <div className="flex items-center md:justify-center gap-3 overflow-x-auto scroll-smooth no-scrollbar mt-5">
        {/* === Event Product Card === */}
        {productData?.map((product: any) => (
          <div
            key={product?._id}
            className="flex items-center space-x-4 max-w-[300px] pr-20 py-2 pl-2 shrink-0 rounded-xl bg-white border border-white hover:border hover:duration-500 cursor-pointer hover:border-main-border-color"
          >
            <div className="w-[60px] h-[60px] relative mr-2.5 md:mr-5 shrink-0">
              <Image
                src={`${mainUrl}${product?.productPhoto}`}
                placeholder="blur"
                blurDataURL={`${mainUrl}${product?.productPhoto}`}
                fill
                style={{
                  objectFit: "cover",
                }}
                sizes="500px"
                alt="Product Photo"
                priority
                className="w-full h-full top-0 left-0 object-cover p-1.5 border rounded-md"
              />
            </div>
            <div className="flex justify-center flex-col gap-1">
              <span className="text-black text-sm md:text-base line-clamp-1">
                {product?.productName}
              </span>

              <StarRating rating={Math.round(product?.averageRating)} />

              <div className="flex items-center gap-2.5">
                <span className="text-black flex items-baseline gap-1 main-text-color text-xs md:text-base font-semibold">
                  {product?.sellingPrice} <small>QAR</small>
                </span>
                <del className="flex items-baseline gap-1 text-[10px] md:text-sm">
                  {product?.sellingPrice} <small>QAR</small>
                </del>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestDealProduct;
