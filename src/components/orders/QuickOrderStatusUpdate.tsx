"use client";
import React, { useEffect, useState } from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import { IconAlertCircle } from "@tabler/icons-react";
import { toast } from "react-toastify";

const QuickOrderStatusUpdate = ({
  isVisible,
  handleQuickOrderModal,
  option,
  data,
  quickOrderUpdate,
}: any) => {
  const [reasonError, setReasonError] = useState("");
  useEffect(() => {
    if (!isVisible) {
      handleQuickOrderModal();
    }
  }, [isVisible, handleQuickOrderModal]);
  const handleAction = async () => {
    let value: { id: any; data: { status: any; reasonOfRejection?: string } } =
      {
        id: data?._id,
        data: {
          status: option.trim(), // Trim the status value
        },
      };

    if (option === "Rejected") {
      const reasonOfRejectionInput = document.getElementById(
        "reasonOfRejection"
      ) as HTMLInputElement | null;
      const reasonOfRejection = reasonOfRejectionInput?.value.trim() || ""; // Trim the reason of rejection

      if (!reasonOfRejection) {
        setReasonError("Reason of rejection is required");
        return;
      } else {
        setReasonError("");
        value.data.reasonOfRejection = reasonOfRejection;
      }
    }

    try {
      const res = await quickOrderUpdate(value);
      if (res?.data) {
        toast.success(res?.data?.message);
      }

      if (res?.error) {
        toast.error(res?.error.message);
        // console.log(res?.error.message);
      }
    } catch (error) {
      // console.error("Error updating status:", error); // Debugging line
    }
    handleQuickOrderModal();
  };

  return (
    <CustomGlobalModal
      isVisible={isVisible}
      setOpenModal={handleQuickOrderModal}
      mainClassName={`w-[300px] ${
        option === "Rejected"
          ? "md:w-[365px] h-[220px] md:h-[300px]"
          : "md:w-[365px] h-[220px] md:h-[250px]"
      }`}
    >
      <div className="md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center">
        <div>
          <IconAlertCircle className="text-fuchsia-800 w-11 h-11" />
        </div>
        {option === "Rejected" ? (
          <div className="flex items-center justify-center">
            <div className=" flex gap-2 flex-col [&>:nth-child(1)]:text-gray-400 [&>:nth-child(1)]:text-start [&>:nth-child(3)]:text-start">
              <label htmlFor="reasonOfRejection">Reason of Rejection</label>
              <input
                type="text"
                id="reasonOfRejection"
                name=""
                className="w-[300px] resize-none border py-2.5 pl-5 outline-none rounded-custom-5px active:border-main-border-color focus:border-main-border-color"
                placeholder="Reason"
              />
              <p
                className={`mt-1 text-xs ${
                  reasonError ? "text-red-500" : "text-gray-500"
                }`}
              >
                {reasonError || "*This field is required"}
              </p>
            </div>
          </div>
        ) : (
          <span>
            Are you sure you want to change the status to{" "}
            <span className="font-bold">{option}?</span>
          </span>
        )}
        <div className="flex items-center gap-5">
          <button
            className="border py-1.5 px-6 rounded-custom-5px hover:bg-light-white-color"
            onClick={() => handleQuickOrderModal()}
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

export default QuickOrderStatusUpdate;
