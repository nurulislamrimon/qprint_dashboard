"use client";
import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import PrintingDeliveryAddress from "../shared/PrintingDeliveryAddress";
import Attatchment from "../shared/Attatchment";
import OrderCalculation from "../shared/order-details/OrderCalculation";
import OrderStatusStep from "../shared/OrderStatusStep";
import OrderTable from "../shared/OrderTable";
import { useState } from "react";
import GlobalActionButton from "../shared/GlobalActionButton";
import { usePrintingRequestByIdQuery } from "@/store/features/printingRequest/printingRequestApi";
import PrintingStatusUpdateModal from "./PrintingStatusUpdateModal";
import OrderDrawerInformation from "../shared/order-table/orderTableDrawer/OrderDrawerInformation";
import RejectModal from "./RejectModal";

const PrintingRequestDrawer = ({ openModal, handleCloseModal, id }: any) => {
  const { data: printingRequestData } = usePrintingRequestByIdQuery(id);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openRejectModal, setOpenCancelModal] = useState(false);
  const handleUpdateModal = () => {
    setOpenUpdateModal((prevState) => !prevState);
  };
  const handleRejectModal = () => {
    setOpenCancelModal((prevState) => !prevState);
  };

  const lastOrderStatus =
    printingRequestData?.data?.orderStatus[
      printingRequestData?.data?.orderStatus.length - 1
    ];

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
              {/* <OrderInformation data={printingRequestData} /> */}
              <OrderDrawerInformation data={printingRequestData} />

              <div className="flex items-center gap-3.5 print:hidden">
                {lastOrderStatus?.status === "Rejected" ||
                  (lastOrderStatus?.status === "Returned" ||
                  lastOrderStatus?.status === "Cancelled" ? (
                    ""
                  ) : (
                    <button onClick={() => handleRejectModal()}>
                      {lastOrderStatus?.status === "Order placed"
                        ? "Reject"
                        : lastOrderStatus?.status === "Printing"
                        ? "Reject"
                        : lastOrderStatus?.status === "Shipping"
                        ? "Return"
                        : lastOrderStatus?.status === "Delivered"
                        ? "Return"
                        : ""}
                    </button>
                  ))}

                {lastOrderStatus?.status === "Rejected" ||
                lastOrderStatus?.status === "Returned" ||
                lastOrderStatus?.status === "Cancelled" ? (
                  ""
                ) : lastOrderStatus?.status === "Delivered" ? (
                  <p>Completed</p>
                ) : (
                  <div onClick={() => handleUpdateModal()}>
                    <GlobalActionButton
                      type="submit"
                      buttonText={
                        lastOrderStatus?.status === "Order placed"
                          ? "Printing"
                          : lastOrderStatus?.status === "Printing"
                          ? "Shipping"
                          : lastOrderStatus?.status === "Shipping"
                          ? "Delivered"
                          : ""
                      }
                      buttonStyleClassName={`px-[18px] py-2`}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="print:hidden p-5 border-b">
              <OrderStatusStep
                id={id}
                data={printingRequestData ? { ...printingRequestData } : null}
              />
            </div>
            <PrintingDeliveryAddress data={printingRequestData} />
            <Attatchment />
            <OrderTable data={printingRequestData} />
            <div className="flex items-center md:justify-end justify-normal p-5">
              <OrderCalculation data={printingRequestData} />
            </div>
          </div>
        </CustomGlobalDrawer>
      </div>
      <div>
        {openUpdateModal && (
          <PrintingStatusUpdateModal
            data={printingRequestData}
            handleModal={handleUpdateModal}
          />
        )}
        {openRejectModal && (
          <RejectModal
            data={printingRequestData}
            handleModal={handleRejectModal}
          />
        )}
      </div>
    </div>
  );
};

export default PrintingRequestDrawer;
