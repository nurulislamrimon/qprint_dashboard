import React from "react";

const OrderCancelReason = ({ allOrder, quickOrder }: any) => {
  const lastOrderStatus =
    allOrder?.data.orderStatus[allOrder?.data?.orderStatus.length - 1].status;
  const quickOrderLastOrderStatus =
    quickOrder?.data.orderStatus[quickOrder?.data?.orderStatus.length - 1]
      .status;

  return (
    <div>
      <article className="space-y-5 [&>h3]:text-red-color [&>h3]:font-bold [&>h3]:[font-size:clamp(14px,3vw,18px)] [&>h4]:text-black-opacity-70 [&>h4]:border-b [&>h4]:pb-2.5 [&>h5]:[font-size:clamp(14px,3vw,18px)] [&>h5]:font-bold [&>h6]:[font-size:clamp(10px,3vw,14px)] [&>h6]:text-black-opacity-70">
        <h3>
          {lastOrderStatus ? lastOrderStatus : ""}{" "}
          {quickOrderLastOrderStatus ? quickOrderLastOrderStatus : ""} Reason
        </h3>
        {(allOrder || quickOrder)?.data?.orderStatus.some(
          (order: any) => order.status === "Rejected"
        ) ? null : (
          <h4> Change my Location</h4>
        )}

        <h5>Comment</h5>
        <h6 className="mt-2">
          {" "}
          {allOrder?.data?.reasonOfCancellation
            ? allOrder?.data?.reasonOfCancellation
            : allOrder?.data?.reasonOfRejection
            ? allOrder?.data?.reasonOfRejection
            : quickOrder?.data?.reasonOfRejection
            ? quickOrder?.data?.reasonOfRejection
            : quickOrder?.data?.reasonOfCancellation &&
              quickOrder?.data?.reasonOfCancellation}
        </h6>
      </article>
    </div>
  );
};

export default OrderCancelReason;
<h1>this is cancel reson page</h1>;
