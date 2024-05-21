import ShippingTable from "@/components/orders/ShippingTable";
import React from "react";

const Shipping = () => {
  return (
    <div className="space-y-1">
      <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        <ShippingTable />
      </div>
    </div>
  );
};

export default Shipping;
