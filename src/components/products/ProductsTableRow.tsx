import { mainUrl } from "@/constants/mainUrl";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/store/features/product/productApi";
import { IVariant } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import ProductColorSelector from "../pos/ProductColorSelector";
import RightToggle from "@/assets/assetsSVG/RightToggle";
import LeftToggle from "@/assets/assetsSVG/LeftToggle";
import Link from "next/link";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ProductsDeleteModal from "./ProductsDeleteModal";
import { toast } from "react-toastify";
import productImgPlaceholder from "@/assets/placeholderImgIcon.svg";
import Loader from "../shared/loaders/Loader";
import { showError } from "@/helpers/showError";

const ProductsTableRow = ({ data, index, isLoading }: any) => {
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [activeVariant, setActiveVariant] = useState<IVariant | null>(
    data.variants.find((variant: IVariant) => variant.isDefault) ?? null
  );

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const handleColorSelect = (variant: IVariant) => {
    setActiveVariant(variant);
  };

  const productDeleteHandler = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteProduct(id);
      handleClose();
      console.log(res);
      if ("data" in res) {
        toast.success(res.data.message);
      }
      if ("error" in res) {
        showError(res?.error);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOnchange = async (id: string, status: boolean) => {
    setLoading(true);
    try {
      const res = await updateProduct({ id, data: { activityStatus: status } });

      if (res && "data" in res) {
        toast.success(res.data.message);
      }
      if (res && "error" in res && res.error instanceof Error) {
        showError(res?.error);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <td
        onClick={(e) => e.stopPropagation()}
        className="md:table-cell hidden text-black-opacity-50 text-lg px-2"
      >
        {index + 1}
      </td>
      <td onClick={(e) => e.stopPropagation()} className="md:w-[500px]">
        <div className="md:flex items-center gap-3.5 ">
          <div className="md:w-[60px] md:h-[60px] w-[38px] h-[38px]">
            <Image
              src={
                isLoading
                  ? productImgPlaceholder
                  : `${mainUrl}${data?.productPhotos?.[0]}`
              }
              width={60}
              height={60}
              alt="product-image"
              className="w-full"
            />
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="md:flex flex-col  hidden"
          >
            <span className="text-black-opacity-80 text-base line-clamp-1">
              {data?.productName}
            </span>
            <span className="text-black-opacity-50 text-sm">
              {data?.brand?.brandName}
            </span>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2.5"
            >
              {data?.variants?.map((variant: IVariant, i: number) => (
                <ProductColorSelector
                  key={i}
                  variant={variant}
                  handleColorSelect={handleColorSelect}
                  activeVariant={activeVariant}
                />
              ))}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-start"
        >
          {/* <CustomToggle dynamicId={data?.data?._id} /> */}
          <div className="flex items-center justify-center gap-2 relative">
            {loading && <Loader />}
            <button
              onClick={() => handleOnchange(data?._id, !data?.activityStatus)}
            >
              {data?.activityStatus === true ? <RightToggle /> : <LeftToggle />}
            </button>
          </div>
        </div>
      </td>
      <td>
        <div
          className={` md:w-16 w-12 flex items-center justify-center md:text-lg text-sm  font-medium md:px-5 px-3 md:py-1.5 py-0.5 rounded-custom-5px   ${
            data?.data?.variants[0]?.inStock <= 100
              ? "bg-main-bg-color-opacity-32 text-fuchsia-800"
              : "bg-green-opacity-10 text-green-color"
          }`}
        >
          {activeVariant?.inStock}
        </div>
      </td>
      <td
        onClick={(e) => e.stopPropagation()}
        className="main-text-color font-medium text-sm md:text-lg"
      >
        <div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-5"
          >
            <span className="main-text-color font-medium text-sm md:text-lg">
              {activeVariant
                ? activeVariant.sellingPrice
                : data.variants.sellingPrice}{" "}
              <span className="text-sm font-semibold">QR</span>
            </span>
          </div>
        </div>
      </td>

      <td onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center md:gap-3.5 gap-2.5">
          <Link href={"edit-product/" + data?._id}>
            <IconEdit stroke={1} className="text-green-color" />
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenDeleteModal(true);
            }}
          >
            <IconTrash stroke={1} className="text-red-color" />
          </button>
        </div>
      </td>
      {openDeleteModal && (
        <ProductsDeleteModal
          loading={loading}
          handleClose={handleClose}
          data={data}
          productDeleteHandler={productDeleteHandler}
          openDeleteModal={openDeleteModal}
        />
      )}
    </>
  );
};

export default ProductsTableRow;
