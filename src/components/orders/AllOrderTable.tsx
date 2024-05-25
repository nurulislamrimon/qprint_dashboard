"use client";
import React, { useState } from "react";
import OrderTableThead from "../shared/order-table/OrderTableThead";
import { orderTableTheads } from "@/constants/order.constants";
import OrderTableRow from "../shared/order-table/OrderTableRow";
import OrderTableHeader from "../shared/order-table/OrderTableHeader";
import OrderTableDrawer from "../shared/order-table/OrderTableDrawer";
import { useGetOnlineOrderQuery } from "@/store/features/order/onlineOrderApi";
import DateRangePicker from "../shared/DateRangePicker";
import OrderTableSkeleton from "../shared/skeleton/OrderTableSkeleton";

const AllOrderTable = () => {
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(""); // Initialize date state
  const [endDate, setEndDate] = useState(""); // Initialize date state
  const { data, isLoading } = useGetOnlineOrderQuery(
    `orderStatus.status=${status}${
      startDate && endDate
        ? `&createdAt[gte]=${startDate}&createdAt[lte]=${endDate}`
        : ""
    }`
  );

  const [openDrawerId, setOpenDrawerId] = useState<string | false>(false);
  const handleCloseDrawer = () => {
    setOpenDrawerId(false);
  };

  const handleDateRangeChange = (range: {
    startDate: string;
    endDate: string;
  }) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };
  return (
    <div className="space-y-5">
      <OrderTableHeader
        orderTitle="All Order"
        orderQuantity={data?.meta?.total}
        orderQuantityClass="bg-[#03a6091a] text-[#03A609]"
        orderTableHeaderInput={
          <DateRangePicker onChange={handleDateRangeChange} />
        }
      />
      <div className="border-t">
        <table className=" table-fixed w-full shrink-0 bg-white">
          <thead className="text-base border-b whitespace-nowrap sticky -top-5 bg-[#F4F4F5] ">
            {orderTableTheads.map((orderTableThead, i: number) => (
              <tr key={i}>
                <OrderTableThead orderTableThead={orderTableThead} />
              </tr>
            ))}
          </thead>
          <tbody className="">
            {isLoading
              ? [...Array(10)].map((_, index) => {
                  return (
                    <tr key={index} className=" border-b">
                      <OrderTableSkeleton />
                    </tr>
                  );
                })
              : data?.data?.map((data: any, index: number) => (
                  <tr
                    onClick={() => setOpenDrawerId(data?._id)}
                    key={index}
                    className="text-center text-[#000000b3] hover:bg-table-row-hover transition-all border-b cursor-pointer"
                  >
                    <OrderTableRow data={data} index={index} />
                  </tr>
                ))}
          </tbody>
        </table>
        {openDrawerId && (
          <OrderTableDrawer
            // data={data}
            openDrawer={true}
            id={openDrawerId}
            handleCloseDrawer={handleCloseDrawer}
          />
        )}
      </div>
    </div>
  );
};

export default AllOrderTable;
