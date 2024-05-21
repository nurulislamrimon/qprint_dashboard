"use client";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import { mainUrl } from "@/constants/mainUrl";
import { SliderType, setSlider } from "@/store/features/slider/sliderSlice";
import { IconArrowRight, IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import AddNewSliderDrawer from "../AddNewSliderDrawer";
import { useAppDispatch } from "@/store/hook";
interface IAddnewSliderCard {
  className?: string;
  data: SliderType;
  sliderTitle: string;
}

const AddNewSliderCard = ({
  className,
  data,
  sliderTitle,
}: IAddnewSliderCard) => {
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        backgroundColor: `${
          data?.backgroundColor ||
          (data?.backgroundColor !== null && `${data?.backgroundColor}`)
        }`,
        backgroundImage: `url(${mainUrl + data?.backgroundPhoto})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className={` ${className} flex items-center justify-center  border rounded-lg relative`}
    >
      <button
        className="absolute top-3 right-3 z-10"
        onClick={() => dispatch(setSlider({ ...data, sliderTitle }))}
      >
        <IconEdit stroke={1} className="text-green-color" />
      </button>
      <div className="flex items-center justify-between w-full md:px-8 px-4 md:py-5 py-2.5 md:gap-5 gap-3.5 ">
        <div className="flex flex-col items-start md:gap-6 gap-5 flex-1">
          <div className="flex flex-col md:gap-2.5 gap-1">
            <div className="flex items-center md:gap-2 gap-1">
              <div className="bg-main-bg-color w-6 h-0.5"></div>
              <span className="[font-size:clamp(12px,2vw,14px)] main-text-color md:font-semibold font-medium">
                {" "}
                {data?.sliderTag}
              </span>
            </div>
            <h2 className="[font-size:clamp(16px,2vw,22px)] font-semibold text-black line-clamp-1">
              {data?.title}
            </h2>
            <p className="text-[#475156] [font-size:clamp(12px,2vw,16px)] line-clamp-2">
              {data?.description}
            </p>
          </div>

          <button className="[font-size:clamp(12px,2vw,16px)] bg-main-bg-color px-4 md:py-4 py-2 line-clamp-1   rounded md:text-base  text-white flex items-center gap-3 md:whitespace-nowrap">
            {data?.buttonText}
            <IconArrowRight
              stroke={1}
              height={24}
              width={24}
              className="md:block hidden"
            />
          </button>
        </div>

        <div className="md:w-[250px] md:h-[250px] w-[180px] h-[150px] relative">
          <Image
            src={`${mainUrl}${data?.productPhoto}`}
            alt="Slider Product Photo"
            // width={400}
            // height={250}
            sizes="(max-width: 768px), 30vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full top-0 left-0 object-contain"
            priority={true}
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default AddNewSliderCard;
