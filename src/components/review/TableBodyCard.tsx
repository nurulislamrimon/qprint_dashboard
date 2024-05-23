"use client";
import { IconStar } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { mainUrl } from "@/constants/mainUrl";
import { getDateFormat } from "@/utils/getDateFormat";
import { useGetUserByIdQuery } from "@/store/features/users/usersApi";
import personPlaceholder from "@/assets/personPlaceholder.png";

const TableBodyCard = ({ data }: any) => {
  const { data: customerInfo } = useGetUserByIdQuery(data?.reviewer?.userId);

  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="cursor-pointer border-b hover:bg-table-row-hover review-table-body-custom-styles py-3.5 px-4 md:px-6 lg:px-7"
      >
        {/* ==First Child== */}

        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] shrink-0 relative ">
            <Image
              src={`${mainUrl}${data?.product?.productPhoto}`}
              alt="profile"
              objectFit="cover"
              fill
              className="w-full h-full top-0 left-0 object-cover "
            />
          </div>

          <div className="hidden md:block">
            <p className="text-base text-black-opacity-60 line-clamp-2">
              {data?.product?.productName}
            </p>
            <span className="text-sm main-text-color">
              {data?.product?.brandName}
            </span>
          </div>
        </div>
        {/* ==Second Child== */}
        <div className="flex items-center gap-2.5">
          <div className="w-[25px] h-[25px] md:w-[40px] md:h-[40px] shrink-0 relative rounded-full">
            <Image
              src={
                customerInfo?.data?.profilePhoto
                  ? `${mainUrl}${customerInfo?.data?.profilePhoto}`
                  : personPlaceholder
              }
              width={100}
              height={100}
              className="rounded-full w-[25px] h-[25px] md:w-[40px] md:h-[40px]"
              alt="customer-photo"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          <div>
            <p className="text-black-opacity-70 text-base">
              {data?.reviewer?.fullName}
            </p>
            <p className="text-black-opacity-40 hidden md:block">
              {data?.reviewer?.email}
            </p>
          </div>
        </div>
        {/* ==Third Child== */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1 ">
            {[...Array(5)].map((_, starIndex) => (
              <span
                key={starIndex}
                className={`
                  ${
                    starIndex < data?.rating
                      ? "text-[#EDAB00]"
                      : "text-[#ccc] bg-transparent"
                  }
                `}
              >
                <IconStar
                  fill={starIndex < data?.rating ? "#EDAB00" : "currentColor"}
                  width={16}
                  height={16}
                />
              </span>
            ))}
          </div>
          <span className="line-clamp-2 text-xs md:text-base text-black-opacity-50">
            {data?.comment}
          </span>
        </div>
        {/* ==Fourth Child== */}
        <div className="hidden md:flex items-center justify-center">
          <p className="text-black-opacity-60 text-base">
            {getDateFormat(data?.createdAt)}
          </p>
        </div>
        {/* ==Five Child== */}
        <div className={`flex items-center justify-end text-xs md:text-sm `}>
          <span
            className={`${
              data?.reply
                ? "text-[#058C12] bg-[#058C12] bg-opacity-10"
                : "text-black-opacity-60 bg-black bg-opacity-10"
            } py-2 px-3 rounded-full `}
          >
            {data?.reply ? "Replied" : "Reply"}
          </span>
        </div>
      </div>
      {/* ==Drawer== */}
      {openModal && (
        <ReviewModal
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          id={data?._id}
          customerId={data?.reviewer?.userId}
        />
      )}
    </>
  );
};

export default TableBodyCard;
