"use client";
import { shopSetupPageNavigationLink } from "@/constants/shopsetup.constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ShopSetupNavigationBarProps {
  link?: string;
  label?: string;
  href: string | undefined;
  id: string;
}

const ShopSetupNavigationBar = () => {
  const activeRoute = usePathname();

  return (
    <div className="flex items-center gap-5 ml-2 md:ml-8 overflow-x-auto">
      {shopSetupPageNavigationLink.map(
        ({ link, label, href, id }: ShopSetupNavigationBarProps) => (
          <div key={id} className="py-2.5 mt-5">
            <Link
              href={`/shop-setup${href}`}
              className={`pb-2.5 w-full shrink-0 overflow-scroll whitespace-nowrap ${
                activeRoute === `/shop-setup${href}`
                  ? "border-b main-text-color border-fuchsia-700"
                  : "text-gray-500"
              }`}
            >
              {label}
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default ShopSetupNavigationBar;
