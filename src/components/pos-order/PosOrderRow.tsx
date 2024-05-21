import Printer from "@/assets/assetsSVG/Printer";
import ZoomIn from "@/assets/assetsSVG/ZoomIn";
import { getDateFormat } from "@/utils/getDateFormat";
import { IconPrinter, IconZoomIn } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const PosOrderRow = ({ data, index }: any) => {
  return (
    <>
      <td className="py-5 md:table-cell hidden">{index + 1}</td>
      <td className="py-5 md:ps-0 ps-3 md:text-center text-left ">
        {data?.orderId}
      </td>
      <td className="py-5 md:table-cell hidden">
        {getDateFormat(data?.createdAt)}
      </td>
      <td className="py-5">{data?.totalPayable} QR</td>
      <td className="py-5">
        <span className="bg-main-bg-color-opacity-32 select-none text-fuchsia-800 py-1.5 max-w-24 md:px-8 px-2.5 md:rounded-custom-5px rounded-full text-sm font-medium">
          POS
        </span>
      </td>
    </>
  );
};

export default PosOrderRow;
