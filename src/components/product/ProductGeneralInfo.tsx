import CustomGlobalInput from "../shared/CustomGlobalInput";
import FileUploader from "../shared/FileUploader/FileUploader";
import GlobalCustomSelect from "../shared/GlobalCustomSelect";
import { IBrand, ICategory, ISubcategory, IVariant } from "@/types";
import { useBrandsQuery } from "@/store/features/brand/brandApi";
import { useEffect, useState } from "react";
import { useCategoriesQuery } from "@/store/features/category/categoryApi";

const ProductGeneralInfo = ({
  product,
  handleChange,
  handleAddVariant,
  handleRemoveVariant,
}: {
  product: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;

  handleAddVariant: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleRemoveVariant: (variantName: string) => void;
}) => {
  // all brands
  const { data: brands, isLoading: isBrandsLoading } =
    useBrandsQuery("limit=1000");
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery("limit=1000");

  const [subCategories, setSubcategories] = useState([]);

  // initial setup subCategories
  useEffect(() => {
    if (categories && categories?.data?.length > 0) {
      setSubcategories(
        categories.data
          .find(
            (category: ICategory) =>
              category?._id === product?.category?.categoryId
          )
          ?.subcategories.map(
            (subcategory: ISubcategory) => subcategory?.subcategoryName
          )
      );
    }
  }, [categories, product.category]);

  // handle subCategories
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // update selected category to the product
    handleChange(e);
    // update subcategories based on selected category
    const subcategories = categories?.data
      ?.find((category: ICategory) => category?._id === e.target.value)
      ?.subcategories?.map(
        (subcategory: ISubcategory) => subcategory.subcategoryName
      ) || ["Does not have any subcategories"];

    setSubcategories(subcategories);
  };

  return (
    <div className="md:px-[30px] py-5 px-5  bg-white ">
      <span className="main-text-color text-lg font-medium">
        General Information
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 md:col-span-2">
          <div className="md:col-span-2">
            <CustomGlobalInput
              name="productName"
              type="text"
              label="Product Name"
              placeholder="Product Name"
              defaultValue={product?.productName}
              onChange={handleChange}
            />
          </div>
          {/* variants input */}
          <div className="flex flex-col gap-2.5">
            <label htmlFor="colorVariant">Variants</label>
            <div className="w-full border min-h-12 flex items-stretch rounded-md gap-2 px-2">
              <div className="flex items-center gap-2">
                {product?.variants?.map((variant: IVariant) => (
                  <span
                    key={variant.variantName}
                    className="inline-block h-7 w-7 rounded-full text-center cursor-pointer text-yellow-500 border [&:hover>span]:block"
                    style={{
                      backgroundColor: variant?.variantName?.toLowerCase(),
                    }}
                    onClick={() => handleRemoveVariant(variant?.variantName)}
                  >
                    <span className="hidden">&times;</span>
                  </span>
                ))}
              </div>
              <input
                type="text"
                name="colorVariant"
                id="color-variant"
                placeholder="Enter color name,"
                className="border-none outline-none min-h-full w-full block font-medium"
                onKeyUp={handleAddVariant}
              />
            </div>
          </div>

          <GlobalCustomSelect
            name="brandId"
            label="Brand"
            options={
              isBrandsLoading
                ? ["Loading..."]
                : brands?.data?.map((brand: IBrand) => ({
                    label: brand?.brandName,
                    value: brand?._id,
                  }))
            }
            defaultValue={product?.brand?.brandName || "Select a brand"}
            onChange={handleChange}
          />
          <CustomGlobalInput
            name="series"
            type="text"
            placeholder="series"
            label="Series"
            defaultValue={product?.series}
            onChange={handleChange}
          />
          <CustomGlobalInput
            name="productModel"
            type="text"
            placeholder="Type Model"
            label="Model"
            defaultValue={product?.productModel}
            onChange={handleChange}
          />

          {/* ============================= */}
          {/* category and subcategory */}
          {/* ============================= */}
          <div className="flex flex-col w-full gap-2.5">
            <label
              className="text-black-opacity-50 text-base"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="categoryId"
              onChange={handleCategoryChange}
              className="border  rounded-custom-5px py-3 px-3.5 outline-none active:border-fuchsia-800 focus:border-fuchsia-800 bg-transparent"
            >
              <option value="" disabled selected>
                {product?.category?.categoryName || "Select a category!"}
              </option>
              {isCategoriesLoading ? (
                <option key="category loading" value="Loading...">
                  Loading...
                </option>
              ) : (
                categories?.data?.map((category: ICategory) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.categoryName}
                  </option>
                ))
              )}
            </select>
          </div>

          <GlobalCustomSelect
            name="subcategory"
            label="Sub Category"
            onChange={handleChange}
            options={subCategories}
            defaultValue={
              product?.category?.subcategory?.subcategoryName ||
              "Please select a subcategory"
            }
          />
          <CustomGlobalInput
            name="warranty"
            type="text"
            placeholder="Warranty"
            label="Warranty"
            defaultValue={product?.warranty}
            onChange={handleChange}
          />
          <CustomGlobalInput
            name="bulk.minOrder"
            type="number"
            placeholder="Bulk Order Item"
            label="Bulk Order (Item)"
            defaultValue={product?.bulk?.minOrder}
            onChange={handleChange}
          />
          <CustomGlobalInput
            name="bulk.discount"
            type="text"
            placeholder="Extra discount"
            label="Extra Discount"
            defaultValue={product?.bulk?.discount}
            onChange={handleChange}
          />
          <div className="md:col-span-3">
            <CustomGlobalInput
              name="videoLink"
              type="text"
              placeholder="https://www.youtube.com/kjkl"
              label="Video Link"
              defaultValue={product?.videoLink}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* product photos */}
        <div className="grid grid-cols-2 grid-rows-4 gap-3 [&>:first-child]:col-span-2 [&>:first-child]:row-span-2 ">
          {[1, 2, 3, 4, 5].map((index) => (
            <FileUploader
              key={index}
              name="productPhotos"
              className="relative cursor-pointer border flex flex-col gap-2.5 items-center justify-center  text-center text-black-opacity-60 text-xs"
              multiple={true}
              data={product}
              uid={index}
              accept="image/jpg,image/jpeg,image/png"
              onChange={handleChange}
            ></FileUploader>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGeneralInfo;
