import AllBusinessAnalytics from "@/components/dashboard/AllBusinessAnalytics";
import SaleByCategory from "@/components/dashboard/SaleByCategory";
import SellingStatisticsChart from "@/components/dashboard/SellingStatisticsChart";
import TopSellingProduct from "@/components/dashboard/TopSellingProduct";
import TopBar from "@/components/shared/TopBar";
import OrderTable from "@/components/shared/order-table/OrderTable";
import React from "react";

const Dashboard = () => {
  return (
    <section className="space-y-1 w-full ">
      <div className="sticky top-0 z-30">
        <TopBar title="Dashboard" />
      </div>
      <div className="space-y-7  py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        <div className="px-7">
          {/* ---business Analytics */}
          <AllBusinessAnalytics />
        </div>

        <div className="md:px-7">
          {/* <SellingStatisticsChart /> */}
          <SellingStatisticsChart />
          {/* table */}
        </div>
        <div className="px-7">
          <OrderTable />
        </div>
        <div className="px-7 mx-auto w-full flex flex-col md:flex-row gap-5 ">
          {/* Sale By Category */}
          <SaleByCategory />
          {/* top selling product  */}
          <TopSellingProduct />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
