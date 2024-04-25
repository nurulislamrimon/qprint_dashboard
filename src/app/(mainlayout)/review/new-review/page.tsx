"use client";
import ProductEmptyState from "@/components/pos/ProductEmptyState";
import ReviewTableHeader from "@/components/review/ReviewTableHeader";
import TableBodyCard from "@/components/review/TableBodyCard";
import ReviewTableSkeleton from "@/components/shared/skeleton/ReviewTableSkeleton";
import { useReviewWithoutReplyQuery } from "@/store/features/review/reviewApi";
import React from "react";

const NewReview = () => {
  const { data, isLoading, isError } = useReviewWithoutReplyQuery();
  return (
    data?.data?.length === 0 ? (
      <div className="h-[calc(100vh-130px)] flex items-center justify-center">
        <ProductEmptyState message={`No Review Available.`} />
      </div>
    ) :
      (<div>
        <div>
          <ReviewTableHeader />
        </div>
        <div className="h-[calc(100vh-130px)] overflow-y-auto bg-white">
          {
            isLoading ? (
              [...Array(10)].map((_, index) => {
                return (
                  <ReviewTableSkeleton key={index} />
                )
              })
            ) :

              data?.data?.map((data: any, index: number) => (
                <TableBodyCard data={data} key={index} />
              ))}
        </div>
      </div>)
  );
};

export default NewReview;
