import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/store/hook";
import { mainUrl } from "@/constants/mainUrl";
import CountdownTimer from "./CountdownTimer";
import BestDealProduct from "./BestDealProduct";

const BestDeal = () => {
  const {
    title,
    description,
    startDate,
    endDate,
    backgroundColor,
    secondProductPhoto,
    products,
    firstProductPhoto,
    backgroundPhoto,
  } = useAppSelector((state) => state.bestDealsSlice);

  const offerEndDatae = new Date(endDate as string);

  return (
    <section
      style={{
        backgroundColor: `${
          backgroundColor || (backgroundColor !== null && `${backgroundColor}`)
        }`,
        backgroundImage: `url(${mainUrl + backgroundPhoto})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="py-4 px-2 md:py-7 md:px-8 mt-5 rounded-lg"
    >
      <div className="flex items-center justify-between gap-3 md:gap-x-5 overflow-hidden">
        <div className="w-1/4 md:w-1/5">
          <div className="relative w-20 md:w-36 h-20 md:h-36 lg:w-48 lg:h-48 shrink-0 min-w-[5rem] max-w-[12rem]">
            <Image
              src={`${mainUrl + firstProductPhoto}`}
              placeholder="blur"
              blurDataURL={`${mainUrl + firstProductPhoto}`}
              alt="Offer Image"
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="500px"
              priority
              className="w-full h-full top-0 left-0 object-cover"
            />
          </div>
        </div>
        <div className="w-2/4 md:w-3/5 flex items-center flex-col space-y-6">
          <div className="text-center space-y-2 md:space-y-3 lg:space-y-3 mb-5">
            <h4 className="[font-size:_clamp(0.6em,4vw,0.9em)] main-text-color ">
              BEST DEALS
            </h4>
            <h1 className="md:line-clamp-2 line-clamp-1 text-base md:text-2xl main-text-color font-semibold ">
              {title as string}
            </h1>
            <p className="line-clamp-2 text-sm md:text-lg text-gray-500">
              {description as string}
            </p>
          </div>
          <div>
            <CountdownTimer endDate={offerEndDatae} />
          </div>
        </div>
        <div className="w-1/4 md:w-1/5 flex items-end justify-end overflow-hidden">
          <div className="relative w-20 md:w-36 h-20 md:h-36 lg:w-48 lg:h-48 shrink-0 min-w-[5rem] max-w-[12rem]">
            <Image
              src={`${mainUrl + secondProductPhoto}`}
              placeholder="blur"
              blurDataURL={`${mainUrl + secondProductPhoto}`}
              alt="Offer Image"
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="500px"
              priority
              className="w-full h-full top-0 left-0 object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-20">
        <BestDealProduct productData={products} />
      </div>
    </section>
  );
};

export default BestDeal;
