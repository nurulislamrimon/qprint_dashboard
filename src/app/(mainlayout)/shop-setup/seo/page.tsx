"use client";
import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import ShopSetupCommonSubmitBTN from "@/components/ShopSetup/ShopSetupCommonSubmitBTN";
import {
  useCreateSeoMutation,
  useGetSeoQuery,
} from "@/store/features/shopSetup/seo/seoApi";
import {
  setMetaDescription,
  setMetaPhoto,
  setMetaTitle,
} from "@/store/features/shopSetup/seo/seoSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useLayoutEffect } from "react";
import { toast } from "react-toastify";

const Seo = () => {
  const dispatch = useAppDispatch();

  const { metaPhoto, metaTitle, metaDescription } = useAppSelector(
    (state) => state.seoSlice
  );

  const [createSeo] = useCreateSeoMutation();

  const { data } = useGetSeoQuery(undefined);

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
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (metaPhoto) {
      formData.append("metaPhoto", metaPhoto);
    }
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);

    try {
      const res = await createSeo(formData);
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
    <div className="p-8">
      <h6 className="text-black-opacity-50 text-xl mb-[30px]">Home Page</h6>
      {/* ==Seo Form== */}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="metaPhoto"
          name="metaPhoto"
          onChange={handleFileChange}
        />
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
