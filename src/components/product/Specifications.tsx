import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import IndividualSpecificationInputs from "../products/IndividualSpecificationInputs";
import { IProduct } from "@/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const Specifications = ({
  product,
  handleAddSection,
  handleAddField,
  setToProductState,
}: {
  product: IProduct;
  handleAddSection: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddField: (sectionName: string) => void;
  setToProductState: ActionCreatorWithPayload<any>;
}) => {
  const [openSectionTypes, setOpenSectionTypes] = useState(false);
  const specifications = product?.specifications;

  const handleAddSectionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleAddSection(e);
    setOpenSectionTypes(!openSectionTypes);
  };

  return (
    <div className="bg-white py-5">
      <div className="flex items-center justify-between md:px-[30px] px-5 relative">
        <span className="main-text-color text-base md:text-lg font-medium">
          Specification
        </span>
        <button
          className="flex items-center justify-center md:gap-3.5  md:text-base text-sm border rounded-custom-5px border-fuchsia-800 px-2.5 md:px-5 md:py-2.5 py-1.5 main-text-color"
          type="button"
          onClick={() => setOpenSectionTypes(!openSectionTypes)}
        >
          <IconPlus stroke={1} className="text-fuchsia-800" />
          Add More Section
        </button>
        {/* add new section modal */}
        {openSectionTypes && (
          <div className="absolute top-5 right-7 flex flex-col gap-2 bg-white">
            <button
              value="General"
              type="button"
              onClick={handleAddSectionClick}
            >
              General
            </button>
            <button value="Print" type="button" onClick={handleAddSectionClick}>
              Print
            </button>
            <button
              value="Paper Information"
              type="button"
              onClick={handleAddSectionClick}
            >
              Paper Information
            </button>
            <button
              value="Technical Spaces"
              type="button"
              onClick={handleAddSectionClick}
            >
              Technical Spaces
            </button>
            <button
              value="Physical Spaces"
              type="button"
              onClick={handleAddSectionClick}
            >
              Physical Spaces
            </button>
            <button
              value="Support"
              type="button"
              onClick={handleAddSectionClick}
            >
              Support
            </button>
            <button
              value="Special Features"
              type="button"
              onClick={handleAddSectionClick}
            >
              Special Features
            </button>
          </div>
        )}
      </div>
      <hr className="mt-5" />
      {specifications?.length &&
        specifications?.map(
          (
            specification: {
              sectionName: string;
              blocks: Array<{ title: string; description: string }>;
            },
            i: number
          ) => (
            <div
              className="md:px-[30px] px-5 bg-white flex flex-col gap-5 my-7"
              key={i}
            >
              <span className="text-base main-text-color">
                {specification?.sectionName}
              </span>
              {specification?.blocks?.map(
                (block: { title: string; description: string }, i: number) => (
                  <IndividualSpecificationInputs
                    key={i}
                    block={block}
                    sectionName={specification.sectionName}
                    product={product}
                    index={i}
                    setToProductState={setToProductState}
                  />
                )
              )}
              <button
                className="flex items-center gap-2.5 text-green-color text-base "
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddField(specification.sectionName);
                }}
              >
                <IconPlus stroke={1} className="text-green-color" />
                Add more
              </button>
            </div>
          )
        )}
    </div>
  );
};

export default Specifications;
