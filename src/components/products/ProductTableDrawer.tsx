import React, { useState } from "react";
import CustomGlobalDrawer from "../shared/CustomGlobalDrawer";
import DrawerModalCloseBTN from "../shared/DrawerModalCloseBTN";
import { useGetSingleProductQuery } from "@/store/features/product/productApi";
import ProductCartInformation from "./productDrawer/ProductCartInformation";
import ProductDrawerVariantInformation from "./productDrawer/ProductDrawerVariantInformation";

const ProductTableDrawer = ({ handleCloseDrawer, openDrawer, id }: any) => {
  const { data } = useGetSingleProductQuery(id);

  return (
    <CustomGlobalDrawer
      modalWidthControlClassName="w-full md:w-[500px]"
      isVisible={openDrawer}
      setOpenDrawer={handleCloseDrawer}
    >
      <div className="py-5 h-screen overflow-y-auto px-5 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-black-opacity-50 text-lg print:hidden">
            Add New Stock
          </span>
          <DrawerModalCloseBTN handleClose={handleCloseDrawer} />
        </div>

        <div className="py-5 border-t border-b">
          <ProductCartInformation data={data} />
        </div>
        <div className="py-5 ">
          <ProductDrawerVariantInformation data={data} />
        </div>
      </div>
    </CustomGlobalDrawer>
  );
};

export default ProductTableDrawer;
