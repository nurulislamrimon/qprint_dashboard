"use client";
import { IconPlus, IconSettings } from "@tabler/icons-react";
import React, { useState } from "react";
import PrintingPaperSizeModal from "./PrintingPaperSizeModal";
import { printingPaperSizeDemoData } from "@/constants/printingPaperTypeMode.constants";
import PrintingPaperSizeLayout from "./PrintingPaperSizeLayout";
import {
  useAllPaperSizeQuery,
  usePaperUnitQuery,
} from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import SettingModal from "./SettingModal";
import PrintingRequestCardSkeleton from "@/components/shared/skeleton/PrintingRequestCardSkeleton";

export type PaperSize = {
  _id: string;
  printingSetupType: string;
  height: number;
  width: number;
  createdAt: string;
  updatedAt: string;
};

const PrintingPaperSize = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSettingModal, setOpenSettingModal] = useState(false);
  const { data, isLoading } = useAllPaperSizeQuery("");
  const { data: paperUnit } = usePaperUnitQuery("");

  const handleCloseSettingModal = () => {
    setOpenSettingModal((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {/* ==Printing Page Top || Content== */}
      <div>
        <div className="flex items-center justify-between mb-5 md:mb-8">
          {/* Title and Add button */}
          <div className="flex items-center gap-4 md:gap-7">
            <h4 className="text-lg text-black">
              All Printing Paper size <span>({paperUnit?.data[0]?.unit})</span>
            </h4>
            <button
              onClick={() => setOpenModal(true)}
              className="p-2.5 text-black-opacity-50 rounded-full border"
            >
              <IconPlus width={20} height={20} />
            </button>
          </div>
          {/* Settings */}
          <div
            onClick={() => handleCloseSettingModal()}
            className="flex items-center gap-3 cursor-pointer"
          >
            <h4 className="hidden md:block text-lg text-black-opacity-80">
              Settings
            </h4>
            <span className="text-black-opacity-60 cursor-pointer">
              <IconSettings width={20} height={20} />
            </span>
          </div>
        </div>
        {/* ==Printing Size Card== */}
        <div className="flex items-center shrink-0 flex-wrap gap-5 border-b pb-5 md:pb-7">
          {isLoading
            ? [...Array(14)].map((_, index) => (
                <PrintingRequestCardSkeleton key={index} />
              ))
            : data?.data?.map((data: PaperSize, index: number) => (
                <PrintingPaperSizeLayout key={index} data={data} />
              ))}
        </div>
      </div>
      {/* ==Printing Page Top || Modal== */}
      {openModal && (
        <PrintingPaperSizeModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
      {openSettingModal && (
        <SettingModal handleModal={handleCloseSettingModal} />
      )}
    </div>
  );
};

export default PrintingPaperSize;
