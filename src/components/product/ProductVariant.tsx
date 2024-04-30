import React, { ChangeEvent } from "react";
import ProductColorIndicator from "../products/ProductColorIndicator";
import FileUploader from "../shared/FileUploader/FileUploader";
import { IconPhotoPlus } from "@tabler/icons-react";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import { IVariant } from "@/types";

const ProductVariant = ({
  product,
  variantName,
  handleVariantDataChange,
}: {
  product: any;
  variantName?: string;
  handleVariantDataChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    existVariant: IVariant,
    variantName: string,
    variantIndex: number
  ) => void;
}) => {
  const existVariant = product?.variants?.find(
    (v: IVariant) => v.variantName === variantName
  );
  const variantIndex = product?.variants?.findIndex(
    (v: IVariant) => v.variantName === variantName
  );

  const discountedPrice =
    Number(
      existVariant?.sellingPrice -
        existVariant?.sellingPrice *
          (parseFloat(existVariant?.discountPercentage) / 100)
    ) || "";

  const handleVaraintEdit = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    handleVariantDataChange(e, existVariant, variantName || "", variantIndex);
  };

  return (
    <div className="md:px-[30px] px-5 py-5 bg-white bg-[url('/src/assets/brandLogo.jpg')] bg-cover">
      <span className="main-text-color text-lg font-medium">
        Color & Pricing
      </span>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-7">
        <div className="flex flex-col  gap-2.5">
          <span className="text-base text-black-opacity-50 w-auto">
            Image & Color
          </span>
          <div className="grid grid-cols-3 gap-4">
            <ProductColorIndicator indicatorBgColor={variantName} />
            <div className="col-span-2">
              <FileUploader
                name={"variantPhotos"}
                className="h-full w-auto relative cursor-pointer border border-black-opacity-20 flex items-center justify-center text-black-opacity-60 text-xs"
                data={existVariant}
                multiple={true}
                accept="image/jpg,image/jpeg,image/png"
                onChange={handleVaraintEdit}
                maxSize={2}
              >
                <IconPhotoPlus width={30} height={30} stroke={1} />
              </FileUploader>
            </div>
          </div>
        </div>
        <CustomGlobalInput
          name="inStock"
          label="In Stock"
          type="number"
          defaultValue={existVariant?.inStock}
          onChange={handleVaraintEdit}
        />
        <CustomGlobalInput
          name="stockAlert"
          label="Stock Alert"
          type="number"
          defaultValue={existVariant?.stockAlert}
          onChange={handleVaraintEdit}
        />
        <CustomGlobalInput
          name="buyingPrice"
          label="Buying Price"
          type="number"
          defaultValue={existVariant?.buyingPrice}
          onChange={handleVaraintEdit}
        />
        <CustomGlobalInput
          name="sellingPrice"
          label="Selling Price"
          type="number"
          defaultValue={existVariant?.sellingPrice}
          onChange={handleVaraintEdit}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:mt-5">
        <CustomGlobalInput
          name="discountPercentage"
          label="Discount (Optional)"
          type="text"
          defaultValue={existVariant?.discountPercentage}
          onChange={handleVaraintEdit}
        />
        <CustomGlobalInput
          name="discountedPrice"
          label="Discounted Price"
          type="number"
          defaultValue={discountedPrice}
          disabled
        />
      </div>
    </div>
  );
};

export default ProductVariant;
