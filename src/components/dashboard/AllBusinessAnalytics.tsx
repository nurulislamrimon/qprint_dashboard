"use client";
import React from "react";
import { useGetbusinessAnalyticsQuery } from "@/store/features/businessAnalytics/businessAnalyticsApi";
import BusinessAnalytics from "../shared/dashboard/BusinessAnalytics";
import onShippingIcon from "@/assets/Shipping.svg";
import confirmedOrder from "@/assets/confirmedOrder.svg";
import pandingOrderIcon from "@/assets/paddingOrderIcon.svg";
import Packaging from "@/assets/packagingIcon.svg";
import Link from "next/link";

const AllBusinessAnalytics = () => {
  const { data: orderPlaced } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Order placed"
  );
  const { data: delivered } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Delivered"
  );

  const { data: shipping } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Shipping"
  );
  const { data: packaging } = useGetbusinessAnalyticsQuery(
    "orderStatus.status=Packaging"
  );
  return (
    <div className="mx-auto w-full space-y-5">
      {/* ---------card status----------- */}
      <h2 className="text-xl text-black font-semibold">Business Analytics</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Order Placed */}
        <Link href={`/order/order-placed`}>
          <BusinessAnalytics
            icon={pandingOrderIcon}
            businessAnalyticsCardClass="hover:border-arctic-color"
            businessAnalyticsIconBg="bg-[#1ad5ca1a]"
            statusName={"Order Placed"}
            altName={"Order Placed"}
            itemQuantity={orderPlaced?.data}
          />
        </Link>
        {/* Packaging */}
        <Link href={`/order/packaging`}>
          <BusinessAnalytics
            icon={Packaging}
            businessAnalyticsCardClass="hover:border-violet-color"
            businessAnalyticsIconBg="bg-[#7758b51a]"
            statusName={"Packaging"}
            altName={"Packaging"}
            itemQuantity={packaging?.data}
          />
        </Link>
        {/* On shipping */}
        <Link href={`/order/shipping`}>
          <BusinessAnalytics
            icon={onShippingIcon}
            altName="On shipping"
            businessAnalyticsCardClass="hover:border-red-color"
            businessAnalyticsIconBg="bg-[#e73c171a]"
            statusName={"On shipping"}
            itemQuantity={shipping?.data}
          />
        </Link>
        {/* Confirmed Order*/}
        <Link href={`/order/delivered`}>
          <BusinessAnalytics
            icon={confirmedOrder}
            altName="Confirmed Order"
            businessAnalyticsCardClass="hover:border-arctic-color"
            businessAnalyticsIconBg="bg-[#0d97551a]"
            statusName={"Confirmed Order"}
            itemQuantity={delivered?.data}
          />
        </Link>
      </div>
    </div>
  );
};

export default AllBusinessAnalytics;
