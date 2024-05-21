"use client";
import React, { useState } from "react";
import OrderTableHeader from "../shared/order-table/OrderTableHeader";
import { orderStatus } from "@/constants/orderStatus.constants";
import OrderTableThead from "../shared/order-table/OrderTableThead";
import { orderTableTheads, orders } from "@/constants/order.constants";
import OrderTableRow from "../shared/order-table/OrderTableRow";
import OrderTableDrawer from "../shared/order-table/OrderTableDrawer";
import { useGetAllQuickOrderQuery } from "@/store/features/quickOrder/quickOrderApi";
import logo from "@/assets/testqPrintLogo.png";
import Image from "next/image";
import DateRangePicker from "../shared/DateRangePicker";
import OrderTableSkeleton from "../shared/skeleton/OrderTableSkeleton";

type Order = {};
const QuickOrderTable = () => {
  const [status, setStatus] = useState("All Orders");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const queryParam = `${
    status !== "All Orders" ? `orderStatus.status=${status}&` : ""
  }${
    startDate && endDate
      ? `createdAt[gte]=${startDate}&createdAt[lte]=${endDate}`
      : ""
  }`.replace(/&$/, "");

  const { data, isLoading } = useGetAllQuickOrderQuery(queryParam);

  const [openDrawerId, setOpenDrawerId] = useState<string | false>(false);
  // Check if selected status exists in orderStatus array
  const statusExists = orderStatus.some((order) => order.label === status);

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

  const handleStatusfilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };
  return (
    <div className="space-y-5">
      <OrderTableHeader
        orderTitle="Quick Order"
        orderQuantity={data?.meta?.total}
        orderQuantityClass="bg-[#03a6091a] text-[#03A609]"
        orderTableHeaderInput={
          <DateRangePicker onChange={handleDateRangeChange} />
        }
        orderSelectedOption={
          <span className=" border hover:border-red-regular py-2 px-1 rounded-custom-5px">
            <select
              className="outline-none cursor-pointer bg-transparent"
              name=""
              id="orderSelect"
              value={status}
              onChange={handleStatusfilter}
            >
              {orderStatus.map((order, index) => (
                <option
                  className="[font-size:clamp(10px,3vw,16px)]"
                  value={order.label}
                  key={index}
                >
                  {order.label}
                </option>
              ))}
            </select>
          </span>
        }
      />
      <div className="border-t">
        {data?.data?.length > 0 ? (
          <table className=" table-fixed w-full shrink-0 bg-white">
            <thead className="text-base border-b whitespace-nowrap sticky -top-5 bg-[#F4F4F5] ">
              {orderTableTheads.map((orderTableThead) => (
                <tr key={orderTableThead.id}>
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
                : data?.data?.map((data: any, index: number) => (
                    <tr
                      onClick={() => setOpenDrawerId(data?._id)}
                      key={data?._id}
                      className="text-center text-[#000000b3] hover:bg-table-row-hover transition-all border-b cursor-pointer"
                    >
                      <OrderTableRow
                        quickOrder={data}
                        index={index}
                        statusExists={statusExists}
                      />
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <div className="text-red-500 flex items-center justify-center [height:calc(100vh-200px)]">
            {statusExists ? (
              <span>
                No data found for status:{" "}
                <span className="font-bold">{status}</span>
              </span>
            ) : (
              <div className="flex items-center justify-center h-screen">
                <div className="relative flex justify-center items-center">
                  <div className="absolute animate-spin rounded-full h-24 w-24 border-t-[6px] border-b-[6px] border-fuchsia-800"></div>
                  <Image src={logo} alt="Loading" width={50} height={50} />
                </div>
              </div>
            )}
          </div>
        )}

        {openDrawerId && (
          <OrderTableDrawer
            quickOrder={data}
            openDrawer={true}
            id={openDrawerId}
            handleCloseDrawer={handleCloseDrawer}
          />
        )}
      </div>
    </div>
  );
};

export default QuickOrderTable;
