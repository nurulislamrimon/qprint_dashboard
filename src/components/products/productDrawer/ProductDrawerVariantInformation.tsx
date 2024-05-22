"use client";
import ProductColorSelector from "@/components/pos/ProductColorSelector";
import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import Loader from "@/components/shared/loaders/Loader";
import {
  useAddStockItemMutation,
  useUpdateProductMutation,
} from "@/store/features/product/productApi";
import { setInStock } from "@/store/features/product/updateProductStockSlice.ts";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { IVariant } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductDrawerVariantInformation = ({ data, id }: any) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const sliceData = useAppSelector((state) => state.updateProductStockSlice);
  console.log(sliceData);
  const [addStockItem] = useAddStockItemMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      id,
      variants: sliceData,
    };

    try {
      const res = await addStockItem(data);
      console.log(res);
      if ("data" in res) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 pb-9">
        {data?.data?.variants?.map((variant: IVariant, i: number) => (
          <div key={i} className="space-y-3 border-b pb-5  overflow-hidden">
            {loading && <Loader />}
            <div className="flex items-center gap-7">
              <div className="space-y-3">
                <label className="text-black-opacity-60 hidden md:block">
                  Item Variant
                </label>
                <div className="flex flex-col-reverse md:flex-row md:items-center gap-2.5  bg-[#F3F3F3] p-3.5 md:py-3 md:pl-3.5 md:pr-12 rounded-custom-5px">
                  <div
                    style={{
                      backgroundColor: `${variant?.variantName}`,
                    }}
                    className={`w-5 h-5 rounded-full`}
                  ></div>
                  <span className="hidden md:block text-base">
                    {variant?.variantName ? variant?.variantName : ""}
                  </span>
                </div>
              </div>
              <CustomGlobalInput
                label={"Add new in stock"}
                type={"number"}
                placeholder="Add new in stock"
                onChange={(e) =>
                  dispatch(
                    setInStock({
                      variantName: variant?.variantName,
                      quantity: Number(e.target.value),
                    })
                  )
                }
              />
            </div>
            <span className="text-black-opacity-60 text-sm ">
              <b>{variant?.inStock}</b> in Stock
            </span>
            <input
              type="submit"
              value="Add new item stock"
              className="w-[90%] md:w-[95%] absolute bottom-6 text-white rounded-custom-10px right-1 left-5 py-3.5 cursor-pointer bg-fuchsia-700 hover:bg-fuchsia-800 "
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default ProductDrawerVariantInformation;
