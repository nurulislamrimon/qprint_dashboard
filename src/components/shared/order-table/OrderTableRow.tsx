"use client";
import { IconPrinter, IconZoomIn } from "@tabler/icons-react";
import Link from "next/link";
import { getDateFormat } from "@/utils/getDateFormat";
import { generateOptions, printInvoiceFn } from "@/constants/printInvoiceFn";
import { useUpdateOrderStatusMutation } from "@/store/features/order/ordersApi";
import { useState } from "react";
import StatusConfirm from "@/components/orders/StatusConfirm";
import { useQuickOrderUpdateOrderStatusMutation } from "@/store/features/quickOrder/quickOrderApi";
import QuickOrderStatusUpdate from "@/components/orders/QuickOrderStatusUpdate";

export interface OrderTableRowProps {
  data: {
    orderId?: string;
    createdAt?: string;
    buyer?: string;
    fullName?: string;
    // name?: string;
    paymentMethod?: string;
    totalPrice?: number;
    status?: string;
    _id?: number;
    page?: string;
  };
  index?: any;
}

const OrderTableRow = ({
  data,
  index,
  dashboardTableData,
  quickOrder,
  loadingMore,
}: any) => {
  // console.log(quickOrder);

  const [updateStatus] = useUpdateOrderStatusMutation();
  const [quickOrderUpdate] = useQuickOrderUpdateOrderStatusMutation();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openQuickOrderModal, setQuickOrderModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleModal = () => {
    setOpenModal((prevState) => {
      if (!prevState) {
        setSelectedOption("");
      }
      return !prevState;
    });
  };
  const handleQuickOrderModal = () => {
    setQuickOrderModal((prevState) => {
      if (!prevState) {
        setSelectedOption("");
      }
      return !prevState;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue); // Update the selected option state

    // Determine which modal to open based on the order type
    if (datas) {
      // Regular order modal
      setOpenModal(true);
    } else if (quickOrder) {
      // Quick order modal
      setQuickOrderModal(true);
    }
  };
  const datas = dashboardTableData ? dashboardTableData : data && data;

  return (
    <>
      {dashboardTableData ? (
        ""
      ) : (
        <td className="text-left pl-5  hidden md:table-cell ">{index + 1}</td>
      )}

      <td className="text-left pl-5 hidden md:table-cell ">
        {datas ? `#${datas.orderId}` : ""}
        {quickOrder ? `#${quickOrder.orderId}` : ""}
      </td>

      <td className="px-6  whitespace-nowrap font-normal hidden md:table-cell">
        {datas ? getDateFormat(datas.createdAt) : ""}
        {quickOrder ? getDateFormat(quickOrder.createdAt) : ""}
      </td>
      <td className="flex flex-col text-center md:table-cell whitespace-nowrap pr-3 md:px-5  [font-size:clamp(13px,3vw,16px)]">
        {datas ? datas?.buyer?.fullName : ""}
        {quickOrder ? quickOrder?.buyer?.fullName : ""}
        <small className="md:hidden">
          {datas ? getDateFormat(datas.updatedAt) : ""}
          {quickOrder ? getDateFormat(quickOrder.updatedAt) : ""}
        </small>
      </td>
      <td className="px-6  font-normal hidden md:table-cell">
        {datas ? datas?.payment?.paymentMethod : ""}{" "}
        {quickOrder ? quickOrder?.payment?.paymentMethod : ""}
      </td>
      <td className="px-3 md:px-6  [font-size:clamp(13px,3vw,16px)] whitespace-nowrap">
        {datas ? datas?.totalPayable : ""}
        {quickOrder ? quickOrder?.totalPayable : ""} QR
      </td>
      <td className="mr-5 py-3">
        <div
          className={` cursor-default whitespace-nowrap text-center rounded-full pl-2 py-2 px-[13px] shrink-0 [font-size:clamp(10px,3vw,16px)] ${
            datas
              ? datas?.orderStatus?.status === "Order placed"
                ? "text-[#3B82F6] bg-[#3b82f61a]"
                : datas?.orderStatus?.status === "Packaging"
                ? "text-[#000000b3] bg-[#8787871a]"
                : datas?.orderStatus?.status === "Shipping"
                ? "text-[#E79D00] bg-[#e73c171a]"
                : datas?.orderStatus?.status === "Delivered"
                ? "text-[#03A609] bg-[#03a6091a]"
                : datas?.orderStatus?.status === "Rejected"
                ? "text-[#E73C17] bg-[#e73c171a]"
                : datas?.orderStatus?.status === "Returned"
                ? "text-[#3C4F4A] bg-[#233fa314]"
                : datas?.orderStatus?.status === "Cancelled" &&
                  "text-[#E73C17] bg-[#e73c171a]"
              : ""
          } ${
            quickOrder
              ? quickOrder?.orderStatus?.status === "Order placed"
                ? "text-[#3B82F6] bg-[#3b82f61a]"
                : quickOrder?.orderStatus?.status === "Packaging"
                ? "text-[#000000b3] bg-[#8787871a]"
                : quickOrder?.orderStatus?.status === "Shipping"
                ? "text-[#E79D00] bg-[#e73c171a]"
                : quickOrder?.orderStatus?.status === "Delivered"
                ? "text-[#03A609] bg-[#03a6091a]"
                : quickOrder?.orderStatus?.status === "Rejected"
                ? "text-[#E73C17] bg-[#e73c171a]"
                : quickOrder?.orderStatus?.status === "Returned"
                ? "text-[#3C4F4A] bg-[#233fa314]"
                : quickOrder?.orderStatus?.status === "Cancelled" &&
                  "text-[#E73C17] bg-[#e73c171a]"
              : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {datas ? datas?.orderStatus?.status : ""}
          {quickOrder ? quickOrder?.orderStatus?.status : ""}
        </div>
      </td>
      <td className="pl-2.5">
        <span className=" border hover:border-red-regular py-2 px-1 rounded-custom-5px text-sm hover:text-navy-blue cursor-pointer [width:clamp(58.5px,4vw,200px)] md:w-full">
          <select
            disabled={
              (datas &&
                ["Rejected", "Returned", "Cancelled"].includes(
                  datas.orderStatus.status
                )) ||
              (quickOrder &&
                ["Rejected", "Returned", "Cancelled"].includes(
                  quickOrder.orderStatus.status
                ))
            }
            onClick={(e) => e.stopPropagation()}
            className="outline-none cursor-pointer py-2 bg-transparent hover:bg-transparent w-auto"
            value={selectedOption}
            onChange={handleChange}
          >
            {datas
              ? generateOptions(datas?.orderStatus?.status).map(
                  (option, index) => (
                    <option
                      onClick={() => setSelectedOption(option)} // Add onClick event to each option
                      key={index}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )
              : ""}
            {quickOrder
              ? generateOptions(quickOrder?.orderStatus?.status).map(
                  (option, index) => (
                    <option
                      onClick={() => setSelectedOption(option)} // Add onClick event to each option
                      key={index}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )
              : ""}
          </select>
        </span>
      </td>
      <td className="hidden md:flex items-center justify-center w-full h-full pl-7  gap-x-2 text-[#000000b3] [&>:first-child]:cursor-pointer [&>:last-child]:cursor-pointer [font-size:clamp(13px,3vw,16px)] pt-5">
        {/* <button onClick={printInvoiceFn}>
          <IconPrinter />
        </button> */}
        {datas ? (
          <Link
            onClick={(e) => e.stopPropagation()}
            href={`/order/${datas?._id}`}
          >
            <IconZoomIn />
          </Link>
        ) : (
          quickOrder && (
            <Link
              onClick={(e) => e.stopPropagation()}
              href={`/order/${quickOrder?._id}`}
            >
              <IconZoomIn />
            </Link>
          )
        )}

        {/* Render StatusConfirm modal conditionally */}
        {openModal && (
          <StatusConfirm
            isVisible={openModal} // Pass openModal state
            handleModal={handleModal} // Close modal function
            option={selectedOption}
            data={datas}
            updateStatus={updateStatus}
          />
        )}
        {openQuickOrderModal && (
          <QuickOrderStatusUpdate
            isVisible={openQuickOrderModal}
            handleQuickOrderModal={handleQuickOrderModal}
            option={selectedOption}
            data={quickOrder}
            quickOrderUpdate={quickOrderUpdate}
          />
        )}
      </td>
      {loadingMore && (
        <div className="flex items-center justify-center  w-full">
          <span className="loading loading-dots loading-lg bg-main-bg-color "></span>
        </div>
      )}
    </>
  );
};

export default OrderTableRow;
