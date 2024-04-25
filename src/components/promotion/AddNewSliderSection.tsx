"use client";
import AddNewSliderCard from "./card/AddNewSliderCard";
import { useGetSliderQuery } from "@/store/features/slider/sliderApi";
import SliderSmallCard from "./card/SliderSmallCard";
import EditOfferSliderDrawer from "./EditOfferSliderDrawer";
import { useAppSelector } from "@/store/hook";
import AddNewSliderDrawer from "./AddNewSliderDrawer";
const AddNewSliderSection = () => {
  const { data } = useGetSliderQuery("");
  const sliderData = useAppSelector((state) => state.slider);
  const offerData = useAppSelector((state) => state.offerSlice);

  return (
    <div className="bg-white w-full h-[calc(100vh-90px)] mt-1 md:p-7 p-5 overflow-y-auto ">
      <h3 className="text-black-opacity-60 text-lg">Add New Slider</h3>

      {/* slider section start  */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-4">
        {/* slider 1 */}
        <AddNewSliderCard
          data={data?.data?.slider?.firstSlider}
          sliderTitle="Add Slider 1"
          slider="firstSlider"
        />
        {/* slider 2 */}
        <AddNewSliderCard
          data={data?.data?.slider?.secondSlider}
          sliderTitle="Add Slider 2"
          slider="secondSlider"
        />

        {/* slider 3 */}
        <AddNewSliderCard
          data={data?.data?.slider?.thirdSlider}
          sliderTitle="Add Slider 3"
          slider="thirdSlider"
        />
      </div>
      {/* slider section end  */}

      {/* top and bottom slider card start */}

      <h3 className="text-black-opacity-60 py-7 text-lg">Trending products</h3>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 ">
        {/* slider 1 */}

        <SliderSmallCard
          offerTitle="Top Offer"
          offer="topOffer"
          data={data?.data?.topOffer}
        />
        <SliderSmallCard
          offerTitle="Bottom Offer"
          offer="bottomOffer"
          data={data?.data?.bottomOffer}
        />
      </div>

      {/* open modal   */}

      {sliderData && Object.keys(sliderData).length ? (
        <AddNewSliderDrawer data={sliderData} />
      ) : (
        ""
      )}
      {offerData && Object.keys(offerData).length ? (
        <EditOfferSliderDrawer data={offerData} />
      ) : (
        ""
      )}
    </div>
  );
};

export default AddNewSliderSection;