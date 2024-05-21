import ReturnedOrderTable from "@/components/orders/ReturnedOrderTable";
import React from "react";

const Returned = () => {
  return (
    <div className="space-y-1">
      <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        {/* <QuickOrderTable /> */}
        <ReturnedOrderTable />
      </div>
    </div>
  );
};

export default Returned;
