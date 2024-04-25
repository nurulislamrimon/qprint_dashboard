import OrderDrawerInformation from "./OrderDrawerInformation";
import GlobalActionButton from "../../GlobalActionButton";

const OrderStatusUpdate = ({
  data,
  setOpenShippingModal,
  setRejectConfirmationModal,
}: any) => {
  const lastOrderStatus =
    data?.data?.orderStatus[data?.data?.orderStatus.length - 1];

  return (
    <div className="p-5 flex items-center justify-between print:flex print:items-center print:justify-center print:text-center">
      <OrderDrawerInformation data={data} />
      <div className="flex items-center gap-3.5 print:hidden">
        {lastOrderStatus?.status === "Rejected" ||
          (lastOrderStatus?.status === "Returned" ||
          lastOrderStatus?.status === "Cancelled" ? (
            ""
          ) : (
            <button onClick={() => setRejectConfirmationModal(true)}>
              {lastOrderStatus?.status === "Order placed"
                ? "Reject"
                : lastOrderStatus?.status === "Packaging"
                ? "Reject"
                : lastOrderStatus?.status === "Shipping"
                ? "Return"
                : lastOrderStatus?.status === "Delivered"
                ? "Return"
                : ""}
            </button>
          ))}

        {lastOrderStatus?.status === "Rejected" ||
        lastOrderStatus?.status === "Returned" ||
        lastOrderStatus?.status === "Cancelled" ? (
          ""
        ) : lastOrderStatus?.status === "Delivered" ? (
          <p>Completed</p>
        ) : (
          <div onClick={() => setOpenShippingModal(true)}>
            <GlobalActionButton
              type="submit"
              buttonText={
                lastOrderStatus?.status === "Order placed"
                  ? "Packaging"
                  : lastOrderStatus?.status === "Packaging"
                  ? "Shipping"
                  : lastOrderStatus?.status === "Shipping"
                  ? "Delivered"
                  : ""
              }
              buttonStyleClassName={`px-[18px] py-2`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusUpdate;
