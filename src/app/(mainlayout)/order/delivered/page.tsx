import DeliveredTable from "@/components/orders/DeliveredTable";
import React from "react";

const Delivered = () => {
  return (
    <div className="space-y-1">
      <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        <DeliveredTable />
      </div>
    </div>
  );
};

export default Delivered;
