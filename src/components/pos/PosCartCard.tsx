"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { resetCart, setDiscount } from "@/store/features/pos/posCartSlice";
import { useCreatePosCartMutation } from "@/store/features/pos/posCartApi";
import { toast } from "react-toastify";
import Image from "next/image";
import emptyCartIcon from "@/assets/emptycartIcon.svg";
import CustomSpinner from "../shared/CustomSpinner";
import CartItem from "./CartItem";

const PosCartCard = () => {
  const [spin, setSpin] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { products, subTotal, discount } = useAppSelector(
    (state) => state.posCart
  );

  const dispatch = useAppDispatch();
  const [createPosCart] = useCreatePosCartMutation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSpin(true);
    const value = {
      additionalDiscount: discount,
      orderItems: products,
      paymentMethod: "COD",
    };

    try {
      const res = await createPosCart(value);
      if ("data" in res) {
        dispatch(resetCart());
        toast.success("Order placed successfully");
      } else if ("error" in res) {
        toast.warning("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSpin(false);
    }
  };

  if (!isMounted) {
    return null; // Prevents rendering on the server
  }

  return (
    <div>
      {products.length === 0 ? (
        <div className="flex flex-col gap-3.5 justify-center items-center  px-3.5 text-center bg-white h-[calc(100vh-90px)]">
          <Image
            className="h-[150px] w-[150px]"
            alt="No Product Found"
            src={emptyCartIcon}
          />
          <span className="font-semibold text-black-opacity-70 text-xl">
            Your cart is empty!
          </span>
          <span className="text-black-opacity-50 text-sm">
            It seems like your shopping cart is empty. Start adding items to
            your cart to proceed to checkout.
          </span>
        </div>
      ) : (
        <div className="bg-white md:px-2.5 md:py-7 p-3.5  flex flex-col gap-5 h-[calc(100vh-90px)]  relative">
          {spin && (
            <div className=" absolute inset-0 bg-black opacity-5 flex justify-center items-center cursor-pointer ">
              <div className="z-40">
                <CustomSpinner />
              </div>
            </div>
          )}
          <span className="text-base text-black-opacity-50">
            New Order Bill
          </span>
          <div className="flex flex-col gap-5 h-[550px] overflow-y-auto">
            {products?.map((product: any, index: number) => (
              <CartItem key={index} product={product} />
            ))}
          </div>
          <div className="flex flex-col gap-5 ">
            <hr />
            <div className="flex items-center justify-between text-black-opacity-70 text-base">
              <span>Subtotal</span>
              <strong>{subTotal.toFixed(2)} QR</strong>
            </div>
            <div className="flex items-center justify-between text-black-opacity-70 text-base">
              <span>Discount</span>
              <input
                type="text"
                className="border-b pb-1 text-right text-black-opacity-80 font-medium outline-none md:w-24 w-20"
                placeholder="0.00QR"
                name="discount"
                onChange={(e) => dispatch(setDiscount(Number(e.target.value)))}
              />
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <span className="text-black-opacity-70 text-lg font-medium">
                Total
              </span>
              <strong className="text-xl main-text-color font-semibold">
                {(subTotal - discount).toFixed(2)} QR
              </strong>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center md:gap-[30px] gap-5 w-full"
            >
              <button
                type="reset"
                onClick={() => dispatch(resetCart())}
                className="text-black-opacity-70 px-2.5 md:text-base text-sm border py-2.5 rounded w-full outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white bg-main-bg-color md:text-base text-sm border py-2.5 px-2.5 rounded w-full outline-none whitespace-nowrap"
              >
                Confirm sale
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PosCartCard;
