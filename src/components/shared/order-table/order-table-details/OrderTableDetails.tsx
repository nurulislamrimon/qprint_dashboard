"use client";
import { mainUrl } from "@/constants/mainUrl";
import Image from "next/image";
import React from "react";

const OrderTableDetails = ({ allOrder, quickOrder }: any) => {
  const handleProduct = (
    num1: number,
    num2: number,
    num3: number,
    num4: number
  ) => {
    return num1 * num2 || num3 * num4;
  };

  const orderItems = allOrder?.data?.orderItems
    ? allOrder?.data?.orderItems
    : quickOrder?.data?.orderItems && quickOrder?.data?.orderItems;

  return (
    <table className="w-full">
      <thead className="text-center border text-black-opacity-50 md:text-base text-xs">
        <tr className="">
          {["SL", "Item", "Unite Price", "Discount", "QTY", "Total"].map(
            (data: string) => (
              <th className="md:px-5 py-2.5 font-normal border" key={data}>
                {data}
              </th>
            )
          )}
        </tr>
      </thead>
      {orderItems?.map((items: any, index: number) => {
        return (
          <tbody
            key={index.toString()}
            className="text-center border text-black-opacity-80 md:text-base text-xs"
          >
            <tr>
              <td className="text-black-opacity-50">{index + 1}</td>
              <td className="border px-3 py-2 md:py-4 ">
                <div className="flex gap-3 text-start ">
                  <div className="w-[28px] h-[28px] md:w-[40px] md:h-[40px] shrink-0 relative mt-1.5 print:hidden">
                    <Image
                      src={`${mainUrl}${items?.productPhotos[0]}`}
                      alt="profile"
                      // objectFit="cover"
                      fill
                      sizes="200px"
                      className="w-full h-full top-0 left-0 object-cover rounded-custom-5px"
                    />
                  </div>
                  <span className="flex justify-end flex-col gap-2.5 sm:[font-size:clamp(10px,90vw,16px)]">
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
                )}{" "}
                {""}
                QR
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default OrderTableDetails;
