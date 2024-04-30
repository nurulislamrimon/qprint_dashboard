"use client";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/store/features/product/productApi";
import { ChangeEvent, Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { ISpecification, IVariant } from "@/types";
import {
  clearUpdateProductState,
  setDeleteProductPhotos,
  setUpdateProduct,
  setUpdateProductFiles,
} from "@/store/features/product/updateProductSlice";
import UpdateProductUi from "./_components/UpdateProductUi";
import { showError } from "@/helpers/showError";
import { toast } from "react-toastify";
import TransparentLoader from "@/components/shared/TransparentLoader";

const EditProduct = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    isLoading: productLoading,
    data,
    error,
  } = useGetSingleProductQuery(id);
  const dispatch = useAppDispatch();
  const [updateProduct, { error: updateError, isLoading: productUpdating }] =
    useUpdateProductMutation();
  const { product, productFiles, deleteProductPhotos } = useAppSelector(
    (state) => state.updateProduct
  );

  useEffect(() => {
    dispatch(setUpdateProduct(data?.data));
  }, [data, dispatch]);

  const formData = new FormData();

  // if (productLoading || productUpdating) {
  //   return <TransparentLoader />;
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
        setUpdateProduct({
          [fieldArray[0]]: {
            ...product[fieldArray[0]],
            [fieldArray[1]]: value,
          },
        })
      );
    } else {
      dispatch(setUpdateProduct({ [fieldName]: value }));
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

      if (fieldName === "productPhotos") {
        const isPhotoExist = data?.data?.productPhotos?.[id];
        if (isPhotoExist) {
          dispatch(setDeleteProductPhotos(isPhotoExist));
        }
      }

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
        dispatch(setUpdateProductFiles({ [fieldName]: updatedFiles }));
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

      if (deleteProductPhotos.length) {
        deleteProductPhotos.forEach((photo) => {
          formData.append("deleteProductPhotos", photo);
        });
      }

      // add new product using formData;
      const res = await updateProduct({ id, data: formData });
      if (res && "error" in res) {
        showError(res.error);
      } else {
        dispatch(clearUpdateProductState());
        toast.success(res?.data?.message || "Product updated successfully");

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
      dispatch(setUpdateProduct({ variants: updatedVariants }));
      input.value = "";
    }
  };

  // remove color variant to the choosenVariants state function
  const handleRemoveVariant = (variantName: string) => {
    const updatedVariants = product?.variants?.filter(
      (variant: IVariant) => variant?.variantName !== variantName
    );
    dispatch(setUpdateProduct({ variants: updatedVariants }));
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
        dispatch(setUpdateProductFiles({ [photoFieldName]: [files[0]] }));
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
        setUpdateProduct({
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
      setUpdateProduct({
        specifications: [...product.specifications, newSection],
      })
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
    dispatch(setUpdateProduct({ specifications: updatedSpecification }));
  };

  // show errors
  if (error || updateError) {
    showError(error);
  }

  return (
    <Fragment>
      {(productLoading || productUpdating) && <TransparentLoader />}
      <UpdateProductUi
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

export default EditProduct;
