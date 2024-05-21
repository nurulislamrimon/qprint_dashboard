"use client";
import DealsOfTheDayCard from "./card/DealsOfTheDayCard";
import { useGetDealsOfTheDayAndWidgetQuery } from "@/store/features/DealsOfTheDayAndWidget/dealsOfTheDayAndWidgetApi";
import DealsOfTheDayDrawer from "./DealsOfTheDayDrawer";
import { useAppSelector } from "@/store/hook";
import DealsOfTheDaySkeleton from "../shared/skeleton/DealsOfTheDaySkeleton";
const DealsOfTheDayMainSection = () => {
  const { data, isLoading } = useGetDealsOfTheDayAndWidgetQuery("");

  const dealsStateData = useAppSelector((state) => state.dealsOfTheDaySlice);

  return (
    <div className="bg-white w-full h-[calc(100vh-90px)] mt-1 md:p-7 p-5 overflow-y-auto ">
      <h3 className="text-black-opacity-60 text-lg">Deals Of The Day</h3>
      <div className=" flex flex-col justify-center items-center gap-5 my-10  ">
        {isLoading ? (
          [...Array(2)].map((_, index) => {
            return <DealsOfTheDaySkeleton key={index} />;
          })
        ) : (
          <>
            {/* card 1 */}
            <DealsOfTheDayCard
              className="bg-[#F9F9F9]"
              data={data?.data?.firstDeal}
              fieldName="firstDeal"
            />
            {/* card 2 */}
            <DealsOfTheDayCard
              className="bg-[#0a0303] text-white"
              data={data?.data?.secondDeal}
              fieldName="secondDeal"
            />
          </>
        )}
      </div>
      {/* open modal   */}
      {Object.keys(dealsStateData).length ? (
        <DealsOfTheDayDrawer data={dealsStateData} />
      ) : (
        ""
      )}
    </div>
  );
};

export default DealsOfTheDayMainSection;
