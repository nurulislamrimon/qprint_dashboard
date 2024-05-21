import Address from "@/assets/assetsSVG/Address";
import { mainUrl } from "@/constants/mainUrl";
import { useCustomerQuery } from "@/store/features/customer/customerApi";
import { useGetAllOnlineOrdersByBuyerUserIdQuery } from "@/store/features/order/ordersApi";
import {
  IconHome,
  IconLocation,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";

const CustomerInformationLayout = ({ isLoading, id }: any) => {
  const { data } = useCustomerQuery(id);
  const { data: orders } = useGetAllOnlineOrdersByBuyerUserIdQuery(
    data?.data?._id
  );

  return (
    <div className="md:p-5 md:border rounded-md mb-10 md:mb-auto md:sticky -top-8">
      <div className="flex items-center gap-2.5">
        <span className="main-text-color">
          <IconUser stroke={1} color="#C83B62" fill="#C83B62" />
        </span>
        <h4 className="[font-size:_clamp(15px,6vw,18px)] main-text-color font-medium shrink-0">
          Customer Information
        </h4>
      </div>
      <div className="flex md:flex-col items-center gap-5 py-7 md:border-b">
        <div className="w-[70px] h-[70px] shrink-0 relative">
          <Image
            src={`${mainUrl}${data?.data?.profilePhoto}`}
            alt="profile"
            placeholder="blur"
            blurDataURL={`${mainUrl}${data?.data?.profilePhoto}`}
            style={{ objectFit: "cover" }}
            fill
            className="w-full h-full border top-0 left-0 object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2 md:text-center">
          <p className="text-lg font-medium ">{data?.data?.fullName}</p>
          <p className="text-sm text-black">Orders: {orders?.meta?.total}</p>
          <p className="text-sm font-medium text-green-color">
            {data?.phoneNumber}
          </p>
          <p className="text-sm text-black-opacity-80">{data?.data?.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-7 mt-5 md:mt-[30px]">
        {[
          { icon: <Address />, text: "Delivery Addresses" },
          { icon: <IconHome stroke={1} />, text: "Home" },
          {
            icon: <IconPhone stroke={1} />,
            text: data?.data?.phoneNumber,
          },
          {
            icon: <IconLocation stroke={1} />,
            text: data?.data?.shippingAddress
              ? data?.data?.shippingAddress
              : "Address not available",
          },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2.5">
            <span className="">{item.icon}</span>
            <p
              className={`text-base font-medium ${
                index >= 1 ? "text-black" : "main-text-color"
              }`}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerInformationLayout;
