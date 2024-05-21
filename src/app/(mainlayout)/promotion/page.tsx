import AddNewSliderSection from "@/components/promotion/AddNewSliderSection";
import TopBar from "@/components/shared/TopBar";

const Slider = () => {
  return (
    <section>
      <TopBar title="Slider" />
      {/* bottom section add new slider  */}
      <AddNewSliderSection />
    </section>
  );
};

export default Slider;
