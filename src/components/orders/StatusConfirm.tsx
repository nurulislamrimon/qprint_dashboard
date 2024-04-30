"use client";
import React, { useEffect, useState } from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import { IconAlertCircle } from "@tabler/icons-react";
import { toast } from "react-toastify";

const StatusConfirm = ({
  isVisible,
  handleModal,
  option,
  data,
  updateStatus,
}: any) => {
  console.log(data);

  useEffect(() => {
    if (!isVisible) {
      handleModal();
    }
  }, [isVisible, handleModal]);

  const handleAction = async () => {
    const value = {
      id: data?._id,
      data: {
        status: option,
      },
    };
    try {
      const res = await updateStatus(value);
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      if (res?.error) {
        toast.error(res?.error.message);
      }
    } catch (error) {}
    handleModal();
  };

  return (
    <CustomGlobalModal
      isVisible={isVisible}
      setOpenModal={handleModal}
      mainClassName="md:w-[365px] w-[300px] h-[220px]  md:h-[250px]"
    >
      <div className="md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center">
        <div>
          <IconAlertCircle className="text-fuchsia-500 w-11 h-11" />
        </div>
        <span>
          Are you sure you want to change the status to{" "}
          <span className="font-bold">{option}?</span>
        </span>
        <div className="flex items-center gap-5">
          <button
            className="border py-1.5 px-6 rounded-custom-5px hover:bg-light-white-color"
            onClick={() => handleModal()}
          >
            No
          </button>
          <button
            className="border py-1.5 px-6 rounded-custom-5px bg-main-bg-color-opacity-32 text-fuchsia-500 hover:bg-fuchsia-100"
            onClick={handleAction}
          >
            Yes
          </button>
        </div>
      </div>
    </CustomGlobalModal>
  );
};

export default StatusConfirm;
