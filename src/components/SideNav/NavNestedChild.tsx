import { IMenuItem } from "@/interfaces/menu-interface";
import { useGetAllOrderCountQuery } from "@/store/features/dashboard/orderCount/orderCountApi";
import { useOflineSalesQuery } from "@/store/features/order/offlineOrderApi";
import { useProductsQuery } from "@/store/features/product/productApi";
import { useGetAllQuickOrderQuery } from "@/store/features/quickOrder/quickOrderApi";
import {
  IconBoxSeam,
  IconBrandSafari,
  IconChevronDown,
  IconChevronUp,
  IconDiscount,
  IconPrinter,
  IconShoppingBag,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const NavNestedChild = ({
  menuItem,
  pathName,
}: {
  menuItem: IMenuItem;
  pathName: string;
}) => {
  const [isExpanded, setExpanded] = useState(false);

  const { data: delivered } = useGetAllOrderCountQuery(
    "orderStatus.status=Delivered"
  );
  const { data: packaging } = useGetAllOrderCountQuery(
    "orderStatus.status=Packaging"
  );
  const { data: shipping } = useGetAllOrderCountQuery(
    "orderStatus.status=Shipping"
  );
  const { data: orderPlaced } = useGetAllOrderCountQuery(
    "orderStatus.status=Order placed"
  );
  const { data: pending } = useGetAllOrderCountQuery(
    "orderStatus.status=Pending"
  );
  const { data: returned } = useGetAllOrderCountQuery(
    "orderStatus.status=Returned"
  );
  const { data: rejected } = useGetAllOrderCountQuery(
    "orderStatus.status=Rejected"
  );
  const { data: cancelled } = useGetAllOrderCountQuery(
    "orderStatus.status=Cancelled"
  );
  const { data: allOrder } = useGetAllOrderCountQuery("");
  const { data: posSales } = useOflineSalesQuery("");
  const { data: allProducts } = useProductsQuery("");
  const { data: quickOrder } = useGetAllQuickOrderQuery("");

  // handle Notify Function
  const handleNotify = (label: string) => {
    switch (label) {
      case "Delivered":
        return delivered?.data ?? 0;
      case "All Order":
        return allOrder?.data ?? 0;
      case "Packaging":
        return packaging?.data ?? 0;
      case "Shipping":
        return shipping?.data ?? 0;
      case "Order placed":
        return orderPlaced?.data ?? 0;
      case "Pending":
        return pending?.data ?? 0;
      case "Returned":
        return returned?.data ?? 0;
      case "Rejected":
        return rejected?.data ?? 0;
      case "Cancelled":
        return cancelled?.data ?? 0;
      case "Sales":
        return posSales?.meta?.total ?? 0;
      case "All Products":
        return allProducts?.meta?.total ?? 0;
      case "Quick Order":
        return quickOrder?.meta?.total ?? 0;
      default:
        return null;
    }
  };
  return (
    <ul className="flex flex-col ">
      <Link
        href="#"
        className={`flex items-center justify-between transition-all py-2  rounded group px-3 ${
          isExpanded && "bg-sideNav-bg-opacity-20 "
        } ${
          pathName.includes(menuItem.link) &&
          "border-r-[3px] border-[#7F35CD] text-fuchsia-700 bg-sideNav-bg-opacity-20 "
        }`}
        onClick={() => setExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-start gap-2">
          <div className="">
            {menuItem.label === "POS" ? (
              <IconBrandSafari className="h-5 w-5" />
            ) : menuItem.label === "Printing" ? (
              <IconPrinter className="h-5 w-5" />
            ) : menuItem.label === "Order" ? (
              <IconShoppingBag className="h-5 w-5" />
            ) : menuItem.label === "Products" ? (
              <IconBoxSeam className="h-5 w-5" />
            ) : menuItem.label === "Promotion" ? (
              <IconDiscount className="h-5 w-5" />
            ) : (
              ""
            )}
          </div>{" "}
          {menuItem.label}
        </div>{" "}
        {isExpanded ? (
          <IconChevronUp className="h-5 w-5" />
        ) : (
          <IconChevronDown className="h-5 w-5" />
        )}
      </Link>
      {/* children */}
      {isExpanded &&
        menuItem.children?.map((item) => (
          <Link
            href={menuItem.link + item.link}
            key={item.label}
            className={`px-4 pt-2  group`}
          >
            <div className="flex items-center justify-between  ">
              <div
                className={`flex items-center justify-start gap-2 text-sm  group  ${
                  pathName === menuItem.link + item.link && "text-fuchsia-700  "
                } `}
              >
                <div
                  className={`h-[10px] w-[10px] rounded-full bg-gray-200 group-hover:bg-main-bg-color     ${
                    pathName === menuItem.link + item.link &&
                    "bg-main-bg-color-hover  "
                  }`}
                ></div>{" "}
                {item.label}
              </div>
              {item?.notify && (
                <div
                  className={`p-2 rounded-full text-green-500  bg-green-100  h-6 w-6  flex items-center justify-center text-[12px] `}
                >
                  {handleNotify(item.label)}
                </div>
              )}
            </div>
          </Link>
        ))}
    </ul>
  );
};

export default NavNestedChild;
