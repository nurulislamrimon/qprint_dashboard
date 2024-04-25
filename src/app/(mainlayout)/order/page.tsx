import AllOrderTable from "@/components/orders/AllOrderTable";
import OrderDetails from "@/components/shared/order-details/OrderDetails";

const OrderPage = () => {
  return (
    <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
      <AllOrderTable />
    </div>
  );
};

export default OrderPage;