import { mainUrl } from "@/constants/mainUrl";
import Image from "next/image";
import React from "react";

const OrderDrawerItem = ({ onlineOrderData, quickOrderData }: any) => {
  const handleProduct = (
    num1: number,
    num2: number,
    num3: number,
    num4: number
  ) => {
    return num1 * num2 || num3 * num4;
  };

  const data = onlineOrderData?.data || quickOrderData?.data;

  return (
    <table className="table-auto">
      <thead className="text-center border text-black-opacity-50 md:text-base text-xs">
        <tr className="text-[90%] whitespace-nowrap ">
          {["Item", "Unite Price", "Discount", "QTY", "Total"].map(
            (data: string) => (
              <th className="md:px-5 py-2.5 font-normal border" key={data}>
                {data}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="text-center border text-black-opacity-80 md:text-base text-xs">
        {data?.orderItems?.map((items: any, index: number) => {
          return (
            <tr key={index.toString()}>
              <td className="border px-3 py-2 md:py-4 ">
                <div className="flex gap-3 text-start ">
                  <div className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] shrink-0 relative mt-1.5 print:hidden">
                    <Image
                      src={`${mainUrl}${items?.productPhotos[0]}`}
                      alt="profile"
                      sizes="200px"
                      fill
                      className="w-full h-full top-0 left-0 object-cover rounded-custom-5px"
                    />
                  </div>
                  <span className="flex justify-end flex-col gap-2.5 sm:[font-size:clamp(8px,90vw,13px)]">
                    {items?.productName}
                    <span className="text-black-opacity-50">
                      {items?.brand?.brandName}
                    </span>
                  </span>
                </div>
              </td>
              <td className="border md:px-5 py-2 md:py-4">
                {items?.variant?.sellingPrice} QR
              </td>
              <td className="border md:px-5 py-2 md:py-4">
                {items?.variant?.discountPercentage}%
              </td>
              <td className="border md:px-5 py-2 md:py-4 text-fuchsia-600">
                {items?.orderQuantity}
              </td>
              <td className="border px-2 py-2 md:py-4 text-fuchsia-600 text-center">
                {handleProduct(
                  items?.orderQuantity,
                  items?.variant?.discountedPrice,
                  items?.variant?.sellingPrice,
                  items?.orderQuantity
                )}
                QR
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderDrawerItem;
