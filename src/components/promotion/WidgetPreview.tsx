"use client";
import React from "react";
import Image from "next/image";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import { mainUrl } from "@/constants/mainUrl";
import FileUploader from "../shared/FileUploader/FileUploader";
import {
  setDeals,
  setWidgetFiles,
} from "@/store/features/DealsOfTheDayAndWidget/widgetSlice";
import { useAppDispatch } from "@/store/hook";

const WidgetPreview = (data: any) => {
  const dispatch = useAppDispatch();
  // File and input handler
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const fieldName = e.target?.name;

    if (e.target instanceof HTMLInputElement && e.target?.files) {
      const files = e.target?.files;
      if (files && files.length) {
        const objUrl = URL.createObjectURL(files[0]);

        dispatch(setDeals({ [fieldName]: objUrl }));
        dispatch(setWidgetFiles({ [fieldName]: files[0] }));
      }
    } else {
      const value = e.target.value;
      dispatch(setDeals({ [fieldName]: value }));
    }
  };

  return (
    <div className="[width:clamp(300px,40vw,180px)]  h-[500px] bg-[#134231]  rounded-lg relative overflow-hidden ">
      <div className="h-[60%] w-full bg-[#3d7c65] opacity-65 blur-2xl rounded-full  absolute  border border-red-600 "></div>
      <div className="items-center justify-between h-full p-4 relative flex flex-col  ">
        <div className="flex md:justify-center justify-start flex-col text-white gap-2 md:items-center py-5 text-center ">
          <small>{data?.data?.tag}</small>
          <h2 className="[font-size:_clamp(1em,5vw,1.8em)] font-bold">
            {data?.data?.title}
          </h2>
          <p>{data?.data?.description}</p>
          <ButtonPrimary buttonText={data?.data?.buttonText} type="reset" />
        </div>
        <div className="w-48 h-48 my-5">
          <div className="flex justify-center items-center">
            <FileUploader
              name="productPhoto"
              className="min-h-48 h-full min-w-48 w-full relative cursor-pointer flex items-center justify-center text-black-opacity-60 text-xs "
              data={data.data}
              multiple={true}
              onChange={handleChange}
              accept="image/jpg,image/jpeg,image/png"
              maxSize={2}
            ></FileUploader>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetPreview;
