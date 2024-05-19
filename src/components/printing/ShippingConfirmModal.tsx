import React, { FC, FormEvent, useState } from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import { IconTruck } from "@tabler/icons-react";
import GlobalActionButton from "../shared/GlobalActionButton";
import { useUpdateOrderStatusMutation } from "@/store/features/order/ordersApi";
import { useQuickOrderUpdateOrderStatusMutation } from "@/store/features/quickOrder/quickOrderApi";
import Loader from "../shared/loaders/Loader";

interface ShippingConfirmModalProps {
  handleShippingModalClose: (value: boolean) => void;
  openShippingModal: boolean;
  setOpenShippingModal: (value: boolean) => void;
  data: any; // Adjust type accordingly
}

const ShippingConfirmModal: FC<ShippingConfirmModalProps> = ({
  handleShippingModalClose,
  openShippingModal,
  setOpenShippingModal,
  data,
}) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [quickOrderUpdateOrderStatus] =
    useQuickOrderUpdateOrderStatusMutation();
  const [loading, setLoading] = useState(false);

  //   order status
  const lastOrderStatus =
    data?.data?.orderStatus[data?.data?.orderStatus.length - 1];

  // handle submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const status =
      lastOrderStatus?.status === "Order placed"
        ? "Packaging"
        : lastOrderStatus?.status === "Packaging"
        ? "Shipping"
        : lastOrderStatus?.status === "Shipping"
        ? "Delivered"
        : "";

    try {
      if (data?.orderType === "onlineOrder") {
        const res = await updateOrderStatus({
          id: data?.data?._id,
          data: { status },
        });
        console.log(res);
      }
      if (data?.orderType === "quickOrder") {
        const res = await quickOrderUpdateOrderStatus({
          id: data?.data?._id,
          data: { status },
        });
        console.log(res);
      }

      handleShippingModalClose(false);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomGlobalModal
      isVisible={openShippingModal}
      mainClassName="w-[363px]"
      setOpenModal={setOpenShippingModal}
    >
      <div className="py-[30px] px-[50px]">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col gap-[30px]  relative overflow-hidden"
        >
          {loading && <Loader />}
          <div className="border w-[60px] h-[60px] border-dashed rounded-full flex items-center justify-center p-2.5 border-fuchsia-800">
            <IconTruck stroke={1} color="#C83B62" />
          </div>
          <span className="text-black-opacity-80 text-lg">
            Update product status to{" "}
            <strong>
              {lastOrderStatus?.status === "Order placed"
                ? "Packaging"
                : lastOrderStatus?.status === "Packaging"
                ? "Shipping"
                : lastOrderStatus?.status === "Shipping"
                ? "Delivered"
                : ""}
            </strong>
          </span>
          <div className="flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => handleShippingModalClose(false)}
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

export default ShippingConfirmModal;
