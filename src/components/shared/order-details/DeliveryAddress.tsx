import Address from "@/assets/assetsSVG/Address";
import Dialler from "@/assets/assetsSVG/Dialler";
import Gps from "@/assets/assetsSVG/Gps";
import Home from "@/assets/assetsSVG/Home";
import React from "react";

const DeliveryAddress = ({ data }: any) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-2.5">
        <Address />
        <span className="main-text-color">Delivery Addresses</span>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2.5 text-base">
          <Dialler />
          <span>{data?.data?.buyer?.shippingAddress?.phoneNumber}</span>
        </div>
        <div className="flex items-center gap-3 text-base">
          <span>
            <Gps />
          </span>
          <span>
            {" "}
            {data?.data?.buyer?.billingAddress?.state}{" "}
            {data?.data?.buyer?.billingAddress?.streetAddress}{" "}
            {data?.data?.buyer?.billingAddress?.zipCode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
