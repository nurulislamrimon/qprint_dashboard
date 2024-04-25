import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import { mainUrl } from "@/constants/mainUrl";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import { useAppDispatch } from "@/store/hook";
import { setOffer } from "@/store/features/slider/offerSlice";

const SliderSmallCard = ({ data, offerTitle, offer }: any) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-[#F2F4F5] flex justify-center items-center p-7 gap-4 rounded-lg flex-1 relative">
      <button
        className="absolute top-3 right-3"
        onClick={() => dispatch(setOffer({ ...data, offerTitle, offer }))}
      >
        <IconEdit stroke={1} className="text-green-color" />
      </button>
      <div className="shrink-0 relative w-36 h-36">
        <Image
          src={`${mainUrl}${data?.productPhoto}`}
          alt="Hero discount item"
          width={200}
          height={200}
          priority={true}
        />
      </div>
      <div className="">
        <h2 className="[font-size:_clamp(1em,5vw,1.5em)] leading-7">
          {data?.title}
        </h2>
        <h3 className="main-text-color font-bold">{data?.price} QR</h3>
        <ButtonPrimary buttonText={data?.buttonText} type="submit" />
      </div>
    </div>
  );
};

export default SliderSmallCard;
