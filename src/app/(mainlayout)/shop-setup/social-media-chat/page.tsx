"use client";

import ShopSetupSocialMediaLayout from "@/components/ShopSetup/ShopSetupSocialMediaLayout";
import whatsappImage from "@/assets/whatsapp.svg";
import messengerImage from "@/assets/messenger.svg";
import ShopSetupCommonSubmitBTN from "@/components/ShopSetup/ShopSetupCommonSubmitBTN";
import {
  useCreateSocialMediaMutation,
  useGetSocialMediaQuery,
} from "@/store/features/shopSetup/socialMedia/socialMediaApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { FormEvent, useLayoutEffect } from "react";
import {
  initiateSocialMediaData,
  setSocialMedia,
} from "@/store/features/shopSetup/socialMedia/socialMediaSlice";
import SocialMediaLayoutSkeleton from "@/components/shared/skeleton/SocialMediaLayoutSkeleton";
import { showError } from "@/helpers/showError";

const SocialMediaChat = () => {
  const { data, isLoading } = useGetSocialMediaQuery();
  const dispatch = useAppDispatch();

  const [updateSocialMedia, { isLoading: loading }] =
    useCreateSocialMediaMutation();
  const socialMediaData = useAppSelector((state) => state.socialMediaSlice);

  useLayoutEffect(() => {
    dispatch(initiateSocialMediaData(data?.data));
  }, [data, dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await updateSocialMedia(socialMediaData);
      console.log(res);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-[30px] p-8"
    >
      {isLoading
        ? [...Array(2)].map((_, index) => {
            return <SocialMediaLayoutSkeleton key={index} />;
          })
        : ["Messenger", "Whatsapp"].map((mediaName: string) => (
            <ShopSetupSocialMediaLayout
              key={mediaName}
              data={socialMediaData?.socialMedias?.find(
                (media) => media.mediaName === mediaName
              )}
              mediaName={mediaName}
              loading={loading || isLoading}
            />
          ))}
      <div className="flex items-center justify-center fixed bottom-5 inset-x-0 mx-5 md:mx-auto">
        <ShopSetupCommonSubmitBTN buttonText="Submit" type="submit" />
      </div>
    </form>
  );
};

export default SocialMediaChat;
