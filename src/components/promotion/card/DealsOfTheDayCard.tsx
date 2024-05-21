"use client";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import { mainUrl } from "@/constants/mainUrl";
import { IWidgetState } from "@/store/features/DealsOfTheDayAndWidget/widgetSlice";
import Image from "next/image";
import { IconEdit } from "@tabler/icons-react";
import { useAppDispatch } from "@/store/hook";
import { setDealsOfTheDay } from "@/store/features/DealsOfTheDayAndWidget/dealsOfTheDaySlice";
import FileUploader from "@/components/shared/FileUploader/FileUploader";

type DealsOfTheDayCard = {
  data: IWidgetState;
  className: string;
  fieldName?: string;
  iconClassName?: string;
  handleChange?: any;
};

const DealsOfTheDayCard = ({
  data,
  className,
  fieldName,
  iconClassName,
  handleChange,
}: DealsOfTheDayCard) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`  flex items-center justify-between gap-4  md:h-[250px] md:w-[500px] h-48 w-full p-5 border rounded-lg ${className}  relative`}
    >
      <button
        onClick={() => dispatch(setDealsOfTheDay({ ...data, fieldName }))}
        className={`absolute top-3 right-3  ${iconClassName} `}
      >
        <IconEdit />
      </button>
      <div className="flex flex-col gap-2">
        <small className="py-2 px-3  bg-yellow-400  rounded-lg text-center max-w-fit ">
          {data?.discount ? `${data?.discount} % Off` : `${data?.tag}`}
        </small>
        <h2 className="[font-size:_clamp(0.9em,4vw,1.2em)]">{data?.title}</h2>
        <p>{data?.description}</p>
        <ButtonPrimary buttonText={data?.buttonText} type="submit" />
      </div>
      {iconClassName !== "hidden" ? (
        <div>
          <Image
            alt="Product img"
            height={150}
            width={150}
            src={`${mainUrl + data?.productPhoto}`}
          />
        </div>
      ) : (
        <div className="w-full">
          <FileUploader
            name="productPhoto"
            className="min-h-48  h-full min-w-48 w-auto relative cursor-pointer border border-dashed border-black-opacity-20 flex items-center justify-center text-black-opacity-60 text-xs "
            data={data}
            multiple={true}
            onChange={handleChange}
            accept="image/jpg,image/jpeg,image/png"
            maxSize={2}
            bottomText="Add Image"
          ></FileUploader>
        </div>
      )}
    </div>
  );
};

export default DealsOfTheDayCard;
