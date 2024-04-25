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

  return (
    <div className="flex items-center justify-center h-[calc(100vh-155px)]">
      <div className="flex flex-col gap-7 justify-center items-center px-5 md:px-0">
        <CustomToggle dynamicId={"dfd5454dfdf8"} />
        <h2 className="text-2xl">Maintenance Mode</h2>
        <p className="text-center text-base text-black-opacity-60">
          By turning on maintained mode all your app and customer side website{" "}
          <br />
          will be off. Only admin panel and seller panel will be functional.
        </p>
        <ShopSetupCommonSubmitBTN
          buttonText="Save"
          type="submit"
          submitBTNStyle="w-full md:w-[270px]"
        />
      </div>
    </div>
  );
};

export default GenaralSettings;
