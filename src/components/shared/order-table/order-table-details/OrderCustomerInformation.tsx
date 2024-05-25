import userProfile from "@/assets/shariful.jpg";
import { mainUrl } from "@/constants/mainUrl";
import { useGetUserByIdQuery } from "@/store/features/users/usersApi";
import { IconUser } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import userImagePlaceholder from "@/assets/personPlaceholder.png";

const OrderCustomerInformation = ({ allOrder, quickOrder }: any) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-2.5">
        <span className="print:hidden">
          <IconUser stroke={2} />
        </span>
        <span className="text-black-opacity-80 text-lg ">
          Customer Information
        </span>
      </div>
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full relative shrink-0 print:hidden">
          <Image
            src={
              allOrder?.data?.buyer?.profilePhoto
                ? `${mainUrl}${allOrder?.data?.buyer?.profilePhoto}`
                : userImagePlaceholder
            }
            fill
            style={{
              objectFit: "cover",
            }}
            placeholder="blur"
            blurDataURL={`${mainUrl}${allOrder?.data?.buyer?.profilePhoto}`}
            alt="user profile"
            className="w-full h-full top-0 left-0 object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-black font-medium text-lg">
            {allOrder ? allOrder?.data?.buyer?.fullName : ""}
            {quickOrder ? quickOrder?.data?.buyer?.fullName : ""}
          </span>
          <span>
            Orders :{allOrder ? allOrder?.data?.totalQuantity : ""}
            {quickOrder ? quickOrder?.data?.totalQuantity : ""}
          </span>
          <span className="text-green-color">
            {allOrder
              ? allOrder?.data?.buyer?.shippingAddress?.phoneNumber
              : ""}
            {quickOrder
              ? quickOrder?.data?.buyer?.shippingAddress?.phoneNumber
              : ""}
          </span>
          <span className="text-black-opacity-80">
            {allOrder ? allOrder?.data?.buyer?.email : ""}
            {quickOrder ? quickOrder?.data?.buyer?.email : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCustomerInformation;
