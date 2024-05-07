"use client";
import type { Metadata } from "next";
import SideNav from "@/components/SideNav/SideNav";
import { isLoggedIn } from "@/services/auth.service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/store/features/auth/authApi";
const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { data } = useGetMeQuery("");

  const router = useRouter();
  const isUserLoggedIn = isLoggedIn();
  console.log("user:::::::", data);

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
    }
  }, [router, isUserLoggedIn, data]);

  return (
    <div className="flex lg:gap-1 gap-0">
      {/* ==SideBar Nav== */}
      <div className=" lg:block hidden ">
        <SideNav />
      </div>
      {/* ==Main Content== */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default MainLayout;
