"use client";

import {
  clearAddProductState,
  setAddProduct,
  setAddProductFiles,
} from "@/store/features/product/addProductSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useCreateProductMutation } from "@/store/features/product/productApi";
import AddProductUi from "./_components/AddProductUi";
import { ISpecification, IVariant } from "@/types";
import { ChangeEvent, Fragment } from "react";
import { showError } from "@/helpers/showError";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import TransparentLoader from "@/components/shared/TransparentLoader";

const AddProduct = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createProduct, { isLoading: productAdding }] =
    useCreateProductMutation();
  const { product, productFiles } = useAppSelector((state) => state.addProduct);

  const formData = new FormData();

  // if (productAdding) {
  //   return <Loading />;
  // }

  // ======================================
  // main functionalities
  // ======================================
  const handleDispatchProduct = (
    fieldName: string,
    value: string | Array<string>
  ) => {
    // check if the fieldName is an object property
    if (fieldName.includes(".") && fieldName.split(".").length > 1) {
      const fieldArray = fieldName.split(".");
      dispatch(
        setAddProduct({
          [fieldArray[0]]: {
            ...product[fieldArray[0]],
            [fieldArray[1]]: value,
          },
        })
      );
    } else {
      dispatch(setAddProduct({ [fieldName]: value }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const fieldName = e.target?.name;

    if (e.target instanceof HTMLInputElement && e.target?.files) {
      const files = e.target?.files;
      const id = Number(e.target?.id) - 1;

      // for multiple photos
      if (files && files.length) {
        const updatedValues = [...(product?.[fieldName] || [])];
        const updatedFiles = [...(productFiles?.[fieldName] || [])];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const objUrl = URL.createObjectURL(file);
          const index = id + i;

          while (updatedValues.length <= index) {
            updatedValues.push(null);
            updatedFiles.push(null);
          }
          updatedValues[index] = objUrl;
          updatedFiles[index] = file;
        }

        handleDispatchProduct(fieldName, updatedValues);
        dispatch(setAddProductFiles({ [fieldName]: updatedFiles }));
      }
    } else {
      const value = e.target.value;
      handleDispatchProduct(fieldName, value);
    }
  };

  const handleSubmit = async () => {
    try {
      // append all product data to the form data
      for (const key in product) {
        if (Array.isArray(product[key])) {
          for (const subKey of product[key]) {
            if (subKey) {
              const value =
                typeof subKey === `string` ? subKey : JSON.stringify(subKey);
              formData.append(`${key}`, value);
            }
          }
        } else {
          const value =
            typeof product[key] === `string`
              ? product[key]
              : JSON.stringify(product[key]);
          formData.append(`${key}`, value);
        }
      }
      // append all photos from the productFiles object to the formData
      for (const key in productFiles) {
        if (Array.isArray(productFiles[key])) {
          for (const file of productFiles[key]) {
            if (file) {
              formData.append(`${key}`, file);
            }
          }
        } else {
          formData.append(`${key}`, productFiles);
        }
      }

      // add new product using formData;
      const res = await createProduct(formData);

      if (res && "error" in res) {
        showError(res.error);
      } else {
        dispatch(clearAddProductState());
        toast.success(res?.data?.message || "Product created successfully!");
        router.push("/products", { scroll: false });
      }
    } catch (error) {
      showError(error);
    }
  };

  // ========================================================
  // general info functionalities for variants and remove
  // ========================================================
  const handleAddVariant = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const isVariant = input.value.includes(",");
    if (isVariant) {
      const variant = input.value.split(",")[0];
      const updatedVariants = [
        ...(product?.variants || []),
        { variantName: variant },
      ];
      dispatch(setAddProduct({ variants: updatedVariants }));
      input.value = "";
    }
  };

  // remove color variant to the choosenVariants state function
  const handleRemoveVariant = (variantName: string) => {
    const updatedVariants = product?.variants?.filter(
      (variant: IVariant) => variant?.variantName !== variantName
    );
    dispatch(setAddProduct({ variants: updatedVariants }));
  };

  // =============================
  // update variants data
  // =============================
  const handleVariantDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    existVariant: IVariant,
    variantName: string,
    variantIndex: number
  ) => {
    if (e.target instanceof HTMLInputElement) {
      const files = e.target.files;
      const fieldName = e.target.name;
      const value = e.target.value;
      const updatedData = existVariant
        ? product.variants.slice(0, variantIndex)
        : product.variants;

      if (files && files.length) {
        // dispatch file
        const photoFieldName = `variants.${variantName}`;
        dispatch(setAddProductFiles({ [photoFieldName]: [files[0]] }));
        // dispatch file object url to display
        const objUrl = URL.createObjectURL(files[0]);

        const newData = existVariant
          ? { ...existVariant, variantPhotos: [objUrl] }
          : { variantName, variantPhotos: [objUrl] };
        updatedData.push(newData, ...product.variants.slice(variantIndex + 1));
      } else {
        const newData = existVariant
          ? { ...existVariant, [fieldName]: value }
          : { variantName, [fieldName]: value };
        updatedData.push(newData, ...product.variants.slice(variantIndex + 1));
      }
      dispatch(
        setAddProduct({
          variants: updatedData,
        })
      );
    }
  };

  // ================================
  // Specifications section
  // ================================
  const handleAddSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Add logic to add a new specification section
    const sectionName = (e.target as HTMLButtonElement).value;
    const newSection = {
      sectionName: sectionName,
      blocks: [{ title: "", description: "" }],
    };
    dispatch(
      setAddProduct({ specifications: [...product.specifications, newSection] })
    );
  };

  const handleAddField = (sectionName: string) => {
    const existSection = product?.specifications?.find(
      (specification: ISpecification) =>
        specification.sectionName === sectionName
    );

    const indexOfSection = product?.specifications?.findIndex(
      (specification: ISpecification) =>
        specification.sectionName === sectionName
    );

    const updatedSection = {
      sectionName,
      blocks: [...(existSection?.blocks || []), { title: "", description: "" }],
    };

    const updatedSpecification = product?.specifications?.length
      ? [
          ...product?.specifications?.slice(0, indexOfSection),
          updatedSection,
          ...product?.specifications.slice(indexOfSection + 1),
        ]
      : [updatedSection];

    // // update specification
    dispatch(setAddProduct({ specifications: updatedSpecification }));
  };

  return (
    <Fragment>
      {productAdding && <TransparentLoader />}
      <AddProductUi
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        product={product}
        handleAddVariant={handleAddVariant}
        handleRemoveVariant={handleRemoveVariant}
        handleVariantDataChange={handleVariantDataChange}
        handleAddSection={handleAddSection}
        handleAddField={handleAddField}
      />
    </Fragment>
  );
};

export default AddProduct;
