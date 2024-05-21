import React from "react";
import { IconPalette, IconPhotoPlus } from "@tabler/icons-react";
import LeftToggle from "@/assets/assetsSVG/LeftToggle";
import RightToggle from "@/assets/assetsSVG/RightToggle";
import FileUploader from "@/components/shared/FileUploader/FileUploader";

const ColorAndImageSwitcher = ({
  handleChange,
  data,
}: {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  data: {
    backgroundPhoto: string;
    backgroundColor: string;
    isBgColorSelected: boolean;
  };
}) => {
  return (
    <div className="">
      <div className="flex items-center justify-between my-4">
        <p className="text-text-black-opacity-70">Background</p>
        <div className="flex items-center justify-center gap-2">
          <IconPalette className="text-black opacity-50" />
          <label>
            <input
              type="checkbox"
              name="isBgColorSelected"
              className="hidden"
              onChange={handleChange}
            />
            {data?.isBgColorSelected ? <LeftToggle /> : <RightToggle />}
          </label>
          <IconPhotoPlus className="text-black opacity-50" />
        </div>
      </div>

      <div>
        {data?.isBgColorSelected ? (
          <div>
            <label htmlFor="colorPicker" className="flex h-48 mb-4 relative">
              <span className="absolute inset-0 mt-20 text-center text-sm">
                🎨Choose a color
              </span>
              <input
                id="colorPicker"
                type="color"
                defaultValue={data?.backgroundColor || "#EDF2EE"}
                className="h-full w-full"
                name="backgroundColor"
                onChange={handleChange}
              />
            </label>

            <p className="mt-2 text-black-opacity-60 text-sm">
              You can change background color
            </p>
          </div>
        ) : (
          <div className="w-full relative">
            <FileUploader
              name="backgroundPhoto"
              className="min-h-48 flex items-center justify-center flex-col h-full min-w-full relative cursor-pointer text-black-opacity-60 text-xs "
              data={data?.backgroundPhoto}
              multiple={true}
              onChange={handleChange}
              accept="image/jpg,image/jpeg,image/png"
              maxSize={2}
            ></FileUploader>

            <p className="mt-2 text-black-opacity-60 text-sm">
              You can change background image
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorAndImageSwitcher;
