"use client";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import AddNewBrandModal from "./AddNewBrandModal";

const AddNewBrandBtn = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="text-white bg-main-bg-color flex items-center justify-center gap-2.5 py-3 px-2.5 rounded-custom-10px md:text-base text-sm"
      >
        <IconPlus />
        <span>Add New Brand</span>
      </button>

      {openModal && (
        <AddNewBrandModal open={openModal} handleClose={handleClose} />
      )}
    </div>
  );
};

export default AddNewBrandBtn;
