import React from "react";

const OrderTableThead = ({
  orderTableThead,
}: {
  orderTableThead: { [key: string]: string | number };
}) => {
  const {
    sl,
    orderId,
    OrderTime,
    customerName,
    method,
    amount,
    name,
    status,
    action,
    invoice,
    page,
  } = orderTableThead;
  return (
    <>
      {page ? null : (
        <th
          scope="col"
          className="text-left pl-5 py-5 font-normal hidden md:table-cell w-[50px]"
        >
          {sl}
        </th>
      )}
      <th
        scope="col"
        className="text-left  pl-10 py-5 font-normal hidden md:table-cell"
      >
        {orderId}
      </th>
      <th scope="col" className="px-6 py-5 font-normal hidden md:table-cell">
        {OrderTime}
      </th>
      <th
        scope="col"
        className="flex items-center gap-1 px-6 py-5 font-normal [font-size:clamp(14px,4vw,16px)]"
      >
        <span className="hidden md:table-cell"> {customerName}</span> {name}
      </th>
      <th
        scope="col"
        className="px-6 py-5 font-normal hidden md:table-cell text-center"
      >
        {method}
      </th>
      <th scope="col" className="pl-5 py-5 font-normal">
        {amount}
      </th>
      <th
        scope="col"
        className="px-6 py-5 font-normal [font-size:clamp(14px,4vw,16px)]"
      >
        {status}
      </th>
      <th
        scope="col"
        className="px-6 py-5 font-normal [font-size:clamp(14px,4vw,16px)]"
      >
        {action}
      </th>
      <th
        scope="col"
        className="text-center pl-4  py-3 font-normal hidden md:table-cell  "
      >
        {invoice}
      </th>
    </>
  );
};

export default OrderTableThead;
