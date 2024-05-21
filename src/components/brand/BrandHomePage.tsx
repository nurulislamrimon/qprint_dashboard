"use client";

import { IBrand } from "@/types";
import BrandCard from "./BrandCard";
import AddNewBrandBtn from "./AddNewBrandBtn";
import { useBrandsQuery } from "@/store/features/brand/brandApi";
import CardSkeleton from "../shared/skeleton/CardSkeleton";

const BrandHomePage = () => {
  const { data, isLoading } = useBrandsQuery("");
  console.log(data);

  return (
    <div className="md:px-[30px] md:py-5 px-5 py-[30px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 ">
          <span className="text-black font-medium text-base md:text-lg">
            All Brands
          </span>

          <div className="bg-gray-opacity-10 rounded-full px-1.5 text-[#575757] py-1 text-custom-10px">
            {data?.data?.length}
          </div>
        </div>
        <AddNewBrandBtn />
      </div>

      <div className="pt-10 pb-5 px-2  brand-product-cards-container-custom-grid bg-white">
        {isLoading
          ? [...Array(15)].map((_, index) => {
              return <CardSkeleton key={index} />;
            })
          : data?.data?.map((data: IBrand) => (
              <BrandCard key={data?._id} data={data} />
            ))}
      </div>
    </div>
  );
};

export default BrandHomePage;
