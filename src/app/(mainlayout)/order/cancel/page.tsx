import CancelOrderTable from "@/components/orders/CancelOrderTable";
import React from "react";

const CancelOrder = () => {
  return (
    <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
      <CancelOrderTable />
    </div>
  );
};

export default CancelOrder;
