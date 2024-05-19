"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavNestedChild from "./NavNestedChild";
import Image from "next/image";
import logo from "@/assets/logo.png";
import {
  IconGauge,
  IconChartAreaLine,
  IconBrandMercedes,
  IconPackages,
  IconUsers,
  IconStar,
  IconSettingsShare,
  IconUser,
  IconPrinter,
} from "@tabler/icons-react";
import { menuItems } from "@/constants/menuItem.constants";

const SideNav = () => {
  const pathName = usePathname();

  return (
    <div className="bg-white w-[250px]  overflow-x-hidden z-50 md:shadow-none shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
      {/* logo */}
      <div className="flex items-center justify-center gap-5 py-7   ">
        <Link href="/">
          <div className="[width:clamp(110px,4vw,90px)] ">
            <Image src={logo} alt="logo" priority={true} />
          </div>
        </Link>
        <p className="px-4 py-2 bg-main-bg-color-opacity-32 rounded-3xl text-sm text-fuchsia-800">
          Panel
        </p>
      </div>
      <ul className="h-[calc(100vh-98px)]  overflow-y-auto  flex flex-col [&>a]:px-3 [&>*]:py-2  [&>*]:mt-2 [&>*]:mb-0 text-black-opacity-60 px-4">
        {menuItems?.map((menuItem, i) =>
          menuItem.children ? (
            <NavNestedChild menuItem={menuItem} pathName={pathName} key={i} />
          ) : (
            <Link
              href={menuItem.link}
              key={menuItem.label}
              className={` flex items-center gap-2 w-full ${
                pathName === menuItem.link &&
                "bg-main-bg-color-opacity-32  border-r-[3px] border-[#7F35CD] text-fuchsia-700 rounded-md "
              }`}
            >
              <div>
                <div>
                  {menuItem?.label === "Dashboard" ? (
                    <IconGauge className="h-5 w-5" />
                  ) : menuItem.label === "Analytics" ? (
                    <IconChartAreaLine className="h-5 w-5" />
                  ) : menuItem.label === "Brand" ? (
                    <IconBrandMercedes className="h-5 w-5" />
                  ) : menuItem.label === "Category" ? (
                    <IconPackages className="h-5 w-5" />
                  ) : menuItem.label === "Customers" ? (
                    <IconUsers className="h-5 w-5" />
                  ) : menuItem.label === "Review" ? (
                    <IconStar className="h-5 w-5" />
                  ) : menuItem.label === "Shop Setup" ? (
                    <IconSettingsShare className="h-5 w-5" />
                  ) : menuItem.label === "Users" ? (
                    <IconUser className="h-5 w-5" />
                  ) : menuItem.label === "Printing Requests" ? (
                    <IconPrinter className="h-5 w-5" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {menuItem.label}
            </Link>
          )
        )}
      </ul>
    </div>
  );
};

export default SideNav;
