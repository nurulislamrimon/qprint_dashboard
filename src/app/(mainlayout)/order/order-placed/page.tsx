import React from "react";
import OrderPlacedTable from "@/components/orders/OrderPlacedTable";

const OrderPlaced = () => {
  return (
    <div className="space-y-1">
      <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        <OrderPlacedTable />
      </div>
    </div>
  );
};

export default OrderPlaced;
