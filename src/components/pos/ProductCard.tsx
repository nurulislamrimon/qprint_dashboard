"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IconEye } from "@tabler/icons-react";
import { mainUrl } from "@/constants/mainUrl";
import ProductQuickViewModal from "./ProductQuickViewModal";
import { useAppDispatch } from "@/store/hook";
import { addToCart } from "@/store/features/pos/posCartSlice";
import { IVariant } from "@/types";
import placeholderImg from "@/assets/productPlaceholder.svg";

const ProductCard = ({ product, isLoading }: any) => {

  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleAddToCart = (event: React.MouseEvent, product: any) => {
    event.stopPropagation();

    if (product?.variants.length === 1) {
      dispatch(
        addToCart({
          ...product,
          orderQuantity: 1,
          productId: product?._id,
          variantName: product?.variants[0].variantName,
          price: product?.variants[0].discountedPrice
            ? product?.variants[0].discountedPrice
            : product?.variants[0].sellingPrice,
        })
      );
    }
    if (product?.variants.length > 1) {
      setOpenModal(true);
    }
  };


  return (
    <div
      onClick={(event: React.MouseEvent) => handleAddToCart(event, product)}
      className="text-black border rounded-lg w-[calc(200px, 2vw, 165px)] hover:border-main-border-color hover:shadow-product-card-shadow  transition-all cursor-pointer group"
    >
      <div className="flex items-center  justify-center py-3.5 relative">
        {
          <div className="w-[80px] h-[80px] overflow-hidden rounded-md">
            <Image
              objectFit="contain"
              src={product?.productPhotos ? (isLoading ? placeholderImg : `${mainUrl}${product?.productPhotos[0]}`) : placeholderImg}
              className="w-[80px] h-[80px] object-contain rounded-md"
              alt="product-photo"
              width={500}
              height={500}
            />
          </div>
        }

        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(true);
          }}
          className="absolute top-2.5 right-2.5  text-fuchsia-800 text-xs border rounded-full p-1.5 md:hidden md:group-hover:block transition-all "
        >
          <IconEye className="w-3 h-3" />
        </button>
      </div>
      <hr />
      <div className="flex flex-col items-center gap-[5px] px-3.5 pt-2.5 pb-3.5">
        <span className="text-center text-sm text-black-opacity-80">
          {product?.productName}
        </span>
        <span className="text-[10px] text-black-opacity-60">
          {product?.brand?.brandName}
        </span>
        <strong className="main-text-color font-bold  text-sm">
          {product?.variants?.find(
            (variant: IVariant) => variant.isDefault === true
          ).discountedPrice
            ? product?.variants?.find(
              (variant: IVariant) => variant.isDefault === true
            ).discountedPrice
            : product?.variants?.find(
              (variant: IVariant) => variant.isDefault === true
            ).sellingPrice}
          QR
        </strong>
      </div>
      {openModal && (
        <ProductQuickViewModal handleModal={handleClose} product={product} />
      )}
    </div>
  );
};

export default ProductCard;
