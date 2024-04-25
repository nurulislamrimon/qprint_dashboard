import { getDateFormat } from "@/utils/getDateFormat";
import { IconEye, IconPrinter } from "@tabler/icons-react";
import React from "react";

const OrderInformation = ({ data }: any) => {
  // console.log(data);
  return (
    <div className="flex md:gap-7 ">
      <div className="flex flex-col items-start gap-2.5">
        <span className="md:text-2xl text-lg text-black-opacity-80 font-medium">
          Order Status
        </span>
        <span className="text-sm text-black-opacity-80 font-medium">
          Order Id : {data?.data?.orderId}
        </span>
        <span className="text-sm text-black-opacity-50">
          {getDateFormat(data?.data?.createdAt)}
        </span>
      </div>
      <div>
        <div className="flex items-center gap-2.5">
          <button className="border rounded-full p-2">
            <IconEye
              stroke={1}
              width={20}
              height={20}
              className="text-fuchsia-800"
            />
          </button>
          <button className="border rounded-full p-2">
            <IconPrinter
              stroke={1}
              width={20}
              height={20}
              className="text-fuchsia-800"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
