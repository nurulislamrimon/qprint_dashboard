"use client";
import ProductColorSelector from "@/components/pos/ProductColorSelector";
import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import { IVariant } from "@/types";
import React, { useState } from "react";

interface StockValues {
  [key: string]: number; // Define the keys as strings and the values as numbers
}
const ProductDrawerVariantInformation = ({ data }: any) => {
  const [selectedVariant, setSelectedVariant] = useState<IVariant | null>();
  //   const [stockValues, setStockValues] = useState<StockValues>({});

  const handleColorSelect = (variant: IVariant) => {
    setSelectedVariant(variant);
  };

  //   const handleStockChange = (variantId: string, value: string) => {
  //     setStockValues((prevState) => ({
  //       ...prevState,
  //       [variantId]: parseInt(value),
  //     }));
  //   };

  return (
    <form>
      <div className="space-y-8 pb-9">
        {data?.data?.variants?.map((variant: IVariant, i: number) => (
          <div key={i} className="space-y-3 border-b pb-5">
            <div className="flex items-center gap-7">
              <div className="space-y-3">
                <label className="text-black-opacity-60 hidden md:block">
                  Item Variant
                </label>
                <div className="flex flex-col-reverse md:flex-row md:items-center gap-2.5  bg-blue-opacity-10 p-3.5 md:py-3 md:pl-3.5 md:pr-12 rounded-custom-5px">
                  <ProductColorSelector
                    key={i}
                    variant={variant}
                    handleColorSelect={handleColorSelect}
                  />
                  <span>
                    {variant?.variantName ? variant?.variantName : ""}
                  </span>
                </div>
              </div>
              <CustomGlobalInput
                label={"Add new in stock"}
                type={"number"}
                placeholder="Add new in stock"
                // value={stockValues[`stock_${i}`] || variant.inStock}
                // onChange={(e) =>
                //   handleStockChange(`stock_${i}`, e.target.value)
                // }
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
