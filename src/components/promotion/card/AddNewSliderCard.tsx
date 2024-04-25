"use client";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import { mainUrl } from "@/constants/mainUrl";
import { SliderType, setSlider } from "@/store/features/slider/sliderSlice";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import AddNewSliderDrawer from "../AddNewSliderDrawer";
import { useAppDispatch } from "@/store/hook";
interface IAddnewSliderCard {
  className?: string;
  sliderTitle: string;
  data: SliderType;
  slider: string;
}

const AddNewSliderCard = ({
  className,
  data,
  sliderTitle,
  slider,
}: IAddnewSliderCard) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={` ${className} flex items-center justify-center  py-12 border rounded-lg relative`}
    >
      <button
        className="absolute top-3 right-3"
        onClick={() => dispatch(setSlider({ ...data, sliderTitle, slider }))}
      >
        <IconEdit stroke={1} className="text-green-color" />
      </button>
      <div className="flex items-center justify-between w-full p-4 gap-7 ">
        <div className="flex flex-col gap-2">
          <h4 className="text-md text-fuchsia-800"> {data?.sliderTag}</h4>
          <h2 className="[font-size:_clamp(1em,30vw,2em)] text-black">
            {data?.title}
          </h2>
          <p className="text-gray-500">{data?.description}</p>
          <ButtonPrimary type="reset" buttonText={data?.buttonText} />
        </div>
        <div>
          <Image
            src={`${mainUrl}${data?.productPhoto}`}
            alt="Slider Product Photo"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewSliderCard;
