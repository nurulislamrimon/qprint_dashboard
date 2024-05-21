import QuickOrderTable from "@/components/orders/QuickOrderTable";
import React from "react";

const QuickOrder = () => {
  return (
    <div className="space-y-1">
      <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        <QuickOrderTable />
      </div>
    </div>
  );
};

export default QuickOrder;
