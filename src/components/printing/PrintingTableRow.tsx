import pdfLogo from "@/assets/pdf_logo.png";
import { getDateFormat } from "@/utils/getDateFormat";
import Image from "next/image";

const PrintingTableRow = ({ data }: any) => {
  return (
    <>
      <td className="py-3 px-3.5 text-left">
        <div className="flex flex-col gap-1">
          <span className="md:text-base text-xs text-black line-clamp-1">
            {data?.buyer?.fullName}
          </span>
          <span className="text-black-opacity-50 md:text-sm text-custom-10px">
            {getDateFormat(data?.createdAt)}
          </span>
        </div>
      </td>
      <td className="md:table-cell hidden text-base">
        {data?.paperSize?.height} x {data?.paperSize?.width} {data?.unit}
      </td>
      <td className="md:table-cell hidden text-base">{data?.paperType}</td>
      <td className="md:table-cell hidden text-base">
        {data?.printingColorMode}
      </td>
      <td className="main-text-color font-medium md:text-base text-xs">
        {data?.totalPrice} QR
      </td>
      <td>
        <span
          className={`${
            data?.orderStatus?.status === "Order placed"
              ? "text-blue-color bg-blue-opacity-10"
              : data?.orderStatus?.status === "Shipping"
              ? "text-yellow-color bg-yellow-opacity-10"
              : data?.orderStatus?.status === "Delivered"
              ? "text-green-color bg-green-opacity-10"
              : data?.orderStatus?.status === "Printing"
              ? "text-black-opacity-70  bg-gray-opacity-10 "
              : data?.orderStatus?.status === "Cancelled"
              ? "text-red-color bg-red-opacity-10"
              : ""
          } md:text-sm text-custom-10px whitespace-nowrap  py-1.5 md:px-4 px-1 rounded-full`}
        >
          {data?.orderStatus?.status}
        </span>
      </td>
      <td className=" px-3.5 py-3">
        <div className="flex items-center justify-center gap-2.5">
          <div className="md:w-5 md:h-5 w-3 h-3">
            <Image src={pdfLogo} alt="pdf logo" className="w-full" />
          </div>
          {data?.printingRequestFile?.length >= 10 ? (
            <span className="md:text-base text-xs">
              {data?.printingRequestFile?.slice(0, 10)}
            </span>
          ) : (
            <span> {data?.printingRequestFile}</span>
          )}
        </div>
      </td>
    </>
  );
};

export default PrintingTableRow;
