import { printInvoiceFn } from "@/constants/printInvoiceFn";
import { getDateFormat } from "@/utils/getDateFormat";
import { IconEye, IconPrinter } from "@tabler/icons-react";
import Image from "next/image";
import logo from "@/assets/logo.png";

import React from "react";
import Link from "next/link";

const OrderDrawerInformation = ({ data }: any) => {
  return (
    <div className="flex md:gap-7  print:relative">
      <div className="flex flex-col items-start gap-2.5 print:flex print:items-center print:justify-center">
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
        <span className="[font-size:clamp(10px,5vw,19px)] text-black-opacity-80 font-medium print:hidden">
          Order Status
        </span>
        <span className=" hidden gap-2 md:text-base text-sm text-black-opacity-60 whitespace-nowrap print:flex print:absolute print:top-40 print:-right-72">
          Order Status :
          <small className="text-[#878787] text-sm md:text-base">
            {/* <p>
              {
                data?.data?.orderStatus[data?.data?.orderStatus.length - 1]
                  ?.status
              }
            </p> */}
          </small>
        </span>
        <span className="text-sm text-black-opacity-80 font-medium ">
          Order Id : {data?.data?.orderId}
        </span>
        <span className="text-sm text-black-opacity-50 print:text-center">
          {getDateFormat(data?.data?.createdAt)}
        </span>
        <span className="text-sm text-black-opacity-60 whitespace-nowrap print:absolute print:top-48 print:-right-72 ">
          Payment Method: {data?.data?.payment?.paymentMethod}
        </span>
        <span className="text-sm text-black-opacity-60  whitespace-nowrap hidden print:block  print:absolute print:top-56 print:-right-72">
          Payment Status: {data?.data?.payment?.paymentStatus}
        </span>
      </div>
      <div>
        <div className="print:hidden  flex items-center gap-2.5 ">
          <Link
            className="group"
            onClick={(e) => e.stopPropagation()}
            href={`/order/${data?.data?._id}`}
          >
            <button className="border rounded-full p-2 group-hover:bg-fuchsia-600 group-hover:duration-500">
              <IconEye
                stroke={1}
                width={20}
                height={20}
                className="text-fuchsia-800 group-hover:text-white"
              />
            </button>
          </Link>
          <button className="border rounded-full p-2 group hover:bg-fuchsia-600 hover:duration-500">
            <IconPrinter
              onClick={printInvoiceFn}
              stroke={1}
              width={20}
              height={20}
              className="text-fuchsia-800 group-hover:text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDrawerInformation;
