"use client";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { PrintingMode } from "./PrintingMode";
import { useDeletePrintingSetupMutation } from "@/store/features/shopSetup/printingSetup/printingSetupApi";
import EditPrintingModeDrawer from "./EditPrintingModeDrawer";

import DeleteRequesetPrintingModal from "./DeleteRequesetPrintingModal";

type PrintingModeData = {
  data: PrintingMode;
};

const PrintingModeLayout = ({ data }: PrintingModeData) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDeleteModal = () => {
    setOpenDeleteModal((prevState) => !prevState);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="bg-main-bg-color-opacity-32 bg-opacity-20 shadow-sm hover:shadow-product-card-shadow rounded-t-md">
      <span className="py-4 text-base flex items-center justify-center font-semibold main-text-color">
        {data?.price} QR
      </span>
      <div className="relative group hover:border-fuchsia-200 border transition-all border-transparent rounded-md">
        {/* ==Delete & Edit BTN== */}
        <div className="group-hover:inline-flex flex items-center gap-2 md:hidden absolute right-1 top-1 group-hover:duration-500">
          <button onClick={(e) => handleDeleteModal()}>
            <IconTrash width={15} height={15} stroke={1} color="#FF0046" />
            {""}
          </button>
          <button onClick={() => setOpenModal(true)}>
            <IconEdit width={15} height={15} stroke={1} color="#0D9755" />
            {""}
          </button>
        </div>
        <p className="bg-white py-5 px-10 text-sm text-black-opacity-70 hover:text-fuchsia-600">
          {data?.printingColorMode}
        </p>
      </div>
      {openModal && (
        <EditPrintingModeDrawer
          id={data?._id}
          handleCloseModal={handleCloseModal}
          openModal={openModal}
        />
      )}

      {openDeleteModal && (
        <DeleteRequesetPrintingModal
          handleModal={handleDeleteModal}
          id={data?._id}
        />
      )}
    </div>
  );
};

export default PrintingModeLayout;
