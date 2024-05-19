import React, { useEffect, useState } from "react";
import { IconPalette, IconPhotoPlus } from "@tabler/icons-react";
import LeftToggle from "@/assets/assetsSVG/LeftToggle";
import RightToggle from "@/assets/assetsSVG/RightToggle";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import FileUploader from "@/components/shared/FileUploader/FileUploader";
import {
  clearBackgroundPhoto,
  setBackgroundColor,
} from "@/store/features/bestDeals/bestDealsSlice";

const ChooseColorOrImage = ({
  handleChange,
}: {
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}) => {
  const [isColorSelected, setColorSelected] = useState(true);
  const bestDeals = useAppSelector((state) => state.bestDealsSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isColorSelected) {
      dispatch(clearBackgroundPhoto());
    } else {
      dispatch(setBackgroundColor());
    }
    // setColorSelected(bestDeals.backgroundColor !== "");
  }, [isColorSelected, dispatch, bestDeals.backgroundColor]);

  const toggleSelection = () => {
    setColorSelected(!isColorSelected);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between my-4">
        <p className="text-text-black-opacity-70">Background</p>
        <div className="flex items-center justify-center gap-2">
          <IconPalette className="text-black opacity-50" />
          <div onClick={toggleSelection}>
            {isColorSelected ? <LeftToggle /> : <RightToggle />}
          </div>
          <IconPhotoPlus className="text-black opacity-50" />
        </div>
      </div>

      <div>
        {isColorSelected ? (
          <div>
            <label htmlFor="colorPicker">
              <div className=" h-48 w-full border  flex items-center justify-center rounded-lg ">
                <input
                  id="colorPicker"
                  type="color"
                  defaultValue={bestDeals?.backgroundColor}
                  className="h-full w-full"
                  name="backgroundColor"
                  onChange={handleChange}
                />
              </div>
            </label>

            <p className="mt-2 text-black-opacity-60 text-sm">
              You can change background color
            </p>
          </div>
        ) : (
          <div>
            <FileUploader
              name="backgroundPhoto"
              className="min-h-48  h-full min-w-48 w-auto relative cursor-pointer  flex items-center justify-center text-black-opacity-60 text-xs "
              data={bestDeals}
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

export default ChooseColorOrImage;
