"use client";
import { IconEye } from "@tabler/icons-react";
import { useRouter } from "next/navigation";


const SingleCustomerViewPageLayout = ({ data, index }: any) => {
  const router = useRouter();
  return (
    <>
      <td className="text-sm text-black-opacity-80 md:text-base py-5 px-2">
        {index + 1}
      </td>

      <td className="text-sm text-black-opacity-80 md:text-base">
        {data?.orderId}
      </td>

      <td className="text-sm main-text-color md:text-base">
        {data?.totalPayable} QAR
      </td>

      <td className="md:table-cell hidden">
        <span
          className={`${data?.orderStatus?.status === "Order placed"
            ? "text-blue-color bg-blue-opacity-10"
            : data?.orderStatus?.status === "Shipping"
              ? "text-yellow-color bg-yellow-opacity-10"
              : data?.orderStatus?.status === "Delivered"
                ? "text-green-color bg-green-opacity-10"
                : data?.orderStatus?.status === "Packaging"
                  ? "text-black-opacity-70  bg-gray-opacity-10 "
                  : data?.orderStatus?.status === "Rejected"
                    ? "text-red-color bg-red-opacity-10"
                    : ""
            } md:text-sm text-custom-10px whitespace-nowrap  py-1.5 md:px-4 px-1 rounded-full`}
        >
          {data?.orderStatus?.status}
        </span>
      </td>

      <td>
        <div className="flex items-center justify-center  gap-4">
          <button className="px-2 py-1 rounded-md border border-main-border-color main-text-color" onClick={() => router.push(`/order/${data?._id}`)}>
            <IconEye stroke={1} width={16} height={16} color="#C83B62" />
          </button>

        </div>
      </td>

    </>
  );
};

export default SingleCustomerViewPageLayout;
