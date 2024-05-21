"use client";
import AddNewSliderCard from "./card/AddNewSliderCard";
import { useGetSliderQuery } from "@/store/features/slider/sliderApi";
import SliderSmallCard from "./card/SliderSmallCard";
import EditOfferSliderDrawer from "./EditOfferSliderDrawer";
import { useAppSelector } from "@/store/hook";
import AddNewSliderDrawer from "./AddNewSliderDrawer";
import SliderSkeleton from "../shared/skeleton/SliderSkeleton";
const AddNewSliderSection = () => {
  const { data, isLoading } = useGetSliderQuery("");

  const sliderData = useAppSelector((state) => state.slider);
  const offerData = useAppSelector((state) => state.offerSlice);

  return (
    <div className="bg-white w-full h-[calc(100vh-90px)] mt-1 md:p-7 p-5 overflow-y-auto ">
      <h3 className="text-black-opacity-60 text-lg">Add New Slider</h3>

      {/* slider section start  */}

      {isLoading ? (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-4">
          {[...Array(3)].map((_, index) => {
            return <SliderSkeleton key={index} />;
          })}
        </div>
      ) : (
        <div className="grid  lg:grid-cols-2  grid-cols-1 gap-5 mt-4">
          {/* slider 1 */}
          <AddNewSliderCard
            data={data?.data?.slider?.firstSlider}
            sliderTitle="firstSlider"
          />
          {/* slider 2 */}
          <AddNewSliderCard
            data={data?.data?.slider?.secondSlider}
            sliderTitle="secondSlider"
          />

          {/* slider 3 */}
          <AddNewSliderCard
            data={data?.data?.slider?.thirdSlider}
            sliderTitle="thirdSlider"
          />
        </div>
      )}

      {/* slider section end  */}

      {/* top and bottom slider card start */}

      <h3 className="text-black-opacity-60 py-7 text-lg">Trending products</h3>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
        {/* slider 1 */}

        {isLoading ? (
          [...Array(2)].map((_, index) => {
            return <SliderSkeleton key={index} />;
          })
        ) : (
          <>
            <SliderSmallCard
              offerTitle="topOffer"
              data={data?.data?.topOffer}
            />
            <SliderSmallCard
              offerTitle="bottomOffer"
              data={data?.data?.bottomOffer}
            />
          </>
        )}
      </div>

      {/* edit slider drawer    */}

      {sliderData && Object.keys(sliderData).length ? (
        <AddNewSliderDrawer data={sliderData} />
      ) : (
        ""
      )}
      {/* Top and bottom slider card drawer  */}

      {offerData && Object.keys(offerData).length ? (
        <EditOfferSliderDrawer data={offerData} />
      ) : (
        ""
      )}
    </div>
  );
};

export default AddNewSliderSection;
