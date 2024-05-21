"use client";
import React from "react";
import TopSellingProductTableRow from "./topSellingProductTable/TopSellingProductTableRow";
import TopSellingTableSkeleton from "../shared/skeleton/TopSellingTableSkeleton";
import { useSearchProductQuery } from "@/store/features/product/productApi";

const TopSellingProduct = () => {
  const { data, isLoading } = useSearchProductQuery(
    `sortBy=totalSoldQuantity&sortOrder=desc`
  );
  return (
    <div className="space-y-2 w-full md:w-3/5 border rounded-custom-10px px-4 pb-4 h-[350px] md:h-[450px] overflow-y-auto relative ">
      <div className="mt-3 border-b sticky top-0 pb-4 z-20 bg-white">
        <h5 className="">Top Selling Product</h5>
      </div>
      <table className="border-separate w-full   border-spacing-y-3 ">
        <thead className="whitespace-nowrap sticky top-8  z-10 bg-white">
          <tr className="w-full font-medium [&>:nth-child(1)]:text-start [&>:nth-child(1)]:pb-1 [&>:nth-child(1)]:pt-2 [&>:nth-child(2)]:text-center [&>:nth-child(3)]:text-end [&>:nth-child(3)]:text-red-color">
            <th>Product</th>
            <th>Review</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody className="">
          {isLoading
            ? [...Array(10)].map((_, index) => {
                return (
                  <tr key={index}>
                    <TopSellingTableSkeleton />
                  </tr>
                );
              })
            : data?.data?.map((topSelling: any) => (
                <tr
                  key={topSelling._id}
                  className="w-full  hover:bg-table-row-hover "
                >
                  <TopSellingProductTableRow topSelling={topSelling} />
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
export default TopSellingProduct;
