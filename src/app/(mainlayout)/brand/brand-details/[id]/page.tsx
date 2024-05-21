"use client";
import Image from "next/image";
import ProductsTable from "@/components/products/ProductsTable";
import { useBrandQuery } from "@/store/features/brand/brandApi";
import { useSearchProductQuery } from "@/store/features/product/productApi";
import { mainUrl } from "@/constants/mainUrl";
import productImgPlaceholder from "@/assets/placeholderImgIcon.svg";

const BrandDetails = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useBrandQuery(params.id);

  const { data: productByBrandNme } = useSearchProductQuery(
    `brand.brandName=${data?.data?.brandName}`
  );

  return (
    <div className="md:p-[30px] p-5">
      <span className="text-lg text-black-opacity-60">Brand Details</span>
      <div className="flex items-center gap-5 md:mt-[30px] mt-5">
        <div className="border rounded-custom-10px overflow-hidden w-[70px] h-[70px] md:w-20 md:h-20 flex items-center justify-center">
          <Image
            src={
              isLoading
                ? productImgPlaceholder
                : `${mainUrl}${data?.data?.brandPhoto}`
            }
            width={70}
            height={70}
            alt="brand-image"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-black-opacity-80 font-semibold text-base">
            {data?.data?.brandName}
          </span>
          <span className="text-black-opacity-60 text-sm">
            {productByBrandNme?.meta?.total} Product Available
          </span>
        </div>
      </div>
      <div className="mt-9">
        <ProductsTable data={productByBrandNme} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default BrandDetails;
