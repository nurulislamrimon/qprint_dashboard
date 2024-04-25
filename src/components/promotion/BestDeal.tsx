import React from "react";
import Image from "next/image";
import ButtonPrimary from "../ui/btn/ButtonPrimary.";
import { useAppSelector } from "@/store/hook";
import { mainUrl } from "@/constants/mainUrl";

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
  } = useAppSelector((state) => state.bestDealsSlice);
  console.log(products);

  return (
    <section className="bg-[#EDF2EE] py-4 px-2 md:py-7 md:px-8 mt-5  rounded-lg">
      <div className="flex items-center justify-between gap-6">
        <div className="w-1/4 ">
          <Image
            height={200}
            width={200}
            className="pb-36 sm:pb-0 md:pb-0 lg:pb-0"
            src={`${mainUrl}${firstProductPhoto}`}
            alt="Test iamge"
          />
        </div>
        <div className="w-2/4 flex items-center flex-col space-y-6">
          <div className="text-center space-y-2 md:space-y-3 lg:space-y-3">
            <h4 className="[font-size:_clamp(0.6em,4vw,0.9em)] main-text-color ">
              BEST DEALS
            </h4>
            <h1 className=" line-clamp-2 [font-size:_clamp(0.95em,4vw,1.9em)] main-text-color font-semibold ">
              {title}
            </h1>
            <p className=" line-clamp-2 [font-size:_clamp(0.6em,4vw,1.2em)] text-gray-500">
              {description}
            </p>
          </div>

          {/* coundown started */}

          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col border p-3 rounded-lg items-center justify-center bg-white ">
              <span className="countdown [font-size:_clamp(0.9em,4vw,1.5em)]  ">
                {/* @ts-ignore */}
                <span className="" style={{ "--value": 7 }}></span>
              </span>
              <p className=" [font-size:_clamp(0.6em,4vw,0.8em)] font-bold bg-gradient-to-r from-[#C83B62]  to-[#7F35CD]  text-transparent bg-clip-text">
                DAYS
              </p>
            </div>
            <div className="flex flex-col border p-3 rounded-lg items-center justify-center bg-white">
              <span className="countdown [font-size:_clamp(0.9em,4vw,1.5em)] ">
                {/* @ts-ignore */}
                <span style={{ "--value": 15 }}></span>
              </span>
              <p className=" [font-size:_clamp(0.6em,4vw,0.8em)] font-bold bg-gradient-to-r from-[#C83B62]  to-[#7F35CD]  text-transparent bg-clip-text">
                HOURS
              </p>
            </div>
            <div className="flex flex-col border p-3 rounded-lg items-center justify-center bg-white">
              <span className="countdown [font-size:_clamp(0.9em,4vw,1.5em)] ">
                {/* @ts-ignore */}
                <span style={{ "--value": 48 }}></span>
              </span>
              <p className=" [font-size:_clamp(0.6em,4vw,0.8em)] font-bold bg-gradient-to-r from-[#C83B62]  to-[#7F35CD]  text-transparent bg-clip-text">
                MIN
              </p>
            </div>
            <div className="flex flex-col border p-3 rounded-lg items-center justify-center bg-white ">
              <span className="countdown [font-size:_clamp(0.9em,4vw,1.5em)] ">
                {/* @ts-ignore */}
                <span style={{ "--value": 31 }}></span>
              </span>
              <p className=" [font-size:_clamp(0.6em,4vw,0.8em)] font-bold bg-gradient-to-r from-[#C83B62]  to-[#7F35CD]  text-transparent bg-clip-text">
                SEC
              </p>
            </div>
          </div>
          {/* coundown ended */}

          <div>
            {" "}
            <ButtonPrimary buttonText="Shop Now" type="submit" />
          </div>
        </div>
        <div className="w-1/4 ">
          <Image
            height={200}
            width={200}
            className="pb-36 sm:pb-0 md:pb-0 lg:pb-0"
            src={`${mainUrl}${secondProductPhoto}`}
            alt="Test image with monitor"
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 overflow-x-auto scroll-smooth no-scrollbar mt-4 ">
        {/* <!-------------- event Card 01 -------------> */}
        {products?.map((product: any, i: number) => (
          <div
            key={i}
            className="flex items-center gap-3 max-w-[300px] pr-20 py-2 pl-2 shrink-0 rounded-xl bg-white border border-white hover:border hover:duration-500 cursor-pointer hover:border-fuchsia-700"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="w-20 h-20 rounded-lg bg-background-color">
                <Image
                  height={100}
                  width={100}
                  src={`${mainUrl}${product?.productPhoto}`}
                  alt=""
                />
              </div>
              <div>
                <h3 className="line-clamp-1">{product?.productName}</h3>
                <strong className="text-red-regular font-bold">
                  {product?.discountedPrice} QR
                  <del className="text-gray-400 pl-2 font-semibold">
                    {product?.sellingPrice}
                  </del>
                </strong>
              </div>
            </div>
            {/* <!-------------- event Card 01 -------------> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestDeal;
