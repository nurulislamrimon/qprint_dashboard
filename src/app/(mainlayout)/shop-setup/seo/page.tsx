"use client";
import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import Loader from "@/components/shared/loaders/Loader";
import ShopSetupCommonSubmitBTN from "@/components/ShopSetup/ShopSetupCommonSubmitBTN";
import FileInput from "@/components/ui/FileInput";
import {
  useCreateSeoMutation,
  useGetSeoQuery,
} from "@/store/features/shopSetup/seo/seoApi";
import {
  setMetaDescription,
  setMetaLocalUrl,
  setMetaPhoto,
  setMetaTitle,
} from "@/store/features/shopSetup/seo/seoSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";

const Seo = () => {
  const dispatch = useAppDispatch();

  const { metaPhoto, metaTitle, metaDescription, metaLocalUrl } =
    useAppSelector((state) => state.seoSlice);

  const [createSeo, { error: updateError, isLoading: updateLoading }] =
    useCreateSeoMutation();

  const { data, isLoading: initialLoading } = useGetSeoQuery("");

  const loading = initialLoading || updateLoading;

  useLayoutEffect(() => {
    dispatch(setMetaPhoto(data?.data?.metaPhoto));
    dispatch(setMetaTitle(data?.data?.metaTitle));
    dispatch(setMetaDescription(data?.data?.metaDescription));
  }, [data, dispatch]);

  // for send image

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        dispatch(setMetaPhoto(selectedFile));
      }
      if (event.target.files && event.target.files.length > 0) {
        const reader = URL.createObjectURL(event.target.files[0]);
        dispatch(setMetaLocalUrl(reader));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (metaPhoto) {
      formData.append("metaPhoto", metaPhoto as File);
    }
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);

    try {
      const res = await createSeo(formData);
      console.log(res);
      if (res && "data" in res) {
        toast.success(res.data.message);
      }
      if (
        res &&
        "error" in res &&
        res.error !== null &&
        typeof res.error === "object" &&
        "message" in res.error
      ) {
        toast.error(res.error.message as React.ReactNode);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="p-8 relative">
      {loading && <Loader />}
      <h6 className="text-black-opacity-50 text-xl mb-[30px]">Home Page</h6>
      {/* ==Seo Form== */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-10 gap-7">
          <div className="grid grid-cols-1 md:col-span-4 md:order-none order-2">
            <CustomGlobalInput
              label="Meta Title"
              placeholder="Meta Title"
              type="text"
              value={metaTitle || ""}
              onChange={(e) => dispatch(setMetaTitle(e.target.value))}
            />
            <CustomGlobalInput
              label="Meta Description"
              placeholder="Meta Description"
              type="textarea"
              containerStyle={`mt-[30px]`}
              textareaLength={150}
              value={metaDescription || ""}
              onChange={(e) => dispatch(setMetaDescription(e.target.value))}
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-center md:order-none order-1">
            <FileInput
              imageType="Meta"
              className="!border-solid "
              name="metaPhoto"
              imageBottomText=""
              onChange={handleFileChange}
              localUrl={metaLocalUrl}
            />
          </div>
        </div>
        <p className="text-sm text-black-opacity-50 mt-2">
          Write a description max 150 character
        </p>
        <div className="flex items-center justify-center fixed bottom-5 inset-x-0 mx-5 md:mx-auto">
          <ShopSetupCommonSubmitBTN buttonText="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Seo;
