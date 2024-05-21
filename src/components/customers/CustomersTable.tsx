"use client";
import ViewEye from "@/assets/assetsSVG/ViewEye";
import { mainUrl } from "@/constants/mainUrl";
import Image from "next/image";
import Link from "next/link";
import imgPlaceholder from "@/assets/personPlaceholder.png";

interface customerProps {
  data?: any;
  isLoading?: boolean;
  index?: number;
}

const CustomersTable = ({ data, isLoading, index = 0 }: customerProps) => {
  return (
    <>
      <td className="md:table-cell hidden ">{index + 1}</td>
      <td className="py-5 px-3.5 flex items-center justify-start">
        <div className="flex items-center justify-center gap-1.5 md:gap-3.5 lg:ml-20 md:ml-auto">
          <div className="w-[28px] h-[28px] md:w-[50px] md:h-[50px] shrink-0 relative ">
            {isLoading ? (
              <Image
                src={imgPlaceholder}
                alt="profile"
                objectFit="cover"
                fill
                className="w-full border h-full top-0 left-0 object-cover rounded-full"
              />
            ) : (
              <Image
                src={
                  data?.profilePhoto
                    ? `${mainUrl}${data.profilePhoto}`
                    : imgPlaceholder
                }
                alt="profile"
                objectFit="cover"
                fill
                className="w-full border h-full top-0 left-0 object-cover rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col items-start">
            <p className="text-xs md:text-lg text-black-opacity-80">
              {data?.fullName}
            </p>
            <span className=" text-sm text-black-opacity-70">
              {data?.phoneNumber ? data?.phoneNumber : "N/A"}
            </span>
          </div>
        </div>
      </td>
      <td className="text-xs md:text-lg text-black-opacity-80">
        <div>
          <span className="text-xs md:text-lg text-black-opacity-70">
            {data?.email ? data?.email : "N/A"}
          </span>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center ">
          <span className="bg-green-opacity-10 text-xs md:text-base text-[#0D9755] py-1.5 px-4 rounded-md">
            {data?.orders}
          </span>
        </div>
      </td>
      <td className="md:table-cell hidden">
        <Link
          onClick={(e) => e.stopPropagation()}
          href={`customers/${data?._id}`}
        >
          <div className="border hover:border-main-border-color px-4 py-1 transition-all rounded-md w-14 flex items-center justify-center">
            <ViewEye />
          </div>
        </Link>
      </td>
    </>
  );
};

export default CustomersTable;
