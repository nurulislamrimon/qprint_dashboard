"use client";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import Minus from "@/assets/assetsSVG/Minus";
import Plus from "@/assets/assetsSVG/Plus";
import { useAppDispatch } from "@/store/hook";
import {
  addToCart,
  removeFromCart,
  removeOneFromCart,
} from "@/store/features/pos/posCartSlice";
import doubleHug from "@/assets/doublehug.svg";
import { mainUrl } from "@/constants/mainUrl";

const CartItem = ({ product }: any) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex gap-1 justify-between items-center">
        <div className="flex items-center gap-2.5 ">
          <div className="md:w-[60px] w-[50px] md:h-[60px] h-[50px] shrink-0 relative">
            <Image
              src={`${mainUrl}${product?.productPhotos[0]}`}
              placeholder="blur"
              blurDataURL={`${mainUrl}${product?.productPhotos[0]}`}
              fill
              style={{
                objectFit: "cover",
              }}
              priority
              alt="Product Image"
              sizes="(max-width:768px) 100vw, 20vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full top-0 left-0 object-cover border rounded-custom-10px p-1.5"
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
            <button onClick={() => dispatch(removeFromCart(product))}>
              <IconX stroke={1} width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
