"use client";
import ProductGeneralInfo from "@/components/product/ProductGeneralInfo";
import ProductSeo from "@/components/product/ProductSeo";
import ProductVariant from "@/components/product/ProductVariant";
import Specifications from "@/components/product/Specifications";
// import TextEditor from "@/components/products/TextEditor";
import TopBar from "@/components/shared/TopBar";
import { setAddProduct } from "@/store/features/product/addProductSlice";
import { useAppDispatch } from "@/store/hook";
import { IProduct, IVariant } from "@/types";
import React, { ChangeEvent } from "react";
import dynamic from "next/dynamic";

const DynamicTextEditor = dynamic(
  () => import("@/components/products/TextEditor"),
  { ssr: false }
);

const AddProductUi = ({
  handleSubmit,
  handleChange,
  product,
  // add remove variants
  handleAddVariant,
  handleRemoveVariant,
  // edit variants data
  handleVariantDataChange,
  // specification
  handleAddSection,
  handleAddField,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  product: IProduct;
  // add remove variants
  handleAddVariant: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRemoveVariant: (variantName: string) => void;
  // edit variants data
  handleVariantDataChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    existVariant: IVariant,
    variantName: string,
    variantIndex: number
  ) => void;
  // specification
  handleAddSection: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddField: (sectionName: string) => void;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <TopBar title="Add New Product" />
      </div>
      <form
        className="bg-body-main-bg-color mt-1 flex flex-col gap-2.5 h-[calc(100vh-90px)] overflow-y-scroll"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* General Information */}
        <ProductGeneralInfo
          product={product}
          handleChange={handleChange}
          handleAddVariant={handleAddVariant}
          handleRemoveVariant={handleRemoveVariant}
        />
        {/* General Information */}

        {/*color and pricing */}
        {product?.variants?.map((variant: IVariant) => (
          <ProductVariant
            key={variant?.variantName}
            product={product}
            variantName={variant?.variantName}
            handleVariantDataChange={handleVariantDataChange}
          />
        ))}
        {/*color and pricing */}

        {/* Short Description */}
        <div className="md:px-[30px] px-5 py-5 bg-white ">
          <span className="main-text-color text-lg font-medium">
            Short Description
          </span>
          <small className="text-lg text-black-opacity-50">(optional)</small>
          <div className="mt-5">
            {/* <TextEditor
              handleChange={(value) =>
                dispatch(setAddProduct({ shortDescription: value }))
              }
              value={product?.shortDescription}
            /> */}
            <DynamicTextEditor
              handleChange={(value) =>
                dispatch(setAddProduct({ shortDescription: value }))
              }
              value={product?.shortDescription}
            />
          </div>
        </div>
        {/* Short Description */}

        {/* Specification */}
        <Specifications
          product={product}
          handleAddField={handleAddField}
          handleAddSection={handleAddSection}
        />
        {/* Specification */}

        {/* Description */}
        <div className="md:px-[30px] px-5 py-5 bg-white ">
          <span className="main-text-color text-lg font-medium">
            Description
          </span>
          <div className="mt-5">
            {/* <TextEditor
              handleChange={(value) =>
                dispatch(setAddProduct({ description: value }))
              }
              value={product?.description}
            /> */}

            <DynamicTextEditor
              handleChange={(value) =>
                dispatch(setAddProduct({ shortDescription: value }))
              }
              value={product?.shortDescription}
            />
          </div>
        </div>
        {/* Description */}

        {/* Search Engine Optimization */}
        <div className="md:px-[30px] px-5 py-5 bg-white">
          <ProductSeo product={product} handleChange={handleChange} />
          {/* Actions */}
          <div className="flex items-center justify-end mt-10 gap-5">
            <button className="py-3.5 bg-main-bg-color-opacity-32 text-lg px-8 r rounded-custom-5px text-fuchsia-800 hover:scale-105 transition-all">
              Reset
            </button>
            <button
              className="py-3.5 bg-main-bg-color text-lg px-8 r rounded-custom-5px text-white hover:scale-105 transition-all"
              type="submit"
            >
              Submit
            </button>
          </div>
          {/* Actions */}
        </div>
        {/* Search Engine Optimization */}
      </form>
    </div>
  );
};

export default AddProductUi;
