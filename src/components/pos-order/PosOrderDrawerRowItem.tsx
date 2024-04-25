import Image from "next/image";
import { mainUrl } from "@/constants/mainUrl";

const PosOrderDrawerRowItem = ({ data }: any) => {
  return (
    <>
      <td className="border md:w-60 p-1">
        <div className="flex  gap-2.5">
          <div className="w-10 print:hidden">
            <Image
              src={`${mainUrl}${data?.productPhotos[0]}`}
              alt="product-img"
              className="w-full"
              width={70}
              height={50}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-black-opacity-80 line-clamp-2">
              {data?.productName}
            </span>
            <span className="text-fuchsia-600 text-sm">
              {data?.brand?.brandName}
            </span>
          </div>
        </div>
      </td>
      <td className="border text-center">
        {data?.variant?.discountedPrice
          ? data?.variant?.discountedPrice
          : data?.variant?.sellingPrice}{" "}
        QR
      </td>
      <td className="border text-center">
        {data?.variant.discountPercentage}%
      </td>
      <td className="border text-center">{data?.orderQuantity}</td>
      <td className="border text-center text-fuchsia-600 font-medium ">
        {data?.subTotalPayable} QR
      </td>
    </>
  );
};

export default PosOrderDrawerRowItem;
