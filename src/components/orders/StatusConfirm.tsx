"use client";
import React, { useEffect, useState } from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import { IconAlertCircle } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useUpdateOrderStatusMutation } from "@/store/features/order/ordersApi";
import Loader from "../shared/loaders/Loader";

const StatusConfirm = ({ isVisible, handleModal, option, data }: any) => {
  const [updateStatus, { error: updateError, isLoading: loading }] =
    useUpdateOrderStatusMutation();
  const [reasonError, setReasonError] = useState("");
  const [reason, setReason] = useState(""); // State to store the reason

  useEffect(() => {
    if (!isVisible) {
      handleModal();
    }
  }, [isVisible, handleModal]);

  const handleAction = async (e: any) => {
    e.preventDefault();
    if (!data || !data._id) {
      // console.error("Invalid data object or missing _id:", data);
      return;
    }

    const value: {
      id: any;
      data: { status: any; reasonOfRejection?: string };
    } = {
      id: data._id,
      data: {
        status: option.trim(), // Trim the status value
      },
    };

    if (option === "Rejected") {
      if (!reason.trim()) {
        setReasonError("Reason of rejection is required");
        return;
      } else {
        setReasonError("");
        value.data.reasonOfRejection = reason.trim();
      }
    }

    // console.log("Sending update status request with value:", value); // Debugging line

    try {
      const res = await updateStatus(value);

      if ("data" in res) {
        toast.success(res.data.message);
      } else if ("error" in res) {
        toast.error((res.error as { message: string }).message);
      } else {
      }
    } catch (error) {}
    handleModal();
  };

  return (
    <>
      <CustomGlobalModal
        isVisible={isVisible}
        setOpenModal={handleModal}
        mainClassName={`w-[300px] ${
          option === "Rejected"
            ? "md:w-[365px] h-[220px] md:h-[300px]"
            : "md:w-[365px] h-[220px] md:h-[250px]"
        }`}
      >
        <form onSubmit={handleAction}>
          <div className="md:py-[30px] px-5 py-5 md:gap-[30px] gap-5 flex flex-col items-center overflow-hidden">
            {loading && <Loader />}
            <div>
              <IconAlertCircle className="text-fuchsia-500 w-11 h-11" />
            </div>
            {option === "Rejected" ? (
              <div className="flex items-center justify-center">
                <div className="flex gap-2 flex-col [&>:nth-child(1)]:text-gray-400 [&>:nth-child(1)]:text-start [&>:nth-child(3)]:text-start">
                  <label htmlFor="reasonOfRejection">Reason of Rejection</label>
                  <input
                    type="text"
                    id="reasonOfRejection"
                    className="w-[300px] resize-none border py-2.5 pl-5 outline-none rounded-custom-5px active:border-main-border-color focus:border-main-border-color"
                    placeholder="Reason"
                    value={reason} // Bind input to reason state
                    onChange={(e) => setReason(e.target.value)} // Update state on change
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
                onClick={() => handleModal()}
              >
                No
              </button>
              <button
                className="border py-1.5 px-6 rounded-custom-5px bg-main-bg-color-opacity-32 text-fuchsia-500 hover:bg-fuchsia-100"
                type="submit"
              >
                Yes
              </button>
            </div>
          </div>
        </form>
      </CustomGlobalModal>
    </>
  );
};

export default StatusConfirm;
