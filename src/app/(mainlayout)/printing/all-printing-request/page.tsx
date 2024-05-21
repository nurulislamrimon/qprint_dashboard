"use client";
import PrintingEmptyState from "@/components/printing/PrintingEmptyState";
import PrintingTableHead from "@/components/printing/PrintingTableHead";
import TableSkeleton from "@/components/shared/skeleton/TableSkeleton";
import { usePrintingRequestsQuery } from "@/store/features/printingRequest/printingRequestApi";
import { useState } from "react";
import { PrintingRequest } from "../placed-orders/page";
import PrintingTableRow from "@/components/printing/PrintingTableRow";
import PrintingRequestDrawer from "@/components/printing/PrintingRequestDrawer";

const AllPrintingRequest = () => {
  const { data, isLoading } = usePrintingRequestsQuery("");

  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

  const handleModal = () => {
    setOpenDrawerId(null);
  };
  return (
    <div>
      <div className="bg-white mt-5">
        {data?.data?.length === 0 ? (
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
                : data?.data?.map(
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
          handleCloseModal={handleModal}
        />
      )}
    </div>
  );
};

export default AllPrintingRequest;
