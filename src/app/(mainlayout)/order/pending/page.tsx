import PendingOrderTable from "@/components/orders/PendingOrderTable";
import React from "react";

const Pending = () => {
  return (
    <div className="space-y-1">
      <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        <PendingOrderTable />
      </div>
    </div>
  );
};

export default Pending;
