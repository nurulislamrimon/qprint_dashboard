"use client";
import CustomGlobalInput from "../shared/CustomGlobalInput";
import RightToggle from "@/assets/assetsSVG/RightToggle";
import LeftToggle from "@/assets/assetsSVG/LeftToggle";
import { useUpdateSocialMediaMutation } from "@/store/features/shopSetup/socialMedia/socialMediaApi";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { setSocialMedia } from "@/store/features/shopSetup/socialMedia/socialMediaSlice";

const ShopSetupSocialMediaLayout = ({ data }: any) => {
  const [updateSocialMedia] = useUpdateSocialMediaMutation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState(
    data?.mediaName === "Whatsapp" ? data?.phoneNumber : data?.userName
  );

  const handleOnchange = async (id: string, status: boolean) => {
    setLoading(true);
    const updateStatus = {
      id: id,
      isActive: status,
    };
    try {
      const res = await updateSocialMedia(updateStatus);
      toast.success("Social Media Status Updated");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSocialMedia({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className={` ${loading ? "opacity-50" : ""
        } border p-5 w-full mt-5 md:mt-8 rounded-lg ${data?.isActive === false ? "opacity-40" : ""
        }`}
    >
      <div className="flex justify-between mb-[50px]">
        <div className="flex gap-3">
          {/* <Image src={icon} alt={altName} /> */}
          <p>{data?.mediaName}</p>
        </div>
        {/* <CustomToggle dynamicId={label} /> */}
        <button onClick={() => handleOnchange(data?._id, !data?.isActive)}>
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
        placeholder={
          data?.mediaName == "Whatsapp" ? "Whatsapp Number" : "Type Username"
        }
        value={
          data?.mediaName == "Whatsapp" ? data?.phoneNumber : data?.userName
        }
        disabled={data?.isActive === false}
        onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>)}
      />
    </div>
  );
};

export default ShopSetupSocialMediaLayout;
