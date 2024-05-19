"use client";

import CustomersTable from "@/components/customers/CustomersTable";
import CustomerTableSkeleton from "@/components/shared/skeleton/CustomerTableSkeleton";
import { useCustomersQuery } from "@/store/features/customer/customerApi";
import { useGetAllOnlineOrdersQuery } from "@/store/features/order/ordersApi";

const Customers = () => {
  const { data: customers, isLoading } = useCustomersQuery("");

  return (
    <div className="bg-white h-[calc(100vh-85px)] overflow-y-auto">
      <h1 className="p-5 md:p-8 text-base md:text-lg flex items-center gap-3  font-medium text-black">
        Customer List{" "}
        <div
          className={`bg-[#0306091A] w-8 h-8  flex items-center justify-center text-sm  text-[#575757] rounded-full ${
            isLoading && "animate-ping"
          }`}
        >
          {customers?.data?.length}
        </div>
      </h1>
      <div>
        <table className="w-full text-center">
          <thead className="border-b sticky top-0 bg-white z-50">
            <tr>
              {[
                "SL",
                "Customer Name",
                "Contact Info",
                "Total Order",
                "Transparent",
              ].map((th, index) => {
                return (
                  <th
                    key={index}
                    className={`text-black-opacity-50 text-xs md:text-base font-normal py-5 ${
                      th === "Transparent" && "md:table-cell hidden text-white"
                    } ${th === "SL" && "md:table-cell hidden"}`}
                  >
                    {th}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-center">
            {isLoading
              ? [...Array(10)].map((_, index) => {
                  return (
                    <tr key={index} className="animate-pulse">
                      <CustomerTableSkeleton />
                    </tr>
                  );
                })
              : customers?.data?.map((order: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-table-row-hover transition-all"
                    >
                      <CustomersTable
                        data={order}
                        index={index}
                        isLoading={isLoading}
                      />
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
