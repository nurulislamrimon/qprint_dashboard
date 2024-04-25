import User from "@/assets/assetsSVG/User";
import userProfile from "@/assets/shariful.jpg";
import Image from "next/image";
import React from "react";

const CustomerInformation = ({ data }: any) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-2.5">
        <User />
        <span className="text-black-opacity-80 text-lg ">
          Customer Information
        </span>
      </div>
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={userProfile}
            alt="user profile"
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-black font-medium text-lg">
            {data?.data?.buyer?.fullName}{" "}
          </span>
          <span>Orders : {data?.data?.totalQuantity}</span>
          <span className="text-green-color">
            {data?.data?.buyer?.shippingAddress?.phoneNumber}
          </span>
          <span className="text-black-opacity-80">
            {data?.data?.buyer?.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInformation;
