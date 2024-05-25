"use client";
import { useOnlineSalesQuery } from "@/store/features/order/onlineOrderApi";
import OrderTableCalculation from "@/components/shared/order-table/order-table-details/OrderTableCalculation";
import OrderTableDetails from "@/components/shared/order-table/order-table-details/OrderTableDetails";
import OrderCustomerInformation from "@/components/shared/order-table/order-table-details/OrderCustomerInformation";
import OrderTableInformation from "@/components/shared/order-table/order-table-details/OrderTableInformation";
import OrderTableAndShippingInfo from "@/components/shared/order-table/order-table-details/OrderTableAndShippingInfo";
import OrderDeliveredAddress from "@/components/shared/order-table/order-table-details/OrderDeliveredAddress";
import { useQuickOrderQuery } from "@/store/features/quickOrder/quickOrderApi";
import OrderCancelReason from "@/components/shared/order-table/order-table-details/OrderCancelReason";

const OrderDetails = ({ params }: { params: { id: string } }) => {
  const { data: allOrder } = useOnlineSalesQuery(params.id);
  const { data: quickOrder } = useQuickOrderQuery(params.id);

  const combinedData = allOrder?.data
    ? allOrder
    : quickOrder?.data && quickOrder;

  const isCancelled = combinedData?.data?.orderStatus.some(
    (status: any) =>
      status.status === "Cancelled" || status.status === "Rejected"
  );
  return (
    <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-1 h-[calc(100vh-85px)] overflow-y-auto print:relative">
      {/* order details */}
      <div className="bg-white md:px-5 md:py-5 px-5 py-custom-15px col-span-2">
        {/* render order details here */}
        <OrderTableInformation allOrder={allOrder} quickOrder={quickOrder} />
        <div className="flex flex-col gap-5 mt-5">
          <span>Order Item</span>
          <OrderTableDetails allOrder={allOrder} quickOrder={quickOrder} />
          <div className="flex items-center md:justify-end">
            <OrderTableCalculation
              allOrder={allOrder}
              quickOrder={quickOrder}
            />
          </div>
        </div>
      </div>
      {/* customer informations */}
      <div className="flex flex-col gap-1 h-full ">
        {isCancelled ? null : (
          <div className="bg-white md:px-5 md:py-5 px-5 py-custom-15px print:hidden">
            <OrderTableAndShippingInfo
              allOrder={allOrder}
              quickOrder={quickOrder}
            />
          </div>
        )}
        {allOrder?.data?.orderStatus.map(
          (orderStatus: any, index: number) =>
            (orderStatus.status === "Cancelled" ||
              orderStatus.status === "Rejected") && (
              <div
                key={index}
                className="bg-white md:px-5 md:py-5 px-5 py-custom-15px print:absolute print:top-36"
              >
                <OrderCancelReason
                  allOrder={allOrder}
                  quickOrder={quickOrder}
                />
              </div>
            )
        )}
        {quickOrder?.data?.orderStatus.map(
          (orderStatus: any, index: number) =>
            (orderStatus.status === "Cancelled" ||
              orderStatus.status === "Rejected") && (
              <div
                key={index}
                className="bg-white md:px-5 md:py-5 px-5 py-custom-15px print:absolute print:top-36"
              >
                <OrderCancelReason
                  allOrder={allOrder}
                  quickOrder={quickOrder}
                />
              </div>
            )
        )}
        <div className="bg-white md:px-5 md:py-5 px-5 py-custom-15px print:absolute print:top-36">
          <OrderCustomerInformation
            allOrder={allOrder}
            quickOrder={quickOrder}
          />
        </div>
        <div className="bg-white md:px-5 md:py-5 px-5 py-custom-15px h-full print:hidden">
          <OrderDeliveredAddress allOrder={allOrder} quickOrder={quickOrder} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
