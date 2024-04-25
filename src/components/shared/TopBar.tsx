"use client";

import React, { useEffect, useState } from "react";
import {
  IconChevronDown,
  IconSearch,
  IconMenu2,
  IconArrowLeft,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import Image from "next/image";
import userPlaceholder from "@/assets/personPlaceholder.png";
import SideNav from "../SideNav/SideNav";
import Link from "next/link";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authkey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { mainUrl } from "@/constants/mainUrl";
import { useGetMeQuery } from "@/store/features/auth/authApi";

interface TopBarProps {
  title: string;
}

type userInfo = {
  role: string;
  fullname: string;
};

const TopBar = ({ title }: TopBarProps) => {
  const { data, isLoading } = useGetMeQuery("");
  const router = useRouter();

  const logout = () => {
    removeUserInfo(authkey);
    router.push("/login");
  };

  const [showSideNav, setShowSideNav] = useState(false);
  const [toggleChevronDown, setToggleChevronDown] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  // ==This funciton added by Poran==
  const handleChevronDown = () => {
    setToggleChevronDown((prevState) => !prevState);
  };

  return (
    <div className="print:hidden h-auto md:h-20  w-full px-5 md:px-7 bg-white grid grid-cols-2 md:grid-cols-3 items-center pb-7 md:pb-0">
      {/* Title and button */}
      <div className="gap-2 relative order-1 md:order-none  w-full flex items-center">
        <button className="block lg:hidden" onClick={toggleSideNav}>
          <IconMenu2 width={20} height={20} />
          {""}
        </button>

        {showSideNav ? (
          <div className="fixed top-0 left-0 block lg:hidden">
            <div className="">
              <SideNav />
            </div>
            <div className="mt-2 px-2 max-w-fit fixed top-0 left-[210px]">
              <button onClick={toggleSideNav}>
                <IconArrowLeft />
                {""}
              </button>
            </div>
          </div>
        ) : (
          <h4 className="text-lg text-black-opacity-70 md:text-xl font-medium">
            {title}
          </h4>
        )}
      </div>
      {/* SearchBar */}
      <div className="flex items-center gap-1.5 w-full border rounded-full md:rounded-lg p-2.5 order-3 md:order-none col-span-2 md:col-auto mt-5 md:mt-0">
        <span className="text-black-opacity-60">
          <IconSearch width={20} height={20} />
        </span>
        <input
          type="search"
          placeholder="Search"
          className="bg-transparent outline-none w-full"
        />
      </div>
      {/* User profile */}
      <div className="flex justify-end     order-2 md:order-none">
        <div
          onClick={handleChevronDown}
          className="flex items-center md:gap-2.5 border rounded-md  border-transparent md:hover:border-gray-200 md:focus:border-gray-200 md:active:border-gray-200 cursor-pointer md:px-4 py-2"
        >
          <div className="md:w-[40px] md:h-[40px] w-[30px] h-[30px] shrink-0 relative">
            {isLoading ? (
              <div className="w-full h-full top-0 left-0 object-cover rounded-full animate-pulse absolute bg-gray-200 "></div>
            ) : (
              <div className="w-full h-full top-0 left-0 object-cover rounded-full absolute">
                <Image
                  src={
                    data?.data?.profilePhoto
                      ? `${mainUrl}${data?.data?.profilePhoto}`
                      : userPlaceholder
                  }
                  alt="profile"
                  fill
                  sizes="200px"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-base hidden md:block">
              {isLoading ? (
                <div className="animate-pulse w-24 h-2 bg-gray-200 rounded-full"></div>
              ) : (
                data?.data?.fullName
              )}
            </h5>
            <span className="text-sm text-black-opacity-50 hidden md:block">
              {isLoading ? (
                <div className="animate-pulse w-16 h-2 bg-gray-200 rounded-full"></div>
              ) : (
                data?.data?.role
              )}
            </span>
          </div>
          <div className="relative">
            <span className="cursor-pointer">
              <IconChevronDown stroke={1} />
            </span>
            {toggleChevronDown && (
              <div className="group absolute -right-4 top-11 bg-white shadow-product-card-shadow w-[130px] flex flex-col gap-4 items-start justify-center  p-4 rounded-md">
                <div className="group/first">
                  <Link
                    className="flex items-center gap-2 text-base shrink-0 text-black-opacity-70 group-hover/first:font-bold"
                    href={"/setting"}
                  >
                    <span className="">
                      <IconSettings
                        stroke={1}
                        width={18}
                        height={18}
                        className="group-hover/first:stroke-2 "
                      />
                    </span>
                    Setting
                  </Link>
                </div>
                <div className="group/second">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 text-base shrink-0 text-black-opacity-70 group-hover/second:font-bold"
                  >
                    <span>
                      <IconLogout
                        stroke={1}
                        width={18}
                        height={18}
                        className="group-hover/second:stroke-2 "
                      />
                    </span>
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
