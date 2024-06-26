"use client";
import ProductsTable from "@/components/products/ProductsTable";
import { useStockAlertProductsQuery } from "@/store/features/product/productApi";
import React from "react";

const StockaAlert = () => {
  const { data, isLoading } = useStockAlertProductsQuery("");

  return (
    <div className="h-[calc(100vh-85px)] overflow-y-auto bg-white md:px-[30px] md:pt-5 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 ">
          <span className="text-black font-medium text-base md:text-lg">
            Stock Alert
          </span>
          <div className="bg-gray-opacity-10 rounded-full w-7 h-7 text-[#575757] flex items-center justify-center  text-custom-10px">
            {data?.meta?.total}
          </div>
        </div>
      </div>
      <ProductsTable data={data} isLoading={isLoading} />
    </div>
  );
};

export default StockaAlert;
