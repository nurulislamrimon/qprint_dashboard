import React from "react";
import { IconX } from "@tabler/icons-react";
import Image from "next/image";
import { mainUrl } from "@/constants/mainUrl";
import { useAppDispatch } from "@/store/hook";
import { removeFromBestDeals } from "@/store/features/bestDeals/bestDealsSlice";

const ProductSmallCard = ({ data }: any) => {
  const dispatch = useAppDispatch();
  return (
    <div className="border rounded-lg flex items-center justify-center px-5 gap-2  ">
      <div className="w-12 h-12">
        <Image
          src={`${mainUrl}${data?.productPhoto}`}
          alt="Product image"
          height={50}
          width={50}
        />
      </div>{" "}
      <h3 className="truncate w-20">{data?.productName}</h3>
      <p onClick={() => dispatch(removeFromBestDeals(data))}>
        <IconX />
      </p>
    </div>
  );
};

export default ProductSmallCard;
