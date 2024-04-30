import React from "react";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import { IconX } from "@tabler/icons-react";
import { IProduct } from "@/types";
import { useAppDispatch } from "@/store/hook";
import { setAddProduct } from "@/store/features/product/addProductSlice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export interface IHandleChangeValueParams {
  sectionName: string;
  index: number;
  title?: string;
  description?: string;
}

const IndividualSpecificationInputs = ({
  block,
  sectionName,
  index,
  product,
  setToProductState,
}: {
  block?: {
    title: string;
    description: string;
  };
  sectionName: string;
  index: number;
  product: IProduct;
  setToProductState: ActionCreatorWithPayload<any>;
}) => {
  const dispatch = useAppDispatch();

  const handleChangeValue = (data: IHandleChangeValueParams) => {
    // get required data
    const indexOfBlock = data.index;
    const selectedSection = product?.specifications?.find(
      (specification) => specification.sectionName === data.sectionName
    );

    const indexOfSection = product?.specifications?.findIndex(
      (specification) => specification.sectionName === data.sectionName
    );
    const existBlocks = selectedSection?.blocks;
    const selectedBlock = existBlocks?.[indexOfBlock];

    // update data at the block
    const newData = { ...selectedBlock };

    if (data.title) {
      newData.title = data.title;
    }
    if (data.description) {
      newData.description = data.description;
    }

    // update block data
    const updatedBlocks = existBlocks?.length
      ? [
          ...existBlocks?.slice(0, indexOfBlock),
          newData,
          ...existBlocks.slice(indexOfBlock + 1),
        ]
      : [selectedBlock];

    // update section
    const updatedSection = {
      sectionName: selectedSection?.sectionName,
      blocks: updatedBlocks,
    };

    const updatedSpecification = product?.specifications?.length
      ? [
          ...product?.specifications?.slice(0, indexOfSection),
          updatedSection,
          ...product?.specifications.slice(indexOfSection + 1),
        ]
      : [updatedSection];

    // // update specification
    dispatch(setToProductState({ specifications: updatedSpecification }));
  };
  // ==========================================
  // remove a field from the specification section
  // ==========================================
  const handleRemoveField = (indexOfBlock: number) => {
    const existSection = product?.specifications?.find(
      (specification) => specification.sectionName === sectionName
    );

    const indexOfSection = product?.specifications?.findIndex(
      (specification) => specification.sectionName === sectionName
    );
    const updatedBlocks = existSection?.blocks?.length
      ? [
          ...existSection?.blocks?.slice(0, indexOfBlock),
          ...existSection?.blocks?.slice(indexOfBlock + 1),
        ]
      : [];
    const updatedSection = {
      sectionName: existSection?.sectionName,
      blocks: updatedBlocks,
    };
    const updatedSpecification = product?.specifications?.length
      ? updatedBlocks?.length
        ? [
            ...product?.specifications?.slice(0, indexOfSection),
            updatedSection,
            ...product?.specifications.slice(indexOfSection + 1),
          ]
        : [
            ...product?.specifications?.slice(0, indexOfSection),
            ...product?.specifications.slice(indexOfSection + 1),
          ]
      : [];

    // update specification
    dispatch(setToProductState({ specifications: updatedSpecification }));
  };

  return (
    <div className="w-full grid grid-cols-12 md:gap-7 gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 col-span-11">
        <CustomGlobalInput
          type="text"
          placeholder="Type here"
          label="Title"
          name="title"
          defaultValue={block?.title}
          onChange={(e) =>
            handleChangeValue({ sectionName, title: e.target.value, index })
          }
        />
        <CustomGlobalInput
          type="text"
          placeholder="Type here"
          label="Description"
          defaultValue={block?.description}
          onChange={(e) =>
            handleChangeValue({
              sectionName,
              description: e.target.value,
              index,
            })
          }
        />
      </div>
      <button className="mt-9" onClick={() => handleRemoveField(index)}>
        <IconX stroke={1} height={24} width={24} />
      </button>
    </div>
  );
};

export default IndividualSpecificationInputs;
