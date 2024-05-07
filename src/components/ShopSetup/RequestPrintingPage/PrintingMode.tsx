"use client";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";

import PrintingModeModal from "./PrintingModeModal";
import { printingPaperSizeDemoData } from "@/constants/printingPaperTypeMode.constants";
import PrintingModeLayout from "./PrintingModeLayout";
import { useAllPrintingModeQuery } from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import PrintingRequestCardSkeleton from "@/components/shared/skeleton/PrintingRequestCardSkeleton";

export type PrintingMode = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  paperType: string;
  price: number;
  printingColorMode: string;
  printingSetupType: string;
};

const PrintingMode = () => {
  const { data, isLoading } = useAllPrintingModeQuery("");

  // console.log(data);

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {/* ==Printing Page Top || Content== */}
      <div>
        <div className="flex items-center gap-4 md:gap-7 mb-5 md:mb-[30px]">
          <h4 className="text-lg text-black">Printing Mode</h4>
          <button
            onClick={() => setOpenModal(true)}
            className="p-2.5 text-black-opacity-50 rounded-full border"
          >
            <IconPlus width={20} height={20} />
            {""}
          </button>
        </div>
        {/* ==Printing Mode Card== */}
        <div className="flex items-start shrink-0 flex-wrap gap-5 mb-5 border-b pb-7">
          {" "}
          {isLoading
            ? [...Array(14)].map((_, index) => (
                <PrintingRequestCardSkeleton key={index} />
              ))
            : data?.data?.map((data: PrintingMode, index: number) => (
                <PrintingModeLayout key={index} data={data} />
              ))}
        </div>
      </div>
      {/* ==Printing Page Top || Modal== */}
      {openModal && (
        <PrintingModeModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PrintingMode;
