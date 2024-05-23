import { getDateFormat } from "@/utils/getDateFormat";
import Image from "next/image";
import {
  getDisplayName,
  getFileExtension,
  getLogoForFile,
} from "@/utils/pdfFileShorter";
import handleDownloadFile from "@/utils/downloadFile";

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
            data?.orderStatus?.status === "Pending"
              ? "text-[#95a5a6] bg-[#99e0e5]"
              : data?.orderStatus?.status === "Shipping"
              ? "text-yellow-color bg-yellow-opacity-10"
              : data?.orderStatus?.status === "Delivered"
              ? "text-green-color bg-green-opacity-10"
              : data?.orderStatus?.status === "Printing"
              ? "text-black-opacity-70  bg-gray-opacity-10 "
              : data?.orderStatus?.status === "Cancelled"
              ? "text-red-color bg-red-opacity-10"
              : data?.orderStatus?.status === "Packaging"
              ? "text-black-opacity-70 bg-main-bg-color-opacity-32"
              : data?.orderStatus?.status === "Order placed"
              ? "text-blue-color bg-blue-opacity-10"
              : ""
          } md:text-sm text-custom-10px whitespace-nowrap  py-1.5 md:px-4 px-1 rounded-full`}
        >
          {data?.orderStatus?.status}
        </span>
      </td>
      <td className="px-3.5 py-3">
        <div className="flex items-center justify-center gap-1">
          {data?.printingRequestFile &&
            data.printingRequestFile !== "undefined" && (
              <div className="w-5 h-5 shrink-0">
                {(() => {
                  const extension = getFileExtension(
                    data.printingRequestFile
                  ) as "pdf" | "png" | "jpg" | "jpeg" | "svg" | "psd";
                  const logoSrc = getLogoForFile(extension);
                  if (logoSrc) {
                    return (
                      <Image
                        src={logoSrc}
                        alt={"Printing File"}
                        className="w-full h-full"
                      />
                    );
                  }
                  return null;
                })()}
              </div>
            )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadFile(data?.printingRequestFile);
            }}
            className="line-clamp-2 text-xs md:text-base"
          >
            {data?.printingRequestFile &&
            data.printingRequestFile !== "undefined"
              ? getDisplayName(data?.printingRequestFile)
              : "No Attachment"}
          </button>
        </div>
      </td>
    </>
  );
};

export default PrintingTableRow;
