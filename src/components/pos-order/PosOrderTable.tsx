"use client";
import React from "react";
import PosOrderRow from "./PosOrderRow";
import PosOrderHead from "./PosOrderHead";
import { useOflineSalesQuery } from "@/store/features/order/offlineOrderApi";
import { useAppDispatch } from "@/store/hook";
import { setPosSales } from "@/store/features/pos/posSaleSlice";
import PosSalesTableSkeleton from "../shared/skeleton/PosSalesTableSkeleton";

const PosOrderTable = () => {
  const { data, isLoading } = useOflineSalesQuery("");
  const dispatch = useAppDispatch();
  return (
    <div className="px-0.5">
      <table className="w-full">
        <thead className="text-base text-black bg-gray-50 border-b md:border-t text-center sticky -top-[1px]">
          <PosOrderHead />
        </thead>
        <tbody className="text-center text-base text-black-opacity-70">
          {isLoading
            ? [...Array(10)].map((_, index) => (
                <tr key={index} className="animate-pulse ">
                  <PosSalesTableSkeleton />
                </tr>
              ))
            : data?.data?.map((data: any, index: number) => (
                <tr
                  key={data._id}
                  onClick={() => dispatch(setPosSales(data))}
                  className="hover:bg-table-row-hover cursor-pointer"
                >
                  <PosOrderRow data={data} index={index} />
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default PosOrderTable;
