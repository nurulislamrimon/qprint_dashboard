import { mainUrl } from "@/constants/mainUrl";
import {
  addToBestDeals,
  setSearchProductEmpty,
} from "@/store/features/bestDeals/bestDealsSlice";
import { useSearchProductQuery } from "@/store/features/product/productApi";
import { useAppDispatch } from "@/store/hook";
import { IVariant } from "@/types";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";

const SearchProductModal = ({ data: searchData }: any) => {
  const { data: products } = useSearchProductQuery(
    searchData === "" ? null : searchData
  );

  console.log(products);

  const dispatch = useAppDispatch();
  return (
    <div className="bg-white rounded-custom-10px shadow-product-card-shadow p-5 h-[400px] overflow-y-auto relative">
      <button
        className="absolute top-3 right-3"
        onClick={() => dispatch(setSearchProductEmpty())}
      >
        <IconX />
      </button>
      {products?.data?.map((product: any, index: number) => (
        <div
          onClick={() =>
            dispatch(
              addToBestDeals({
                ...product,
                ...product?.brand,
                productPhoto: product?.productPhotos[0],
                productId: product?._id,
                link: `/products/${product?._id}`,
                ...product?.variants.find(
                  (variant: IVariant) => variant.isDefault
                ),
              })
            )
          }
          key={index}
          className="flex items-center justify-between border-b p-2.5"
        >
          <div className="flex items-center gap-2.5">
            <div className="border p-1 rounded-custom-10px">
              <Image
                width={40}
                height={40}
                src={`${mainUrl + product?.productPhotos[0]}`}
                alt="product-photo"
              />
            </div>
            <span className="">{product?.productName.slice(0, 50)}</span>
          </div>

          <div className="flex items-center justify-start">
            <span>Brand: {product?.brand?.brandName}</span>
          </div>
          <div>
            <span>Stock: {product?.variants[0]?.inStock}</span>
          </div>
          <div>
            <span className="main-text-color">
              {product?.variants[0]?.sellingPrice} QR
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchProductModal;
