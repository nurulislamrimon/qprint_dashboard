"use client";
import CustomerInformationLayout from "@/components/customers/CustomerInformationLayout";
import CustomerTableLayout from "@/components/customers/CustomerTableLayout";
import { useCustomerQuery } from "@/store/features/customer/customerApi";
import { useGetAllOnlineOrdersByBuyerUserIdQuery } from "@/store/features/order/ordersApi";
import { getDateFormat } from "@/utils/getDateFormat";
import { IconCalendarMonth } from "@tabler/icons-react";


const Customer = ({ params }: { params: { id: string } }) => {
  const { data } = useCustomerQuery(params.id);
  const { data: orders, isLoading } = useGetAllOnlineOrdersByBuyerUserIdQuery(data?.data?._id);

  return (
    <div className="p-5 md:p-[30px] bg-white md:h-[calc(100vh-90px)] overflow-y-auto">
      <h3 className="text-lg md:text-2xl font-medium">Customer ID #{data?.data?._id}</h3>
      <div className="flex items-center gap-2 my-5">
        <span className="text-black-opacity-70">
          <IconCalendarMonth width={20} height={20} color="#797979" />
        </span>
        <p className="text-base text-black-opacity-70">
          Joined at : {getDateFormat(data?.data?.createdAt)}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-5 grid-cols-1">
        <div className="md:col-span-2 md:order-none order-2">
          <CustomerTableLayout data={orders} isLoading={isLoading} />
        </div>

        <div className="md:order-none order-1 shrink-0 md:col-span-1 sticky top-0">
          <CustomerInformationLayout data={data?.data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Customer;
