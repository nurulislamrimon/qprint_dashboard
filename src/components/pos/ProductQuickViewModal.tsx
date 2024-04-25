"use client";
import CustomGlobalModal from "../shared/CustomGlobalModal";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import Image from "next/image";
import { IconCheck, IconShoppingCart } from "@tabler/icons-react";
import { IProduct, IVariant } from "@/types";
import { useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { addToCart } from "@/store/features/pos/posCartSlice";
import ProductColorSelector from "./ProductColorSelector";
import { mainUrl } from "@/constants/mainUrl";
import placeholderImg from "@/assets/productPlaceholder.svg";

type ProductCard = {
  handleModal?: () => void;
  product: IProduct;
};

const ProductQuickViewModal = ({ handleModal, product }: ProductCard) => {
  const [activeVariant, setActiveVariant] = useState<IVariant | null>(
    product.variants.find((variant: IVariant) => variant.isDefault) ?? null
  );
  const dispatch = useAppDispatch();

  const handleColorSelect = (variant: IVariant) => {
    setActiveVariant(variant);
  };

  const handleAddToCart = () => {
    if (activeVariant) {
      const productWithVariant: any = {
        ...product,
        productId: product?._id || "",
        variantName: activeVariant.variantName,
        orderQuantity: 1,
        price: activeVariant.discountedPrice
          ? activeVariant.discountedPrice
          : activeVariant.sellingPrice,
      };
      dispatch(addToCart(productWithVariant));
      handleModal?.();
    }
  };

  return (
    <div>
      <CustomGlobalModal
        isVisible={handleModal !== undefined}
        setOpenModal={handleModal}
        mainClassName="md:w-[850px]"
      >
        <div className="relative md:p-[30px] p-5 overflow-y-auto flex flex-col gap-[30px]">
          <div className="absolute right-2.5 top-2.5">
            <DrawerModalCloseBTN handleClose={handleModal} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-5">
            <div className="md:col-span-3 border rounded-custom-10px md:px-7 md:py-10 py-5 flex items-center justify-center">
              <Image
                quality={100}
                height={250}
                width={250}
                src={
                  product?.productPhotos
                    ? `${mainUrl}${product?.productPhotos[0]}`
                    : placeholderImg
                }
                className="md:w-[250px] md:h-[250px] w-[173px] h-[173px] rounded"
                alt="product-img"
              />
            </div>
            <div className="flex flex-col justify-between gap-5 md:col-span-4">
              <div className="flex flex-col justify-between gap-5">
                <span className="md:text-[22px] text-lg font-medium leading-snug">
                  {product?.productName}
                </span>
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center gap-1">
                    <div className=" flex items-center justify-center p-2">
                      <Image
                        src={
                          product?.brand?.brandPhoto
                            ? `${mainUrl}${product?.brand?.brandPhoto}`
                            : placeholderImg
                        }
                        height={20}
                        width={20}
                        alt="Brand Logo"
                      />
                    </div>
                    <span className="text-base text-black-opacity-60 line-clamp-1">
                      {product?.brand?.brandName}
                    </span>
                  </div>
                  <span className="text-black-opacity-50">|</span>
                  <div className="flex items-center gap-1">
                    <span className="text-black-opacity-80 font-medium text-base">
                      Category:
                    </span>
                    <span className="text-black-opacity-70 font-medium text-base line-clamp-1">
                      {product?.category?.categoryName}
                    </span>
                  </div>
                </div>
                {/* Display selected variant stock and price */}
                {activeVariant && (
                  <div>
                    <div className="p-1.5 bg-main-bg-color-opacity-32 flex items-center justify-center gap-1 w-36">
                      <span>
                        <IconCheck
                          stroke={1}
                          width={18}
                          height={18}
                          color="#C83B62"
                        />
                      </span>
                      <span className="text-fuchsia-800 ">
                        {activeVariant?.inStock} In Stock
                      </span>
                    </div>
                  </div>
                )}

                {/* Color Selector */}
                <div className="flex items-center gap-2.5">
                  {product?.variants?.map((variant: IVariant, i: number) => (
                    <ProductColorSelector
                      key={i}
                      variant={variant}
                      handleColorSelect={handleColorSelect}
                      activeVariant={activeVariant}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-5">
                  <strong className="main-text-color">
                    {activeVariant?.discountedPrice
                      ? activeVariant?.discountedPrice
                      : activeVariant?.sellingPrice}{" "}
                    QAR
                  </strong>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart()}
                className="flex items-center justify-center gap-3 border border-fuchsia-800 w-full py-2.5 rounded-custom-5px"
              >
                <IconShoppingCart stroke={1} className="text-fuchsia-800" />
                <span className="main-text-color text-base font-medium uppercase">
                  Add to cart
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <span className="text-black-opacity-80 text-xl">Description</span>
            <div
              // @ts-ignore
              dangerouslySetInnerHTML={{ __html: product?.shortDescription }}
            />
          </div>
        </div>
      </CustomGlobalModal>
    </div>
  );
};

export default ProductQuickViewModal;
