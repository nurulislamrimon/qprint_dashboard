import React, { useState } from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import GlobalActionButton from "../shared/GlobalActionButton";
import { IconAlertTriangle, IconX } from "@tabler/icons-react";
import { useUpdatePrintingRequestStatusMutation } from "@/store/features/printingRequest/printingRequestApi";
import Loader from "../shared/loaders/Loader";

interface RejectModalProps {
  handleModal: (value: boolean) => void;
  data: any;
}

const RejectModal = ({ data, handleModal }: RejectModalProps) => {
  const [updatePrintingRequestStatus] =
    useUpdatePrintingRequestStatusMutation();
  const [loading, setLoading] = useState(false);
  const lastOrderStatus =
    data?.data?.orderStatus[data?.data?.orderStatus.length - 1];
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const status =
      lastOrderStatus?.status === "Order placed" ||
      lastOrderStatus?.status === "Printing"
        ? "Rejected"
        : lastOrderStatus?.status === "Shipping" ||
          lastOrderStatus?.status === "Delivered"
        ? "Returned"
        : "";
    try {
      const res = await updatePrintingRequestStatus({
        id: data?.data?._id,
        data: {
          status: status,
          reasonOfRejection: "Buyer is out of the delivery area!",
        },
      });
      console.log(res);
      handleModal(false);
    } catch (error) {
      console.error("Error updating status", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <CustomGlobalModal
        isVisible={handleModal}
        setOpenModal={handleModal}
        mainClassName="w-[363px]"
      >
        <div className="py-[30px] px-[50px]">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center flex-col gap-[30px] relative overflow-hidden"
          >
            {loading && <Loader />}
            <div className="border w-[60px] h-[60px] border-dashed rounded-full flex items-center justify-center p-2.5 bg-red-opacity-10">
              <IconAlertTriangle stroke={2} color="#C83B62" />
            </div>
            <span className="text-black-opacity-80 text-lg">
              Update product status to{" "}
              <strong>
                {lastOrderStatus?.status === "Order placed" ||
                lastOrderStatus?.status === "Printing"
                  ? "Reject"
                  : lastOrderStatus?.status === "Shipping" ||
                    lastOrderStatus?.status === "Delivered"
                  ? "Return"
                  : ""}
              </strong>
            </span>
            <div className="flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => handleModal(false)}
                className="border rounded-custom-5px py-1.5 px-10"
              >
                No
              </button>
              <GlobalActionButton
                buttonText="Yes"
                type="submit"
                buttonStyleClassName="py-1.5 px-10"
              />
            </div>
          </form>
        </div>
      </CustomGlobalModal>
    </div>
  );
};

export default RejectModal;
