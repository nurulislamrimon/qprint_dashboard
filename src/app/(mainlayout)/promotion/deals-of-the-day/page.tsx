import DealsOfTheDayMainSection from "@/components/promotion/DealsOfTheDayMainSection";
import TopBar from "@/components/shared/TopBar";

const DealsOfTheDay = () => {
  return (
    <section className="">
      <TopBar title="Deals Of The Day" />

      {/* main section */}

      <DealsOfTheDayMainSection />
    </section>
  );
};

export default DealsOfTheDay;
