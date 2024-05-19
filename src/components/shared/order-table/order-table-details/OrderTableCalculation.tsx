import React from "react";

const OrderTableCalculation = ({ allOrder, quickOrder }: any) => {
  return (
    <div className="md:w-1/2 w-full">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between text-base text-[#5F6C72]">
          <span>Subtotal</span>
          <strong className="text-right text-black-opacity-70 font-medium">
            {allOrder ? allOrder?.data?.totalPrice : ""}
            {quickOrder ? quickOrder?.data?.totalPrice : ""} QAR
          </strong>
        </div>
        <div className="flex items-center justify-between text-base text-[#5F6C72]">
          <span>Discount</span>
          <strong className="text-right text-black-opacity-70 font-medium">
            -{allOrder ? allOrder?.data?.totalDiscount : ""}
            {quickOrder ? quickOrder?.data?.totalDiscount : ""} QAR
          </strong>
        </div>
        <div className="flex items-center justify-between  text-base text-[#5F6C72]">
          <span>Shipping </span>
          <strong className="text-right text-black-opacity-70 font-medium">
            {allOrder ? allOrder?.data?.shippingCharge : ""}
            {quickOrder ? quickOrder?.data?.shippingCharge : ""} QAR
          </strong>
        </div>
        <hr />
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-lg text-black-opacity-80">Total</span>
        <strong className="text-fuchsia-600 text-lg font-medium">
          {allOrder ? allOrder?.data?.totalPayable : ""}
          {quickOrder ? quickOrder?.data?.totalPayable : ""} QR
        </strong>
      </div>
    </div>
  );
};

export default OrderTableCalculation;
