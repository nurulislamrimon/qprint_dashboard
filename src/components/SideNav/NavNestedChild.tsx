import { IMenuItem } from "@/interfaces/menu-interface";
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
                  {item?.notify}
                </div>
              )}
            </div>
          </Link>
        ))}
    </ul>
  );
};

export default NavNestedChild;
