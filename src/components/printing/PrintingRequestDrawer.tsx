"use client";
import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import PrintingDeliveryAddress from "../shared/PrintingDeliveryAddress";
import Attatchment from "../shared/Attatchment";
import OrderInformation from "../shared/OrderInformation";
import OrderCalculation from "../shared/order-details/OrderCalculation";
import OrderStatusStep from "../shared/OrderStatusStep";
import OrderTable from "../shared/OrderTable";
import { useState } from "react";
import ShippingConfirmModal from "./ShippingConfirmModal";
import GlobalActionButton from "../shared/GlobalActionButton";
import { usePrintingRequestByIdQuery } from "@/store/features/printingRequest/printingRequestApi";

const PrintingRequestDrawer = ({ openModal, handleCloseModal, id }: any) => {
  const { data } = usePrintingRequestByIdQuery(id);

  const [openShippingModal, setOpenShippingModal] = useState(false);
  const handleShippingModalClose = () => {
    setOpenShippingModal(false);
  };

  // console.log(data, "Printing request");

  const lastOrderStatus =
    data?.data?.orderStatus[data?.data?.orderStatus.length - 1];

 

  return (
    <div>
      <div>
        <CustomGlobalDrawer
          modalWidthControlClassName="w-full md:w-[750px]"
          setOpenDrawer={handleCloseModal}
          isVisible={openModal}
        >
          <div className="py-5 h-screen overflow-y-auto">
            <div className="flex items-center justify-between px-5">
              <span className="text-black-opacity-50 text-lg">
                Order Details
              </span>
              <DrawerModalCloseBTN handleClose={handleCloseModal} />
            </div>

            <div className="p-5 flex items-center justify-between b">
              <OrderInformation data={data} />
              <div className="flex items-center gap-3.5">
                <button>Cancel</button>

                <div onClick={() => setOpenShippingModal(true)}>
                  <GlobalActionButton
                    type="submit"
                    buttonText="To Ship"
                    buttonStyleClassName="px-[18px] py-2"
                  />
                </div>
              </div>
            </div>
            <div className="p-5 border-b">
              <OrderStatusStep id={id} data={data} />
            </div>
            <PrintingDeliveryAddress data={data} />
            <Attatchment />
            <OrderTable data={data} />
            <div className="flex items-center md:justify-end justify-normal p-5">
              <OrderCalculation data={data} />
            </div>
          </div>
        </CustomGlobalDrawer>
      </div>
      <div>
        <ShippingConfirmModal
          data={data}
          openShippingModal={openShippingModal}
          setOpenShippingModal={setOpenShippingModal}
          handleShippingModalClose={handleShippingModalClose}
        />
      </div>
    </div>
  );
};

export default PrintingRequestDrawer;
