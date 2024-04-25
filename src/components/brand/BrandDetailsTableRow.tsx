import Edit from "@/assets/assetsSVG/Edit";
import CustomToggle from "../shared/CustomToggle";
import Trash from "@/assets/assetsSVG/Trash";
import Image from "next/image";
import productImage from "@/assets/brother_printer.jpg";

const BrandDetailsTableRow = ({ data }: any) => {
  return (
    <>
      <td className="md:table-cell hidden text-black-opacity-50 text-lg px-2">
        {data?._id}
      </td>
      <td className="md:w-[500px]">
        <div className="md:flex items-center gap-3.5 ">
          <div className="md:w-[60px] md:h-[60px] w-[38px] h-[38px]">
            <Image src={productImage} alt="product-image" className="w-full" />
          </div>
          <div className="md:flex flex-col  hidden">
            <span className="text-black-opacity-80 text-base line-clamp-1">
              {data?.product_name}
            </span>
            <span className="text-black-opacity-50 text-sm">
              {data?.brand_name}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-start">
          <CustomToggle dynamicId={data?._id} />
        </div>
      </td>
      <td>
        <div
          className={` md:w-16 w-12 md:text-lg text-sm text-center font-medium md:px-5 px-3 md:py-1.5 py-0.5 rounded-custom-5px   ${data?.product_stock === 0
            ? "bg-main-bg-color-opacity-32 text-fuchsia-800"
            : "bg-green-opacity-10 text-green-color"
            }`}
        >
          {data?.product_stock}
        </div>
      </td>
      <td className="main-text-color font-medium text-sm md:text-lg">
        {data?.product_price} <span className="text-sm font-semibold">QR</span>
      </td>
      <td>
        <div className="flex items-center justify-center md:gap-3.5 gap-2.5">
          <button>
            <Edit />
          </button>
          <button>
            <Trash />
          </button>
        </div>
      </td>
    </>
  );
};

export default BrandDetailsTableRow;
