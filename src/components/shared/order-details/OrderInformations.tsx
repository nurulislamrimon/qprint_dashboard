"use client";
import Calender from "@/assets/assetsSVG/Calender";
import PrinterWhite from "@/assets/assetsSVG/PrinterWhite";
import { printInvoiceFn } from "@/constants/printInvoiceFn";

const OrderInformations = ({ data, printInvoice }: any) => {
  return (
    <div className="flex md:flex-row flex-col md:items-center justify-between md:gap-5 gap-10">
      <div className="flex flex-col gap-5">
        <span className="text-sm md:text-lg text-black-opacity-70">
          Orders Details
        </span>
        <span className="flex flex-col gap-3.5">
          <strong className="font-medium text-lg md:text-xl text-black-opacity-80">
            Order Id: {data?.data?.orderId}
          </strong>
          <span className="flex items-center gap-2.5 text-black-opacity-70 md:text-base text-sm">
            <Calender />
            {data?.data?.createdAt}
          </span>
        </span>
      </div>
      <div className="flex md:flex-col flex-col-reverse gap-7">
        <div className="flex flex-col gap-3.5 items-end">
          <span className=" flex gap-2 md:text-base text-sm text-black-opacity-60">
            Order Status :
            <small className="text-[#878787] text-sm md:text-base">
              {data?.data?.orderStatus.map((status: any, index: number) => {
                return <p key={index.toString()}>{status?.status}</p>;
              })}
            </small>
          </span>
          <div className="flex items-center gap-1 md:text-base text-sm text-black-opacity-60">
            Payment Method :{/* <Image src={visaLogo} alt="visa logo" /> */}
            <small className="text-black-opacity-70 text-sm md:text-base">
              {data?.data?.payment?.paymentMethod}
            </small>
          </div>
          <span className="md:text-base text-sm text-black-opacity-60 flex items-center gap-1">
            Payment Status: {data?.data?.payment?.paymentStatus}
          </span>
        </div>
        <button
          onClick={printInvoiceFn}
          className="hover:scale-105 transition-all text-white bg-main-bg-color flex items-center justify-center px-3.5 py-3 rounded-custom-5px gap-1 text-base md:w-auto w-1/2"
        >
          <PrinterWhite />
          <span>Print Invoice</span>
        </button>
      </div>
    </div>
  );
};

export default OrderInformations;
