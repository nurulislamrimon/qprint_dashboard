"use client";
import React, { useState } from "react";
import OrderTableRow from "../shared/order-table/OrderTableRow";
import { orderTableTheads, orders } from "@/constants/order.constants";
import OrderTableThead from "../shared/order-table/OrderTableThead";
import OrderTableHeader from "../shared/order-table/OrderTableHeader";
import OrderTableDrawer from "../shared/order-table/OrderTableDrawer";
import { useGetOnlineOrderQuery } from "@/store/features/order/onlineOrderApi";
import DateRangePicker from "../shared/DateRangePicker";
import OrderTableSkeleton from "../shared/skeleton/OrderTableSkeleton";

const RejectedTable = () => {
  const [status, setStatus] = useState("Rejected");
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

  // Handle Drawer funtion
  const handleCloseDrawer = () => {
    setOpenDrawerId(false);
  };
  // handle Date Range funtion
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
        orderTitle="Rejected"
        orderQuantity={data?.meta?.total}
        orderQuantityClass="text-[#E73C17] bg-[#e73c171a]"
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
                    <tr key={index}>
                      {" "}
                      <OrderTableSkeleton />
                    </tr>
                  );
                })
              : data?.data?.map((order: any, index: number) => (
                  <tr
                    onClick={() => setOpenDrawerId(order?._id)}
                    key={index}
                    className="text-center text-[#000000b3] hover:bg-table-row-hover transition-all border-b"
                  >
                    <OrderTableRow data={order} index={index} />
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

export default RejectedTable;
