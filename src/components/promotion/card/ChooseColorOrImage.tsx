import React, { useState } from "react";
import { IconPalette, IconPhotoPlus } from "@tabler/icons-react";
import ImagePlusInput from "@/assets/assetsSVG/ImagePlusInput";
import LeftToggle from "@/assets/assetsSVG/LeftToggle";
import RightToggle from "@/assets/assetsSVG/RightToggle";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setBestDeals } from "@/store/features/bestDeals/bestDealsSlice";

const ChooseColorOrImage = () => {
  const [isColorSelected, setColorSelected] = useState(true);
  const dispatch = useAppDispatch();
  const { backgroundColor } = useAppSelector((state) => state.bestDealsSlice);
  // console.log(backgroundColor);
  const formData = new FormData();
  const toggleSelection = () => {
    setColorSelected(!isColorSelected);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between my-4">
        <p className="text-text-black-opacity-70">Background</p>
        <div className="flex items-center justify-center gap-2">
          <IconPalette className="text-black opacity-50" />
          <button onClick={toggleSelection}>
            {isColorSelected ? <LeftToggle /> : <RightToggle />}
          </button>
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
                  defaultValue={backgroundColor}
                  className="h-full w-full"
                  name="backgroundColor"
                  onChange={(e) =>
                    dispatch(setBestDeals({ [e.target.name]: e.target.value }))
                  }
                />
              </div>
            </label>

            <p className="mt-2 text-black-opacity-60 text-sm">
              You can change background color
            </p>
          </div>
        ) : (
          <div>
            <label htmlFor="fileInput">
              <div className=" h-48 w-full border  flex items-center justify-center rounded-lg ">
                <ImagePlusInput />
              </div>
              <input
                type="file"
                id="fileInput"
                name="backgroundPhoto"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target?.files?.length) {
                    formData.append(e.target.name, e.target?.files[0]);
                    // create image url using file value
                    const reader = URL.createObjectURL(e.target?.files[0]);
                  }
                }}
                className=" hidden  "
              />
            </label>
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
