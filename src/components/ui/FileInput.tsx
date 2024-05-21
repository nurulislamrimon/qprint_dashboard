import ImagePlusInput from "@/assets/assetsSVG/ImagePlusInput";
import Image from "next/image";
import React, { ChangeEvent, ChangeEventHandler } from "react";

interface FileInputProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string;
  imageBottomText: string;
  name: string;
  localUrl?: string | any;
  imageType?: string;
}

const FileInput = ({
  imageType,
  onChange,
  className,
  imageBottomText,
  name,
  localUrl,
}: FileInputProps) => {
  return (
    <div>
      <h5 className="mb-2 text-black-opacity-60 text-center">
        {imageType} Image
      </h5>
      <label htmlFor="fileInput">
        <div
          className={`${className} md:h-48 md:w-48 w-40 h-40 overflow-hidden  border border-dashed flex items-center justify-center rounded-lg cursor-pointer`}
        >
          {localUrl ? (
            <Image
              objectFit="cover "
              src={localUrl}
              width={192}
              height={192}
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
