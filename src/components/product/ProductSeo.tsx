import React, { Fragment } from "react";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import FileUploader from "../shared/FileUploader/FileUploader";
import { IconPhotoPlus } from "@tabler/icons-react";

const ProductSeo = ({
  product,
  handleChange,
}: {
  product: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}) => {
  return (
    <Fragment>
      <div className="flex flex-col gap-2.5">
        <span className="main-text-color text-lg font-medium">
          SEO{" "}
          <small className="text-base font-normal">
            (Search Engine Optimization)
          </small>
        </span>
        <span className="text-black-opacity-50 text-sm">
          Customize SEO title and description if you want deferent info
        </span>
      </div>
      <hr className="my-5" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="md:col-span-2 grid grid-cols-1 gap-5">
          <CustomGlobalInput
            name="seo.metaTitle"
            type="text"
            placeholder="Type Here"
            label="Meta Title"
            defaultValue={product?.seo?.metaTitle}
            onChange={handleChange}
          />
          <CustomGlobalInput
            name="seo.metaDescription"
            type="textarea"
            placeholder="Type Here"
            label="Meta Description"
            defaultValue={product?.seo?.metaDescription}
            onChange={handleChange}
          />
        </div>
        <FileUploader
          name="seo.metaPhoto"
          className="min-h-44 h-full w-auto relative cursor-pointer border border-black-opacity-20 flex items-center justify-center text-black-opacity-60 text-xs"
          data={product}
          multiple={true}
          onChange={handleChange}
          accept="image/jpg,image/jpeg,image/png"
          maxSize={2}
        >
          <IconPhotoPlus width={30} height={30} stroke={1} />
        </FileUploader>
      </div>
    </Fragment>
  );
};

export default ProductSeo;
