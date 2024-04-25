"use client";
import { useState } from "react";
import ProductsTableHead from "./ProductsTableHead";
import ProductsTableRow from "./ProductsTableRow";
import ProductTableDrawer from "./ProductTableDrawer";
import emptyBrand from "@/assets/brandNotFound.png";
import Image from "next/image";
import ProductsTableSkeleton from "../shared/skeleton/ProductsTableSkeleton";


const ProductsTable = ({ data, isLoading }: any) => {
  const [openDrawerId, setOpenDrawerId] = useState<string | false>(false);

  // Product table Drawer closer function
  const handleCloseDrawer = () => {
    setOpenDrawerId(false);
  };
  return (
    <div>
      {
        data?.data?.length === 0 ? (
          <div className="flex items-center justify-center mt-32">
            <div className="text-center flex flex-col gap-3.5 items-center ">
              <Image src={emptyBrand} width={100} height={100} alt="Empty Brand" className="select-none" />
              <span className="font-semibold text-[22px] text-black-opacity-70">
                Oops!
              </span>
              <span className="text-lg text-black-opacity-50">
                Sorry! no products found for this brand.
              </span>
            </div>
          </div>
        )
          :
          (
            <table className="w-full border-separate border-spacing-y-5 shrink-0">
              <thead className="sticky -top-5 bg-white z-20 py-9">
                <ProductsTableHead />
              </thead>
              <tbody>
                {

                  isLoading ? (
                    [...Array(10)].map((_, index) => {
                      return (
                        <tr key={index} className="animate-pulse">
                          <ProductsTableSkeleton />
                        </tr>
                      )
                    })
                  )
                    :
                    (data?.data?.map((data: any, index: number) => (
                      <tr
                        onClick={() => setOpenDrawerId(data?._id)}
                        key={index}
                        className="cursor-pointer hover:bg-table-row-hover"
                      >
                        <ProductsTableRow data={data} index={index} isLoading={isLoading} />
                      </tr>
                    )))

                }
              </tbody>
            </table>
          )
      }
      {
        openDrawerId && (
          <ProductTableDrawer
            openDrawer={true}
            id={openDrawerId}
            handleCloseDrawer={handleCloseDrawer}
          />
        )
      }
    </div >
  );
};

export default ProductsTable;
