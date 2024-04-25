import React from "react";
import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import { IconPrinter } from "@tabler/icons-react";
import PosOrderDrawerRowItem from "./PosOrderDrawerRowItem";
import OrderCalculation from "../shared/order-details/OrderCalculation";
import { useAppDispatch } from "@/store/hook";
import { setReset } from "@/store/features/pos/posSaleSlice";
import { getDateFormat } from "@/utils/getDateFormat";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { printInvoiceFn } from "@/constants/printInvoiceFn";

const PosOrderDrawer = (data: any) => {
  const dispatch = useAppDispatch();
  // createdAt to minutes
  const dateObject = new Date(data?.data?.createdAt);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return (
    <div>
      <CustomGlobalDrawer
        modalWidthControlClassName="w-full md:w-[750px]"
        isVisible={Object.keys(data).length ? true : false}
      >
        <div className="overflow-y-auto h-full pb-5">
          <div className="flex items-center justify-between p-5">
            <span className="text-lg text-black-opacity-50 print:hidden">
              Order Details
            </span>
            <DrawerModalCloseBTN handleClose={() => dispatch(setReset())} />
          </div>
          <div className="flex flex-col gap-2.5 px-5 print:flex print:items-center print:justify-center">
            <div className="w-[133px] h-[30px]  shrink-0 relative hidden print:flex print:items-center print:justify-center">
              <Image
                src={logo}
                alt="profile"
                fill
                sizes="200px"
                className="w-full h-full top-0 left-0 object-cover rounded-full"
              />
            </div>
            <div className="flex items-center gap-7">
              <span className="text-black-opacity-80 text-2xl font-medium print:hidden">
                POS Order
              </span>

              <button
                onClick={printInvoiceFn}
                className="border px-3 py-2.5 rounded-custom-5px print:hidden"
              >
                <IconPrinter stroke={1} className="text-fuchsia-800 " />
              </button>
            </div>
            <span className="text-black-opacity-80 text-sm font-medium">
              Order Id: {data?.data?.orderId}
            </span>
            <span className="text-black-opacity-50 text-sm">
              {getDateFormat(data?.data?.createdAt)} {formattedTime}
            </span>
          </div>
          <div className="px-5 space-y-5 mt-14">
            <span className="text-fuchsia-600 text-lg">Order Item</span>

            <table className="w-full">
              <thead>
                <tr>
                  {["Item", "Unit Price", "%", "QTY", "Total"].map(
                    (head, index) => (
                      <th
                        key={index}
                        className={`font-normal border py-2.5 text-black-opacity-50 text-base ${
                          head === "Item" && "text-left pl-5"
                        }`}
                        scope="col"
                      >
                        {head}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {data?.data?.orderItems?.map(
                  (orderItem: any, index: number) => (
                    <tr key={index}>
                      <PosOrderDrawerRowItem data={orderItem} />
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center md:justify-end px-5 mt-5">
            <OrderCalculation data={data} />
          </div>
        </div>
      </CustomGlobalDrawer>
    </div>
  );
};

export default PosOrderDrawer;
