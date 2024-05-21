"use client";
import ShopSetupCommonSubmitBTN from "@/components/ShopSetup/ShopSetupCommonSubmitBTN";
import CustomToggle from "@/components/shared/CustomToggle";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GenaralSettings = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/shop-setup/delivery-fee");
  }, [router]);

  return null;
};

export default GenaralSettings;
