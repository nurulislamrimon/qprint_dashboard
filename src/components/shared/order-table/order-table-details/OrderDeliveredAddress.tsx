import Address from "@/assets/assetsSVG/Address";
import Dialler from "@/assets/assetsSVG/Dialler";
import Gps from "@/assets/assetsSVG/Gps";
import React from "react";

const OrderDeliveredAddress = ({ allOrder, quickOrder }: any) => {
  const shippingAddress = allOrder?.data?.buyer?.shippingAddress;
  const billingAddress = allOrder?.data?.billingAddress;
  const buyer = allOrder?.data?.buyer;

  // name
  const fullname = shippingAddress
    ? shippingAddress?.firstName
    : billingAddress
    ? billingAddress?.firstName
    : buyer && buyer?.fullName;
  // phone number
  const phoneNumber = shippingAddress
    ? shippingAddress?.phoneNumber
    : billingAddress
    ? billingAddress?.phoneNumber
    : buyer && buyer?.phoneNumber;

  // country
  const country = shippingAddress
    ? shippingAddress?.country
    : billingAddress
    ? billingAddress?.country
    : "";
  // zipcode
  const zipCode = shippingAddress
    ? shippingAddress?.zipCode
    : billingAddress
    ? billingAddress?.zipCode
    : "";
  // streetAddress
  const streetAddress = shippingAddress
    ? shippingAddress?.streetAddress
    : billingAddress
    ? billingAddress?.streetAddress
    : "";
  // State
  const state = shippingAddress
    ? shippingAddress?.state
    : billingAddress
    ? billingAddress?.state
    : "";
  // quickOrderAddress
  const quickOrderAddress = quickOrder?.data?.buyer?.address
    ? quickOrder?.data?.buyer?.address
    : "";

  return (
    <div className="flex flex-col gap-7 ">
      <div className="flex items-center gap-2.5">
        <Address />
        <span className="main-text-color">Delivery Addresses</span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2.5 text-base">
          <Dialler />
          <span>{phoneNumber}</span>
        </div>
        <div className="flex items-center gap-3 text-base">
          <span>
            <Gps />
          </span>
          <span>
            {quickOrderAddress} {country} {state} {streetAddress} {zipCode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDeliveredAddress;
