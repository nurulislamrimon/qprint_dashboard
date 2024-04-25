"use client";

import ShopSetupSocialMediaLayout from "@/components/ShopSetup/ShopSetupSocialMediaLayout";
import whatsappImage from "@/assets/whatsapp.svg";
import messengerImage from "@/assets/messenger.svg";
import ShopSetupCommonSubmitBTN from "@/components/ShopSetup/ShopSetupCommonSubmitBTN";
import { useGetSocialMediaQuery } from "@/store/features/shopSetup/socialMedia/socialMediaApi";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useLayoutEffect } from "react";
import { setSocialMedia } from "@/store/features/shopSetup/socialMedia/socialMediaSlice";
import SocialMediaLayoutSkeleton from "@/components/shared/skeleton/SocialMediaLayoutSkeleton";

const SocialMediaChat = () => {
  const { data, isLoading } = useGetSocialMediaQuery();
  const dispatch = useAppDispatch();
  const socialMediaData = useAppSelector((state) => state.socialMediaSlice);
  useLayoutEffect(() => {
    dispatch(setSocialMedia(data?.data));
  }, [data, dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-[30px] p-8">
      {isLoading ? (
        [...Array(2)].map((_, index) => {
          return (
            <SocialMediaLayoutSkeleton key={index} />
          )
        })
      ) : (
        socialMediaData?.map((item: any) => (
          <ShopSetupSocialMediaLayout key={item?._id} data={item} />
        ))
      )}
      <div className="flex items-center justify-center fixed bottom-5 inset-x-0 mx-5 md:mx-auto">
        <ShopSetupCommonSubmitBTN buttonText="Submit" type="submit" />
      </div>
    </div>
  );
};

export default SocialMediaChat;
