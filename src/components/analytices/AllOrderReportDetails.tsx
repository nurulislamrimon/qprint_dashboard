"use client";
import OrderReportDetail from "../shared/analytices/OrderReportDetail";
import Delivered from "@/assets/Delivered.svg";
import Returned from "@/assets/Returned.svg";
import Shipping from "@/assets/Shipping.svg";
import Canceled from "@/assets/Canceled.svg";
import { IconTrendingDown } from "@tabler/icons-react";
import { IconTrendingUp } from "@tabler/icons-react";
import { useOnlineOrdersQuery } from "@/store/features/sales/salesApi";
import { useGetbusinessAnalyticsQuery } from "@/store/features/businessAnalytics/businessAnalyticsApi";
import { useState } from "react";
import { useGetOnlineOrderQuery } from "@/store/features/order/onlineOrderApi";

const AllOrderReportDetails = () => {
  const [startDate, setStartDate] = useState("03/25/2024"); // Initialize date state
  const [endDate, setEndDate] = useState("03/31/2024"); // Initialize date state
  const { data } = useGetOnlineOrderQuery(
    `orderStatus.status=Delivered${
      startDate && endDate
        ? `&createdAt[gte]=${startDate}&createdAt[lte]=${endDate}`
        : ""
    }`
  );
  console.log(data);

  const { data: allOrder } = useOnlineOrdersQuery("");

  const { data: returned } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Returned"
  );
  const { data: delivered } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Delivered"
  );
  console.log(delivered);

  const { data: shipping } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Shipping"
  );
  const { data: Cancelled } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Cancelled"
  );

  function calculateStatusPercentage(status: number, total: number) {
    if (total === 0) return 0; // To avoid division by zero
    return (status / total) * 100;
  }
  return (
    <div className="space-y-3.5">
      {/* Delevered */}
      <OrderReportDetail
        orderReportCardMainClass="hover:border-[#03A609]"
        icon={Delivered}
        imageClassName="rounded-full bg-green-100 p-3 w-full"
        orderReportTitle="Delivered"
        tendingIcon={<IconTrendingUp />}
        tendingIConClassName="text-green-color"
        parcentageNumber={20}
        firstCircleClassName="text-green-100"
        secondCircleClassName="text-green-500"
        percentage={30}
        initialProgress={parseFloat(
          calculateStatusPercentage(
            delivered?.data,
            allOrder?.meta?.total
          ).toFixed(0)
        )}
      />
      {/* Shipping */}
      <OrderReportDetail
        orderReportCardMainClass="hover:border-fuchsia-600"
        icon={Shipping}
        imageClassName="rounded-full bg-main-bg-color-opacity-32 p-3 w-full"
        orderReportTitle="Shipping"
        tendingIcon={<IconTrendingDown />}
        tendingIConClassName=" text-fuchsia-600"
        parcentageNumber={10}
        firstCircleClassName="text-[#d9d9d9]"
        secondCircleClassName="text-fuchsia-800"
        initialProgress={parseFloat(
          calculateStatusPercentage(
            shipping?.data,
            allOrder?.meta?.total
          ).toFixed(0)
        )}
        // initialProgress={initialShippingProgress}
      />
      {/* Returned */}
      <OrderReportDetail
        orderReportCardMainClass="hover:border-red-500"
        icon={Returned}
        imageClassName="rounded-full bg-[#ff75001a] p-3 w-full"
        orderReportTitle="Returned"
        tendingIcon={<IconTrendingUp />}
        tendingIConClassName="text-red-400"
        parcentageNumber={10}
        firstCircleClassName="text-yellow-100"
        secondCircleClassName="text-red-400"
        initialProgress={parseFloat(
          calculateStatusPercentage(
            returned?.data,
            allOrder?.meta?.total
          ).toFixed(0)
        )}
        // initialProgress={initialReturnedProgress}
      />
      {/* Canceled */}
      <OrderReportDetail
        orderReportCardMainClass="hover:border-black"
        icon={Canceled}
        imageClassName="rounded-full bg-[#0000001a] p-3 w-full"
        orderReportTitle="Canceled"
        tendingIcon={<IconTrendingDown />}
        tendingIConClassName="text-black-opacity-60"
        parcentageNumber={10}
        firstCircleClassName="text-[#d9d9d9]"
        secondCircleClassName="text-[#00000080]"
        initialProgress={parseFloat(
          calculateStatusPercentage(
            Cancelled?.data,
            allOrder?.meta?.total
          ).toFixed(0)
        )}
        // initialProgress={initialCancelledProgress}
      />
    </div>
  );
};

export default AllOrderReportDetails;
