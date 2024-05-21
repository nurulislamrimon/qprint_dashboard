import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import { mainUrl } from "@/constants/mainUrl";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import { useAppDispatch } from "@/store/hook";
import { setOffer } from "@/store/features/slider/offerSlice";

const SliderSmallCard = ({
  data,
  offerTitle,
}: {
  data: any;
  offerTitle: string;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-[#F2F4F5] flex justify-center items-center p-7 gap-4 rounded-lg flex-1 relative">
      <button
        className="absolute top-3 right-3"
        onClick={() => dispatch(setOffer({ ...data, offerTitle }))}
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
      <div className=" flex flex-col items-start gap-3.5">
        <h2 className="md:text-2xl text-base line-clamp-1 leading-7">
          {data?.title}
        </h2>
        <h3 className="main-text-color font-bold">{data?.price} QR</h3>

        <button className="md:px-8 rounded py-2.5 px-4 bg-main-bg-color text-white line-clamp-1">
          {data?.buttonText}
        </button>
      </div>
    </div>
  );
};

export default SliderSmallCard;
