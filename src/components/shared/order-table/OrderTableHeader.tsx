import { orderStatus } from "@/constants/orderStatus.constants";
import React from "react";
interface OrderTableHeaderProps {
  orderSelectedOption?: any;
  orderTitle?: string;
  orderQuantity?: number;
  orderQuantityClass?: string;
  orderTableHeaderInput?: any;
}

const OrderTableHeader = ({
  orderTitle,
  orderQuantityClass,
  orderQuantity,
  orderSelectedOption,
  orderTableHeaderInput,
}: OrderTableHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-7">
      <div className="flex gap-2.5 items-center">
        <h1 className="text-black [font-size:clamp(14px,3vw,17px)] font-medium whitespace-nowrap">
          {orderTitle}
        </h1>
        <span
          className={`${orderQuantityClass} rounded-full py-1.5 px-1.5 [font-size:clamp(9px,3vw,13.5px)]`}
        >
          {orderQuantity}
        </span>
      </div>
      <div className="flex items-center gap-5">
        {/* select attribute */}
        {orderSelectedOption}
        {/* datePicker attribute */}
        <div>{orderTableHeaderInput}</div>
      </div>
    </div>
  );
};

export default OrderTableHeader;
