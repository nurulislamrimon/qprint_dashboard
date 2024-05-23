"use client";

import { mainUrl } from "@/constants/mainUrl";
import {
  useBrandQuery,
  useDeleteBrandMutation,
} from "@/store/features/brand/brandApi";
import Image from "next/image";
import { useState } from "react";
import EditBrandModal from "./EditBrandModal";
import DeleteBrandModal from "./DeleteBrandModal";
import { toast } from "react-toastify";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import productImgPlaceholder from "@/assets/placeholderImgIcon.svg";
import { useSearchProductQuery } from "@/store/features/product/productApi";
import { useRouter } from "next/navigation";
import Loader from "../shared/loaders/Loader";

const BrandCard = ({ data, isLoading }: any) => {
  const {
    data: brandData,
    error: updateError,
    isLoading: loading,
  } = useBrandQuery(data?._id);

  const router = useRouter();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  //handle edit
  const handleClose = () => {
    setOpenModal(false);
  };

  // handle close delete modal
  const handCloseleDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <div
      className="w-[calc(256px,2vw,185px)] rounded-custom-10px shadow-brand-card-shadow relative select-none cursor-pointer group"
      onClick={() => router.push(`/brand/brand-details/${data?._id}`)}
    >
      <div className="md:hidden md:group-hover:inline-grid flex flex-col gap-3.5 absolute right-3.5 top-2.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenDeleteModal(true);
          }}
        >
          <IconTrash stroke={1} className="text-red-color" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(true);
          }}
        >
          <IconEdit stroke={1} className="text-green-color" />
        </button>
      </div>
      <div className="flex flex-col gap-2.5 items-center justify-center py-3.5 px-3 ">
        {isLoading ? (
          <Image
            alt="brand-image"
            className="object-contain rounded-md h-[80px] w-[90px]"
            width={100}
            height={100}
            src={productImgPlaceholder}
          />
        ) : (
          <Image
            alt="brand-image"
            className="object-contain rounded-md h-[80px] w-[90px]"
            width={100}
            height={100}
            src={
              brandData?.data?.brandPhoto
                ? `${mainUrl + brandData?.data?.brandPhoto}`
                : productImgPlaceholder
            }
          />
        )}

        <span className="text-lg to-black-opacity-70 font-medium">
          {data?.brandName}
        </span>
      </div>
      <hr className="w-[90%] mx-auto" />
      <div className="flex items-center justify-center py-3.5">
        <span className="text-black-opacity-60 text-sm ">
          {data?.productCount} products available
        </span>
      </div>

      <div>
        {openModal && (
          <EditBrandModal
            open={openModal}
            handleClose={handleClose}
            id={data?._id}
          />
        )}

        {openDeleteModal && (
          <DeleteBrandModal
            openDeleteModal={openDeleteModal}
            handCloseleDeleteModal={handCloseleDeleteModal}
            id={data?._id}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default BrandCard;
