"use client";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import RightToggle from "@/assets/assetsSVG/RightToggle";
import LeftToggle from "@/assets/assetsSVG/LeftToggle";

import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import {
  ISocialMedia,
  setSocialMedia,
} from "@/store/features/shopSetup/socialMedia/socialMediaSlice";

const ShopSetupSocialMediaLayout = ({
  data,
  mediaName,
  loading,
}: {
  data: ISocialMedia | undefined;
  mediaName: string;
  loading: boolean;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={` ${
        loading ? "opacity-50" : ""
      } border p-5 w-full mt-5 md:mt-8 rounded-lg ${
        data?.isActive === false ? "opacity-40" : ""
      }`}
    >
      <div className="flex justify-between mb-[50px]">
        <div className="flex gap-3">
          {/* <Image src={icon} alt={altName} /> */}
          <p>{mediaName}</p>
        </div>
        {/* <CustomToggle dynamicId={label} /> */}
        <button
          onClick={(e) =>
            dispatch(
              setSocialMedia({
                mediaName: mediaName,
                userName: data?.userName,
                phoneNumber: data?.phoneNumber,
                isActive: !data?.isActive ? true : false,
              })
            )
          }
        >
          {data?.isActive === true ? <RightToggle /> : <LeftToggle />}
        </button>
      </div>

      <CustomGlobalInput
        name={data?.mediaName == "Whatsapp" ? "phoneNumber" : "userName"}
        label={
          data?.mediaName == "Whatsapp"
            ? "Number (With country code)"
            : "Type Username"
        }
        type="text"
        placeholder={mediaName}
        value={data?.phoneNumber || data?.userName}
        disabled={data?.isActive === false}
        onChange={(e) =>
          dispatch(
            setSocialMedia({
              mediaName: mediaName,
              isActive: data?.isActive ? true : false,
              userName: mediaName === "Messenger" ? e.target.value : undefined,
              phoneNumber:
                mediaName === "Whatsapp" ? e.target.value : undefined,
            })
          )
        }
      />
    </div>
  );
};

export default ShopSetupSocialMediaLayout;
