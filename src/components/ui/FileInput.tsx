import ImagePlusInput from "@/assets/assetsSVG/ImagePlusInput";
import Image from "next/image";
import React, { ChangeEvent, ChangeEventHandler } from "react";

interface FileInputProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string;
  imageBottomText: string;
  name: string;
  localUrl?: string;

}

const FileInput = ({
  onChange,
  className,
  imageBottomText,
  name,
  localUrl,

}: FileInputProps) => {
  return (
    <div>
      <h5 className="mb-2 text-black-opacity-60">Image</h5>
      <label htmlFor="fileInput">
        <div className={`${className} md:h-48 md:w-48 w-40 h-40  border border-dashed flex items-center justify-center rounded-lg cursor-pointer`}>
          {localUrl ? (
            <Image
              src={localUrl}
              width={100}
              height={100}
              alt="uploaded Image"
            />
          ) : (
            <ImagePlusInput />
          )}
        </div>
        <input
          name={name}
          type="file"
          id="fileInput"
          onChange={onChange}
          className=" hidden  "
        />
      </label>
      <p className="mt-2 text-black-opacity-60 text-sm">{imageBottomText}</p>
    </div>
  );
};

export default FileInput;
