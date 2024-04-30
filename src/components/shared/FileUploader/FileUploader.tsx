"use client";

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
  maxSize?: number;
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
  maxSize,
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
  const url = path && !path?.includes("blob:http") ? `${mainUrl}${path}` : path;

  const checkSizeAndHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      maxSize &&
      e?.target?.files &&
      e?.target?.files[0]?.size > maxSize * 1024 * 1024
    ) {
      alert(`File size should be less than ${maxSize} MB`);
      return;
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <label className={className}>
      {/* check if data exist or children exist, if so, render the corresponding content */}
      {url ? (
        <Image src={url} alt={name} fill className="inset-0 object-contain" />
      ) : children ? (
        <span className="flex flex-col items-center justify-center">
          {children}
          {maxSize && (
            <small className="text-gray-500">
              Max size: <span className="text-orange-700"> {maxSize} MB</span>
            </small>
          )}
        </span>
      ) : (
        <>
          <IconPhotoPlus width={30} height={30} stroke={1} />
          <span className="flex flex-col">
            <span>Select Your Image</span>
            {maxSize && (
              <small className="text-gray-500">
                Max size: <span className="text-orange-700"> {maxSize} MB</span>
              </small>
            )}
            <span className="text-fuchsia-800 underline font-medium">
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
        onChange={checkSizeAndHandleChange}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
      />
    </label>
  );
};

export default FileUploader;
