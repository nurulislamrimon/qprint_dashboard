import Address from "@/assets/assetsSVG/Address";
import imgPlaceholder from "@/assets/personPlaceholder.png";
import { mainUrl } from "@/constants/mainUrl";
import {
  IconHome,
  IconLocation,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";

const CustomerInformationLayout = ({ data, isLoading }: any) => {
  // console.log(data);
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
        <div className="w-[70px]  h-[70px] shrink-0 relative">
          {
            isLoading ? (
              <Image
                src={imgPlaceholder}
                alt="profile"
                objectFit="cover"
                fill
                className="w-full h-full border top-0 left-0 object-cover rounded-full animate-pulse"
              />
            ) :
              (<Image
                src={data?.profilePhoto ? `${mainUrl}${data.profilePhoto}` : imgPlaceholder}
                alt="profile"
                objectFit="cover"
                fill
                className="w-full h-full border top-0 left-0 object-cover rounded-full"
              />)}
        </div>
        <div className="flex flex-col gap-2 md:text-center">
          <p className="text-lg font-medium ">
            {data?.fullName}
          </p>
          <p className="text-sm text-black">
            Orders: {data?.totalOrder ? data?.totalOrder : "0"}
          </p>
          <p className="text-sm font-medium text-green-color">
            {data?.phoneNumber}
          </p>
          <p className="text-sm text-black-opacity-80">
            {data?.email ? data?.email : "N/A"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-7 mt-5 md:mt-[30px]">
        {[
          { icon: <Address />, text: "Delivery Addresses" },
          { icon: <IconHome stroke={1} />, text: "Home" },
          {
            icon: <IconPhone stroke={1} />,
            text: data?.phoneNumber,
          },
          {
            icon: <IconLocation stroke={1} />,
            text: data?.shippingAddress ? data?.shippingAddress : "Address not available",
          },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-2.5">
            <span className="">{item.icon}</span>
            <p
              className={`text-base font-medium ${index >= 1 ? "text-black" : "main-text-color"
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
