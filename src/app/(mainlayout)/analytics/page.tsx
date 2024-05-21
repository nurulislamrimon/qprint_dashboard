import OrderReportChart from "@/components/analytices/OrderReportChart";
import AllOrderReportDetails from "@/components/analytices/AllOrderReportDetails";
import TopCustomers from "@/components/analytices/TopCustomers";
import TotalSelsSummarys from "@/components/analytices/TotalSelsSummarys";
import AnalyticesSellingChart from "@/components/analytices/AnalyticesSellingChart";
import TopBar from "@/components/shared/TopBar";

const Analytics = () => {
  return (
    <section className="space-y-1 w-full">
      <div className="sticky top-0 z-30">
        <TopBar title="Analytics" />
      </div>
      <div className=" space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        <div className="md:px-7 w-full flex items-center justify-center flex-col md:flex-row gap-5">
          <OrderReportChart />
          <div className="px-7 md:px-0 w-full md:w-[35%] md:h-[488px] flex justify-between flex-col">
            <AllOrderReportDetails />
          </div>
        </div>
        <div className=" md:px-7">
          <AnalyticesSellingChart />
        </div>
        <div className="px-7 mx-auto w-full flex items-center flex-col md:flex-row gap-5">
          <TotalSelsSummarys />
          <TopCustomers />
        </div>
      </div>
    </section>
  );
};

export default Analytics;
