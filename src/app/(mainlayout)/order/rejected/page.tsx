import RejectedTable from "@/components/orders/RejectedTable";
import React from "react";

const Rejected = () => {
  return (
    <div className="space-y-1">
      <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        <RejectedTable />
      </div>
    </div>
  );
};

export default Rejected;
