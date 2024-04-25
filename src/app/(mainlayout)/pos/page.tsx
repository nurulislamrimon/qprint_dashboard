
import TopBar from "@/components/shared/TopBar";
import PosHomepage from "@/components/pos/PosHomepage";

const Pos = () => {
  return (
    <div>
      <div className="sticky top-0 ">
        <TopBar title={"POS"} />
      </div>
      <PosHomepage />
    </div>
  );
};

export default Pos;
