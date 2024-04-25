"use client";
import PosOrderTable from "./PosOrderTable";
import PosOrderDrawer from "./PosOrderDrawer";
import { useAppSelector } from "@/store/hook";
import { useOflineSalesQuery } from "@/store/features/order/offlineOrderApi";
const PosOrderHomePage = () => {
  const data = useAppSelector((state) => state.posSaleSlice);

  const { data: totalOfflineSales } = useOflineSalesQuery("");

  return (
    <div className="bg-white  flex flex-col gap-5 mt-1 h-[calc(100vh-90px)] overflow-y-scroll">
      <div className="flex items-center justify-between md:px-[30px] px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <span className="text-black md:text-lg text-base font-medium">
            Order Placed
          </span>
          <div className="bg-blue-opacity-10  rounded-full px-2 py-1 text-blue-color text-center text-[10px]">
            {totalOfflineSales?.data?.length}
          </div>
        </div>
      </div>
      <PosOrderTable />
      {Object.keys(data).length ? <PosOrderDrawer data={data} /> : ""}
    </div>
  );
};

export default PosOrderHomePage;
