import Address from "@/assets/assetsSVG/Address";
import { IconMapPin, IconPhone, IconUser } from "@tabler/icons-react";
import React from "react";

const OrderDrawerDeliveredAddress = ({
  onlineOrderData,
  quickOrderData,
}: any) => {
  const shippingAddress =
    onlineOrderData?.data?.buyer?.shippingAddress ||
    quickOrderData?.data?.buyer?.shippingAddress;
  const billingAddress =
    onlineOrderData?.data?.billingAddress ||
    quickOrderData?.data?.billingAddress;
  const buyer = onlineOrderData?.data?.buyer || quickOrderData?.data?.buyer;

  // name
  const fullname =
    shippingAddress?.firstName || billingAddress?.firstName || buyer?.fullName;
  // phone number
  const phoneNumber =
    shippingAddress?.phoneNumber ||
    billingAddress?.phoneNumber ||
    buyer?.phoneNumber;

  // country
  const country = shippingAddress?.country || billingAddress?.country || "";
  // zip code
  const zipCode = shippingAddress?.zipCode || billingAddress?.zipCode || "";
  // street address
  const streetAddress =
    shippingAddress?.streetAddress || billingAddress?.streetAddress || "";
  // state
  const state = shippingAddress?.state || billingAddress?.state || "";
  // quickOrderAddress
  const quickOrderAddress = buyer?.address || "";

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex items-center gap-2.5">
        <span>
          <Address />
        </span>
        <span className="text-base text-fuchsia-600">Delivery Addresses</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="flex items-center gap-2.5">
          <IconUser stroke={1} height={20} width={20} />
          <span className="text-black-opacity-60 text-base">{fullname}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <IconPhone stroke={1} height={20} width={20} />
          <span className="text-black-opacity-60 text-base">{phoneNumber}</span>
        </div>
        <div className="flex items-start text-start gap-2.5 md:col-span-2">
          <IconMapPin stroke={1} height={20} width={20} />
          <span className="text-black-opacity-60 text-base ">
            {quickOrderAddress} <span className="mr-1">{country}</span>
            {state} {streetAddress} {zipCode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDrawerDeliveredAddress;
