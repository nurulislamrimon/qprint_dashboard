import React, { useState } from "react";
import SingleCustomerViewPageLayout from "./SingleCustomerViewPageLayout";
import SingleCustomerProductTableSkeleton from "../shared/skeleton/SingleCustomerProductTableSkeleton";
import OrderTableDrawer from "../shared/order-table/OrderTableDrawer";

const CustomerTableLayout = ({ data, isLoading, customerId }: any) => {
  // console.log(data);
  const [openDrawerId, setOpenDrawerId] = useState<string | false>(false);
  const handleCloseDrawer = () => {
    setOpenDrawerId(false);
  };

  return (
    <div className="md:border rounded-md">
      <div className="mb-3 md: flex items-center gap-3 md:p-8">
        <span className="text-base md:text-lg font-medium text-black">
          Customer Table
        </span>
        <div className="bg-[#0306091A] flex items-center justify-center p-1 w-7 h-7 text-sm  text-[#575757] rounded-full">
          {data?.meta?.total}
        </div>
      </div>
      {/* ==Table Head== */}
      <table className="w-full">
        <thead className="border-b text-center sticky z-50 top-0">
          <tr>
            {["SL", "Order ID", "Total", "Status", "Action"].map(
              (th, index) => {
                return (
                  <th
                    key={index}
                    className={`text-black-opacity-50 py-2.5 text-sm md:text-base font-normal text-center ${
                      th === "Status" && "md:table-cell hidden"
                    }`}
                  >
                    {th}
                  </th>
                );
              }
            )}
          </tr>
        </thead>
        <tbody className="text-center">
          {isLoading
            ? [...Array(10)].map((_, index) => {
                return (
                  <tr key={index} className="animate-pulse">
                    <SingleCustomerProductTableSkeleton />
                  </tr>
                );
              })
            : data?.data?.map((data: any, index: number) => (
                <tr
                  key={index}
                  className=" hover:bg-table-row-hover transition-all cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDrawerId(data?._id);
                  }}
                >
                  <SingleCustomerViewPageLayout
                    data={data}
                    key={index}
                    index={index}
                  />
                </tr>
              ))}
          {openDrawerId && (
            <OrderTableDrawer
              // data={data}
              openDrawer={true}
              id={openDrawerId}
              handleCloseDrawer={handleCloseDrawer}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTableLayout;
