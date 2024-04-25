import PosOrderHomePage from "@/components/pos-order/PosOrderHomePage";
import TopBar from "@/components/shared/TopBar";

const PosOrder = () => {
  return (
    <div className="bg-body-main-bg-color">
      <div className="sticky top-0 z-20 w-full">
        <TopBar title={"POS sales"} />
      </div>

      <PosOrderHomePage />
    </div>
  );
};

export default PosOrder;
