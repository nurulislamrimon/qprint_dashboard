"use client";
import { IconMinus, IconPlus, IconTrashX, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Minus from "@/assets/assetsSVG/Minus";
import Plus from "@/assets/assetsSVG/Plus";
import { useAppDispatch } from "@/store/hook";
import {
  addToCart,
  removeFromCart,
  removeOneFromCart,
} from "@/store/features/pos/posCartSlice";
import { IVariant } from "@/types";
import doubleHug from "@/assets/doublehug.svg";
import { mainUrl } from "@/constants/mainUrl";
import { useState } from "react";
import CustomGlobalModal from "../shared/CustomGlobalModal";

const CartItem = ({ product }: any) => {
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex gap-1 justify-between items-center">
        <div className="flex items-center gap-2.5 ">
          <div className="border rounded-custom-10px md:w-[60px] w-[50px]  md:h-[60px] h-[50px] flex items-center justify-center overflow-hidden md:p-2  shrink-0">
            <Image
              className="rounded-md md:w-[40px] w-[30px]  md:h-[40px] h-[30px]"
              src={`${mainUrl}${product?.productPhotos[0]}`}
              quality={100}
              alt="cart item image"
              width={500}
              height={500}
              sizes="(max-width:768px) 100vw, 20vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col md:gap-1.5">
            <span className="font-medium text-sm text-black-opacity-80 line-clamp-1">
              {product?.productName}
            </span>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-black-opacity-70 line-clamp-1">
                {product?.brand?.brandName}
              </span>
              <span className="text-xs text-black-opacity-40">-</span>
              <div
                style={{ background: `${product?.variantName?.toLowerCase()}` }}
                className={`shrink-0 w-3 h-3 rounded-full`}
              ></div>
              <span className="text-xs text-black-opacity-70">
                {product?.variantName}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-medium text-sm text-black-opacity-70">
                {product?.orderQuantity &&
                  product?.price &&
                  product.orderQuantity * product.price}{" "}
                QR
              </span>
              <div>
                <Image src={doubleHug} alt="Equal to" />
              </div>
              <span className="text-[10px] text-black-opacity-70">
                {product?.price}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row md:flex-col-reverse items-center gap-3.5 md:items-end md:gap-5 justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => dispatch(removeOneFromCart(product))}
              className="text-sm text p-[5px] border rounded-full "
            >
              <Minus />
            </button>

            <strong className="text-base font-normal text-black-opacity-70 ">
              {product?.orderQuantity}
            </strong>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="text-sm text p-[5px] border rounded-full"
            >
              <Plus />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button onClick={() => handleModal()}>
              <IconX stroke={1} width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <div>
          <CustomGlobalModal
            mainClassName={"w-[400px]"}
            isVisible={handleModal}
            setOpenModal={handleModal}
          >
            <div className="px-10 py-5">
              <div className="flex flex-col items-center gap-7">
                <IconTrashX
                  stroke={2}
                  width={50}
                  height={50}
                  className="text-red-color"
                />
                <span className="font-medium text-center md:text-lg text-sm md:font-bold">
                  Are You Sure?
                  <br /> Remove this item from cart?
                </span>

                <div className="flex items-center justify-center gap-[30px]">
                  <button
                    onClick={handleModal}
                    className="flex items-center justify-center border py-3 px-10 rounded-[5px]"
                  >
                    No
                  </button>
                  <button
                    className="flex bg-main-bg-color-opacity-32 items-center text-fuchsia-800 justify-center border py-3 px-10 rounded-[5px]"
                    onClick={() => dispatch(removeFromCart(product))}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </CustomGlobalModal>
        </div>
      )}
    </>
  );
};

export default CartItem;
