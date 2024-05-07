"use client";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import PrintingPaperTypeModal from "./PrintingPaperTypeModal";
import PrintingPaperTypeLayout from "./PrintingPaperTypeLayout";
import { useAllPaperTypeQuery } from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import PrintingRequestCardSkeleton from "@/components/shared/skeleton/PrintingRequestCardSkeleton";

export type PaperType = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  paperType: string;
  price: number;
  printingSetupType: string;
};

const PrintingPaperType = () => {
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading } = useAllPaperTypeQuery("");
  // console.log(data);

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <div>
        {/* Title and Add button */}
        <div className="flex items-center gap-4 md:gap-7 my-5 md:my-[30px]">
          <h4 className="text-lg text-black">Paper Type</h4>
          <button
            onClick={() => setOpenModal(true)}
            className="p-2.5 text-black-opacity-50 rounded-full border"
          >
            <IconPlus width={20} height={20} />
            {""}
          </button>
        </div>
        {/* ==Printing Paper Type Card== */}
        <div className="flex items-start shrink-0 flex-wrap gap-5 mb-5 border-b pb-7">
          {" "}
          {isLoading
            ? [...Array(14)].map((_, index) => (
                <PrintingRequestCardSkeleton key={index} />
              ))
            : data?.data?.map((data: PaperType, index: number) => (
                <PrintingPaperTypeLayout key={index} data={data} />
              ))}
        </div>
      </div>
      {openModal && (
        <PrintingPaperTypeModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PrintingPaperType;
