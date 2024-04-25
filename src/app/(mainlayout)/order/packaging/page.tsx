import PackagingTable from "@/components/orders/PackagingTable";
import React from "react";

const Packaging = () => {
  return (
    <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
      <PackagingTable />
    </div>
  );
};

export default Packaging;
