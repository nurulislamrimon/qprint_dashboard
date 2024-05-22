"use client";
import LeftToggle from "@/assets/assetsSVG/LeftToggle";
import RightToggle from "@/assets/assetsSVG/RightToggle";
import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import Loader from "@/components/shared/loaders/Loader";
import ShopSetupCommonSubmitBTN from "@/components/ShopSetup/ShopSetupCommonSubmitBTN";
import {
  useAddShippingChargeMutation,
  useGetShippinghargeQuery,
} from "@/store/features/shopSetup/shippingcharge/shippingChargeApi";
import {
  setfreeShippingAmount,
  setInsideAmount,
  setIsFreeShippingActive,
  setOutsideAmount,
} from "@/store/features/shopSetup/shippingcharge/shippingChargeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { is } from "date-fns/locale";
import { useLayoutEffect } from "react";
import { toast } from "react-toastify";

const DeliveryFee = () => {
  const dispatch = useAppDispatch();
  const { inside, outside, freeShippingMinOrderAmount, isFreeShippingActive } =
    useAppSelector((state) => state.shippingCharge);
  const [addShippingCharge, { isLoading: loading }] =
    useAddShippingChargeMutation();
  const { data } = useGetShippinghargeQuery("");

  console.log(isFreeShippingActive);

  useLayoutEffect(() => {
    dispatch(setInsideAmount(Number(data?.data?.inside)));
    dispatch(setOutsideAmount(Number(data?.data?.outside)));
    dispatch(
      setfreeShippingAmount(Number(data?.data?.freeShippingMinOrderAmount))
    );
    dispatch(setIsFreeShippingActive(data?.data?.isFreeShippingActive));
  }, [data, dispatch]);

  // handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await addShippingCharge({
        inside,
        outside,
        freeShippingMinOrderAmount,
        isFreeShippingActive,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      }
      if ("error" in res && res.error instanceof Error) {
        toast.error(res.error.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleOnChange = (_id: any, arg1: boolean): void => {
    console.log("hkh");
  };

  return (
    <form className="p-8 relative overflow-hidden" onSubmit={handleSubmit}>
      {loading && <Loader />}
      <div className="flex flex-col items-center md:flex-row gap-[30px]">
        <CustomGlobalInput
          label="Inside Doha"
          type="number"
          name="inside"
          placeholder="10"
          value={inside || 0}
          onChange={(e) => dispatch(setInsideAmount(Number(e.target.value)))}
        />
        <CustomGlobalInput
          label="Outside Doha"
          type="number"
          name="outside"
          placeholder="10"
          value={outside || 0}
          onChange={(e) => dispatch(setOutsideAmount(Number(e.target.value)))}
        />
      </div>
      <hr className="w-full h-[1px] bg-black my-8" />
      <div className="mb-4">
        <h3>Free Shipping Feature</h3>{" "}
        <div
          className="max-w-fit"
          onClick={() =>
            dispatch(setIsFreeShippingActive(!isFreeShippingActive))
          }
        >
          {isFreeShippingActive === true ? <RightToggle /> : <LeftToggle />}
        </div>
      </div>
      <CustomGlobalInput
        label="Free Shipping Up To"
        type="number"
        name="freeShippingMinOrderAmount"
        placeholder="10"
        value={freeShippingMinOrderAmount || 0}
        onChange={(e) =>
          dispatch(setfreeShippingAmount(Number(e.target.value)))
        }
      />
      <div className="flex items-center justify-center fixed bottom-5 inset-x-0 mx-5 md:mx-auto">
        <ShopSetupCommonSubmitBTN buttonText="Submit" type="submit" />
      </div>
    </form>
  );
};

export default DeliveryFee;
