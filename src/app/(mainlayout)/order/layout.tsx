import TopBar from "@/components/shared/TopBar";
import React from "react";

const OrderLayout = ({ children }: any) => {
  return (
    <div className="space-y-1 w-full">
      <div className="sticky top-0 z-30">
        <TopBar title="Orders" />
      </div>

      <div className="">{children}</div>
    </div>
  );
};

export default OrderLayout;
