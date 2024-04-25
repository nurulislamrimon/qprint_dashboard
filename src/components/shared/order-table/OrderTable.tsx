"use client";
import {
  homeOrderTableTheads,
  homeOrders,
  orderTableTheads,
  orders,
} from "@/constants/order.constants";
import React, { useState } from "react";
import OrderTableRow from "./OrderTableRow";
import OrderTableThead from "./OrderTableThead";
// import { useOrdersQuery } from "@/store/features/sales/salesApi";
import OrderTableDrawer from "./OrderTableDrawer";
import { useOnlineOrdersQuery } from "@/store/features/sales/salesApi";
import DateRangePicker from "../DateRangePicker";
import OrderTableSkeleton from "../skeleton/OrderTableSkeleton";
import DashboardTableSkeleton from "../skeleton/DashboardTableSkeleton";

const OrderTable = () => {
  const { data, isLoading } = useOnlineOrdersQuery("");
  const [openDrawerId, setOpenDrawerId] = useState<string | false>(false);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleCloseDrawer = () => {
    setOpenDrawerId(false);
  };
  const handleDateRangeChange = (dateRange: any) => {
    setSelectedDateRange([dateRange]);
  };
  return (
    <div className=" bg-white border border-b-white rounded-[10px] rounded-b-[4px]  shrink-0 ">
      <div className="flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
        <span className="text-black-only font-medium [font-size:clamp(10px,4vw,18px)]">
          Recent Orders
        </span>
      </div>
      <table className="table-fixed w-full shrink-0 overflow-hidden">
        <thead className="text-base border-b whitespace-nowrap ">
          {homeOrderTableTheads.map((orderTableThead, i: number) => (
            <tr key={i}>
              <OrderTableThead orderTableThead={orderTableThead} />
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading
            ? [...Array(10)].map((_, index) => {
                return (
                  <tr key={index} className=" border-b">
                    <DashboardTableSkeleton />
                  </tr>
                );
              })
            : data?.data.map((dashboardTableData: any, index: number) => (
                <tr
                  onClick={() => setOpenDrawerId(dashboardTableData?._id)}
                  key={dashboardTableData?._id}
                  className="text-center text-[#000000b3] hover:bg-table-row-hover transition-all border-b cursor-pointer"
                >
                  <OrderTableRow
                    dashboardTableData={dashboardTableData}
                    index={index}
                  />
                </tr>
              ))}
        </tbody>
      </table>
      {openDrawerId && (
        <OrderTableDrawer
          openDrawer={true}
          id={openDrawerId}
          handleCloseDrawer={handleCloseDrawer}
        />
      )}
    </div>
  );
};

export default OrderTable;
