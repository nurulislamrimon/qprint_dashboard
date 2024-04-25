"use client";

import { assets } from "@/assets";
import { mainUrl } from "@/constants/mainUrl";
import { IconPhotoPlus } from "@tabler/icons-react";
import Image from "next/image";
import { ReactNode } from "react";

export interface IFileUploaderProps {
  name: string;
  data: Record<string, any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
  error?: string;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  uid?: number;
}

const FileUploader = ({
  name,
  data,
  onChange,
  multiple = false,
  accept,
  error,
  className,
  disabled,
  children,
  uid = 1,
}: IFileUploaderProps) => {
  const index = Number(uid) - 1;
  const fieldName =
    name === "seo.metaPhoto" ? data?.seo?.metaPhoto : data?.[name];
  // check if fieldName is an array, if so, get the item at the index, otherwise use the uid if it's not 1, or the fieldName as a string
  const path = Array.isArray(fieldName)
    ? (fieldName[index] as string)
    : uid !== 1
    ? ""
    : (fieldName as string);

  // check if the file path is a valid URL, if not, use the default path
  const url =
    path && !path?.includes("blob:http://") ? `${mainUrl}${path}` : path;

  return (
    <label className={className}>
      {/* check if data exist or children exist, if so, render the corresponding content */}
      {url ? (
        <Image src={url} alt={name} fill className="inset-0 object-contain" />
      ) : children ? (
        children
      ) : (
        <>
          <IconPhotoPlus width={30} height={30} stroke={1} />
          <span className="flex flex-col">
            <span>Select Your Image</span>
            <span className="text-fuchsia-800 underline font-medium ">
              Click to browse
            </span>
          </span>
        </>
      )}
      <input
        className="hidden"
        name={name}
        id={uid.toString()}
        type="file"
        onChange={onChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
      />
    </label>
  );
};

export default FileUploader;
