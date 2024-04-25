import OrderPlacedTable from "@/components/orders/OrderPlacedTable";
import React from "react";

const OrderPlaced = () => {
  return (
    <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
      <OrderPlacedTable />
    </div>
  );
};

export default OrderPlaced;
