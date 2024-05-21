"use client";
import PrintingEmptyState from "@/components/printing/PrintingEmptyState";
import PrintingRequestDrawer from "@/components/printing/PrintingRequestDrawer";
import PrintingTableHead from "@/components/printing/PrintingTableHead";
import PrintingTableRow from "@/components/printing/PrintingTableRow";
import TableSkeleton from "@/components/shared/skeleton/TableSkeleton";
import { usePrintingRequestsQuery } from "@/store/features/printingRequest/printingRequestApi";
import React, { useState } from "react";

export type PrintingRequest = {
  fullName: string;
};

const PlacedOrders = () => {
  const { data: orderPlaced, isLoading } = usePrintingRequestsQuery(
    "orderStatus.status=Order placed"
  );

  const [openDrawerId, setOpenDrawerId] = useState<string | false>(false);

  const handleCloseModal = () => {
    setOpenDrawerId(false);
  };

  return (
    <div>
      <div className="bg-white mt-5">
        {orderPlaced?.data?.length === 0 ? (
          <PrintingEmptyState />
        ) : (
          <table className="w-full">
            <thead className="bg-[#F4F4F5] text-black-opacity-60 text-xs md:text-base text-center sticky z-50 top-0">
              <PrintingTableHead />
            </thead>

            <tbody className="text-center">
              {isLoading
                ? [...Array(15)].map((_, index) => {
                    return (
                      <tr key={index} className="animate-pulse w-full">
                        <TableSkeleton />
                      </tr>
                    );
                  })
                : orderPlaced?.data?.map(
                    (
                      printingTableData: PrintingRequest & { _id: string },
                      index: number
                    ) => (
                      <tr
                        onClick={() => setOpenDrawerId(printingTableData._id)}
                        key={index.toString()}
                        className="hover:bg-table-row-hover cursor-pointer transition-all"
                      >
                        <PrintingTableRow data={printingTableData} />
                      </tr>
                    )
                  )}
            </tbody>
          </table>
        )}
      </div>

      {openDrawerId && (
        <PrintingRequestDrawer
          openModal={true}
          id={openDrawerId}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PlacedOrders;
