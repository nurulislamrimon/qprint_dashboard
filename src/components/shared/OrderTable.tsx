import { IconInfoCircle } from "@tabler/icons-react";

const OrderTable = ({data}: any) => {

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-black-opacity-60 md:text-lg text-base">
        Order Item
      </span>
      <table className="w-full">
        <thead>
          <tr>
            {["Paper Size", "Paper Type", "Printing Mode", "Total Price"].map(
              (head: string, i: number) => (
                <th
                  key={i}
                  className="font-normal text-black-opacity-50 text-base border py-2.5"
                >
                  {head}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          <tr>  
                <td className={`py-[18px] text-center border text-black-opacity-80 text-sm`}>
                  {data?.data?.paperSize?.height} x {data?.data?.paperSize?.width} {" "} {data?.data?.unit}
                </td>
                <td className={`py-[18px] text-center border text-black-opacity-80 text-sm`}>
                  {data?.data?.paperType}
                </td>
              
                <td className={`py-[18px] text-center border text-black-opacity-80 text-sm`}>
                  {data?.data?.printingColorMode}
                </td>
                <td className={`py-[18px] font-semibold text-center border main-text-color text-sm`}>
                  {data?.data?.totalPrice}{" "}QR
                </td>
          </tr>
        </tbody>
      </table>
      <div className="flex items-center gap-2.5">
        <IconInfoCircle stroke={1} width={20} height={20} />
        <span className="text-black-opacity-50 text-base">
          Call buyer to confirm the order and prices
        </span>
      </div>
    </div>
  );
};

export default OrderTable;
