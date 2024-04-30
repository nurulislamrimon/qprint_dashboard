import React, { useState } from "react";
import CustomGlobalDrawer from "../CustomGlobalDrawer";
import DrawerModalCloseBTN from "../DrawerModalCloseBTN";
import OrderStatusStep from "../OrderStatusStep";
import ShippingConfirmModal from "@/components/printing/ShippingConfirmModal";
import OrderDrawerItem from "./orderTableDrawer/OrderDrawerItem";
import OrderDrawerCalculation from "./orderTableDrawer/OrderDrawerCalculation";
import OrderDrawerDeliveredAddress from "./orderTableDrawer/OrderDrawerDeliveredAddress";
import { useQuickOrderQuery } from "@/store/features/quickOrder/quickOrderApi";
import { useOnlineOrderQuery } from "@/store/features/sales/salesApi";
import OrderStatusUpdate from "./orderTableDrawer/OrderStatusUpdate";
import RejectConfirmationModal from "@/components/printing/RejectConfirmationModal";

const OrderTableDrawer = ({ handleCloseDrawer, openDrawer, id }: any) => {
  const [openShippingModal, setOpenShippingModal] = useState(false);
  const [rejectConfirmationModal, setRejectConfirmationModal] = useState(false);

  const { data: onlineOrderData } = useOnlineOrderQuery(id);
  const { data: quickOrderData } = useQuickOrderQuery(id);
  const handleShippingModalClose = () => {
    setOpenShippingModal(false);
  };
  const handleRejectConfirmationModal = () => {
    setRejectConfirmationModal(false);
  };

  return (
    <div>
      <div>
        <CustomGlobalDrawer
          isVisible={openDrawer}
          setOpenDrawer={handleCloseDrawer}
          modalWidthControlClassName="w-full md:w-[750px]"
        >
          <div className="py-5 h-screen overflow-y-auto">
            <div className="flex items-center justify-between px-5">
              <span className="text-black-opacity-50 text-lg print:hidden">
                Order Details
              </span>
              <DrawerModalCloseBTN handleClose={handleCloseDrawer} />
            </div>
            <OrderStatusUpdate
              setOpenShippingModal={setOpenShippingModal}
              setRejectConfirmationModal={setRejectConfirmationModal}
              data={
                onlineOrderData
                  ? { ...onlineOrderData, orderType: "onlineOrder" }
                  : quickOrderData
                  ? { ...quickOrderData, orderType: "quickOrder" }
                  : null
              }
            />
            <div className="print:hidden p-5 border-b">
              <OrderStatusStep
                data={
                  onlineOrderData
                    ? { ...onlineOrderData, orderType: "onlineOrder" }
                    : quickOrderData
                    ? { ...quickOrderData, orderType: "quickOrder" }
                    : null
                }
                id={id}
              />
            </div>
            <OrderDrawerDeliveredAddress
              onlineOrderData={onlineOrderData}
              quickOrderData={quickOrderData}
            />
            <div className="flex flex-col gap-5 mt-5 px-5">
              <span className="text-fuchsia-600">Order Item</span>
              <OrderDrawerItem
                onlineOrderData={onlineOrderData}
                quickOrderData={quickOrderData}
              />
              <div className="flex items-center md:justify-end">
                <OrderDrawerCalculation
                  onlineOrderData={onlineOrderData}
                  quickOrderData={quickOrderData}
                />
              </div>
            </div>
          </div>
        </CustomGlobalDrawer>
      </div>
      <div className="print:hidden">
        <ShippingConfirmModal
          data={
            onlineOrderData
              ? { ...onlineOrderData, orderType: "onlineOrder" }
              : quickOrderData
              ? { ...quickOrderData, orderType: "quickOrder" }
              : null
          }
          openShippingModal={openShippingModal}
          setOpenShippingModal={setOpenShippingModal}
          handleShippingModalClose={handleShippingModalClose}
        />
        <RejectConfirmationModal
          data={
            onlineOrderData
              ? { ...onlineOrderData, orderType: "onlineOrder" }
              : quickOrderData
              ? { ...quickOrderData, orderType: "quickOrder" }
              : null
          }
          rejectConfirmationModal={rejectConfirmationModal}
          setRejectConfirmationModal={setRejectConfirmationModal}
          handleRejectConfirmationModal={handleRejectConfirmationModal}
        />
      </div>
    </div>
  );
};

export default OrderTableDrawer;
