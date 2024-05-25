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
import { useEffect, useMemo, useState } from "react";
import { useGetOnlineOrderQuery } from "@/store/features/order/onlineOrderApi";
import { useAppSelector } from "@/store/hook";

const AllOrderReportDetails = () => {
  const { data: allOrder } = useOnlineOrdersQuery("");

  const { data: returned } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Returned"
  );
  const { data: delivered } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Delivered"
  );

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
    <div className=" h-full md:h-[480px] flex items-center justify-between flex-col gap-2">
      {/* Delevered */}
      <OrderReportDetail
        orderReportCardMainClass="hover:border-[#03A609] h-[23%]"
        icon={Delivered}
        imageClassName="rounded-full bg-green-100 p-3 w-full text-red-100"
        orderReportTitle="Delivered"
        firstCircleClassName="text-green-100"
        secondCircleClassName="text-green-500"
        status="Delivered"
        // percentage={30}
        initialProgress={parseFloat(
          calculateStatusPercentage(
            delivered?.data,
            allOrder?.meta?.total
          ).toFixed(0)
        )}
      />
      {/* Shipping */}
      <OrderReportDetail
        status="Shipping"
        orderReportCardMainClass="hover:border-fuchsia-600 h-[23%]"
        icon={Shipping}
        imageClassName="rounded-full bg-main-bg-color-opacity-32 p-3 w-full"
        orderReportTitle="Shipping"
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
        orderReportCardMainClass="hover:border-red-500 h-[23%]"
        icon={Returned}
        imageClassName="rounded-full bg-[#ff75001a] p-3 w-full"
        orderReportTitle="Returned"
        status="Returned"
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
        status="Canceled"
        orderReportCardMainClass="hover:border-black h-[24.6%] md:h-[23%]"
        icon={Canceled}
        imageClassName="rounded-full bg-[#0000001a] p-3 w-full"
        orderReportTitle="Canceled"
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
