import React, { FC, FormEvent } from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import { IconTruck } from "@tabler/icons-react";
import GlobalActionButton from "../shared/GlobalActionButton";
import { useUpdateOrderStatusMutation } from "@/store/features/order/ordersApi";
import { useQuickOrderUpdateOrderStatusMutation } from "@/store/features/quickOrder/quickOrderApi";

interface ShippingConfirmModalProps {
  handleRejectConfirmationModal: (value: boolean) => void;
  rejectConfirmationModal: boolean;
  setRejectConfirmationModal: (value: boolean) => void;
  data: any; // Adjust type accordingly
}

const RejectConfirmationModal: FC<ShippingConfirmModalProps> = ({
  handleRejectConfirmationModal,
  rejectConfirmationModal,
  setRejectConfirmationModal,
  data,
}) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [quickOrderUpdateOrderStatus] =
    useQuickOrderUpdateOrderStatusMutation();

  //   order status
  const lastOrderStatus =
    data?.data?.orderStatus[data?.data?.orderStatus.length - 1];

  // handle submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status =
      lastOrderStatus?.status === "Order placed" ||
      lastOrderStatus?.status === "Packaging"
        ? "Rejected"
        : lastOrderStatus?.status === "Shipping" ||
          lastOrderStatus?.status === "Delivered"
        ? "Returned"
        : "";

    try {
      if (data?.orderType === "onlineOrder") {
        const res = await updateOrderStatus({
          id: data?.data?._id,
          data: {
            status: status,
            reasonOfRejection: "Buyer is out of the delivery area!",
          },
        });
        console.log(res);
      }

      if (data?.orderType === "quickOrder") {
        const res = await quickOrderUpdateOrderStatus({
          id: data?.data?._id,
          data: {
            status: status,
            reasonOfRejection: "Buyer is out of the delivery area!",
          },
        });
        console.log(res);
      }

      handleRejectConfirmationModal(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <CustomGlobalModal
      isVisible={rejectConfirmationModal}
      mainClassName="w-[363px]"
      setOpenModal={setRejectConfirmationModal}
    >
      <div className="py-[30px] px-[50px]">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col gap-[30px]"
        >
          <div className="border w-[60px] h-[60px] border-dashed rounded-full flex items-center justify-center p-2.5 border-fuchsia-800">
            <IconTruck stroke={1} color="#C83B62" />
          </div>
          <span className="text-black-opacity-80 text-lg">
            Update product status to{" "}
            <strong>
              {lastOrderStatus?.status === "Order placed" ||
              lastOrderStatus?.status === "Packaging"
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
              onClick={() => handleRejectConfirmationModal(false)}
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
  );
};

export default RejectConfirmationModal;
