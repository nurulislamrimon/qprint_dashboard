import Calender from "@/assets/assetsSVG/Calender";
import PrinterWhite from "@/assets/assetsSVG/PrinterWhite";
import { printInvoiceFn } from "@/constants/printInvoiceFn";
import { getDateFormat } from "@/utils/getDateFormat";
import logo from "@/assets/logo.png";
import Image from "next/image";

const OrderTableInformation = ({ allOrder, quickOrder }: any) => {
  const data = allOrder ? allOrder : quickOrder && quickOrder;

  return (
    <div className="flex md:flex-row flex-col md:items-center justify-between md:gap-5 gap-10">
      <div className="flex flex-col gap-5 print:flex print:items-center print:justify-center">
        <span className="text-sm md:text-lg text-black-opacity-70 print:hidden">
          Orders Details
        </span>
        <div className="w-[133px] h-[30px]  shrink-0 relative hidden print:flex print:items-center print:justify-center">
          <Image
            src={logo}
            alt="profile"
            // objectFit="cover"
            fill
            sizes="200px"
            className="w-full h-full top-0 left-0 object-cover rounded-full"
          />
        </div>
        <span className="flex flex-col gap-3.5">
          <strong className="font-medium text-lg md:text-xl text-black-opacity-80">
            Order Id: #{data?.data?.orderId}
          </strong>
          <span className="flex items-center gap-2.5 text-black-opacity-70 md:text-base text-sm  print:flex print:items-center print:justify-center">
            <Calender />
            {getDateFormat(data?.data?.createdAt)}
          </span>
        </span>
      </div>
      <div className="flex md:flex-col flex-col-reverse gap-7">
        <div className="flex flex-col gap-3.5 items-end">
          <span className=" flex gap-2 md:text-base text-sm text-black-opacity-60">
            Order Status :
            <small className="text-[#878787] text-sm md:text-base">
              <p>
                {
                  data?.data?.orderStatus[data?.data?.orderStatus.length - 1]
                    ?.status
                }
              </p>
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

export default OrderTableInformation;
