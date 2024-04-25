"use client";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import { mainUrl } from "@/constants/mainUrl";
import {
  IWidgetState,
  setDeals,
} from "@/store/features/DealsOfTheDayAndWidget/widgetSlice";
import Image from "next/image";
import { IconEdit } from "@tabler/icons-react";
import { useAppDispatch } from "@/store/hook";

type DealsOfTheDayCard = {
  data: IWidgetState;
  className: string;
  fieldName: string;
};

const DealsOfTheDayCard = ({
  data,
  className,
  fieldName,
}: DealsOfTheDayCard) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`  flex items-center justify-between gap-4  md:h-[250px] md:w-[500px] h-48 w-full p-5 border rounded-lg ${className}  relative`}
    >
      <button
        onClick={() => dispatch(setDeals({ ...data, fieldName }))}
        className="absolute top-3 right-3"
      >
        <IconEdit />
      </button>
      <div className="flex flex-col gap-2">
        <small className="py-2 px-3  bg-yellow-400  rounded-lg text-center max-w-fit ">
          Tag Here
        </small>
        <h2 className="[font-size:_clamp(0.9em,4vw,1.2em)]">{data?.title}</h2>
        <p>{data?.description}</p>
        <ButtonPrimary buttonText={data?.buttonText} type="submit" />
      </div>
      <div>
        <Image
          alt="Product img"
          height={150}
          width={150}
          src={`${mainUrl}${data?.productPhoto}`}
        />
      </div>
    </div>
  );
};

export default DealsOfTheDayCard;
