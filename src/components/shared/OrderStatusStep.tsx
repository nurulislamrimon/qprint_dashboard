import React, { useEffect, useState } from "react";
import Stepper from "./Stepper";
import { getDateFormat } from "@/utils/getDateFormat";

const OrderStatusStep = ({ data }: any) => {
  //Status Data
  const orderStepData = ["Order placed", "Packaging", "Shipping", "Delivered"];

  const lastOrderStatus =
    data?.data?.orderStatus[data?.data?.orderStatus.length - 1];

  return lastOrderStatus?.status === "Rejected" ||
    lastOrderStatus?.status === "Returned" ||
    lastOrderStatus?.status === "Cancelled" ? (
    <p className="text-center text-red-500">
      2
      {lastOrderStatus?.status === "Rejected" ||
      lastOrderStatus?.status === "Returned"
        ? `This order is ${
            lastOrderStatus?.status
          } by your self at ${getDateFormat(lastOrderStatus?.time)}`
        : lastOrderStatus?.status === "Cancelled"
        ? `This order is ${
            lastOrderStatus?.status
          } Cancelled by customer at ${getDateFormat(lastOrderStatus?.time)}`
        : null}
    </p>
  ) : (
    <div className="mb-10">
      <Stepper
        currentStep={data?.data?.orderStatus?.length - 1}
        numberOfSteps={4}
        iconSize={`${20}`}
        iconStroke={`${1}`}
      />
      <div className="flex items-center gap-32">
        {orderStepData.map((step: any, index: number) => (
          <div key={index} className="flex flex-col items-center">
            <span className="md:text-xs text-custom-10px">{step}</span>
            <span className="text-black text-opacity-50 md:text-xs text-custom-10px">
              {data?.data?.orderStatus[index] &&
                getDateFormat(data?.data?.orderStatus[index]?.time)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusStep;
