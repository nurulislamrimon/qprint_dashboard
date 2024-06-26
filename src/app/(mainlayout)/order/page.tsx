import AllOrderTable from "@/components/orders/AllOrderTable";

const OrderPage = () => {
  return (
    <div className="space-y-1">
      <div className="space-y-7 py-5 bg-white h-[calc(100vh-90px)] overflow-y-auto">
        <AllOrderTable />
      </div>
    </div>
  );
};

export default OrderPage;
